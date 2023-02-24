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

  const vote = async (): Promise<void> => {
    if (!totalVotes.includes(state.user?._id)) {
      try {
        const res = await fetch(
          `https://pollster-api-production.up.railway.app/api/polls/${poll._id}/answers/${answer._id}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        const resJson = await res.json();

        if (res.status !== 200) {
          setError(resJson.message);
          setTimeout(() => {
            setError('');
          }, 3000);
          throw new Error('Network response error');
        }
        if (res.status === 200) {
          updateVote(poll, answer);
          let newVoteArray = [...totalVotes, state.user?._id];
          setTotalVotes(newVoteArray);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setError("Can't vote twice");
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
