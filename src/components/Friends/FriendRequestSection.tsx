import React, { useEffect, useState } from 'react';
import FriendReqCard from './FriendReqCard';

const FriendRequestSection = ({
  currentUser,
  updatePolls,
  updateUser,
}: any) => {
  const [reqList, setReqList] = useState<[]>([]);

  useEffect(() => {
    setReqList(currentUser.friendRequests);
  }, [currentUser.friendRequests]);

  const handleReqChange = (newList: any) => {
    setReqList(newList);
  };

  return (
    <div className="friend-req-panel">
      <h3>Friend Requests</h3>
      {currentUser.friendRequests > 0 ? (
        reqList.map((friendReq: any, index: number) => {
          return (
            <FriendReqCard
              updateUser={updateUser}
              key={index}
              reqList={reqList}
              friendReq={friendReq}
              updatePolls={updatePolls}
              handleReqChange={handleReqChange}
            ></FriendReqCard>
          );
        })
      ) : (
        <p>No friend requests</p>
      )}
    </div>
  );
};

export default FriendRequestSection;
