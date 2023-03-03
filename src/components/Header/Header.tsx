import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/context';
import { Link, NavigateFunction } from 'react-router-dom';
import DropdownSmall from './DropdownSmall';
import { useNavigate } from 'react-router-dom';
import { CurrentUser } from '../../App';

interface FuncProps {
  currentUser: CurrentUser;
}

const Header: React.FC<FuncProps> = ({ currentUser }) => {
  const { state, dispatch } = useContext(AuthContext);
  const navigate: NavigateFunction = useNavigate();
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleLogout = (): void => {
    navigate('/');
    dispatch({ type: 'logout' });
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };

  return (
    <div className="bg-blue-500 flex flex-col sm:flex-row py-5 pt-5">
      <div className="hidden justify-center align-center sm:flex">
        <div className="mt-auto mb-0.5" ref={ref}>
          <button
            className="h-12 w-12 rounded-full border-black border-2 absolute top-3 right-10"
            title="menu-button"
            onClick={(): void => {
              setShowDropdown(!showDropdown);
            }}
          >
            <img
              className="rounded-full"
              src={`https://pollster-api-production.up.railway.app/img/${currentUser.profilePicUrl}`}
              alt="Profile avatar"
            />
          </button>
          {showDropdown !== false && (
            <div className="absolute right-4 text-center text-sm">
              <nav>
                <ul>
                  <li
                    className="border-t border-x bg-slate-100 p-1 hover:bg-blue-400  hover:text-white"
                    onClick={(): void => {
                      setShowDropdown(false);
                    }}
                  >
                    <Link to={`/users/${state.user?._id}`}>View Profile</Link>
                  </li>
                  <li
                    className="border-y-2 border-x bg-slate-100 p-1 hover:bg-blue-400 hover:text-white "
                    onClick={() => {
                      setShowDropdown(false);
                    }}
                  >
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
      {mobileMenu && (
        <DropdownSmall
          handleLogout={handleLogout}
          setMobileMenu={setMobileMenu}
        ></DropdownSmall>
      )}
      <Link className="mx-auto" to={'/'}>
        <h1 className="text-4xl text-white">Pollster</h1>
      </Link>
      {!mobileMenu && (
        <div className="absolute left-4 top-1 text-4xl text-white sm:hidden">
          <button onClick={(): void => setMobileMenu(!mobileMenu)}>
            &#9776;
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
