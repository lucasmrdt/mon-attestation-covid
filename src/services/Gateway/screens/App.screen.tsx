import React from 'react';
import styled from '@emotion/styled';
import { Global } from '@emotion/core';

import { FormNavigator } from 'services/Form';
import { globalStyles } from 'styles/styles.global';

const Container = styled.div<any, { [key: string]: any }>`
  position: relative;
  background: ${(p) => p.theme.colors.background};
  transition: ${(p) => p.theme.colorModeTransition};
  min-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;
`;

const Gateway: React.FC = () => {
  return (
    <Container>
      <Global styles={globalStyles} />
      <FormNavigator />
    </Container>
  );
};

// @ts-ignore
Gateway.whyDidYouRender = true;

export default React.memo(Gateway);
