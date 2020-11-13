/* eslint-disable react/jsx-pascal-case */

import React, { useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { message } from 'antd';

import { Anchor, Github, Section } from 'components';

import { useForm, FormStore } from './form.store';
import { submitForm } from './form.controllers';
import InstructionScreen from './screens/Instruction.screen';
import FirstNameScreen from './screens/FirstName.screen';
import LastNameScreen from './screens/LastName.screen';
import BirthDateScreen from './screens/BirthDate.screen';
import PlaceOfBirthScreen from './screens/PlaceOfBirth.screen';
import ZipCodeScreen from './screens/ZipCode.screen';
import CityScreen from './screens/City.screen';
import AddressScreen from './screens/Address.screen';
import ReasonsScreen from './screens/Reasons.screen';

const isMobile = typeof window.orientation !== 'undefined';

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
  const onPrev = useCallback(
    () =>
      setStep((prev) => {
        window.history.pushState(`${prev - 1}`, '');
        return prev - 1;
      }),
    [setStep],
  );
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

  useEffect(() => {
    const af = requestAnimationFrame(() => {
      const warned = FormStore.get('warned');
      const rgpdWarned = FormStore.get('rgpdWarned');
      if (!warned || rgpdWarned) {
        return;
      }
      message.warn({
        content:
          "Cette web app utilise le service Google Analytics dans l'unique but de comptabiliser le nombre de vues générées sur le site, aucune information personnelle n'est transmise ou sauvegardée par ce tiers.",
        style: {
          fontSize: 10,
          ...(isMobile && {
            textAlign: 'left',
          }),
        },
        duration: 6,
      });
      FormStore.set('rgpdWarned', true);
    });

    return () => cancelAnimationFrame(af);
  }, []);

  const CurrentStep = steps.find((_, index) => index === step);
  if (!CurrentStep) {
    return null;
  }

  return (
    <Section>
      {step > 0 && <BackButton onClick={onPrev}>Retour</BackButton>}
      {step > 0 && <Stepper>{`${step + 1}/${steps.length}`}</Stepper>}
      {<Github url={'https://github.com/lucasmrdt/monattestationcovid.fr'} />}
      <CurrentStep onSubmit={step === steps.length - 1 ? onFinish : onNext} />
    </Section>
  );
};

// @ts-ignore
FormScreen.whyDidYouRender = true;

export default React.memo(FormScreen);
