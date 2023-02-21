import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/context';
import Vote from './Vote';
import { Poll, Answer } from '../../App';

interface FuncProps {
  updateVote(poll: Poll, answer: Answer): void;
  deletePoll(pollId: string): Promise<unknown>;
  poll: Poll;
}

const PollCard: React.FC<FuncProps> = ({ poll, deletePoll, updateVote }) => {
  const { state } = useContext(AuthContext);

  const [totalVotes, setTotalVotes] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    poll.answers.forEach((answer: Answer) => {
      setTotalVotes([...answer.votes]);
    });
  }, [poll]);

  return (
    <div className="poll-card">
      {poll.author.username ? <p>{poll.author.username}</p> : null}
      <p>{poll.question}</p>
      <div className="answers">
        {poll.answers.map((answer: Answer, index: number) => {
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
