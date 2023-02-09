import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/context';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleLogout = (): void => {
    dispatch({ type: 'logout' });
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };
  console.log(showDropdown);
  return (
    <div className="bg-blue-500 flex align-center py-5">
      <Link className="md:grow md:block md:pl-20" to={'/'}>
        <h1 className="text-4xl text-white">Pollster</h1>
      </Link>
      <div className="flex justify-center align-center md:pr-32">
        <div className="my-auto" ref={ref}>
          <button
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
          >
            <FontAwesomeIcon
              className="text-white text-xl"
              icon={faUser}
            ></FontAwesomeIcon>
          </button>

          {showDropdown !== false && (
            <div className="absolute">
              <nav>
                <ul>
                  <li
                    className="border-black border-2 bg-slate-100"
                    onClick={() => {
                      setShowDropdown(false);
                    }}
                  >
                    <Link to={`/users/${state.user?._id}`}>View Profile</Link>
                  </li>
                  <li
                    className="border-black border-2 bg-slate-100"
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
    </div>
  );
};

export default Header;
