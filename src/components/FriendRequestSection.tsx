import React, { useEffect, useState } from 'react';
import FriendReqCard from './FriendReqCard';

const FriendRequestSection = ({ currentUser, updatePolls }: any) => {
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
      {reqList
        ? reqList.map((friendReq: any, index: number) => {
            return (
              <FriendReqCard
                key={index}
                reqList={reqList}
                friendReq={friendReq}
                updatePolls={updatePolls}
                handleReqChange={handleReqChange}
              ></FriendReqCard>
            );
          })
        : null}
    </div>
  );
};

export default FriendRequestSection;
