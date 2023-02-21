import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/context';
import PollCard from './Poll/PollCard';

const UserPage = ({
  deletePoll,
  polls,
  setPolls,
  updateVote,
  currentUser,
  setCurrentUser,
}: any) => {
  let { userId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState<{ [key: string]: any }>({});
  const [status, setStatus] = useState<string>('');

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
          setStatus('requested');
        }
        if (reqJson.user.friends.includes(state.user?._id)) {
          setStatus('friend');
        }
        setUser(reqJson.user);
      } catch (err) {
        return err;
      }
    };
    getUser();
  }, [state, userId]);

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
        setStatus('requested');
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
      const newPollList = polls.filter(
        (poll: any) => poll.author._id !== userId
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
      setCurrentUser(currentUser);
      setPolls(newPollList);
      setStatus('stranger');
    } catch (err) {
      return err;
    }
  };

  const deleteAccount = async () => {
    try {
      navigate('/');
      dispatch({ type: 'logout' });
      await fetch(
        `https://pollster-api-production.up.railway.app/api/users/${state.user?._id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
    } catch (err) {
      return err;
    }
  };

  return (
    <>
      {userId !== state.user?._id ? (
        <div className="user-panel">
          <p>{user.username}</p>
          {status === 'friend' ? (
            <button onClick={deleteFriend}>Delete Friend</button>
          ) : (
            <button disabled={status === 'requested'} onClick={sendFriendReq}>
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
      {status !== 'requested' && status !== 'stranger' ? (
        user.polls ? (
          <div className="polls-container">
            {user.polls.map((poll: any, index: number) => {
              return (
                <PollCard
                  key={index}
                  poll={poll}
                  deletePoll={deletePoll}
                  updateVote={updateVote}
                ></PollCard>
              );
            })}
          </div>
        ) : null
      ) : null}
    </>
  );
};

export default UserPage;
