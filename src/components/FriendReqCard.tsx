import React, { useContext } from 'react';
import { AuthContext } from '../context/context';

const FriendReqCard = ({
  friendReq,
  reqList,
  updatePolls,
  handleReqChange,
}: any) => {
  const { state } = useContext(AuthContext);

  const acceptRequest = async () => {
    try {
      const newReqList = reqList.filter(
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
      handleReqChange(newReqList);
      console.log(newPolls.polls);
      updatePolls(newPolls.polls);
    } catch (err) {
      return err;
    }
  };

  const declineRequest = async () => {
    try {
      const newReqList = reqList.filter(
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
      handleReqChange(newReqList);
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
