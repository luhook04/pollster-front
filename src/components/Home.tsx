import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/context';
import PollCard from './PollCard';
import PollForm from './PollForm';
import FriendReqCard from './Friends/FriendReqCard';
import { CurrentUser, Poll, Answer, User } from '../App';

interface FuncProps {
  updateVote(poll: Poll, answer: Answer): void;
  createPollForm: boolean;
  setCreatePollForm: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: CurrentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
  polls: Poll[];
  setPolls: React.Dispatch<React.SetStateAction<Poll[]>>;
}

const Home: React.FC<FuncProps> = ({
  updateVote,
  createPollForm,
  setCreatePollForm,
  currentUser,
  setCurrentUser,
  polls,
  setPolls,
}) => {
  const { state } = useContext(AuthContext);
  const [showFriends, setShowFriends] = useState<boolean>(false);

  const friendListFunc = (): void => {
    setShowFriends(!showFriends);
  };

  const deletePoll = async (pollId: string): Promise<unknown> => {
    try {
      const newPollList = polls.filter((poll: Poll) => poll._id !== pollId);
      await fetch(
        `https://pollster-api-production.up.railway.app/api/polls/${pollId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      setPolls(newPollList);
    } catch (err) {
      return err;
    }
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
        {polls ? (
          <div className="polls-container">
            {polls.map((poll: Poll, index: number) => {
              return (
                <PollCard
                  key={index}
                  deletePoll={deletePoll}
                  poll={poll}
                  updateVote={updateVote}
                ></PollCard>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="friend-req-panel">
        <h3>Friend Requests</h3>
        {currentUser.friendRequests ? (
          currentUser.friendRequests.map((friendReq: User, index: number) => {
            return (
              <FriendReqCard
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setPolls={setPolls}
                friendReq={friendReq}
                key={index}
              ></FriendReqCard>
            );
          })
        ) : (
          <p>No friend requests</p>
        )}
      </div>
      {showFriends ? (
        <button onClick={friendListFunc}>Hide Friend List</button>
      ) : (
        <button onClick={friendListFunc}>Show Friend List</button>
      )}
      {currentUser.friends && showFriends ? (
        <div className="friend-list">
          <h3>Friend List</h3>
          {currentUser.friends.map((friend: User, index: number) => {
            return <p key={index}>{friend.username}</p>;
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Home;
