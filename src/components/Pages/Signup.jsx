import Illustration from "../Illustration.jsx";
import signupImage from '../../assets/images/signup.svg'
import SignupForm from "../SignupForm.jsx";
export default function Signup(){
    return (
        <>
            <h1>Create an account</h1>
            <div className="column">
                <Illustration src={signupImage} alt={"Signup"}/>
                <SignupForm/>
            </div>
        </>
    );
}