import { gql } from '@apollo/client';

export const QUERY_DISCS = gql`
  query($where: JSON) {
    discs(order: "speed", where: $where) {
      id
      brand
      mold
      plastic
      color
      type
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
  query($where: JSON) {
    bags(order: "name", where: $where) {
      id
      name
      capacity
      color
      userId
      discs {
        id
        type
      }
    }
  }
`;
