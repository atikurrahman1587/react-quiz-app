import Video from "./Video.jsx";
import { Link } from "react-router-dom";
import useVideoList from "../Hooks/useVideoList.jsx";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Videos() {
    const [page, setPage] = useState(0);
    const { loading, error, videos, hasMore } = useVideoList(page);
    return (
        <div>
            {videos.length > 0 && (
                <InfiniteScroll
                    dataLength={videos.length}
                    hasMore={hasMore}
                    loader="Loading..."
                    next={() => setPage(page + 1)} // Increment page by 1
                >
                    {videos.map((video) =>
                        video.noq > 0 ? (
                            <Link to={`/quiz/${video.youtubeID}`} state={{videoTitle: video.title}} key={video.youtubeID}>
                                <Video
                                    title={video.title}
                                    id={video.youtubeID}
                                    noq={video.noq}
                                />
                            </Link>
                        ) : (
                            <Video
                                title={video.title}
                                id={video.youtubeID}
                                noq={video.noq}
                                key={video.youtubeID}
                            />
                        )
                    )}
                </InfiniteScroll>
            )}
            {!loading && videos.length === 0 && <div>No data found!</div>}
            {error && <div style={{ textAlign: "center" }}>No data found!</div>}
            {loading && videos.length === 0 && (
                <div style={{ textAlign: "center" }}>Loading...</div>
            )}
        </div>
    );
}
