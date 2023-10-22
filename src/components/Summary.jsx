import classes from "../styles/Summary.module.css";
import defaultImage from "../assets/images/success.png";
import useFetch from "../Hooks/useFetch.jsx";
import {useMemo} from "react";

export default function Summary({ score, noq }){
    const getKeyword = useMemo(() => {
        if (score / (noq * 5) * 100 < 50) {
            return "failed";
        } else if(score / (noq * 5) * 100 < 75){
            return "good";
        } else if(score / (noq * 5) * 100 < 100) {
            return "very good";
        } else {
            return "excellent";
        }
    }, []);
    const {loading, error, result} = useFetch(`https://api.pexels.com/v1/search?query=${getKeyword}&per_page=1`, 'GET', {
        Authorization: "ETM3GiLfIK6GfWhV8RwtkZBYBuq0tBYIWWDh4uLhMDnCGdY1zggM6c2n",
    });

    const image = result ? result?.photos[0].src.medium : defaultImage;
    return (
        <div className={classes.summary}>
            <div className={classes.point}>
                <p className={classes.score}>
                    Your score is <br />
                    {score} out of {noq * 5}
                </p>
            </div>

            {loading && <div className={classes.badge}>Loading yor badge... </div>}
            {error && <div className={classes.badge}>An error occurred... </div>}
            {!loading && !error && (
                <div className={classes.badge}>
                    <img src={image} alt="Success" />
                </div>
            )}

        </div>
    );
}