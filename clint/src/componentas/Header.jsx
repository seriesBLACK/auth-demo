import "../css files/header.css"
import { Link } from "react-router-dom"

export default function Header() {
  return (

    <div className="header">
      <Link className="header-link" to={'/'}>

        <h2 className=''>Auth app</h2>
      </Link>
      <ul>
        <Link className="header-link" to={'/'}>

          <li>Home</li>
        </Link>
        <Link className="header-link" to={'/about'}>

          <li>About</li>
        </Link>
        <Link className="header-link" to={'/sign-in'}>

          <li>Sign in</li>
        </Link>
      </ul>
    </div>)

}
