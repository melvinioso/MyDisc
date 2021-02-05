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

export const QUERY_BAGS = gql`
  query list {
    bags(order: "name") {
      id
      name
      capacity
      color
      userId
    }
  }
`;
