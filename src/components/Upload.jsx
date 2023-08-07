import React, { useEffect } from "react";
import "./Register.css";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";
import { storage } from "./Firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
import "firebase/storage";

function Upload(){

    const [Img,SetImg] = useState(null)
    const [imgList,setImgList] = useState([])
    const imgListRef = ref(storage,"images/");
    const [file, setFile] = useState();
    const [val,setVal] = useState(0);
   
    const [details, setDetails] = useState(
        {
            Username: "",
            Password: "",
            ProductName:"",
            Description:"",
            Insta:"",
            StorageLink:"",
        }
    )

   
    const signIn = (e) =>{
        e.preventDefault();
        
        signInWithEmailAndPassword(auth,details.Username,details.Password)
        .then((userCredential) => {
            console.log(userCredential);
            setVal(1);
        })
        .catch((error) => {
            console.log(error);
            setVal(0);
            alert("Please enter valid email or password");
            window.location = "/Tiet-x-Change/Upload";
        });
    };

    function handleChange(e){
        if(e.target.files[0]){
        const y = new Date().getTime();
        const x = `images/${y}`;
        const imgRef = ref(storage,x);
        uploadBytes(imgRef,e.target.files[0]).then(() => {
            console.log(x);
            setDetails({ ...details, StorageLink:x});
            console.log("Checking:" + x);
        })
    }
    }

    const PostData = async(e)=>{
        e.preventDefault();
        signIn(e);
        const {Name,Username,Password,ProductName,Description,Insta,StorageLink} = details;
        if(val == 1){
        const res = await fetch("https://tiet-xchange-default-rtdb.firebaseio.com/UploadResult.json",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                Name,ProductName,Username,Password,Description,Insta,StorageLink,
            })
        });

        window.location="/Tiet-x-Change"; }

    }


   

    return(
 
        <div className="RegisterPage">
            <form className="formReg">
                <div class="alert alert-danger alert-dismissible show">
                    <strong>Alert!</strong> Please ensure you have already signed up.
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="alert">
                    </button>
                </div>

            <h3>Welcome</h3>
            <div>
                <label htmlFor="username">Username</label>
                <input className="inpData" type="text" placeholder="Registered email id" id="username" 
                    onChange={(e)=>
                    setDetails({...details,Username:e.target.value})}
                value={details.Username}
                />

                <label htmlFor="password">Password</label>
                <input className="inpData" type="password" placeholder="Password" id="password" 
                    onChange={(e)=>
                    setDetails({...details,Password:e.target.value})}
                value={details.Password}
                />
            

                <label htmlFor="Insta">Insta ID</label>
                <input className="inpData" type="text" placeholder="Instagram ID" id="insta_user"
                onChange={(e)=>
                    setDetails({...details,Insta:e.target.value})}
                value={details.Insta} 
                />

                <label htmlFor="password">Product Name</label>
                <input className="inpData" type="text" placeholder="What are you selling?" maxLength="50" id="productName"
                 onChange={(e)=>
                    setDetails({...details,ProductName:e.target.value})}
                value={details.ProductName} />

                

                <label htmlFor="images">Upload</label>
                <input className="inpData" type="file" accept="image/*" multiple="multiple" 
                placeholder="Upload Product images" id="prodImg" 
                onChange={handleChange}
                />
                
                <label htmlFor="Product Description">Product Description</label>
                <input className="inpData" type="text"
                placeholder="Something to let the buyers know" onChange={(e)=>
                    setDetails({...details,Description:e.target.value})}
                value={details.Description}
                />
            </div>
            <button className="RegBtn" onClick={PostData}>Upload</button>
            <div class="register">
                <h4 className="Text">New to xChange? Then sign up <Link to="/register"><a style={{textDecoration: "underline"}}>here</a></Link></h4>
            </div>
            
            </form>
            
        </div>

    );
}

export default Upload;