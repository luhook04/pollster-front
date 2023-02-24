import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/context';
import { CurrentUser, Poll } from '../App';

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
    if (inputAmount < 2) setInputAmount(inputAmount + 1);
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
  ): Promise<void> => {
    e.preventDefault();
    try {
      const res = await fetch(
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
      if (!res.ok) {
        throw new Error('Network response errror');
      } else {
        const reqJson = await res.json();
        let pollJson = reqJson.poll;
        pollJson.author = currentUser;

        setPolls([pollJson, ...polls]);
        setNewPoll({
          question: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
        });
        setInputAmount(0);
        setCreatePollForm(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      {createPollForm ? (
        <div className="mx-auto w-11/12 flex flex-col text-center bg-slate-100 border-blue-900 border-2 py-5 rounded">
          <div className="text-right">
            <button
              className="bg-red-700 hover:bg-red-900 text-white ml-auto px-2 rounded-full mr-5 sm:mr-10"
              onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
                e.stopPropagation();
                setCreatePollForm(!createPollForm);
                setNewPoll({
                  question: '',
                  option1: '',
                  option2: '',
                  option3: '',
                  option4: '',
                });
                setInputAmount(0);
              }}
            >
              X
            </button>
          </div>
          <div onClick={(e): void => e.stopPropagation()}>
            <form className="w-11/12 mx-auto text-left" onSubmit={handleSubmit}>
              <div className="flex flex-col mb-2">
                <label htmlFor="question">Question: </label>
                <input
                  className="border-2 border-slate-400 px-1"
                  type="text"
                  id="question"
                  name="question"
                  onChange={handleChange}
                  value={newPoll.question}
                  required
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="option1">Choice 1: </label>
                <input
                  className="border-2 border-slate-400 px-1"
                  type="text"
                  id="option1"
                  name="option1"
                  onChange={handleChange}
                  value={newPoll.option1}
                  required
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="option2">Choice 2: </label>
                <input
                  className="border-2 border-slate-400 px-1"
                  type="text"
                  id="option2"
                  name="option2"
                  onChange={handleChange}
                  value={newPoll.option2}
                  required
                />
              </div>
              {inputAmount >= 1 ? (
                <div className="flex flex-col mb-2">
                  <label htmlFor="option3">Choice 3 (Optional): </label>
                  <input
                    className="border-2 border-slate-400 px-1"
                    type="text"
                    id="option3"
                    name="option3"
                    onChange={handleChange}
                    value={newPoll.option3}
                  />
                </div>
              ) : null}
              {inputAmount >= 2 ? (
                <div className="flex flex-col mb-2">
                  <label htmlFor="option4">Choice 4 (Optional): </label>
                  <input
                    className="border-2 border-slate-400 px-1"
                    type="text"
                    id="option4"
                    name="option4"
                    onChange={handleChange}
                    value={newPoll.option4}
                  />
                </div>
              ) : null}
              <div className="text-center flex flex-col">
                {inputAmount !== 2 && (
                  <button
                    className="bg-blue-700 hover:bg-blue-900 text-white w-1/2 mx-auto my-2 py-1 rounded-full"
                    type="button"
                    onClick={addInputField}
                  >
                    Add Field
                  </button>
                )}
                {inputAmount !== 0 && (
                  <button
                    className="bg-blue-700 hover:bg-blue-900 text-white w-1/2 mx-auto my-2 py-1 rounded-full"
                    type="button"
                    onClick={removeInputField}
                  >
                    Remove Field
                  </button>
                )}
                <button
                  className="bg-blue-700 hover:bg-blue-900 text-white w-1/2 mx-auto my-2 py-1 rounded-full"
                  type="submit"
                >
                  Post Poll
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PollForm;
