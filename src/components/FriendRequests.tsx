import React from 'react';
import FriendReqCard from './FriendReqCard';
import { CurrentUser, User, Poll } from '../App';

interface FuncProps {
  currentUser: CurrentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
  setPolls: React.Dispatch<React.SetStateAction<Poll[]>>;
}

const FriendRequests: React.FC<FuncProps> = ({
  currentUser,
  setPolls,
  setCurrentUser,
}) => {
  return (
    <div className="friend-req-panel">
      <h3>Friend Requests</h3>
      {currentUser.friendRequests ? (
        currentUser.friendRequests.map((friendReq: User) => {
          return (
            <FriendReqCard
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              setPolls={setPolls}
              friendReq={friendReq}
              key={friendReq._id}
            ></FriendReqCard>
          );
        })
      ) : (
        <p>No friend requests</p>
      )}
    </div>
  );
};

export default FriendRequests;
