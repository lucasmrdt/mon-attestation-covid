/* eslint-disable react/jsx-pascal-case */

import React, { ChangeEvent, useCallback } from 'react';
import { message } from 'antd';
import SmileFilled from '@ant-design/icons/SmileFilled';
import RightOutlined from '@ant-design/icons/RightOutlined';

import { Input } from 'components';
import { Validators } from 'services/Generator';

import Form from '../components/FormSection';
import { useForm } from '../store.form';

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
      icon={<RightOutlined />}
    >
      <Input
        autoFocus
        autoComplete={'firstname'}
        placeholder={'ex. Jacques'}
        value={firstName}
        onChange={onChange}
        suffix={<SmileFilled />}
      />
    </Form>
  );
};

// @ts-ignore
FirstNameScreen.whyDidYouRender = true;

export default React.memo(FirstNameScreen);
