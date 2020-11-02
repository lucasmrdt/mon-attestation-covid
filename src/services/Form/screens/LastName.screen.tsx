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

const LastNameScreen: React.FC<Props> = ({ onSubmit }) => {
  const [lastName, setLastName] = useForm('lastName');

  const onSubmitWrapper = useCallback(() => {
    if (Validators.lastName(lastName)) {
      onSubmit();
    } else {
      message.error('Le nom est trop court');
    }
  }, [lastName, onSubmit]);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setLastName(e.currentTarget.value);
    },
    [setLastName],
  );

  return (
    <Form
      title={'Entrez votre nom de famille'}
      button={'Continuer'}
      onSubmit={onSubmitWrapper}
    >
      <StyledInput
        autoFocus
        placeholder={'ex. Chirac'}
        value={lastName}
        onChange={onChange}
      />
    </Form>
  );
};

// @ts-ignore
LastNameScreen.whyDidYouRender = true;

export default React.memo(LastNameScreen);
