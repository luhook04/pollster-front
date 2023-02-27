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
        <div className="overflow-auto">
          <h3>Friends</h3>
          {currentUser.friends.map((friend: User) => {
            return <p key={friend._id}>{friend.username}</p>;
          })}
        </div>
      ) : null}
    </>
  );
};

export default Friends;
