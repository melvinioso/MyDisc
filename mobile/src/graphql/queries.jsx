import { gql } from '@apollo/client';

export const QUERY_DISCS = gql`
  query($where: JSON) {
    discs(order: "speed", where: $where) {
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
