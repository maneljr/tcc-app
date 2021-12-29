import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from 'firebase/auth';

import { auth, db } from 'services';
import { ISessionContext } from './types';
import { collection, onSnapshot } from 'firebase/firestore';
import { IDataUsers } from 'util/types';
import { ISolicitation } from 'pages/Home/components/Calendar/types';

const SessionContext = React.createContext({} as ISessionContext);

const SessionProvider = ({ children }: { children?: React.ReactNode }) => {
  const history = useHistory();
  const [user, setUser] = useState<User | null>(null);
  const [dataCurrentUser, setDataCurrentUser] = useState<IDataUsers | null>(null);
  const [solicitations, setSolicitations] = useState<ISolicitation[]>([]);
  const [badge, setBadge] = useState(0);

  useEffect(() => {
    auth.onAuthStateChanged((userData) => {
      if (userData) {
        setUser(userData);
        console.log('tem alguem locado');
        history.push('/');
      } else {
        setUser(null);
        history.push('/signin');
      }
    });
  }, [history]);

  useEffect(() => {
    onSnapshot(collection(db, 'DadosUsers'), (snapshot) => {
      const Users = snapshot.docs.map((doc) => {
        return Object.assign({ ...doc.data() }, { id: doc.id });
      }) as unknown as IDataUsers[];
      Users.forEach((s) => {
        if (s.uid === user?.uid) {
          setDataCurrentUser(s);
        }
      });
    });
  }, [user?.uid]);

  useEffect(() => {
    onSnapshot(collection(db, 'solicitation'), (snapshot) => {
      const solicitationsData = snapshot.docs.map((doc) => {
        return Object.assign({ ...doc.data() }, { id: doc.id });
      }) as unknown as ISolicitation[];
      setSolicitations(solicitationsData);
    });
  }, []);

  useEffect(() => {
    setBadge(solicitations.filter((s) => !!s.verificado).length);
  }, [solicitations]);

  return (
    <SessionContext.Provider value={{ user, dataCurrentUser, solicitations, badge }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
