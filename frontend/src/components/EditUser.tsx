import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCredentials } from '../slices/authSlices/authSlice';
import { useEditUserMutation } from '../slices/authSlices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinners';
import '../user.css'

const EditUser: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const {userInfo} = useSelector((state: any) => state.auth)
  const [editUser] = useEditUserMutation()

  useEffect(() => {
   if(userInfo) {
    setName(userInfo.name)
    setEmail(userInfo.email)
   }
  }, [userInfo])
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const res = await editUser({name, email, password}).unwrap()
      dispatch(getCredentials({...res}))
      toast.success('edited user successfully')
      navigate('/')
    } catch (err: any) {
      console.log(err)
      toast.error(err?.data?.message || err.error)
    } finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>
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
          <label htmlFor="email">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {isLoading && <Spinner/>}
        <button type="submit" className="btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditUser;