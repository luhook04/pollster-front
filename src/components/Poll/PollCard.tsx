import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/context';
import Vote from '../Vote';

const PollCard = ({ poll, deletePoll, updateVote }: any) => {
  const { state } = useContext(AuthContext);

  const [totalVotes, setTotalVotes] = useState<string[]>([]);
  const [error, setError]: any = useState<string>('');

  useEffect(() => {
    poll.answers.forEach((answer: any) => {
      setTotalVotes([...answer.votes]);
    });
  }, [poll]);

  return (
    <div className="poll-card">
      {poll.author.username ? <p>{poll.author.username}</p> : null}
      <p>{poll.question}</p>
      <div className="answers">
        {poll.answers.map((answer: any, index: number) => {
          return (
            <Vote
              key={index}
              setError={setError}
              poll={poll}
              totalVotes={totalVotes}
              setTotalVotes={setTotalVotes}
              answer={answer}
              updateVote={updateVote}
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
