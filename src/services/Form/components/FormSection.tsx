/* eslint-disable react/jsx-pascal-case */

import React, { FormEvent, useCallback, useState } from 'react';
import { Button } from 'antd';
import styled from '@emotion/styled';

import mediaqueries from 'styles/styles.utils';
import { Headings, Article } from 'components';

const Title = styled(Headings.h1)`
  text-align: center;
  margin: auto;
  margin-bottom: 170px;
  margin-top: 70px;

  ${mediaqueries.phone`
    margin-bottom: 50px;
  `};
`;

const StyledButton = styled(Button)`
  position: fixed;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  bottom: 40px;
  padding: 20px 25px;
  span {
    font-size: 17px;
    color: #111216;
  }
`;

const Container = styled(Article)`
  padding-bottom: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface Props {
  title: string;
  button: string;
  onSubmit: () => void;
  icon: React.ReactElement;
  children: React.ReactElement;
}

const FormSection: React.FC<Props> = ({
  onSubmit,
  title,
  button,
  children,
  icon,
}) => {
  const [focused, setFocused] = useState(false);

  const onSubmitWrapper = useCallback(
    (e: FormEvent) => {
      onSubmit();
      e.preventDefault();
    },
    [onSubmit],
  );
  const onFocus = useCallback((e: React.FocusEvent) => {
    const type = e.target.getAttribute('type');
    if (
      e.target.tagName === 'INPUT' &&
      (type === 'text' || type === 'number')
    ) {
      setFocused(true);
    }
  }, []);
  const onBlur = useCallback((e: React.FocusEvent) => {
    const type = e.target.getAttribute('type');
    if (
      e.target.tagName === 'INPUT' &&
      (type === 'text' || type === 'number')
    ) {
      setFocused(false);
    }
  }, []);

  return (
    <>
      <Container>
        <Title>{title}</Title>
        <form onFocus={onFocus} onBlur={onBlur} onSubmit={onSubmitWrapper}>
          {children}
        </form>
      </Container>
      <StyledButton
        style={{ position: focused ? 'absolute' : 'fixed' }}
        onClick={onSubmit}
      >
        {button}
        {icon}
      </StyledButton>
    </>
  );
};

// @ts-ignore
FormSection.whyDidYouRender = true;

export default React.memo(FormSection);
