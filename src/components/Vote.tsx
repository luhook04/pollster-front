import { useContext, useState } from 'react';
import { AuthContext } from '../context/context';

const Vote = ({ answer, showError, poll }: any) => {
  const [count, setCount] = useState<number>(answer.votes.length);
  const { state } = useContext(AuthContext);
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
      const reqJson = await req.json();

      if (req.status !== 200) {
        showError(reqJson.message);
        setTimeout(() => {
          showError('');
        }, 3000);
      }
      if (req.status === 200) {
        setCount(count + 1);
      }
    } catch (err) {
      return err;
    }
  };
  return (
    <button onClick={vote}>
      <span>{answer.answer}</span>
      <span> - {count}</span>
    </button>
  );
};

export default Vote;
