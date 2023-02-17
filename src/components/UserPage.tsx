import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/context';
import PollCard from './PollCard';

const UserPage = ({
  deletePoll,
  polls,
  updateVote,
  updateUser,
  currentUser,
}: any) => {
  let { userId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AuthContext);
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
          `https://pollster-api-production.up.railway.app/api/users/${userId}`,
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

  const myPolls = polls.filter(
    (poll: any) => poll.author.username === user.username
  );

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

  const deleteFriend = async () => {
    try {
      const newFriendList = currentUser.friends.filter(
        (friend: any) => friend._id !== userId
      );
      currentUser.friends = newFriendList;
      await fetch(
        `https://pollster-api-production.up.railway.app/api/users/${state.user?._id}/friends/${userId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      updateUser(currentUser);
      setIsFriend(false);
    } catch (err) {
      return err;
    }
  };

  const deleteAccount = async () => {
    try {
      navigate('/');
      await fetch(
        `https://pollster-api-production.up.railway.app/api/users/${state.user?._id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      dispatch({ type: 'logout' });
    } catch (err) {
      return err;
    }
  };

  return (
    <>
      {userId !== state.user?._id ? (
        <div className="user-panel">
          <p>{user.username}</p>
          {isFriend ? (
            <button onClick={deleteFriend}>Delete Friend</button>
          ) : (
            <button disabled={isRequested} onClick={sendFriendReq}>
              Add Friend
            </button>
          )}
        </div>
      ) : (
        <div>
          <p>{user.username}</p>
          <button onClick={deleteAccount}>Delete Account</button>
        </div>
      )}
      {myPolls ? (
        <div className="polls-container">
          {myPolls.map((poll: any, index: number) => {
            return (
              <PollCard
                key={index}
                deletePoll={deletePoll}
                poll={poll}
                updateVote={updateVote}
              ></PollCard>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default UserPage;
