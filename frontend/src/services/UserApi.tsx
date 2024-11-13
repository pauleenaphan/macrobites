import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($input: CreateUserInput!) {
        createUser(input: $input) {
            _id
            name
            email
            password
            role
        }
    }
`;