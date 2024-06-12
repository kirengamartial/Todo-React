import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLogOutMutation } from '../slices/authSlices/userApiSlice';
import { logOut } from '../slices/authSlices/authSlice';
import { toast } from 'react-toastify';
import '../index.css';

const Header: React.FC = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: any) => state.auth);
  const [logoutUser] = useLogOutMutation();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // @ts-ignore
      await logoutUser().unwrap();
      dispatch(logOut());
      navigate('/login');
    } catch (err: any) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <header className="header">
      <Link to='/'>
        <h1 id="todo-list-heading" className='logo'>To-Do List</h1>
      </Link>

      <div className="user-section">
        {userInfo ? (
          <div className="user-dropdown" ref={dropdownRef}>
            <span className="user-name" onMouseEnter={toggleDropdown}>
              {userInfo.name}
            </span>
            {isDropdownOpen && (
              <div className="dropdown-menu" onMouseLeave={() => setIsDropdownOpen(false)}>
                <Link to='/edit'>
                  <span className='logoss'>Profile</span>
                </Link>
                <span onClick={handleLogout}>Logout</span>
              </div>
            )}
          </div>
        ) : (
          <Link to='/login'>
            <span className="login-link logos" style={{ fontSize: '20px' }}>Login</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
