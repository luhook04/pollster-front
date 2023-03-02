import React from 'react';
import FriendReqCard from './FriendReqCard';
import { User, Poll, CurrentUser } from '../../App';

interface FuncProps {
  polls: Poll[];
  setPolls: React.Dispatch<React.SetStateAction<Poll[]>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
  currentUser: CurrentUser;
}

const FriendRequests: React.FC<FuncProps> = ({
  setPolls,
  polls,
  currentUser,
  setCurrentUser,
}) => {
  return (
    <>
      <h2 className="mb-2">Friend Requests</h2>
      <div className="overflow-auto h-fit max-h-36 bg-blue-500 rounded text-white mb-2">
        {currentUser.friendRequests.length > 0 ? (
          currentUser.friendRequests.map((friendReq: User) => {
            return (
              <FriendReqCard
                polls={polls}
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
