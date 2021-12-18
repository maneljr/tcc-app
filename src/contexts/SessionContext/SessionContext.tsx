import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from 'firebase/auth';

import { auth } from 'services';
import { ISessionContext } from './types';

const SessionContext = React.createContext({} as ISessionContext);

const SessionProvider = ({ children }: { children?: React.ReactNode }) => {
  const history = useHistory();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((userData) => {
      if (userData) {
        setUser(userData);
        console.log('tem alguem locado');
        history.push('/');
        console.log({ user: userData.toJSON() });
      } else {
        setUser(null);
        history.push('/signin');
      }
    });
  }, [history]);

  return <SessionContext.Provider value={{ user }}>{children}</SessionContext.Provider>;
};

export { SessionContext, SessionProvider };
