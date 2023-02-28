import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { AuthContext } from './context/context';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import UserPage from './components/UserPage';
import SearchBar from './components/SearchBar';

export interface Answer {
  answer: string;
  _id: string;
  votes: string[];
}
export interface Poll {
  _id: string;
  id: string;
  timestamp: string;
  date: string;
  time: string;
  question: string;
  answers: Answer[];
  author: User | CurrentUser;
}

export interface User {
  _id: string;
  username: string;
  profilePicUrl: string;
  friends: string[];
  friendRequests: string[];
  polls: Poll[];
}

export interface CurrentUser {
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const getPolls = async (): Promise<void> => {
      try {
        const res = await fetch(
          'https://pollster-api-production.up.railway.app/api/polls',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error('Network response error');
        }
        const resJson = await res.json();
        setHomePolls(resJson.polls);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const getHomeUser = async (): Promise<void> => {
      try {
        const res = await fetch(
          `https://pollster-api-production.up.railway.app/api/home`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error('Network response error');
        }
        const resJson = await res.json();
        setCurrentUser(resJson.user);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (state.isAuthenticated) {
      getPolls();
      getHomeUser();
    }
  }, [state]);
  console.log(homePolls);
  const deletePoll = async (pollId: string): Promise<void> => {
    try {
      const newPollList = homePolls.filter((poll: Poll) => poll._id !== pollId);
      const res = await fetch(
        `https://pollster-api-production.up.railway.app/api/polls/${pollId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error('Network response error');
      }
      setHomePolls(newPollList);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateVote = (poll: Poll, answer: Answer): void => {
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
      {state.isAuthenticated && !createPollForm && <SearchBar />}
      <Routes>
        <Route
          path="/"
          element={
            state.isAuthenticated ? (
              <Home
                loading={loading}
                polls={homePolls}
                setPolls={setHomePolls}
                createPollForm={createPollForm}
                setCreatePollForm={setCreatePollForm}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
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
                polls={homePolls}
                setPolls={setHomePolls}
                updateVote={updateVote}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                deletePoll={deletePoll}
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
