import React, { useEffect } from "react";
import "./Register.css";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";
import { storage } from "./Firebase";
import { ref, uploadBytes} from "firebase/storage";
import { Link } from "react-router-dom";
import "firebase/storage";
import imageCompression from "browser-image-compression";

function Upload(){

    const imgListRef = ref(storage,"images/");
    const [val,setVal] = useState(0);
   
    const [details, setDetails] = useState(
        {
            Username: "",
            Password: "",
            ProductName:"",
            Description:"",
            Insta:"",
            Price:"",
        }
    )

   
    const signIn = (e) =>{
        e.preventDefault();
        
        signInWithEmailAndPassword(auth,details.Username,details.Password)
        .then((userCredential) => {
            //console.log(userCredential);
            setVal(1);
        })
        .catch((error) => {
            console.log(error);
            setVal(0);
            alert("Please enter valid email or password");
            window.location = "/Upload";
        });
    };

    function resizeImage(img, maxWidth) {
        const aspectRatio = img.width / img.height;
        let width = img.width;
        let height = img.height;
    
        // Resize the image if needed
        if (width > maxWidth) {
          width = maxWidth;
          height = width / aspectRatio;
        }
    
        // Create a canvas element to draw the resized image
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
    
        // Convert the canvas image to a Blob in JPEG format with desired quality
        return new Promise((resolve) => {
          canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.95); // 0.95 is the quality of the JPEG image (0 to 1).
        });
      }

    function handleChange(e){
        if (e.target.files[0]) {
            const y = new Date().getTime();
            const x = `images/${y}`;
            const imgRef = ref(storage, x);
        
            const options = {
              maxSizeMB: 0.8, // Set the maximum size in MB for the original image
              maxWidthOrHeight: 400, // Set the maximum width or height for the original image
              useWebWorker: true, // Enable web worker for faster processing
            };
        
            imageCompression(e.target.files[0], options)
            .then((compressedFile) => {
              // Convert the compressed image to WebP format using canvas
              const reader = new FileReader();
              reader.onload = async (event) => {
                const img = new Image();
                img.onload = async () => {
                  // Resize the image before converting to WebP
                  const resizedBlob = await resizeImage(img, 500);
    
                  // Upload the resized image to Firebase Storage
                  const resizedImgRef = ref(storage, `imagesResized/${y}`);
                  await uploadBytes(resizedImgRef, resizedBlob);
                  console.log("Resized image uploaded:", resizedImgRef.fullPath);
    
                  const canvas = document.createElement("canvas");
                  canvas.width = img.width;
                  canvas.height = img.height;
                  const ctx = canvas.getContext("2d");
                  ctx.drawImage(img, 0, 0, img.width, img.height);
    
                  // Convert the image to WebP format
                  canvas.toBlob(async (webpBlob) => {
                    // Upload the WebP blob to Firebase Storage
                    await uploadBytes(imgRef, webpBlob);
                    console.log("WebP file uploaded:", x);
                  }, "image/webp", 0.85); // 0.85 is the quality of the WebP image (0 to 1).
                };
                img.src = event.target.result;
              };
              reader.readAsDataURL(compressedFile);
            })
            .catch((error) => {
              console.error("Error compressing image:", error);
            });
        }
    }

    const PostData = async(e)=>{
        e.preventDefault();
        signIn(e);
        const {Name,Username,Password,ProductName,Description,Insta,Price} = details;
        if(val == 1){
        const res = await fetch("https://tiet-xchange-default-rtdb.firebaseio.com/UploadResult.json",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                Name,ProductName,Username,Password,Description,Insta,Price,
            })
        });

        window.location="/"; }

    }

    return(
 
        <div className="RegisterPage">
                <div class="alert alert-primary alert-dismissible show" style={{zIndex:"100"}}>
                    <strong>Alert!</strong> Please ensure you have already signed up.
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="alert">
                    </button>
                </div>
            <form className="formReg">
            <h3>Welcome</h3>
            <div>
                <label htmlFor="username">Username</label>
                <input className="inpData" type="text" placeholder="Registered email id" id="username" 
                    onChange={(e)=>
                    setDetails({...details,Username:e.target.value})}
                value={details.Username}
                required
                />

                <label htmlFor="password">Password</label>
                <input className="inpData" type="password" placeholder="Password" id="password" 
                    onChange={(e)=>
                    setDetails({...details,Password:e.target.value})}
                value={details.Password}
                required
                />
            

                <label htmlFor="Insta">Insta ID</label>
                <input className="inpData" type="text" placeholder="Instagram ID" id="insta_user"
                onChange={(e)=>
                    setDetails({...details,Insta:e.target.value})}
                value={details.Insta} 
                required
                />

                <label htmlFor="Price">Price</label>
                <input className="inpData" type="number" placeholder="The selling price in (Rs)" id="insta_user"
                onChange={(e)=>
                    setDetails({...details,Price:e.target.value})}
                value={details.Price} 
                required
                />

                <label htmlFor="password">Product Name</label>
                <input className="inpData" type="text" placeholder="What are you selling?" maxLength="50" id="productName"
                 onChange={(e)=>
                    setDetails({...details,ProductName:e.target.value})}
                value={details.ProductName} 
                required
                />

                

                <label htmlFor="images">Upload</label>
                <input className="inpData" type="file" accept="image/*" multiple="multiple" 
                placeholder="Upload Product images" id="prodImg" 
                onChange={handleChange}
                required
                />
                
                <label htmlFor="Product Description">Product Description</label>
                <input className="inpData" type="text"
                placeholder="Something to let the buyers know" onChange={(e)=>
                    setDetails({...details,Description:e.target.value})}
                value={details.Description}
                required
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