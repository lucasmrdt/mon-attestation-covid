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

const AddressScreen: React.FC<Props> = ({ onSubmit }) => {
  const [address, setAddress] = useForm('address');

  const onSubmitWrapper = useCallback(() => {
    if (Validators.address(address)) {
      onSubmit();
    } else {
      message.error('La ville indiqué est incorrecte');
    }
  }, [address, onSubmit]);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setAddress(e.currentTarget.value);
    },
    [setAddress],
  );

  return (
    <Form
      title={'Entrez votre adresse'}
      button={'Terminer'}
      onSubmit={onSubmitWrapper}
    >
      <StyledInput
        autoFocus
        placeholder={"ex. 3 rue de l'école"}
        value={address}
        onChange={onChange}
      />
    </Form>
  );
};

// @ts-ignore
AddressScreen.whyDidYouRender = true;

export default React.memo(AddressScreen);
