import {useEffect, useState} from "react";
import {getDatabase, ref, query, orderByKey, get} from "firebase/database";

export default function useQuestion(videID){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [questions, setQuestions] = useState([]);

    useEffect(  () => {
        async function fetchQuestion() {
            // database related word
            const db = getDatabase();
            const quizRef = ref(db, "quiz/"+videID+"/questions")
            const quizQuery = query(quizRef, orderByKey());
            try {
                setError(false);
                setLoading(true);
                //request firebase database
                const snapshot = await get(quizQuery);
                if (snapshot.exists()) {
                    setLoading(false);
                    setQuestions(() => {
                        return [...Object.values(snapshot.val())]
                    })
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchQuestion();
    }, [videID]);

    return {
        loading,
        error,
        questions
    };
}