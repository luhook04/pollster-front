import React, { useEffect, useState } from 'react';
import PollForm from './PollForm';
import { CurrentUser, Poll, Answer, User } from '../App';
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
  polls,
  setPolls,
}) => {
  const [friends, setFriends] = useState<User[]>([]);
  const [friendRequests, setFriendRequests] = useState<User[]>([]);

  useEffect(() => {
    setFriends(currentUser.friends);
    setFriendRequests(currentUser.friendRequests);
  }, [currentUser]);

  return (
    <>
      {!createPollForm ? (
        <div className="text-center">
          <button
            className="bg-blue-700 text-white border-2 border-blue-700 hover:border-white text-sm w-1/2 mx-auto py-1 px-2 rounded-full"
            onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
              e.stopPropagation();
              setCreatePollForm(!createPollForm);
            }}
          >
            Create Poll
          </button>
        </div>
      ) : null}
      <PollForm
        createPollForm={createPollForm}
        setCreatePollForm={setCreatePollForm}
        currentUser={currentUser}
        polls={polls}
        setPolls={setPolls}
      ></PollForm>
      {!createPollForm && (
        <div className="md:flex md:flex-row">
          <PollDisplay
            deletePoll={deletePoll}
            polls={polls}
            updateVote={updateVote}
          ></PollDisplay>
          <div className="md:w-1/4 mt-3 bg-white md:my-3 md:p-3 md:mr-7 text-center p-3 w-11/12 mx-auto">
            <FriendRequests
              friendRequests={friendRequests}
              friends={friends}
              setFriendRequests={setFriendRequests}
              setPolls={setPolls}
              setFriends={setFriends}
            ></FriendRequests>
            <Friends friends={friends}></Friends>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
