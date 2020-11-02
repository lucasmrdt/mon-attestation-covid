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

const BirthDateScreen: React.FC<Props> = ({ onSubmit }) => {
  const [birthDate, setBirthDate] = useForm('birthDate');

  const onSubmitWrapper = useCallback(() => {
    if (Validators.birthDate(birthDate)) {
      onSubmit();
    } else {
      message.error('La date de naissance indiqué est incorrecte');
    }
  }, [birthDate, onSubmit]);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      const replacedValue = value.replace(/[^\d/]/g, '');
      if (value.length < birthDate.length) {
        console.log(value, birthDate);
        setBirthDate(replacedValue);
      } else {
        const formattedValue = replacedValue
          .replace(/^(\d{2})/, '$1/')
          .replace(/^(\d{2})\/*(\d{2})/, '$1/$2/')
          .replace(/\/\//g, '/');
        setBirthDate(formattedValue);
      }
    },
    [setBirthDate, birthDate],
  );

  return (
    <Form
      title={'Entrez votre date de naissance'}
      button={'Continuer'}
      onSubmit={onSubmitWrapper}
    >
      <StyledInput
        autoFocus
        allowClear={false}
        value={birthDate}
        onChange={onChange}
        placeholder={'ex. 22/11/1990'}
        maxLength={10}
      />
    </Form>
  );
};

// @ts-ignore
BirthDateScreen.whyDidYouRender = true;

export default React.memo(BirthDateScreen);
