import { css, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { hexToRgba } from "utils/color";

export const GameFormContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const boxStyle = (theme: Theme) => css`
  height: 500px;
  padding: 24px;

  border-radius: 24px;
  background-color: ${theme.color.white};
  box-shadow: 0 6px 16px 0 ${hexToRgba(theme.color.primary700, 0.1)};

  h2 {
    font-size: 20px;
    font-weight: 400;
  }
`;

export const GameForm = styled.form`
  ${(props) => boxStyle(props.theme)};

  max-width: 500px;
  width: 100%;
  margin-right: 30px;
`;

export const GameParticipants = styled.ul`
  ${(props) => boxStyle(props.theme)};

  max-width: 200px;
  width: 100%;
`;