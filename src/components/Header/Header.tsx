import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/context';
import { Link, NavigateFunction } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import DropdownSmall from './DropdownSmall';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
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
      <Link className="mx-auto sm:mr-auto sm:pl-20 " to={'/'}>
        <h1 className="text-4xl text-white">Pollster</h1>
      </Link>
      <div className="absolute right-4 top-1 text-4xl text-white sm:hidden">
        <button onClick={(): void => setMobileMenu(!mobileMenu)}>
          &#9776;
        </button>
      </div>
      <div className="hidden justify-center align-center sm:flex sm:pr-20">
        <div className="mt-auto mb-0.5" ref={ref}>
          <button
            onClick={(): void => {
              setShowDropdown(!showDropdown);
            }}
          >
            <FontAwesomeIcon
              className="text-white text-xl"
              icon={faUser}
            ></FontAwesomeIcon>
          </button>
          {showDropdown !== false && (
            <div className="sm:absolute text-center text-sm">
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
        <DropdownSmall handleLogout={handleLogout}></DropdownSmall>
      )}
    </div>
  );
};

export default Header;
