import React, { useEffect, useState } from 'react';
import FriendReqCard from './FriendReqCard';

const FriendRequestSection = ({ currentUser }: any) => {
  const [reqList, setReqList] = useState<[]>([]);

  useEffect(() => {
    setReqList(currentUser.friendRequests);
  }, [currentUser.friendRequests]);

  return (
    <div className="friend-req-panel">
      <h3>Friend Requests</h3>
      {reqList
        ? reqList.map((friendReq: any, index: number) => {
            return (
              <FriendReqCard
                key={index}
                reqList={reqList}
                setReqList={setReqList}
                friendReq={friendReq}
              ></FriendReqCard>
            );
          })
        : null}
    </div>
  );
};

export default FriendRequestSection;
