import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/context';
import PollCard from './PollCard';
import FriendReqCard from './FriendReqCard';

const Home = ({ createPollForm, setCreatePollForm, currentUser }: any) => {
  const { state } = useContext(AuthContext);
  const [polls, setPolls]: any = useState<[]>([]);
  const [inputAmount, setInputAmount] = useState<number>(0);
  const [newPoll, setNewPoll] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
  });
  console.log(currentUser);
  useEffect(() => {
    const getPolls = async () => {
      try {
        const req = await fetch(
          'https://pollster-api-production.up.railway.app/api/polls',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );

        const reqJson = await req.json();
        setPolls(reqJson.polls);
      } catch (err) {
        return err;
      }
    };
    getPolls();
  }, [state]);

  const addInputField = () => {
    if (inputAmount <= 2) setInputAmount(inputAmount + 1);
  };

  const removeInputField = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPoll({ ...newPoll, [e.target.name]: e.target.value });
  };

  const toggleForm = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    setCreatePollForm(!createPollForm);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const pollJson = reqJson.poll;
      pollJson.author = state.user;
      const updatedPolls = [...polls, reqJson.poll];
      setPolls(updatedPolls);

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

  const deletePoll = async (pollId: any) => {
    try {
      const newPollList = polls.filter((poll: any) => poll._id !== pollId);
      await fetch(
        `https://pollster-api-production.up.railway.app/api/polls/${pollId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      setPolls(newPollList);
    } catch (err) {
      return err;
    }
  };

  return (
    <div className="home-container">
      <div>
        <div>
          <button onClick={toggleForm}>Create Poll</button>
          {createPollForm ? (
            <div className="form-popup" onClick={(e) => e.stopPropagation()}>
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
                  onClick={toggleForm}
                  type="button"
                  className="btn cancel"
                >
                  Close
                </button>
              </form>
            </div>
          ) : null}
        </div>
        {polls ? (
          <div className="polls-container">
            {polls.map((poll: any, index: number) => {
              return (
                <PollCard
                  key={index}
                  deletePoll={deletePoll}
                  poll={poll}
                ></PollCard>
              );
            })}
          </div>
        ) : null}
      </div>
      {currentUser.friendRequests ? (
        <div className="friend-req-panel">
          <h3>Friend Requests</h3>
          {currentUser.friendRequests.map((friendReq: any, index: number) => {
            return (
              <FriendReqCard key={index} friendReq={friendReq}></FriendReqCard>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Home;
