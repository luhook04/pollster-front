import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/context';

const PollCard = ({ poll }: any) => {
  const { state } = useContext(AuthContext);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setTimeout(() => setError(''), 2000);
  }, [error]);

  return (
    <div className="poll-card">
      <h3>{poll.author.username}</h3>
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
      {poll.author.username === state.user?.username ? (
        <button>Delete</button>
      ) : null}
    </div>
  );
};

export default PollCard;
