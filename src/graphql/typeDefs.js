import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    discs: [Disc!]!
  }

  type Disc {
    id: ID!
    brand: String
    mold: String
    plastic: String
    weight: Int
    speed: Int
    glide: Int
    turn: Int
    fade: Int
  }

  input DiscInput {
    brand: String!
    mold: String!
    plastic: String!
    weight: Int
    speed: Int
    glide: Int
    turn: Int
    fade: Int
  }

  type Mutation {
    createDisc(disc: DiscInput): Disc
  }
`;
