import { useContext } from 'react';
import { AuthContext } from '../context/context';

const Vote = ({ answer, showError, poll, updateVote }: any) => {
  const { state } = useContext(AuthContext);
  let allVotes: any = [];
  const vote = async () => {
    poll.answers.forEach((answer: any) => {
      allVotes.push(...answer.votes);
    });
    if (!allVotes.includes(state.user?._id)) {
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
          console.log(poll);
        }
        if (req.status === 200) {
          updateVote(poll, answer);
          console.log('coo');
        }
      } catch (err) {
        return err;
      }
    } else {
      showError("Can't vote twice");
      setTimeout(() => {
        showError('');
      }, 3000);
      return;
    }
  };

  return (
    <button onClick={vote}>
      <span>{answer.answer}</span>
      <span> - {answer.votes.length}</span>
    </button>
  );
};

export default Vote;
