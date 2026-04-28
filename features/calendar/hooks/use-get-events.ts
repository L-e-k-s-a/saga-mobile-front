import { db } from '@/firebase/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useGetEvents = (activeFamilyUid: string) => {
    const [events, setEvents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!activeFamilyUid) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        const queryTasks = query(
            collection(db, 'calendars'),
            where('familyId', '==', activeFamilyUid),
        );

        const unsubscribe = onSnapshot(
            queryTasks,
            (snapshot) => {
                const calendarsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setEvents(calendarsData);
                setIsLoading(false);
            },
            (err) => {
                console.error('Error fetching events:', err);
                setError(err);
                setIsLoading(false);
            },
        );

        return () => unsubscribe();
    }, [activeFamilyUid]);

    const refetch = () => {
        console.log('Data events is real-time, no need to refetch');
    };

    return { events, isLoading, error, refetch };
};
