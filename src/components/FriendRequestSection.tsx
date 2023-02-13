import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/context';
import FriendReqCard from './FriendReqCard';

const FriendRequestSection = ({ updatePolls, updateUser }: any) => {
  const [reqList, setReqList] = useState<string[]>([]);
  const { state } = useContext(AuthContext);
  console.log(state);
  useEffect(() => {
    if (state.user?.friendRequests.length > 0) {
      setReqList(state.user?.friendRequests);
    }
  }, [state]);

  const handleReqChange = (newList: any) => {
    setReqList(newList);
  };

  return (
    <div className="friend-req-panel">
      <h3>Friend Requests</h3>
      {state.user?.friendRequests ? (
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
