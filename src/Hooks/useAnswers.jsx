import {useEffect, useState} from "react";
import {getDatabase, ref, query, orderByKey, get} from "firebase/database";

export default function useAnswers(videID){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [answers, setAnswers] = useState([]);

    useEffect(  () => {
        async function fetchAnswers() {
            // database related word
            const db = getDatabase();
            const answersRef = ref(db, "answers/"+videID+"/questions")
            const answersQuery = query(answersRef, orderByKey());
            try {
                setError(false);
                setLoading(true);
                //request firebase database
                const snapshot = await get(answersQuery);
                if (snapshot.exists()) {
                    setLoading(false);
                    setAnswers(() => {
                        return [...Object.values(snapshot.val())]
                    })
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchAnswers();
    }, [videID]);

    return {
        loading,
        error,
        answers
    };
}