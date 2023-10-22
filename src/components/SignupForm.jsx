import classes from "../styles/Signup.module.css";
import TextInput from "./TextInput.jsx";
import Checkbox from "./Checkbox.jsx";
import Button from "./Button.jsx";

import {useState} from "react";
import {useAuth} from "../contexts/AuthContext.jsx";
import {Link, useNavigate} from "react-router-dom";
import Form from "./Form.jsx";

export default function SignupForm (){
    const [username, setUsername] =useState("");
    const [email, setEmail] =useState("");
    const [password, setPassword] =useState("");
    const [confirmPassword, setConfirmPassword] =useState("");
    const [agree, setAgree] =useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] =useState();

    const {signup} = useAuth();
    const navigate = useNavigate();

    async function handelSubmit(e){
        e.preventDefault();
        // do validation
        if (password !== confirmPassword){
            return setError("Passwords don't match")
        }

        try {
            setError("");
            setLoading(true)
            await signup(email, password, username)
            navigate("/", {
                replace: true
            });
        }catch (err) {
            console.log(err)
            setLoading(false);
            setError("Failed to create an account");
        }
    }
    return (
        <Form className={classes.signup} onSubmit={handelSubmit}>
            <TextInput type="text" required placeholder="Enter name" value={username} onChange={(e) => setUsername(e.target.value)} icon={"person"}/>
            <TextInput type="text" required placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} icon={"alternate_email"}/>
            <TextInput type="password" required placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} icon={"lock"}/>
            <TextInput type="password" required placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} icon={"lock_clock"}/>
            <Checkbox text={"I agree to the Terms & Conditions"} required value={agree} onChange={(e) => setAgree(e.target.value)}/>
            <Button disabled={loading} type={"submit"}>
                <span>Submit now</span>
            </Button>
            {error && <p className={"error"}>{error}</p>}
            <div className="info">
                Already have an account? <Link to="/login">Login</Link> instead.
            </div>
        </Form>
    );
}