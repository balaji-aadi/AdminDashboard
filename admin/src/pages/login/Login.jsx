import React, { useState } from 'react'
import './login.css'
import { Link,useNavigate } from 'react-router-dom'
// import {useDispatch} from 'react-redux'
// import { login } from '../../redux/apiCalls'
import axios from 'axios'

const Login = () => {
    const [username,setUsername] = useState("")
    const [password, setPassword] = useState("")
    // const dispatch = useDispatch()

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     login(dispatch,{username,password})

    // }

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
           await axios.post('http://localhost:5000/api/auth/login',{username,password},{withCredentials:true})
           navigate('/')
        }
        catch(err){
            console.log(err)
        }

    }

  return (
    <div className='login_container'>
    <div className="login_wrapper">
        <h1 className="login_title">SIGN IN</h1>
        <form className='login_form' onSubmit={handleSubmit} >
            <input className='login_input' type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input className='login_input' type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button className='login_button'>LOGIN</button>
            <div className='login_links'>
                <span>New to AdminDashboard? <Link to={'/register'}>Create an account.</Link></span>
            </div>
        </form>
    </div>
</div>
  )
}

export default Login
