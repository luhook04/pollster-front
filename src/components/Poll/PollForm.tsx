import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/context';
import { CurrentUser, Poll } from '../../App';

interface FuncProps {
  createPollForm: boolean;
  setCreatePollForm: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: CurrentUser;
  polls: Poll[];
  setPolls: React.Dispatch<React.SetStateAction<Poll[]>>;
}

const PollForm: React.FC<FuncProps> = ({
  setCreatePollForm,
  createPollForm,
  currentUser,
  polls,
  setPolls,
}) => {
  const { state } = useContext(AuthContext);
  const [inputAmount, setInputAmount] = useState<number>(0);
  const [newPoll, setNewPoll] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
  });

  const addInputField = (): void => {
    if (inputAmount <= 2) setInputAmount(inputAmount + 1);
  };

  const removeInputField = (): void => {
    if (inputAmount === 1) {
      let poll = newPoll;
      poll.option3 = '';
      setNewPoll(poll);
      setInputAmount(inputAmount - 1);
    } else if (inputAmount === 2) {
      let poll = newPoll;
      poll.option4 = '';
      setNewPoll(poll);
      setInputAmount(inputAmount - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewPoll({ ...newPoll, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<unknown> => {
    e.preventDefault();
    try {
      const req = await fetch(
        'https://pollster-api-production.up.railway.app/api/polls',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${state.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: newPoll.question,
            option1: newPoll.option1,
            option2: newPoll.option2,
            option3: newPoll.option3,
            option4: newPoll.option4,
          }),
        }
      );
      const reqJson = await req.json();
      let pollJson = reqJson.poll;
      pollJson.author = currentUser;

      setPolls([pollJson, ...polls]);

      if (req.status !== 200) {
        return;
      }
      setNewPoll({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
      });
      setInputAmount(0);
      setCreatePollForm(false);
    } catch (err) {
      return err;
    }
  };

  return (
    <div>
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
          e.stopPropagation();
          setCreatePollForm(!createPollForm);
        }}
      >
        Create Poll
      </button>
      {createPollForm ? (
        <div className="form-popup" onClick={(e): void => e.stopPropagation()}>
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
              <label htmlFor="question">Question: </label>
              <input
                type="text"
                id="question"
                name="question"
                onChange={handleChange}
                value={newPoll.question}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="option1">Choice 1: </label>
              <input
                type="text"
                id="option1"
                name="option1"
                onChange={handleChange}
                value={newPoll.option1}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="option2">Choice 2: </label>
              <input
                type="text"
                id="option2"
                name="option2"
                onChange={handleChange}
                value={newPoll.option2}
                required
              />
            </div>
            {inputAmount >= 1 ? (
              <div className="form-group">
                <label htmlFor="option3">Choice 3: </label>
                <input
                  type="text"
                  id="option3"
                  name="option3"
                  placeholder="optional"
                  onChange={handleChange}
                  value={newPoll.option3}
                />
              </div>
            ) : null}
            {inputAmount >= 2 ? (
              <div className="form-group">
                <label htmlFor="option4">Choice 4: </label>
                <input
                  type="text"
                  id="option4"
                  name="option4"
                  placeholder="optional"
                  onChange={handleChange}
                  value={newPoll.option4}
                />
              </div>
            ) : null}
            <button type="button" onClick={addInputField}>
              Add Field
            </button>
            <button type="button" onClick={removeInputField}>
              Remove Field
            </button>
            <button type="submit">Post Poll</button>
            <button
              onClick={(): void => {
                setCreatePollForm(!createPollForm);
              }}
              type="button"
              className="btn cancel"
            >
              Close
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default PollForm;
