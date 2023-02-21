import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { AuthContext } from './context/context';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import UserPage from './components/UserPage';
import SearchBar from './components/SearchBar';

interface Answer {
  answer: string;
  _id: string;
  votes: string[];
}
interface Poll {
  _id: string;
  id: string;
  timestamp: string;
  date: string;
  question: string;
  answers: Answer[];
  author: User | CurrentUser;
}

interface User {
  _id: string;
  username: string;
  profilePicUrl: string;
  friends: string[];
  friendRequests: string[];
  polls: Poll[];
}

interface CurrentUser {
  _id: string;
  username: string;
  profilePicUrl: string;
  friends: User[];
  friendRequests: User[];
  polls: string[];
}

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    username: '',
    profilePicUrl: '',
    _id: '',
    friends: [],
    friendRequests: [],
    polls: [],
  });
  const [homePolls, setHomePolls] = useState<Poll[]>([]);
  const { state } = useContext(AuthContext);
  const [createPollForm, setCreatePollForm] = useState<boolean>(false);
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

  const updateVote = (poll: Poll, answer: Answer) => {
    let updatedPoll = homePolls.find((element: Poll) => element === poll);

    if (updatedPoll === undefined) {
      throw new TypeError('The value should be there');
    }

    let updatedAnswer = updatedPoll!.answers.find(
      (element: any) => element === answer
    );
    updatedAnswer?.votes.push(state.user?._id);
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
      {state.isAuthenticated && <SearchBar />}
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
