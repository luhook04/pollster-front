import React from 'react';

const FriendReqCard = ({ friendReq }: any) => {
  const acceptRequest = () => {};

  const declineRequest = () => {};
  return (
    <div className="friend-request">
      <p>{friendReq.username}</p>
      <button>Accept</button>
      <button>Decline</button>
    </div>
  );
};

export default FriendReqCard;
