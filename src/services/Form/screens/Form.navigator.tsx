/* eslint-disable react/jsx-pascal-case */

import React, { useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { message } from 'antd';

import { Anchor, Section } from 'components';

import { useForm, FormStore } from '../store.form';
import { submitForm } from '../controllers.form';
import InstructionScreen from './Instruction.screen';
import FirstNameScreen from './FirstName.screen';
import LastNameScreen from './LastName.screen';
import BirthDateScreen from './BirthDate.screen';
import PlaceOfBirthScreen from './PlaceOfBirth.screen';
import ZipCodeScreen from './ZipCode.screen';
import CityScreen from './City.screen';
import AddressScreen from './Address.screen';
import ReasonsScreen from './Reasons.screen';

const BackButton = styled(Anchor)`
  position: absolute;
  align-self: flex-start;
  left: 30px;
  text-decoration: underline;
`;

const Stepper = styled.span`
  position: absolute;
  color: #fff;
`;

const steps = [
  InstructionScreen,
  FirstNameScreen,
  LastNameScreen,
  BirthDateScreen,
  PlaceOfBirthScreen,
  ZipCodeScreen,
  CityScreen,
  AddressScreen,
  ReasonsScreen,
];

interface Props {}

const FormScreen: React.FC<Props> = () => {
  const [step, setStep] = useForm('step');
  const onNext = useCallback(
    () =>
      setStep((prev) => {
        window.history.pushState(`${prev + 1}`, '');
        return prev + 1;
      }),
    [setStep],
  );
  const onPrev = useCallback(() => setStep((prev) => prev - 1), [setStep]);
  const onFinish = useCallback(async () => {
    const close = message.loading('Création du pdf ...');
    try {
      await submitForm();
      close();
      message.success('Votre attestation a bien été téléchargé');
    } catch (e) {
      console.error(e);
      close();
      message.error('Une erreur est survenue');
    }
  }, []);
  const onHistoryStateUpdate = useCallback(
    (e: PopStateEvent) => {
      try {
        const targetStep = e.state;
        setStep(parseInt(targetStep, 10));
      } catch (e) {
        console.error(`fail to retrieve step from history`);
      }
    },
    [setStep],
  );

  useEffect(() => {
    window.onpopstate = onHistoryStateUpdate;
    requestAnimationFrame(() => {
      window.history.replaceState(`${FormStore.get('step')}`, '');
    });
  }, [onHistoryStateUpdate]);

  const CurrentStep = steps.find((_, index) => index === step);
  if (!CurrentStep) {
    return null;
  }

  return (
    <Section>
      {step > 0 && <BackButton onClick={onPrev}>Retour</BackButton>}
      {step > 0 && <Stepper>{`${step + 1}/${steps.length}`}</Stepper>}
      <CurrentStep onSubmit={step === steps.length - 1 ? onFinish : onNext} />
    </Section>
  );
};

// @ts-ignore
FormScreen.whyDidYouRender = true;

export default React.memo(FormScreen);
