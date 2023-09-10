import { auth } from "../firebas";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";


export default function OAuth() {
  const dispatch = useDispatch();
  const signWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: result.user.displayName + Math.round(Math.random() * 100).toString(),//adding random numbers for google users
          email: result.user.email,
          photo: result.user.photoURL
        })
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));



    } catch (error) {
      console.log(error)
    }
  }

  return (

    <button onClick={signWithGoogle} type='button' className="signupBtn google">Continue with Google</button>

  )
}
