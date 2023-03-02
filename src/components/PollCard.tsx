import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/context';
import Vote from './Vote';
import { Poll, Answer } from '../App';

interface FuncProps {
  updateVote(poll: Poll, answer: Answer): void;
  deletePoll?(pollId: string): Promise<void>;
  deletePollFunc(pollId: string): void;
  poll: Poll;
}

const PollCard: React.FC<FuncProps> = ({
  poll,
  deletePollFunc,
  updateVote,
}) => {
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
      <div className="flex gap-2">
        <img
          className="h-8 w-8 rounded-full border-black border-2 my-auto"
          src={`https://pollster-api-production.up.railway.app/img/${poll.author.profilePicUrl}`}
          alt="Author avatar"
        />
        <p className="my-auto">{poll.author.username}</p>
        <p className="my-auto ml-auto">{poll.date}</p>
      </div>
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
      {error ? <p className="text-center mb-2">Error: {error}</p> : null}
      <button
        className="block bg-red-700 hover:bg-red-900 rounded px-4 py-1 text-white mx-auto"
        onClick={() => deletePollFunc(poll._id)}
      >
        Delete
      </button>
    </div>
  );
};

export default PollCard;
