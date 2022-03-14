import { gql, useApolloClient, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useMe from '../../hooks/useMe';
import { verifyEmail, verifyEmailVariables } from '../../__api__/verifyEmail';

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

function ConfirmEmail() {
  const client = useApolloClient();
  const { data: userData } = useMe();
  const navigate = useNavigate();
  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data;

    if (ok && userData?.me) {
      client.writeFragment({
        id: `User:${userData.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });

      navigate('/', { replace: true });
    }
  };
  const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
    {
      onCompleted,
    },
  );

  const location = useLocation();
  useEffect(() => {
    const code = location.search.split('code=')[1];
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  }, []);

  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h2 className="text-lg mb-3 font-medium">Confirming email...</h2>
      <h4 className="text-gray-500 text-sm">
        Please wait, do not close this page.
      </h4>
    </div>
  );
}

export default ConfirmEmail;
