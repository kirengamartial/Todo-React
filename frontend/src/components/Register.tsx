import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCredentials } from '../slices/authSlices/authSlice';
import { useRegisterMutation } from '../slices/authSlices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinners';
import '../user.css';

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {userInfo} = useSelector((state: any) => state.auth)
  const [register] = useRegisterMutation()

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
      const data = {
        name,
        email, password
      }
      const res = await register(data).unwrap()
      dispatch(getCredentials({...res}))
      toast.success("register Successfully")
      navigate('/')
    } catch (err: any) {
      console.log(err)
      toast.error(err?.data?.message || err.error)
    } finally{
      setIsLoading(false)
    }

  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
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
          Register
        </button>
        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;