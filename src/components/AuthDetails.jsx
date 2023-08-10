import React from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {auth}  from "./Firebase";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";

const AuthDetails = () =>{
    const [authUser,setAuthUser] = useState(null);
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if(user) {
                setAuthUser(user);
            } else{
                setAuthUser(null);
            }
        });

        

        return () => {
            listen();
        }
    },[]);

    console.log(authUser);

    const userSignOut = () => {
        signOut(auth).then( () => {
                console.log("Successfully logged out")
                alert("Logged out successfully");
            }).catch( error => console.log(error))
    }



    return(
        <div>
        {   authUser? <Link to="/"><button className="login_btn" onClick={userSignOut}>Log Out</button></Link>:
            <Link to="/login"><button className="login_btn">Login</button></Link>    }
        </div>
    );
}

export default AuthDetails;