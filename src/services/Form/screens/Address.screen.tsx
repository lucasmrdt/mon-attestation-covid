/* eslint-disable react/jsx-pascal-case */

import React, { ChangeEvent, useCallback } from 'react';
import { message } from 'antd';
import EnvironmentFilled from '@ant-design/icons/EnvironmentFilled';
import CheckOutlined from '@ant-design/icons/CheckOutlined';

import { Input } from 'components';
import { Validators } from 'services/Generator';

import Form from '../components/FormSection';
import { useForm } from '../form.store';

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
      icon={<CheckOutlined />}
    >
      <Input
        autoFocus
        autoComplete={'street-address'}
        placeholder={"ex. 3 rue de l'école"}
        value={address}
        onChange={onChange}
        suffix={<EnvironmentFilled />}
      />
    </Form>
  );
};

// @ts-ignore
AddressScreen.whyDidYouRender = true;

export default React.memo(AddressScreen);
