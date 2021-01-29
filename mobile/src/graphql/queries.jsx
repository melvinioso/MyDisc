import { gql } from '@apollo/client';

export const QUERY_DISCS = gql`
  query list {
    discs(order: "speed") {
      id
      brand
      mold
      plastic
      color
      weight
      speed
      glide
      turn
      fade
      userId
    }
  }
`;
