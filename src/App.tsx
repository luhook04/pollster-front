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
  const [homePolls, setHomePolls]: any = useState<[]>([]);
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
        setHomePolls(reqJson.polls);
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

  // const closeForm = (): void => {
  //   setCreatePollForm(false);
  // };

  // const toggleForm = (e: React.MouseEvent<HTMLButtonElement>): void => {
  //   e.stopPropagation();
  //   setCreatePollForm(!createPollForm);
  // };

  const updateVote = (poll: any, answer: any) => {
    let updatedPoll = homePolls.find((element: any) => element === poll);
    let updatedAnswer = updatedPoll.answers.find(
      (element: any) => element === answer
    );
    updatedAnswer.votes.push(state.user?._id);
    let newArray = [...homePolls];

    let index = newArray.indexOf(poll);
    if (index !== -1) {
      newArray.splice(index, 1, updatedPoll);
    }

    setHomePolls(newArray);
  };

  return (
    <div
      className="app bg-blue-500"
      onClick={(): void => setCreatePollForm(false)}
    >
      {state.isAuthenticated && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            state.isAuthenticated ? (
              <Home
                polls={homePolls}
                setPolls={setHomePolls}
                createPollForm={createPollForm}
                setCreatePollForm={setCreatePollForm}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                updateVote={updateVote}
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
                polls={homePolls}
                setPolls={setHomePolls}
                updateVote={updateVote}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
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
