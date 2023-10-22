import Illustration from "../Illustration.jsx";
import classes from "../../styles/Login.module.css";
import LoginImage from '../../assets/images/login.svg'
import TextInput from "../TextInput.jsx";
import Button from "../Button.jsx";
import {Link, useNavigate} from "react-router-dom";
import Form from "../Form.jsx";
import {useState} from "react";
import {useAuth} from "../../contexts/AuthContext.jsx";

export default function Login(){
    const [email, setEmail] =useState("");
    const [password, setPassword] =useState("");
    const [loading, setLoading] =useState();
    const [error, setError] = useState("");
    const {login} = useAuth();
    const navigate = useNavigate();

    async function handelSubmit(e){
        e.preventDefault();

        try {
            setError("");
            setLoading(true)
            await login(email, password)
            navigate("/", {
                replace: true
            });

        }catch (err) {
            console.log(err)
            setLoading(false);
            setError("Failed to login");
        }
    }
    return (
        <>
            <h1>Login to your account</h1>
            <div className="column">
                <Illustration src={LoginImage} alt={"Login"}/>
                <Form className={classes.login} onSubmit={handelSubmit}>
                    <TextInput type="text" required placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} icon={"alternate_email"}/>
                    <TextInput type="password" required placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} icon={"lock"}/>
                    <Button disabled={loading} type={"submit"}>
                        <span>Submit now</span>
                    </Button>
                    {error && <p className={"error"}>{error}</p>}
                    <div className="info">{`Don't`} have an account? <Link to={"/signup"}>Signup</Link> instead.</div>
                </Form>
            </div>
        </>
    );
}