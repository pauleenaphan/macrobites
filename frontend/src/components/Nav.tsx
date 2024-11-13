import "../styles/Nav.css";
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';

import { FaUser } from "react-icons/fa";

export const Nav = () =>{
    const navigate = useNavigate();

    return(
        <section className="navPage">
            <header>
                <img src={logo} alt="logo"></img>
                <div className="headerRight">
                    <nav>
                        <button onClick={() =>{ navigate("/") }}> Home </button>
                        <button onClick={() =>{ navigate("/About") }}> About </button>
                        <button onClick={() =>{ navigate("/AllRecipes") }}> Recipes </button>
                    </nav>
                    <FaUser id="userIcon" onClick={() =>{ navigate("/Profile")}}></FaUser>
                </div>
            </header>
        </section>
    )
}