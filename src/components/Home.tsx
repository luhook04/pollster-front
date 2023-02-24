import React, { useState } from 'react';
import PollForm from './PollForm';
import { CurrentUser, Poll, Answer } from '../App';
import PollDisplay from './PollDisplay';
import FriendRequests from './FriendRequests';
import Friends from './Friends';

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
  return (
    <>
      <PollForm
        createPollForm={createPollForm}
        setCreatePollForm={setCreatePollForm}
        currentUser={currentUser}
        polls={polls}
        setPolls={setPolls}
      ></PollForm>
      {!createPollForm && (
        <>
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
          <Friends currentUser={currentUser}></Friends>
        </>
      )}
    </>
  );
};

export default Home;
