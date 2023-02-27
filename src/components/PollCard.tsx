import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/context';
import Vote from './Vote';
import { Poll, Answer } from '../App';

interface FuncProps {
  updateVote(poll: Poll, answer: Answer): void;
  deletePoll(pollId: string): Promise<void>;
  poll: Poll;
}
const PollCard: React.FC<FuncProps> = ({ poll, deletePoll, updateVote }) => {
  const { state } = useContext(AuthContext);

  const [totalVotes, setTotalVotes] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const totalVoteArray: string[] = [];
    poll.answers.forEach((answer: Answer) => {
      totalVoteArray.push(...answer.votes);
    });
    setTotalVotes(totalVoteArray);
  }, [poll]);

  return (
    <div className="bg-white my-3 p-3 w-11/12 mx-auto">
      <p>{poll.author.username}</p>
      <p className="mt-2">{poll.question}</p>
      <div className="my-3 rounded-sm">
        {poll.answers.map((answer: Answer) => {
          return (
            <Vote
              key={answer._id}
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
