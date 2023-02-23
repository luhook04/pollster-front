import React, { useContext } from 'react';
import { AuthContext } from '../context/context';
import { Answer, Poll } from '../App';

interface FuncProps {
  updateVote(poll: Poll, answer: Answer): void;
  setError: React.Dispatch<React.SetStateAction<string>>;
  poll: Poll;
  answer: Answer;
  totalVotes: string[];
  setTotalVotes: React.Dispatch<React.SetStateAction<string[]>>;
}

const Vote: React.FC<FuncProps> = ({
  answer,
  setError,
  poll,
  updateVote,
  totalVotes,
  setTotalVotes,
}) => {
  const { state } = useContext(AuthContext);

  const vote = async (): Promise<unknown> => {
    if (!totalVotes.includes(state.user?._id)) {
      try {
        const req = await fetch(
          `https://pollster-api-production.up.railway.app/api/polls/${poll._id}/answers/${answer._id}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        const reqJson = await req.json();

        if (req.status !== 200) {
          console.log(totalVotes);
          setError(reqJson.message);
          setTimeout(() => {
            setError('');
          }, 3000);
        }
        if (req.status === 200) {
          updateVote(poll, answer);
          let newVoteArray = [...totalVotes, state.user?._id];
          setTotalVotes(newVoteArray);
          console.log(totalVotes);
        }
      } catch (err) {
        return err;
      }
    } else {
      setError("Can't vote twice");
      console.log(totalVotes);
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
  };

  return (
    <div>
      <button onClick={vote}>
        <span>{answer.answer}</span>
        {(totalVotes.includes(state.user?._id) ||
          poll.author._id === state.user?._id) && (
          <span> - {answer.votes.length}</span>
        )}
      </button>
    </div>
  );
};

export default Vote;
