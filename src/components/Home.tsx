import React, { useState } from 'react';

import PollForm from './PollForm';
import FriendReqCard from './FriendReqCard';
import { CurrentUser, Poll, Answer, User } from '../App';
import PollDisplay from './PollDisplay';
import FriendRequests from './FriendRequests';

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
      <PollForm
        createPollForm={createPollForm}
        setCreatePollForm={setCreatePollForm}
        currentUser={currentUser}
        polls={polls}
        setPolls={setPolls}
      ></PollForm>
      <PollDisplay
        deletePoll={deletePoll}
        polls={polls}
        updateVote={updateVote}
      ></PollDisplay>
      <FriendRequests
        currentUser={currentUser}
        setPolls={setPolls}
        setCurrentUser={setCurrentUser}
      ></FriendRequests>
      {showFriends ? (
        <button onClick={friendListFunc}>Hide Friend List</button>
      ) : (
        <button onClick={friendListFunc}>Show Friend List</button>
      )}
      {currentUser.friends && showFriends ? (
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
