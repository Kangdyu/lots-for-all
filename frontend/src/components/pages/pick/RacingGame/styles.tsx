import styled from "@emotion/styled";

export const RankingListItem = styled.li`
  &:nth-of-type(1) {
    font-size: 20px;
    font-weight: 700;
    color: #e5b80b;
  }
  &:nth-of-type(3),
  &:nth-of-type(2) {
    font-size: 18px;
    font-weight: 400;
    color: #a8a9ad;
  }
  &:nth-of-type(3) {
    color: #cd7f32;
  }
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;
