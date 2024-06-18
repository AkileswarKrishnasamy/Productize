import { FcGoogle } from "react-icons/fc";
import { PiChecksBold } from "react-icons/pi";

export default function LandingPage(props){
    return(<div className="landingpage-items">
                <h1 className="landing-page-title">PRODUCTIZE</h1>
        <input 
              className="email-input"
              placeholder = 'email'
              type = 'email'
              onChange={(e)=>props.setEmail(e.target.value)}
              required/>
        <input 
                className="password-input"
              placeholder = 'password'
              type = 'password'
              onChange={(e)=>props.setPassword(e.target.value)}
              required/>
    
        <button className="sign-up-button"
                onClick = {props.handleSignUpClick}>Sign Up</button>
        <button className="log-in-button"
                onClick = {props.handleLogInClick}>Log in</button>
    
        <div className="google-sign-in-button"
            onClick={props.handleGoogleSignInClick}
            > continue with Google</div>
        </div>)
}