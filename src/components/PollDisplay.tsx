import React from 'react';
import { Poll, Answer } from '../App';
import PollCard from './PollCard';

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
      {polls ? (
        <div className="md:grow">
          {polls.map((poll: Poll) => {
            return (
              <PollCard
                key={poll._id}
                deletePoll={deletePoll}
                poll={poll}
                updateVote={updateVote}
              ></PollCard>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default PollDisplay;
