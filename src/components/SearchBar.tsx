import React, { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../context/context';
import { Link } from 'react-router-dom';

interface SearchUser {
  _id: string;
  username: string;
  profilePicUrl: string;
  friends: string[];
  friendRequests: string[];
  polls: string[];
}

const SearchBar: React.FC = () => {
  const { state } = useContext(AuthContext);
  const [users, setUsers] = useState<SearchUser[]>([]);
  const [filterText, setFilterText] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const req = await fetch(
          'https://pollster-api-production.up.railway.app/api/users',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );

        const reqJson = await req.json();
        setUsers(reqJson.users);
      } catch (err) {
        return err;
      }
    };
    getUsers();

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [state]);

  const handleClickOutside = (event: MouseEvent): void => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setFilterText('');
    }
  };

  const filteredItems = users.filter((user: SearchUser) =>
    user.username.toLocaleLowerCase().includes(filterText)
  );

  return (
    <div className="w-5/6 mx-auto mb-3" ref={ref}>
      <input
        className="mx-auto w-full block px-1 rounded-sm"
        type="text"
        placeholder="Search users"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value.toLocaleLowerCase())}
      />
      <div
        className="mt-1 absolute w-5/6"
        onClick={() => {
          setFilterText('');
        }}
      >
        {filteredItems.length === 0 && filterText && (
          <p className="text-[14px] text-center bg-white border-b text-slate-500">
            There are no items to display adjust your filter criteria
          </p>
        )}
        {filteredItems.length !== 0 &&
          filterText &&
          filteredItems.map((item: SearchUser, index: number) => (
            <Link key={index} to={`/users/${item._id}`}>
              <div className="bg-white border-b border-slate-400">
                <p className="p-1 hover:bg-blue-400 hover:text-white">
                  {item.username}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
