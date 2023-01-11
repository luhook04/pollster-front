import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { AuthContext } from './context/context';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import UserPage from './components/UserPage';

const App = () => {
  const [currentUser, setCurrentUser] = useState<{
    [key: string]: any;
  }>({});
  const [polls, setPolls]: any = useState<[]>([]);
  const { state } = useContext(AuthContext);
  const [createPollForm, setCreatePollForm] = useState<boolean>(false);

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
    const getHomeUser = async () => {
      try {
        const req = await fetch(
          `https://pollster-api-production.up.railway.app/api/home`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );

        const reqJson = await req.json();
        setCurrentUser(reqJson.user);
      } catch (err) {
        return err;
      }
    };
    getHomeUser();
  }, [state]);

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

  const closeForm = (): void => {
    setCreatePollForm(false);
  };

  const toggleForm = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    setCreatePollForm(!createPollForm);
  };

  const updatePolls = (addedPoll: any) => {
    setPolls([addedPoll, ...polls]);
  };

  const updateVote = (poll: any, answer: any) => {
    let updatedPoll = polls.find((element: any) => element === poll);
    let updatedAnswer = updatedPoll.answers.find(
      (element: any) => element === answer
    );
    updatedAnswer.votes.push(state.user?._id);
    let newArray = [...polls];
    console.log(newArray);
    let index = newArray.indexOf(poll);
    if (index !== -1) {
      newArray.splice(index, 1, updatedPoll);
    }
    console.log(updatedPoll);
    console.log(updatedAnswer.votes);
    console.log(newArray);
    setPolls(newArray);
  };

  return (
    <div className="app" onClick={closeForm}>
      {state.isAuthenticated && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            state.isAuthenticated ? (
              <Home
                polls={polls}
                toggleForm={toggleForm}
                closeForm={closeForm}
                createPollForm={createPollForm}
                currentUser={currentUser}
                updatePolls={updatePolls}
                updateVote={updateVote}
                deletePoll={deletePoll}
              />
            ) : (
              <Login />
            )
          }
        ></Route>
        <Route
          path="/users/:userId"
          element={
            state.isAuthenticated ? (
              <UserPage
                polls={polls}
                deletePoll={deletePoll}
                updatePolls={updatePolls}
                updateVote={updateVote}
              />
            ) : (
              <Login />
            )
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
