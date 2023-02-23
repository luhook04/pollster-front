import React, { useContext } from 'react';
import { AuthContext } from '../../context/context';
import { User, Poll, CurrentUser } from '../../App';

interface FuncProps {
  friendReq: User;
  currentUser: CurrentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
  setPolls: React.Dispatch<React.SetStateAction<Poll[]>>;
}

const FriendReqCard: React.FC<FuncProps> = ({
  friendReq,
  currentUser,
  setCurrentUser,
  setPolls,
}) => {
  const { state } = useContext(AuthContext);

  const getNewPolls = async (): Promise<void> => {
    try {
      const res = await fetch(
        'https://pollster-api-production.up.railway.app/api/polls',
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
      const newPolls = await res.json();
      setPolls(newPolls.polls);
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
      currentUser.friendRequests = newReqList;
      currentUser.friends = [...currentUser.friends, friendReq];
      setCurrentUser(currentUser);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const acceptRequest = (): void => {
    getNewPolls();
    updateFriendList();
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
      currentUser.friendRequests = newReqList;
      setCurrentUser(currentUser);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="friend-request">
      <p>{friendReq.username}</p>
      <button onClick={acceptRequest}>Accept</button>
      <button onClick={declineRequest}>Decline</button>
    </div>
  );
};

export default FriendReqCard;
