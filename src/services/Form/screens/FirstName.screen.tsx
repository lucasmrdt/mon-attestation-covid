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

const FirstNameScreen: React.FC<Props> = ({ onSubmit }) => {
  const [firstName, setFirstName] = useForm('firstName');

  const onSubmitWrapper = useCallback(() => {
    if (Validators.firstName(firstName)) {
      onSubmit();
    } else {
      message.error('Le prénom est trop court');
    }
  }, [firstName, onSubmit]);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFirstName(e.currentTarget.value);
    },
    [setFirstName],
  );

  return (
    <Form
      title={'Entrez votre prénom'}
      button={'Continuer'}
      onSubmit={onSubmitWrapper}
    >
      <StyledInput
        autoFocus
        placeholder={'ex. Jacques'}
        value={firstName}
        onChange={onChange}
      />
    </Form>
  );
};

// @ts-ignore
FirstNameScreen.whyDidYouRender = true;

export default React.memo(FirstNameScreen);
