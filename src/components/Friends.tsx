import React from 'react';
import { User } from '../App';

interface FuncProps {
  friends: User[];
}

const Friends: React.FC<FuncProps> = ({ friends }) => {
  return (
    <>
      {friends ? (
        <>
          <h3 className="mb-2">Friends</h3>
          <div className="h-fit max-h-36 overflow-auto bg-blue-500 rounded text-white">
            {friends.map((friend: User) => {
              return (
                <p className="my-2" key={friend._id}>
                  {friend.username}
                </p>
              );
            })}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Friends;
