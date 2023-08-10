import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "./Firebase";

function Login(){

        const [details, setDetails] = useState(
            {
    
                Username: "",
                Password: "",
            }
        )

        const [val,setVal] = useState("0");

        function handlePost(){
            setVal("1");
        }

        const PostData = async(e)=>{
            e.preventDefault();

            const {Username,Password} = details;
            const res = await fetch("https://tiet-xchange-default-rtdb.firebaseio.com/resultLogin.json",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    Username,Password
                })
            });

        

            setDetails({ ...details,
            Username:"",
            Password:""});

            handlePost();
           
        }

        
        
            const signIn = (e) =>{
            e.preventDefault();

            signInWithEmailAndPassword(auth,details.Username,details.Password)
            .then((userCredential) => {
                console.log(userCredential)
                window.location="/";
            })
            .catch((error) => {
                console.log(error);
                alert("Please enter valid email or password");
                window.location = "/login";
            });
        };

        function handleSubmit(e){
            if(
                details.Password.length>6 &&
                details.Username.length>6 ){
                    PostData(e);
                    signIn(e);
                }
            else{
                alert("Please fill in the details correctly!");
            }
        }


        return (
        <div className="RegisterPage">
            <form className="formReg">
            <h3>Welcome</h3>
            <div>

                <label htmlFor="username">Email</label>
                <input className="inpData" type="text" placeholder="Email or Phone" id="username" required="true"
                onChange={(e)=>
                    setDetails({...details,Username:e.target.value})}
                value={details.Username}
                />

                <label htmlFor="password">Password</label>
                <input className="inpData" type="password" placeholder="Password" id="password" required="true"
                minLength="6"
                onChange={(e)=>
                    setDetails({...details,Password:e.target.value})}
                    value={details.Password}
                />

            </div>

            <button className="RegBtn" onClick={handleSubmit}>Login</button>
            <div class="register">
                <h4 className="Text">New to xChange? Then sign up <Link to="/register"><a style={{textDecoration: "underline"}}>here</a></Link></h4>
            </div>
            </form>
        </div>
       
    );
    }

    export default Login;