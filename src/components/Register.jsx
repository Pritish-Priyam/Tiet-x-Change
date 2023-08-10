import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "./Firebase";
import "./NavBar";


function Register(){

        const [details, setDetails] = useState(
            {
                Name: "",
                Roll: "",
                Username: "",
                Password: "",
            }
        )

        const [val,setVal] = useState(0);

        function handlePost(){
            alert("Registered Successfully!");
            setVal(val+1);
        }
    

        function handleSubmit(e){
            if(details.Name.length>2 &&
                details.Password.length>6 &&
                details.Username.length>6 &&
                details.Roll.length==9){
                    PostData(e);
                }
            else{
                alert("Please fill in the details correctly!");
            }
        }

        const PostData = async(e)=>{
            e.preventDefault();

            const {Name,Roll,Username,Password} = details;
            const res = await fetch("https://tiet-xchange-default-rtdb.firebaseio.com/resultRegister.json",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    Name,Roll,Username,Password
                })
            });

            createUserWithEmailAndPassword(auth,Username,Password,Name,Roll).then(
                (userCredential) => {
                    alert("Registered successfully");
                }
            ).catch((error) =>{
                console.log(error);
            })

            setDetails({ ...details,Name:"",
            Roll:"",
            Username:"",
            Password:""});

            handlePost();

        
            window.location = "/";
            
           
        }

        return (
        <div className="RegisterPage">
            <form className="formReg">
            <h3>Welcome</h3>
            <div>

                <label htmlFor="name">Name</label>
                <input className="inpData" type="text" placeholder="Full name" id="name" required="true" 
                minLength="2"
                onChange={(e)=>
                    setDetails({...details,Name:e.target.value})}
                value={details.Name}
                />

                <label htmlFor="roll">Roll no.</label>
                <input className="inpData" type="numeric" pattern="\d{10}" maxLength="9" required="true"
                placeholder="TIET Roll Number" id="roll" 
                onChange={(e)=>
                    setDetails({...details,Roll:e.target.value})}
                value={details.Roll}
                />

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
            <button className="RegBtn" onClick={handleSubmit}>Register</button>
            <div class="register">
                <h4 className="Text">Already a member. Then login <Link to="/login"><a style={{textDecoration: "underline"}}>here</a></Link></h4>
            </div>
            </form>
        </div>
    );
    }

    export default Register;