import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/context';

interface FuncProps {
  handleLogout(): void;
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownSmall: React.FC<FuncProps> = ({
  handleLogout,
  setMobileMenu,
}) => {
  const { state } = useContext(AuthContext);
  return (
    <>
      <div className="bg-black w-full h-full absolute top-0 opacity-50 z-10"></div>
      <div
        id="sideNav"
        className="sm:hidden w-2/5 text-center h-full fixed top-0 left-0 z-20 bg-blue-600"
      >
        <button
          className="py-2 block ml-auto mr-5 font-bold text-3xl text-white hover:text-red-600"
          type="button"
          onClick={() => setMobileMenu(false)}
        >
          &#10005;
        </button>
        <nav className="text-left">
          <ul>
            <li className="bg-white border-y border-black hover:bg-blue-500 hover:text-white">
              <Link to={`/users/${state.user?._id}`}>
                <button className="w-full text-left px-1 py-1">
                  View Profile
                </button>
              </Link>
            </li>
            <li className="bg-white border-b border-black hover:bg-blue-500 hover:text-white">
              <button
                className="w-full text-left px-1 py-1"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default DropdownSmall;
