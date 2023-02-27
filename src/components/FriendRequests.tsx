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
  console.log(currentUser.friendRequests);
  return (
    <>
      <h3>Friend Requests</h3>
      <div className="overflow-auto h-fit max-h-64 min-h-40 bg-blue-500 rounded text-white mb-2">
        {currentUser.friendRequests.length > 0 ? (
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
          <p className="text-white my-2">No friend requests</p>
        )}
      </div>
    </>
  );
};

export default FriendRequests;
