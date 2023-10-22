import {useEffect, useState} from "react";
import {getDatabase, ref, query, orderByKey, get, startAfter, limitToFirst} from "firebase/database";

export default function useVideoList(page){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [videos, setVideos] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(  () => {
        async function fetchVideos() {
            // database related word
            const db = getDatabase();
            const videoRef = ref(db, "videos")
            page = page === 0 ? 0 : 6*page;
            const videoQuery = query(videoRef, orderByKey(), startAfter("" + page), limitToFirst(6));
            try {
                setError(false);
                setLoading(true);
                //request firebase database
                const snapshot = await get(videoQuery);
                if (snapshot.exists()) {
                    setLoading(false);
                    if (page === 0){
                        setVideos(() => {
                            return [...Object.values(snapshot.val())]
                        })
                    }else {
                        setVideos((prevVideos) => {
                            return [...prevVideos, ...Object.values(snapshot.val())]
                        })
                    }

                } else {
                    //
                    setHasMore(false);
                }
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        }
        fetchVideos();
    }, [page]);
    return {
        loading,
        error,
        videos,
        hasMore
    };
}