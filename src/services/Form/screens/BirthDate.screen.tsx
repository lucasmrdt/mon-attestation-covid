/* eslint-disable react/jsx-pascal-case */

import React, { ChangeEvent, useCallback } from 'react';
import { message } from 'antd';
import CalendarFilled from '@ant-design/icons/CalendarFilled';
import RightOutlined from '@ant-design/icons/RightOutlined';

import { Input } from 'components';
import { Validators } from 'services/Generator';

import Form from '../components/FormSection';
import { useForm } from '../store.form';

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
      console.log(replacedValue);
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
      icon={<RightOutlined />}
    >
      <Input
        autoFocus
        // @ts-ignore
        contenttype={'birthday'}
        allowClear={false}
        value={birthDate}
        onChange={onChange}
        placeholder={'ex. 22/11/1990'}
        maxLength={10}
        suffix={<CalendarFilled />}
      />
    </Form>
  );
};

// @ts-ignore
BirthDateScreen.whyDidYouRender = true;

export default React.memo(BirthDateScreen);
