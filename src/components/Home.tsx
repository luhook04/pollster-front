import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/context';
import PollCard from './PollCard';

const Home = () => {
  const [polls, setPolls]: any = useState<[]>([]);

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
        setPolls(reqJson.polls);
      } catch (err) {
        return err;
      }
    };
    getPolls();
  }, [state, polls]);

  return (
    <>
      {polls ? (
        <div className="polls-container">
          {polls.map((poll: any, index: number) => {
            return <PollCard key={index} poll={poll}></PollCard>;
          })}
        </div>
      ) : null}
    </>
  );
};

export default Home;
