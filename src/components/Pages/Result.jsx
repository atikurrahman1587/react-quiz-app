import Summary from "../Summary.jsx";
import Analysis from "../Analysis.jsx";
import {useLocation, useParams} from "react-router-dom";
import useAnswers from "../../Hooks/useAnswers.jsx";
import _ from "lodash";

export default function Result(){
    const location = useLocation();
    const params = useParams();

    const { id } = params;
    const qna = location.state;

    const {loading, answers, error} = useAnswers(id);

    function calculate() {
        let score = 0;

        answers.forEach((question, index1) => {
            let correctIndexes = [],
                checkIndexes = [];

            question.options.forEach((option, index2) => {
                if (option.correct) correctIndexes.push(index2);
                if (qna[index1].options[index2].checked){
                    checkIndexes.push(index2);
                    option.checked = true;
                }
            });

            if (_.isEqual(correctIndexes, checkIndexes)){
                score = score+5;
            }
        })

        return score;
    }
    const userScore = calculate();
    return (
        <>
            {loading && <div style={{textAlign: "center"}}>Loading...</div>}
            {error && <div style={{textAlign: "center"}}>There was a error!</div>}
            {answers && answers.length > 0 && (
                <>
                    <Summary score={userScore} noq={answers.length}/>
                    <Analysis answers={answers}/>
                </>
            )}
        </>
    );
}