import "../css files/header.css";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';


export default function Header() {
  const { currentUser } = useSelector(state => state.user)
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
        <Link className="header-link" to={'/profile'}>
          {currentUser ? (
            <img src={currentUser.photo} alt="" className="profilePic" />
          ) :

            (<li>Sign in</li>)
          }
        </Link>
      </ul>
    </div>)

}
