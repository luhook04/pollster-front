import React, { useContext } from 'react';
import { AuthContext } from '../context/context';

const Vote = ({
  answer,
  setError,
  poll,
  updateVote,
  totalVotes,
  setTotalVotes,
}: any) => {
  const { state } = useContext(AuthContext);

  const vote = async () => {
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
          setError(reqJson.message);
          setTimeout(() => {
            setError('');
          }, 3000);
          console.log(poll);
        }
        if (req.status === 200) {
          updateVote(poll, answer);
          setTotalVotes(...totalVotes, state.user?._id);
        }
      } catch (err) {
        return err;
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
