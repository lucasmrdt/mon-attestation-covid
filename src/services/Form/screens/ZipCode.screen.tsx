/* eslint-disable react/jsx-pascal-case */

import React, { ChangeEvent, useCallback } from 'react';
import { message } from 'antd';
import CompassFilled from '@ant-design/icons/CompassFilled';
import RightOutlined from '@ant-design/icons/RightOutlined';

import { Input } from 'components';
import { Validators } from 'services/Generator';

import Form from '../components/FormSection';
import { useForm } from '../store.form';

interface Props {
  onSubmit: () => void;
}

const ZipCodeScreen: React.FC<Props> = ({ onSubmit }) => {
  const [zipCode, setZipCode] = useForm('zipCode');

  const onSubmitWrapper = useCallback(() => {
    if (Validators.zipCode(zipCode)) {
      onSubmit();
    } else {
      message.error('Le code postal indiqué est incorrecte');
    }
  }, [zipCode, onSubmit]);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setZipCode(e.currentTarget.value.replace(/[^\d/]/g, ''));
    },
    [setZipCode],
  );

  return (
    <Form
      title={'Entrez votre code postal'}
      button={'Continuer'}
      onSubmit={onSubmitWrapper}
      icon={<RightOutlined />}
    >
      <Input
        autoFocus
        // @ts-ignore
        contenttype={'postal-code'}
        placeholder={'ex. 75000'}
        value={zipCode}
        onChange={onChange}
        maxLength={5}
        inputMode={'numeric'}
        suffix={<CompassFilled />}
      />
    </Form>
  );
};

// @ts-ignore
ZipCodeScreen.whyDidYouRender = true;

export default React.memo(ZipCodeScreen);
