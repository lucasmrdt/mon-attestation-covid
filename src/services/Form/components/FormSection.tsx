/* eslint-disable react/jsx-pascal-case */

import React, { FormEvent, useCallback } from 'react';
import { Button } from 'antd';
import styled from '@emotion/styled';

import mediaqueries from 'styles/styles.utils';
import { Headings, Article } from 'components';

const Title = styled(Headings.h1)`
  text-align: center;
  margin: auto;
  margin-bottom: 220px;
  margin-top: 70px;

  ${mediaqueries.phone`
    margin-bottom: 50px;
  `};
`;

const StyledButton = styled(Button)`
  position: fixed;
  bottom: 40px;
  height: auto;
  border: none;
  border-radius: 5px;
  span {
    font-size: 17px;
    color: #111216;
  }
`;

const Container = styled(Article)`
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface Props {
  title: string;
  button: string;
  onSubmit: () => void;
  children: React.ReactElement;
}

const FormSection: React.FC<Props> = ({
  onSubmit,
  title,
  button,
  children,
}) => {
  const onSubmitWrapper = useCallback(
    (e: FormEvent) => {
      onSubmit();
      e.preventDefault();
    },
    [onSubmit],
  );

  return (
    <>
      <Container>
        <Title>{title}</Title>
        <form onSubmit={onSubmitWrapper}>{children}</form>
      </Container>
      <StyledButton onClick={onSubmit}>{button}</StyledButton>
    </>
  );
};

// @ts-ignore
FormSection.whyDidYouRender = true;

export default React.memo(FormSection);
