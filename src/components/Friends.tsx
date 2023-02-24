import React from 'react';
import { CurrentUser, User } from '../App';

interface FuncProps {
  currentUser: CurrentUser;
  showFriends: boolean;
  setShowFriends: React.Dispatch<React.SetStateAction<boolean>>;
}

const Friends: React.FC<FuncProps> = ({
  showFriends,
  setShowFriends,
  currentUser,
}) => {
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
