import { gql } from '@apollo/client';

export const CREATE_DISC = gql`
  mutation create($disc: DiscCreate) {
    createDisc(disc: $disc) {
      id
    }
  }
`;
