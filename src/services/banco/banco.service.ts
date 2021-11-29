import { db } from '../Firebase';
import { collection, getDocs } from '@firebase/firestore';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';

const BancoServices = {
  getAll: async (): Promise<QuerySnapshot<DocumentData>> => {
    const placeCollectionRef = collection(db, 'tblLocal');
    const data = await getDocs(placeCollectionRef);
    return data;
  },
};

export { BancoServices };
