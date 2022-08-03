import React, {  useState } from 'react'
import "./Login.css"
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {  toast } from 'react-toastify';




function Login(props) {

    const {userData,setUserData} = props;

    const [input, setInput] = useState({
        email:"",
        password:"",     
    });    
    

    function handleChange(event){
   
        const {name, value} = event.target;
    setInput(prevInput =>{
        return{
            ...prevInput,
            [name]:value
        };
    });
    }
    
    function handleClick(event){
        event.preventDefault();
        const newUser={
            email:input.email,
            password:input.password
        }
        axios.post("http://localhost:5000/login", newUser)
        .then((response) => {
            const {data} = response;
                toast.success('You are logged in Successfully')
                   localStorage.setItem('user',JSON.stringify({
                       isLogged:true,
                       ...data,
                   }))
                setUserData({
                    isLogged:true,
                    ...data
                })

               
        }).catch((err)=> {
            console.log(JSON.stringify(err));
            toast.error ("Incorrect Credentials,Please Try again");
        })
    

    }
    return (
        
        <div>
           {
               userData.isLogged ? <h5>Already isLogged</h5> : <form className="login" >
               <h1 >Enter your Login Details</h1>
              
               <input 
               onChange={handleChange} 
               name="email" 
               type="text" 
               placeholder="Enter Email Address"
               value={input.email} 
               className='input' 
               required autoFocus/>

               <input 
               onChange={handleChange} 
               name="password"
               type="password" 
               placeholder="Enter Password" 
               value={input.password} 
               className='input' 
               required/>
              
               <Button 
               variant='secondary' 
               onClick={handleClick} 
               size='lg' 
               className='btn' 
               type="submit">Login</Button>

               <p>Don't have an account?<a href='/signup'>Signup</a></p>
           </form>
           }
        </div>
    )
}

export default Login
