import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/context';
import PollCard from './PollCard';

const Home = () => {
  const { state } = useContext(AuthContext);
  const [polls, setPolls]: any = useState<[]>([]);
  const [newPoll, setNewPoll] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPoll({ ...newPoll, [e.target.name]: e.target.value });
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
      <button>Create Poll</button>
      <div className="form-popup">
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
            <label htmlFor="option1">Choice 1:</label>
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
            <label htmlFor="option2">Choice 2:</label>
            <input
              type="text"
              id="option2"
              name="option2"
              onChange={handleChange}
              value={newPoll.option2}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="option3">Choice 3:</label>
            <input
              type="text"
              id="option3"
              name="option3"
              onChange={handleChange}
              value={newPoll.option3}
            />
          </div>
          <div className="form-group">
            <label htmlFor="option4">Choice 4: </label>
            <input
              type="text"
              id="option4"
              name="option4"
              onChange={handleChange}
              value={newPoll.option4}
            />
          </div>
          <button type="submit">Post Poll</button>
          <button type="button" className="btn cancel">
            Close
          </button>
        </form>
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
  );
};

export default Home;
