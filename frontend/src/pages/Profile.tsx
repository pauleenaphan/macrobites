import { useState } from "react";
import { LoginForm } from "../components/Login";
import { SignUpForm } from "../components/Signup";

export const Profile = () =>{
    const isLogged = localStorage.getItem("macroBitesIsLogged");
    // true will show login page 
    const [userStatus, setUserStatus] = useState<boolean>(true)

    return(
        <section className="profilePage">
            <h1> Profile Page </h1>
            {isLogged ? (
                <p> You are logged in </p>
            ) : userStatus == true ? (
                    <>
                        <LoginForm></LoginForm>
                        <p> New User? </p>
                        <button onClick={() =>{ setUserStatus(false) }}> Create Account </button> 
                    </>
                ) : (
                    <p>
                        <SignUpForm></SignUpForm>
                        <p> Existing User? </p>
                        <button onClick={() =>{ setUserStatus(true) }}> Login </button> 
                    </p>
            )}
        </section>
    )
}