import React, { useState, useEffect,Component } from 'react'; 
import { useSignInMutation } from 'state/api';
import './style.css'
import background from "../../assets/garden.jpg"
const Login = () => {
   const [email, setEmail] = useState('')//useState('markooo11')
   const [password, setPassword] = useState('');//useState('pass')
   const { data , isSuccess } = useSignInMutation(email,password);
  
   const handleSubmit = (e)=> {
      e.preventDefault();
      console.log(email, password);
      fetch('http://192.168.3.186:8000/sign-in',{
        method:"POST",
        crossDomain:true,
        headers:{
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.success) {
          alert("login successful");
          // window.localStorage.setItem("token", data.data);
          window.location.href = "./dashboard";
        }
        else{
          alert(data.message)
        }
      });
    }
      return (
        <div className="App" 
        style={{backgroundImage:`url(${background})`,backgroundSize:'cover'}}>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={handleSubmit}>
              <h3 style={{fontSize:22}}>Sign In</h3>
      
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              style={{marginLeft:15}}
            />
          </div>
  
          <div className="mb-3" style={{marginTop:20}}>
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              style={{marginLeft:15}}
            />
          </div>
  
          <div className="mb-3" style={{marginTop:10}}>
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>
  
          <div  className='d-grid' style={{marginLeft:130,marginTop:15}}>
            <button type="submit" className="btn btn-primary" style={{justifyContent:"center",alignItems:'center',backgroundColor:'#B1D182',fontSize:16}}>
              Submit
            </button>
          </div>
        </form>
        </div>
        </div>
        </div>
      );
    }
 
export default Login