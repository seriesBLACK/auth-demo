import { useSelector } from 'react-redux';
import '../css files/profiel.css';

export default function Profile() {
  const { currentUser } = useSelector(state => state.user);



  return (
    <form className='profilePage signUp-form'>
      <h1 className='profielh1'>Profile</h1>
      <img className='currentUserUrl' src={currentUser.photo} alt="" />
      <input type="text" placeholder={currentUser.username} />
      <input type="text" placeholder={currentUser.email} />
      <input type="password" placeholder='password' />
      <button className='updateBtn'>UPDATE</button>
      <div className='delete-signOut'>
        <p>Delete account</p>
        <p>Sign out</p>
      </div>
    </form>
  )
}
