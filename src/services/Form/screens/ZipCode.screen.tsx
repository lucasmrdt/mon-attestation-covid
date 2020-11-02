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

const ZipCodeScreen: React.FC<Props> = ({ onSubmit }) => {
  const [zipCode, setZipCode] = useForm('zipCode');

  const onSubmitWrapper = useCallback(() => {
    if (Validators.zipCode(zipCode)) {
      onSubmit();
    } else {
      message.error('Le code ZIP indiqué est incorrecte');
    }
  }, [zipCode, onSubmit]);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setZipCode(e.currentTarget.value);
    },
    [setZipCode],
  );

  return (
    <Form
      title={'Entrez votre code ZIP'}
      button={'Continuer'}
      onSubmit={onSubmitWrapper}
    >
      <StyledInput
        autoFocus
        placeholder={'ex. 75000'}
        value={zipCode}
        onChange={onChange}
      />
    </Form>
  );
};

// @ts-ignore
ZipCodeScreen.whyDidYouRender = true;

export default React.memo(ZipCodeScreen);
