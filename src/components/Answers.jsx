import Checkbox from "./Checkbox.jsx";
import classes from "../styles/Answers.module.css";
import {Fragment} from "react";
export default function Answers({options = [], handelChange, input}){
    return (
        <div className={classes.answers}>
            {options.map((option, index) => (
                <Fragment key={index}>
                    {input ? (
                        <Checkbox className={classes.answer} text={option.title} value={index} key={index} checked={option.checked} onChange={(e) => handelChange(e, index)} />
                    ) : (
                        <Checkbox className={`${classes.answer} ${option.correct ? classes.correct : option.checked ? classes.wrong : null}`} text={option.title} key={index} defaultChecked={option.checked} disabled />
                    )}
                </Fragment>
            ))}
        </div>
    );
}