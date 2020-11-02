/* eslint-disable react/jsx-pascal-case */

import React, { useCallback } from 'react';
import styled from '@emotion/styled';

import { Anchor, Section } from 'components';

import { useForm } from '../store.form';
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
import { message } from 'antd';

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
  const onNext = useCallback(() => setStep((prev) => prev + 1), [setStep]);
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

  const CurrentStep = steps.find((_, index) => index === step);
  if (!CurrentStep) {
    throw new Error('invalid step');
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
