/* eslint-disable react/jsx-pascal-case */

import React, { ChangeEvent, useCallback } from 'react';
import { message } from 'antd';
import TagFilled from '@ant-design/icons/TagFilled';
import RightOutlined from '@ant-design/icons/RightOutlined';

import { Input } from 'components';
import { Validators } from 'services/Generator';

import Form from '../components/FormSection';
import { useForm } from '../store.form';

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
      icon={<RightOutlined />}
    >
      <Input
        autoFocus
        // @ts-ignore
        contentType={'city'}
        placeholder={'ex. Paris'}
        value={city}
        onChange={onChange}
        suffix={<TagFilled />}
      />
    </Form>
  );
};

// @ts-ignore
CityScreen.whyDidYouRender = true;

export default React.memo(CityScreen);
