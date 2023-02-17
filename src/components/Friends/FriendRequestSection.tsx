import React from 'react';
import FriendReqCard from './FriendReqCard';

const FriendRequestSection = ({
  currentUser,
  setCurrentUser,
  setPolls,
}: any) => {
  // const handleReqChange = (newList: any) => {
  //   setReqList(newList);
  // };

  return (
    <div className="friend-req-panel">
      <h3>Friend Requests</h3>
      {currentUser.friendRequests > 0 ? (
        currentUser.friendRequests.map((friendReq: any, index: number) => {
          return (
            <FriendReqCard
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              setPolls={setPolls}
              friendReq={friendReq}
              key={index}
              // handleReqChange={handleReqChange}
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
