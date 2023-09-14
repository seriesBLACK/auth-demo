import { useSelector } from 'react-redux';
import '../css files/profiel.css';
import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebas';

export default function Profile() {
  const { currentUser } = useSelector(state => state.user); //default profile pic
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageError, setImageError] = useState(false);


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


  return (
    <form className='profilePage signUp-form'>
      <h1 className='profielh1'>Profile</h1>
      <input onChange={(e) => setImage(e.target.files[0])} accept='image/*' hidden type="file" ref={fileRef} />
      <img onClick={() => fileRef.current.click()} className='currentUserUrl' src={formData.profilePicture || currentUser.photo} alt="" />
      <p>
        {imageError ? (<span className='error'>Error uploading image</span>) : uploadProgress > 0 && uploadProgress < 100 ?
          (<progress value={uploadProgress} max='100' ></progress>)
          : uploadProgress === 100 ? (<span className='green'>Image updated</span>) : ''

        }
      </p>
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
