import "../css files/signUp.css"
import { Link } from "react-router-dom"



export default function SignUp() {
  return (
    <div className="signup-container">
      <h1>Sign up</h1>
      <form className="signUp-form" action="">

        <input id="username" type="text" placeholder="user name" />
        <input id="email" type="email" placeholder="email" />
        <input id="password" type="password" placeholder="password" />
        <button className="signupBtn">SIGN UP</button>

        <button>CONTINUE WITH GOOGLE</button>


        <p>Have an account ?
          <Link to={'/sign-in'}>


            <span>sign in</span>
          </Link>
        </p>

      </form>
    </div>
  )
}
