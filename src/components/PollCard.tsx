import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/context';
import Vote from './Vote';

const PollCard = ({
  poll,
  deletePoll,
  updateVote,
  currentUser,
  setCurrentUser,
}: any) => {
  const { state } = useContext(AuthContext);
  const [error, setError] = useState<string>('');
  const [totalVotes, setTotalVotes]: any = useState<[]>([]);

  useEffect(() => {
    poll.answers.forEach((answer: any) => {
      setTotalVotes([...answer.votes]);
    });
  }, [poll]);

  const showError = (msg: string) => {
    setError(msg);
  };

  return (
    <div className="poll-card">
      {poll.author.username ? <p>{poll.author.username}</p> : null}
      <p>{poll.question}</p>
      <div className="answers">
        {poll.answers.map((answer: any, index: number) => {
          return (
            <Vote
              key={index}
              poll={poll}
              totalVotes={totalVotes}
              setTotalVotes={setTotalVotes}
              answer={answer}
              showError={showError}
              updateVote={updateVote}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            ></Vote>
          );
        })}
      </div>
      {error ? <div>{error}</div> : null}
      {poll.author.username === state.user?.username ? (
        <button onClick={() => deletePoll(poll._id)}>Delete</button>
      ) : null}
    </div>
  );
};

export default PollCard;
