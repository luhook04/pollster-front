import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/context';

const PollCard = ({ poll, deletePoll, user }: any) => {
  const { state } = useContext(AuthContext);
  const [error, setError] = useState<string>('');

  return (
    <div className="poll-card">
      {poll.author.username ? (
        <p>{poll.author.username}</p>
      ) : (
        <p>{user.username}</p>
      )}
      <p>{poll.question}</p>
      <div className="answers">
        {poll.answers.map((answer: any, index: number) => {
          const vote = async () => {
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

              if (req.status !== 200) {
                const err = await req.json();
                setError(err.message);
                setTimeout(() => {
                  setError('');
                }, 3000);
              }
            } catch (err) {
              return err;
            }
          };
          return (
            <button key={index} onClick={vote}>
              <span>{answer.answer}</span>
              <span> - {answer.votes.length}</span>
            </button>
          );
        })}
      </div>
      {error ? <div>{error}</div> : null}
      {poll.author.username === state.user?.username ||
      user.username === state.user?.username ? (
        <button onClick={() => deletePoll(poll._id)}>Delete</button>
      ) : null}
    </div>
  );
};

export default PollCard;
