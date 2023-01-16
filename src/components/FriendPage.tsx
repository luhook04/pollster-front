import React from 'react';
const FriendPage = (currentUser: any) => {
  console.log(currentUser);
  return (
    <div>
      {currentUser ? (
        <div>
          {currentUser.friends.map((friend: any) => {
            return <p>{friend.username}</p>;
          })}
        </div>
      ) : null}
    </div>
  );
};

export default FriendPage;
