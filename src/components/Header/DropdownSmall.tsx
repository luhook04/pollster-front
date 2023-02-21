import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/context';

interface FuncProps {
  handleLogout(): void;
}

const DropdownSmall: React.FC<FuncProps> = ({ handleLogout }) => {
  const { state } = useContext(AuthContext);
  return (
    <div className="sm:hidden mx-auto text-center w-full mt-2">
      <nav>
        <ul>
          <li>
            <Link to={`/users/${state.user?._id}`}>
              <button className="w-full py-1 border-y border-black bg-white">
                View Profile
              </button>
            </Link>
          </li>
          <li>
            <button
              className="w-full py-1 bg-white border-b border-black"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DropdownSmall;
