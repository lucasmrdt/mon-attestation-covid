/* eslint-disable react/jsx-pascal-case */

import React, { ChangeEvent, useCallback } from 'react';
import { message } from 'antd';
import StarFilled from '@ant-design/icons/StarFilled';
import RightOutlined from '@ant-design/icons/RightOutlined';

import { Input } from 'components';
import { Validators } from 'services/Generator';

import Form from '../components/FormSection';
import { useForm } from '../store.form';

interface Props {
  onSubmit: () => void;
}

const PlaceOfBirthScreen: React.FC<Props> = ({ onSubmit }) => {
  const [placeOfBirth, setPlaceOfBirth] = useForm('placeOfBirth');

  const onSubmitWrapper = useCallback(() => {
    if (Validators.placeOfBirth(placeOfBirth)) {
      onSubmit();
    } else {
      message.error('Le lieu indiqué est incorrecte');
    }
  }, [placeOfBirth, onSubmit]);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPlaceOfBirth(e.currentTarget.value);
    },
    [setPlaceOfBirth],
  );

  return (
    <Form
      title={'Entrez votre lieu de naissance'}
      button={'Continuer'}
      onSubmit={onSubmitWrapper}
      icon={<RightOutlined />}
    >
      <Input
        autoFocus
        // @ts-ignore
        contentType={'cityofbirth'}
        placeholder={'ex. Bordeaux'}
        value={placeOfBirth}
        onChange={onChange}
        suffix={<StarFilled />}
      />
    </Form>
  );
};

// @ts-ignore
PlaceOfBirthScreen.whyDidYouRender = true;

export default React.memo(PlaceOfBirthScreen);
