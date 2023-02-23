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

  const getNewPolls = async () => {
    const req = await fetch(
      'https://pollster-api-production.up.railway.app/api/polls',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      }
    );
    const newPolls = await req.json();
    setPolls(newPolls.polls);
  };

  const updateFriendList = async () => {
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
      if (res.ok) {
        currentUser.friendRequests = newReqList;
        currentUser.friends = [...currentUser.friends, friendReq];
        setCurrentUser(currentUser);
      }
    } catch (err) {
      return err;
    }
  };

  const acceptRequest = async (): Promise<unknown> => {
    try {
      getNewPolls();
      updateFriendList();
    } catch (err) {
      return err;
    }
  };

  const declineRequest = async () => {
    try {
      const newReqList = currentUser.friendRequests.filter(
        (req: any) => req._id !== friendReq._id
      );
      fetch(
        `https://pollster-api-production.up.railway.app/api/users/${state.user?._id}/requests/${friendReq._id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      currentUser.friendRequests = newReqList;
      setCurrentUser(currentUser);
    } catch (err) {
      return err;
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
