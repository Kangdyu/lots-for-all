import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const LogoContainer = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 160px auto 60px;
  padding: 0;
`;

export const logoStyle = css`
  display: block;
  text-align: center;
`;

export const LogoBigTitle = styled.h1`
  ${logoStyle};
  font-size: 79px;
  color: ${(props) => props.theme.color.primary700};
`;

export const LogoSmallTitle = styled.h2`
  ${logoStyle};
  font-size: 22px;
  color: ${(props) => props.theme.color.primary700};
`;
