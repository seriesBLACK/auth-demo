import "../css files/signUp.css"
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from "../componentas/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));

    }
  };
  return (
    <div className="signup-container">
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit} className="signUp-form">

        <input onChange={handleChange} id="email" type="email" placeholder="email" />
        <input onChange={handleChange} id="password" type="password" placeholder="password" />
        <button disabled={loading} type="submit" className="signupBtn">{loading ? 'Loading...' : 'Sign In'}</button>

        <OAuth />


        <p>Dont Have an account ?
          <Link to={'/sign-up'}>


            <span>sign up</span>
          </Link>
        </p>

      </form>
      <p className="error-message">{error ? error.message || 'Something went worng' : ''}</p>
    </div>
  )
}
