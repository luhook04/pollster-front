import React, { useContext } from 'react';
import { AuthContext } from '../../context/context';

const FriendReqCard = ({
  friendReq,
  currentUser,
  setCurrentUser,
  setPolls,
}: any) => {
  const { state } = useContext(AuthContext);

  const acceptRequest = async () => {
    try {
      const newReqList = currentUser.friendRequests.filter(
        (req: any) => req._id !== friendReq._id
      );
      await fetch(
        `https://pollster-api-production.up.railway.app/api/users/${state.user?._id}/requests/${friendReq._id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
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
      currentUser.friendRequests = newReqList;
      currentUser.friends = [...currentUser.friends, friendReq];
      setCurrentUser(currentUser);
      setPolls(newPolls.polls);
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
