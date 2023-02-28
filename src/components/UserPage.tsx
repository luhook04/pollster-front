import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/context';
import PollCard from './PollCard';
import { Poll, Answer, CurrentUser, User } from '../App';

interface FuncProps {
  deletePoll(pollId: string): Promise<void>;
  updateVote(poll: Poll, answer: Answer): void;
  currentUser: CurrentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
  polls: Poll[];
  setPolls: React.Dispatch<React.SetStateAction<Poll[]>>;
}

const UserPage: React.FC<FuncProps> = ({
  deletePoll,
  polls,
  setPolls,
  updateVote,
  currentUser,
  setCurrentUser,
}) => {
  let { userId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState<User>({
    _id: '',
    username: '',
    profilePicUrl: '',
    friends: [],
    friendRequests: [],
    polls: [],
  });
  const [myPolls, setMyPolls] = useState<Poll[]>([]);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    setUser({
      _id: '',
      username: '',
      profilePicUrl: '',
      friends: [],
      friendRequests: [],
      polls: [],
    });
    const getUser = async (): Promise<void> => {
      try {
        const res = await fetch(
          `https://pollster-api-production.up.railway.app/api/users/${userId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error('Network response error');
        }
        const resJson = await res.json();
        if (resJson.user.friendRequests.includes(state.user?._id)) {
          setStatus('requested');
        } else if (resJson.user.friends.includes(state.user?._id)) {
          setStatus('friend');
        } else if (userId !== state.user?._id) {
          setStatus('stranger');
        }
        setUser(resJson.user);
        setMyPolls(resJson.polls);
        console.log(resJson);
      } catch (error) {
        console.error('Error:', error);
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
      if (!res.ok) {
        throw new Error('Network response error');
      }
      let updatedUser = user;
      updatedUser.friendRequests.push(state.user?._id);
      setUser(updatedUser);
      setStatus('requested');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteFriend = async (): Promise<void> => {
    try {
      const newFriendList = currentUser.friends.filter(
        (friend: User) => friend._id !== userId
      );
      const newPollList = polls.filter(
        (poll: Poll) => poll.author._id !== userId
      );
      const res = await fetch(
        `https://pollster-api-production.up.railway.app/api/users/${state.user?._id}/friends/${userId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error('Network response error');
      }
      currentUser.friends = newFriendList;
      setCurrentUser(currentUser);
      setPolls(newPollList);
      setStatus('stranger');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteAccount = async (): Promise<void> => {
    try {
      navigate('/');
      dispatch({ type: 'logout' });
      const res = await fetch(
        `https://pollster-api-production.up.railway.app/api/users/${state.user?._id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error('Network respone error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deletePollFunc = (pollId: string): void => {
    deletePoll(pollId);
    const newPolls = myPolls.filter((poll: Poll) => poll._id !== pollId);
    setMyPolls(newPolls);
  };

  return (
    <>
      {user.username !== '' && (
        <div className="text-center bg-white mx-auto w-11/12 md:w-1/2 py-3">
          {userId !== state.user?._id ? (
            <div>
              <h2 className="text-xl font-bold my-3">{user.username}</h2>
              {status === 'friend' ? (
                <button
                  className=" text-white mb-3 bg-red-700 hover:bg-red-900 rounded px-4 py-1 text-sm"
                  onClick={deleteFriend}
                >
                  Delete Friend
                </button>
              ) : (
                <button
                  className="text-white mb-3 bg-green-700 hover:bg-green-900 rounded px-4 py-1 text-sm disabled:bg-slate-300 disabled:text-slate-800 disabled:border-slate-200"
                  disabled={status === 'requested'}
                  onClick={sendFriendReq}
                >
                  Add Friend
                </button>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold my-3">{user.username}</h2>
              <button
                className=" text-white mb-3 bg-red-700 hover:bg-red-900 rounded px-4 py-1 text-sm"
                onClick={deleteAccount}
              >
                Delete Account
              </button>
            </div>
          )}
        </div>
      )}
      {status !== 'requested' && status !== 'stranger' ? (
        myPolls && user.username !== '' ? (
          <div>
            {myPolls.map((poll: Poll) => {
              return (
                <PollCard
                  key={poll._id}
                  poll={poll}
                  deletePollFunc={deletePollFunc}
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
