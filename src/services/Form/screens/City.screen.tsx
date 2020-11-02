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

const CityScreen: React.FC<Props> = ({ onSubmit }) => {
  const [city, setCity] = useForm('city');

  const onSubmitWrapper = useCallback(() => {
    if (Validators.city(city)) {
      onSubmit();
    } else {
      message.error('La ville indiqué est incorrecte');
    }
  }, [city, onSubmit]);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCity(e.currentTarget.value);
    },
    [setCity],
  );

  return (
    <Form
      title={'Entrez le nom de votre ville'}
      button={'Continuer'}
      onSubmit={onSubmitWrapper}
    >
      <StyledInput
        autoFocus
        placeholder={'ex. Paris'}
        value={city}
        onChange={onChange}
      />
    </Form>
  );
};

// @ts-ignore
CityScreen.whyDidYouRender = true;

export default React.memo(CityScreen);
