import { gql } from '@apollo/client';

export const CREATE_DISC = gql`
  mutation create($disc: DiscCreate) {
    createDisc(disc: $disc) {
      id
    }
  }
`;

export const UPDATE_DISC = gql`
  mutation update($disc: DiscUpdate) {
    updateDisc(disc: $disc) {
      id
    }
  }
`;

export const DESTROY_DISC = gql`
  mutation destroy($disc: DiscDestroy) {
    destroyDisc(disc: $disc) {
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

export const UPDATE_BAG = gql`
  mutation update($bag: BagUpdate) {
    updateBag(bag: $bag) {
      id
    }
  }
`;

export const DESTROY_BAG = gql`
  mutation destroy($bag: BagDestroy) {
    destroyBag(bag: $bag) {
      id
    }
  }
`;

export const ADD_DISC_TO_BAG = gql`
  mutation addDiscToBag($discId: Int!, $bagId: Int!) {
    addDiscToBag(discId: $discId, bagId: $bagId) {
      id
    }
  }
`;
