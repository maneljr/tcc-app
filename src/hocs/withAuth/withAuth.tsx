import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { SessionContext } from 'contexts';

const withAuth = (WrappedComponent: React.ElementType) => {
  const WithAuth = ({ ...props }) => {
    const { user } = useContext(SessionContext);
    return user ? <WrappedComponent {...props} /> : <Redirect to="/signin" />;
  };

  return WithAuth;
};

export { withAuth };
