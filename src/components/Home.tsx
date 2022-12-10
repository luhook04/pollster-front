import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/context';

const Home = () => {
  const { state } = useContext(AuthContext);

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
        console.log(reqJson);
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
        console.log(reqJson);
      } catch (err) {
        return err;
      }
    };
    getHomeUser();
  });
  return <div></div>;
};

export default Home;
