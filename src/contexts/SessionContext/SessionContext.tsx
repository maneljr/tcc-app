import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from 'firebase/auth';

import { auth, db } from 'services';
import { ISessionContext } from './types';
import { collection, onSnapshot } from 'firebase/firestore';
import { IDataUsers } from 'util/types';
import { ISolicitation } from 'pages/Home/components/Calendar/types';
import { IDoctor } from 'pages/RegisterDoctor/types';
import { IPlace } from 'pages/RegisterPlace/components/ModalUpdatePlace/types';

const SessionContext = React.createContext({} as ISessionContext);

const SessionProvider = ({ children }: { children?: React.ReactNode }) => {
  const history = useHistory();
  const [user, setUser] = useState<User | null>(null);
  const [dataCurrentUser, setDataCurrentUser] = useState<IDataUsers | null>(null);
  const [solicitations, setSolicitations] = useState<ISolicitation[]>([]);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [local, setLocal] = useState<string>('');

  const [filterDoctor, setFilterDoctor] = useState<string>('');

  const badge = useMemo(
    () =>
      solicitations.filter((s) =>
        local !== '' && filterDoctor === ''
          ? !s.verificado && s.local === local
          : filterDoctor !== '' && local === ''
          ? !s.verificado && s.medico === filterDoctor
          : local !== '' && filterDoctor !== ''
          ? !s.verificado && s.local === local && !s.verificado && s.medico === filterDoctor
          : !s.verificado
      ).length,
    [local, solicitations, filterDoctor]
  );

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
    onSnapshot(collection(db, 'users'), (snapshot) => {
      const users = snapshot.docs.map((doc) => {
        return Object.assign({ ...doc.data() }, { id: doc.id });
      }) as unknown as IDataUsers[];
      users.forEach((s) => {
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
    onSnapshot(collection(db, 'doctor'), (snapshot) => {
      const dataDoctors = snapshot.docs.map((doc) => {
        return Object.assign({ ...doc.data() }, { id: doc.id });
      }) as unknown as IDoctor[];
      setDoctors(dataDoctors);
    });
  }, []);

  useEffect(() => {
    onSnapshot(collection(db, 'place'), (snapshot) => {
      const dataPlaces = snapshot.docs.map((doc) => {
        return Object.assign({ ...doc.data() }, { id: doc.id });
      }) as unknown as IPlace[];
      setPlaces(dataPlaces);
    });
  }, []);

  return (
    <SessionContext.Provider
      value={{
        user,
        dataCurrentUser,
        solicitations,
        badge,
        doctors,
        places,
        local,
        setLocal,
        setFilterDoctor,
        filterDoctor,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
