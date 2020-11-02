import React from 'react';
import { ThemeProvider } from 'emotion-theming';

import lightTheme from 'theme/light.theme';

import AppScreen from './App.screen';

const Gateway: React.FC = () => (
  <ThemeProvider theme={lightTheme}>
    <AppScreen />
  </ThemeProvider>
);

// @ts-ignore
Gateway.whyDidYouRender = true;

export default React.memo(Gateway);
