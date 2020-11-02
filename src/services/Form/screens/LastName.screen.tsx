/* eslint-disable react/jsx-pascal-case */

import React, { ChangeEvent, useCallback } from 'react';
import { message } from 'antd';
import ContactsFilled from '@ant-design/icons/ContactsFilled';
import RightOutlined from '@ant-design/icons/RightOutlined';

import { Input } from 'components';
import { Validators } from 'services/Generator';

import Form from '../components/FormSection';
import { useForm } from '../store.form';

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
      icon={<RightOutlined />}
    >
      <Input
        autoFocus
        // @ts-ignore
        contenttype={'lastname'}
        placeholder={'ex. Chirac'}
        value={lastName}
        onChange={onChange}
        suffix={<ContactsFilled />}
      />
    </Form>
  );
};

// @ts-ignore
LastNameScreen.whyDidYouRender = true;

export default React.memo(LastNameScreen);
