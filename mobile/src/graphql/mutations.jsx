import { gql } from '@apollo/client';

export const CREATE_DISC = gql`
  mutation create($disc: DiscCreate) {
    createDisc(disc: $disc) {
      id
    }
  }
`;

export const CREATE_BAG = gql`
  mutation create($bag: BagCreate) {
    createBag(bag: $bag) {
      id
    }
  }
`;
