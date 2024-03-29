import React from 'react';
import PollForm from './PollForm';
import { CurrentUser, Poll, Answer } from '../App';
import PollDisplay from './HomepagePolls/PollDisplay';
import FriendRequests from './Friends/FriendRequests';
import Friends from './Friends/Friends';
import LoaderContainer from './Loader/LoaderContainer';

interface FuncProps {
  loading: boolean;
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
  loading,
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
      {!loading ? (
        <>
          {!createPollForm ? (
            <div className="text-center scroll-smooth">
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
              <div
                id="friends"
                className="md:w-1/4 mt-3 bg-white md:my-3 md:p-3 md:mr-7 text-center p-3 w-11/12 mx-auto"
              >
                <FriendRequests
                  polls={polls}
                  setPolls={setPolls}
                  setCurrentUser={setCurrentUser}
                  currentUser={currentUser}
                ></FriendRequests>
                <Friends currentUser={currentUser}></Friends>
              </div>
            </div>
          )}
        </>
      ) : (
        <LoaderContainer />
      )}
    </>
  );
};

export default Home;
