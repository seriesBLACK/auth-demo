import "../css files/signUp.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"



export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const hanedelChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      setError(false);
      navigate('/')
    } catch (error) {
      setLoading(false);
      setError(true);
    };
  };
  return (
    <div className="signup-container">
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit} className="signUp-form">

        <input onChange={hanedelChange} id="email" type="email" placeholder="email" />
        <input onChange={hanedelChange} id="password" type="password" placeholder="password" />
        <button disabled={loading} type="submit" className="signupBtn">{loading ? 'Loading...' : 'Sign In'}</button>

        <button>CONTINUE WITH GOOGLE</button>


        <p>Dont Have an account ?
          <Link to={'/sign-up'}>


            <span>sign up</span>
          </Link>
        </p>

      </form>
      <p style={{ color: 'red', textAlign: 'center' }}>{error && "Something went wrong"}</p>
    </div>
  )
}
