import { db } from '@/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const getUserFromFirebase = async (uid: string) => {
    const userRef = doc(db, 'users', uid); 
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
        return {};
    }
    return userSnap.data();
};


