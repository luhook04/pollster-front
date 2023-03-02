import React, { useState, useRef, useContext } from 'react';
import { AuthContext } from '../context/context';
import { CurrentUser } from '../App';
import { useParams } from 'react-router-dom';

interface FuncProps {
  currentUser: CurrentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
}

const ProfilePicture: React.FC<FuncProps> = ({
  currentUser,
  setCurrentUser,
}) => {
  let { userId } = useParams();
  const { state } = useContext(AuthContext);
  const [file, setFile] = useState<File | null>(null);
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [changePic, setChangePic] = useState<boolean>(false);

  const onButtonClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    inputFile.current?.click();
    setChangePic(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
    console.log(file);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('profilePic', file);
    }
    console.log('fack');
    try {
      const res = await fetch(
        `https://pollster-api-production.up.railway.app/api/users/${userId}/image`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
          body: formData,
        }
      );
      if (!res.ok) {
        throw new Error('Network response error');
      }
      const resJson = await res.json();
      setChangePic(false);
      console.log(resJson);
      const newUrl = resJson.user.profilePicUrl;
      setCurrentUser({ ...currentUser, profilePicUrl: newUrl });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <img
        onClick={onButtonClick}
        className="h-32 w-32 mx-auto rounded-full border-black border-2 "
        crossOrigin="anonymous"
        alt="Profile"
        src={`https://pollster-api-production.up.railway.app/img/${currentUser.profilePicUrl}`}
      ></img>
      <label htmlFor="profile-pic"></label>
      <input
        className="hidden"
        onChange={handleFileSelect}
        type="file"
        ref={inputFile}
        id="profile-pic"
        name="profilePic"
      ></input>
      {changePic && (
        <div className="flex flex-col gap-4 w-5/6 mx-auto mt-5 align-middle">
          <p>
            New Picture: <span className="underline">{file?.name}</span>
          </p>
          <button
            className="mx-auto bg-blue-700 hover:bg-blue-900 text-white w-1/4 rounded"
            type="submit"
          >
            Submit
          </button>
        </div>
      )}
    </form>
  );
};

export default ProfilePicture;
