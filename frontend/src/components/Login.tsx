import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCredentials } from '../slices/authSlices/authSlice';
import { useLoginMutation } from '../slices/authSlices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinners';
import '../user.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

 const {userInfo} = useSelector((state: any) => state.auth)
 const [login] = useLoginMutation()

 useEffect(() => {
 const handleData = () => {
    if(userInfo) {
      navigate('/')
    }
 }
 handleData()
 }, [userInfo])

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
   try {
    const res = await login({email, password}).unwrap()
    dispatch(getCredentials({...res}))
    toast.success('login successfully')
    navigate('/')
   } catch (err:any) {
    console.log(err)
    toast.error(err?.data?.message || err.error)
   }finally{ 
     setIsLoading(false)
   }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {isLoading && <Spinner/>}
        <button type="submit" className="btn-primary">
          Login
        </button>
        <div className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;