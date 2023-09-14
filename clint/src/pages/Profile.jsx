import { useSelector } from 'react-redux';
import '../css files/profiel.css';
import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebas';
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserStart, deleteUserFailure, deleteUserSuccess } from '../redux/user/userSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector(state => state.user); //default profile pic
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageError, setImageError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);


  useEffect(() => {
    if (image) {
      uploadeImageTofirebase(image);
    }
  }, [image])

  const uploadeImageTofirebase = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }

    );
  };

  function handelChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  };

  async function updateUser(e) {
    e.preventDefault();
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    };
  };

  async function deleteAccount() {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return
      };
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    };
  };

  return (

    <form onSubmit={updateUser} className='profilePage signUp-form'>
      <h1 className='profielh1'>Profile</h1>
      <input onChange={(e) => setImage(e.target.files[0])} accept='image/*' hidden type="file" ref={fileRef} />
      <img onClick={() => fileRef.current.click()} className='currentUserUrl' src={formData.profilePicture || currentUser.photo} alt="" />
      <p>
        {imageError ? (<span className='error'>Error uploading image</span>) : uploadProgress > 0 && uploadProgress < 100 ?
          (<progress value={uploadProgress} max='100' ></progress>)
          : uploadProgress === 100 ? (<span className='green'>Image updated</span>) : ''

        }
      </p>
      <input id='username' onChange={handelChange} type="text" placeholder={currentUser.username} />
      <input id='email' onChange={handelChange} type="text" placeholder={currentUser.email} />
      <input id='password' onChange={handelChange} type="password" placeholder='password' />
      <button type='submit' className='updateBtn'>{loading ? 'loading...' : 'UPDATE'}</button>
      <div className='delete-signOut'>
        <p onClick={deleteAccount}>Delete account</p>
        <p>Sign out</p>
      </div>
      <p className='error'>{error && "something went wrong"}</p>
      <p className='green'>{updateSuccess && "User updated successfully"}</p>
    </form>

  )
}
