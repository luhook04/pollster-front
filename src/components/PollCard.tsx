import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/context';
import Vote from './Vote';

const PollCard = ({ poll, deletePoll, updateVote }: any) => {
  const { state } = useContext(AuthContext);
  const [error, setError] = useState<string>('');

  const showError = (msg: string) => {
    setError(msg);
  };

  return (
    <div className="poll-card">
      {poll.author.username ? <p>{poll.author.username}</p> : null}
      <p>{poll.question}</p>
      <div className="answers">
        {poll.answers.map((answer: any, index: number) => {
          // const vote = async () => {
          //   try {
          //     const req = await fetch(
          //       `https://pollster-api-production.up.railway.app/api/polls/${poll._id}/answers/${answer._id}`,
          //       {
          //         method: 'PUT',
          //         headers: {
          //           Authorization: `Bearer ${state.token}`,
          //         },
          //       }
          //     );
          //     const reqJson = await req.json();

          //     if (req.status !== 200) {
          //       setError(reqJson.message);
          //       setTimeout(() => {
          //         setError('');
          //       }, 3000);
          //     }
          //   } catch (err) {
          //     return err;
          //   }
          // };

          return (
            <Vote
              key={index}
              poll={poll}
              answer={answer}
              showError={showError}
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
