import React from 'react';
import { Poll, Answer } from '../App';
import HomePollCard from './HomePollCard';

interface FuncProps {
  updateVote(poll: Poll, answer: Answer): void;
  deletePoll(pollId: string): Promise<void>;
  polls: Poll[];
}

const PollDisplay: React.FC<FuncProps> = ({
  polls,
  deletePoll,
  updateVote,
}) => {
  return (
    <>
      <div className="md:grow">
        {polls.map((poll: Poll) => {
          return (
            <HomePollCard
              key={poll._id}
              deletePoll={deletePoll}
              poll={poll}
              updateVote={updateVote}
            ></HomePollCard>
          );
        })}
      </div>
    </>
  );
};

export default PollDisplay;
