import React, { useState } from 'react';
import { CurrentUser, User } from '../App';

interface FuncProps {
  currentUser: CurrentUser;
}

const Friends: React.FC<FuncProps> = ({ currentUser }) => {
  // const [showFriends, setShowFriends] = useState<boolean>(false);

  return (
    <>
      {currentUser.friends ? (
        <>
          <h3>Friends</h3>
          <div className="h-fit max-h-36 overflow-auto bg-blue-500 rounded text-white">
            {currentUser.friends.map((friend: User) => {
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
