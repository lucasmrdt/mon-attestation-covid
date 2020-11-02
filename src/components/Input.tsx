/* eslint-disable react/jsx-pascal-case */

import { Input } from 'antd';
import styled from '@emotion/styled';

const StyledInput = styled(Input)`
  font-size: 14px;
  font-style: italic;
  background-color: transparent;
  border: none;
  border-radius: 0;
  border-bottom: solid 1px #fff !important;
  width: auto;
  color: #fff;
  font-style: normal;
  font-size: 19px;
  font-family: ${(p) =>
    // @ts-ignore
    p.theme.fonts.sansSerif};

  outline: none;
  box-shadow: none;
  input {
    caret-color: #fff;
    background-color: transparent;
    border: none;
    border-radius: 0;
    width: auto;
    min-width: 150px;
    color: #fff;
    font-style: normal;
    font-size: 19px;
    font-family: ${(p) =>
      // @ts-ignore
      p.theme.fonts.sansSerif};

    &:focus {
      outline: none;
    }
  }
`;

export default StyledInput;
