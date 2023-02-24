import React, { useState } from 'react';
import PollCard from './PollCard';
import PollForm from './PollForm';
import FriendReqCard from './FriendReqCard';
import { CurrentUser, Poll, Answer, User } from '../App';
import { create } from 'domain';

interface FuncProps {
  updateVote(poll: Poll, answer: Answer): void;
  deletePoll(pollId: string): Promise<void>;
  createPollForm: boolean;
  setCreatePollForm: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: CurrentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
  polls: Poll[];
  setPolls: React.Dispatch<React.SetStateAction<Poll[]>>;
}

const Home: React.FC<FuncProps> = ({
  updateVote,
  deletePoll,
  createPollForm,
  setCreatePollForm,
  currentUser,
  setCurrentUser,
  polls,
  setPolls,
}) => {
  const [showFriends, setShowFriends] = useState<boolean>(false);

  const friendListFunc = (): void => {
    setShowFriends(!showFriends);
  };

  return (
    <div>
      <div>
        <PollForm
          createPollForm={createPollForm}
          setCreatePollForm={setCreatePollForm}
          currentUser={currentUser}
          polls={polls}
          setPolls={setPolls}
        ></PollForm>
        {polls && !createPollForm ? (
          <div className="polls-container">
            {polls.map((poll: Poll) => {
              return (
                <PollCard
                  key={poll._id}
                  deletePoll={deletePoll}
                  poll={poll}
                  updateVote={updateVote}
                ></PollCard>
              );
            })}
          </div>
        ) : null}
      </div>
      {!createPollForm && (
        <div className="friend-req-panel">
          <h3>Friend Requests</h3>
          {currentUser.friendRequests && !createPollForm ? (
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
            <p>No friend requests</p>
          )}
        </div>
      )}
      {showFriends && !createPollForm && (
        <button onClick={friendListFunc}>Hide Friend List</button>
      )}
      {!showFriends && !createPollForm && (
        <button onClick={friendListFunc}>Show Friend List</button>
      )}
      {currentUser.friends && showFriends && !createPollForm ? (
        <div className="friend-list">
          <h3>Friend List</h3>
          {currentUser.friends.map((friend: User) => {
            return <p key={friend._id}>{friend.username}</p>;
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Home;
