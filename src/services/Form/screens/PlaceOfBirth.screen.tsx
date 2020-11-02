/* eslint-disable react/jsx-pascal-case */

import React, { ChangeEvent, useCallback } from 'react';
import { Input, message } from 'antd';
import styled from '@emotion/styled';

import { Validators } from 'services/Generator';

import Form from '../components/FormSection';
import { useForm } from '../store.form';

const StyledInput = styled(Input)`
  font-size: 14px;
  font-style: italic;
  background-color: transparent;
  border: none;
  border-radius: 0;
  border-bottom: solid 1px #fff !important;
  width: auto;
  color: #fff;
  font-style: normal;
  font-size: 19px;
  font-family: ${(p) =>
    // @ts-ignore
    p.theme.fonts.sansSerif};

  &:focus {
    outline: none;
  }
`;

interface Props {
  onSubmit: () => void;
}

const PlaceOfBirthScreen: React.FC<Props> = ({ onSubmit }) => {
  const [placeOfBirth, setPlaceOfBirth] = useForm('placeOfBirth');

  const onSubmitWrapper = useCallback(() => {
    if (Validators.placeOfBirth(placeOfBirth)) {
      onSubmit();
    } else {
      message.error('Le lieu indiqué est incorrecte');
    }
  }, [placeOfBirth, onSubmit]);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPlaceOfBirth(e.currentTarget.value);
    },
    [setPlaceOfBirth],
  );

  return (
    <Form
      title={'Entrez votre lieu de naissance'}
      button={'Continuer'}
      onSubmit={onSubmitWrapper}
    >
      <StyledInput
        autoFocus
        placeholder={'ex. Bordeaux'}
        value={placeOfBirth}
        onChange={onChange}
      />
    </Form>
  );
};

// @ts-ignore
PlaceOfBirthScreen.whyDidYouRender = true;

export default React.memo(PlaceOfBirthScreen);
