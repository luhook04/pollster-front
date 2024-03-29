import React, { useContext } from 'react';
import { AuthContext } from '../../context/context';
import { User, Poll, CurrentUser } from '../../App';

interface FuncProps {
  polls: Poll[];
  friendReq: User;
  setPolls: React.Dispatch<React.SetStateAction<Poll[]>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
  currentUser: CurrentUser;
}

const FriendReqCard: React.FC<FuncProps> = ({
  friendReq,
  setPolls,
  polls,
  currentUser,
  setCurrentUser,
}) => {
  const { state } = useContext(AuthContext);

  const getNewPolls = async (): Promise<void> => {
    try {
      const res = await fetch(
        `https://pollster-api-production.up.railway.app/api/users/${friendReq._id}`,
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
      const newPollJson = await res.json();
      const newPolls = [...polls, ...newPollJson.polls];
      const sortedPolls = newPolls.sort((a, b) => b.timestamp - a.timestamp);
      setPolls(sortedPolls);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateFriendList = async (): Promise<void> => {
    try {
      const newReqList = currentUser.friendRequests.filter(
        (req: User) => req._id !== friendReq._id
      );
      const res = await fetch(
        `https://pollster-api-production.up.railway.app/api/users/${state.user?._id}/requests/${friendReq._id}`,
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
      const friendList = [...currentUser.friends];
      friendList.push(friendReq);
      setCurrentUser({
        ...currentUser,
        friends: friendList,
        friendRequests: newReqList,
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const acceptRequest = (): void => {
    updateFriendList();
    getNewPolls();
  };

  const declineRequest = async (): Promise<void> => {
    try {
      const newReqList = currentUser.friendRequests.filter(
        (req: User) => req._id !== friendReq._id
      );
      const res = await fetch(
        `https://pollster-api-production.up.railway.app/api/users/${state.user?._id}/requests/${friendReq._id}`,
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

      setCurrentUser({
        ...currentUser,
        friendRequests: newReqList,
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex my-2 items-center w-11/12 mx-auto md:w-full md:block">
      <p>{friendReq.username}</p>
      <div className="flex flex-row justify-center gap-8 md:gap-2 lg:gap-4 my-2 ml-auto md:mx-auto">
        <button
          className="bg-green-700 hover:bg-green-900 rounded px-4 md:px-2 lg:px-4 py-1"
          onClick={acceptRequest}
        >
          Accept
        </button>
        <button
          className="bg-red-700 hover:bg-red-900 rounded px-4 md:px-2 lg:px-4 py-1"
          onClick={declineRequest}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default FriendReqCard;
