import React from 'react';
import FriendReqCard from './FriendReqCard';
import { User, Poll } from '../App';

interface FuncProps {
  setPolls: React.Dispatch<React.SetStateAction<Poll[]>>;
  friendRequests: User[];
  friends: User[];
  setFriends: React.Dispatch<React.SetStateAction<User[]>>;
  setFriendRequests: React.Dispatch<React.SetStateAction<User[]>>;
}

const FriendRequests: React.FC<FuncProps> = ({
  setPolls,
  friends,
  setFriends,
  setFriendRequests,
  friendRequests,
}) => {
  return (
    <>
      <h3 className="mb-2">Friend Requests</h3>
      <div className="overflow-auto h-fit max-h-36 bg-blue-500 rounded text-white mb-2">
        {friendRequests.length > 0 ? (
          friendRequests.map((friendReq: User) => {
            return (
              <FriendReqCard
                friends={friends}
                setFriendRequests={setFriendRequests}
                setFriends={setFriends}
                friendRequests={friendRequests}
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
