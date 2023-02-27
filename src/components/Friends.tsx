import React from 'react';
import { User, CurrentUser } from '../App';

interface FuncProps {
  currentUser: CurrentUser;
}

const Friends: React.FC<FuncProps> = ({ currentUser }) => {
  return (
    <>
      <h2 className="mb-2">Friends</h2>
      <div className="h-fit max-h-36 overflow-auto bg-blue-500 rounded text-white">
        {currentUser.friends.length > 0 ? (
          currentUser.friends.map((friend: User) => {
            return (
              <p className="my-2" key={friend._id}>
                {friend.username}
              </p>
            );
          })
        ) : (
          <p className="text-white my-2">No friends yet</p>
        )}
      </div>
    </>
  );
};

export default Friends;
