import React, { useState } from 'react';
import { CurrentUser, User } from '../App';

interface FuncProps {
  currentUser: CurrentUser;
}

const Friends: React.FC<FuncProps> = ({ currentUser }) => {
  const [showFriends, setShowFriends] = useState<boolean>(false);

  return (
    <>
      {showFriends ? (
        <button onClick={() => setShowFriends(!showFriends)}>
          Hide Friend List
        </button>
      ) : (
        <button onClick={() => setShowFriends(!showFriends)}>
          Show Friend List
        </button>
      )}
      {currentUser.friends && showFriends ? (
        <div className="friend-list">
          <h3>Friend List</h3>
          {currentUser.friends.map((friend: User) => {
            return <p key={friend._id}>{friend.username}</p>;
          })}
        </div>
      ) : null}
    </>
  );
};

export default Friends;
