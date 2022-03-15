import { gql, useQuery } from '@apollo/client';
import { meQuery } from '../__api__/meQuery';

export const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

function useMe() {
  return useQuery<meQuery>(ME_QUERY);
}

export default useMe;
