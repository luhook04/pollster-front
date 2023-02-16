import { useContext } from 'react';
import { AuthContext } from '../context/context';

const Vote = ({
  answer,
  showError,
  poll,
  currentUser,
  setCurrentUser,
  totalVotes,
  setTotalVotes,
}: any) => {
  const { state } = useContext(AuthContext);

  const updateVote = (poll: any, answer: any) => {
    let updatedPoll = currentUser.polls.find(
      (element: any) => element === poll
    );
    let updatedAnswer = updatedPoll.answers.find(
      (element: any) => element === answer
    );
    updatedAnswer.votes.push(state.user?._id);
    let newArray = [...currentUser.polls];

    let index = newArray.indexOf(poll);
    if (index !== -1) {
      newArray.splice(index, 1, updatedPoll);
    }
    currentUser.polls = newArray;
    setCurrentUser(currentUser);
  };

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
          showError(reqJson.message);
          setTimeout(() => {
            showError('');
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
      {(totalVotes.includes(state.user?._id) ||
        poll.author._id === state.user?._id) && (
        <span> - {answer.votes.length}</span>
      )}
    </button>
  );
};

export default Vote;