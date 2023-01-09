import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/context';
import PollCard from './PollCard';
const UserPage = () => {
  let { userId } = useParams();

  const { state } = useContext(AuthContext);
  const [user, setUser] = useState<{ [key: string]: any }>({});
  const [isRequested, setIsRequested] = useState<boolean>();
  const [isFriend, setIsFriend] = useState<boolean>();

  const isFriendFunc = () => {
    if (
      Object.keys(user).length > 0 &&
      user.friendRequests.includes(state.user?._id)
    ) {
      setIsRequested(true);
    } else setIsRequested(false);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const req = await fetch(
          `https://pollster-api-production.up.railway.app/api/home`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        const reqJson = await req.json();
        if (reqJson.user.friendRequests.includes(state.user?._id)) {
          setIsRequested(true);
        }
        if (reqJson.user.friends.includes(state.user?._id)) {
          setIsFriend(true);
        }
        setUser(reqJson.user);
      } catch (err) {
        return err;
      }
    };
    getUser();
  }, [state, userId]);

  console.log(user);

  const sendFriendReq = async () => {
    try {
      const res = await fetch(
        `https://pollster-api-production.up.railway.app/api/users/${userId}/requests`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (res.ok) {
        let updatedUser = user;
        updatedUser.friendRequests.push(state.user?._id);
        setUser(updatedUser);
        isFriendFunc();
      }
    } catch (err) {
      return err;
    }
  };

  const deleteFriend = async () => {};

  const deleteAccount = async () => {};

  return (
    <>
      {userId !== state.user?._id ? (
        <div className="user-panel">
          <p>{user.username}</p>
          {isFriend ? (
            <button>Delete Friend</button>
          ) : (
            <button disabled={isRequested} onClick={sendFriendReq}>
              Add Friend
            </button>
          )}
        </div>
      ) : (
        <div>
          <p>{user.username}</p>
          <button>Delete Account</button>
        </div>
      )}
      <div className="user-polls">
        {user.polls
          ? user.polls.map((poll: any, index: number) => {
              return <PollCard key={index} poll={poll} user={user}></PollCard>;
            })
          : null}
      </div>
    </>
  );
};

export default UserPage;
