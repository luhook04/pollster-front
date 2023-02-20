import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/context';
import { Link } from 'react-router-dom';
const SearchBar = () => {
  const { state } = useContext(AuthContext);
  const [users, setUsers]: any = useState<[]>([]);
  const [filterText, setFilterText] = useState('');

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
  }, [state]);

  const filteredItems = users.filter((user: any) =>
    user.username.toLocaleLowerCase().includes(filterText)
  );

  return (
    <div className="w-5/6 mx-auto">
      <input
        className="mx-auto w-full block px-1 rounded-sm"
        type="text"
        placeholder="Search users"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value.toLocaleLowerCase())}
      />
      <div className="mt-1">
        {filteredItems.length === 0 && (
          <p className="text-[14px] text-center bg-white border-b text-slate-500">
            There are no items to display adjust your filter criteria
          </p>
        )}
        {filteredItems.length !== 0 &&
          filterText &&
          filteredItems.map((item: any, index: number) => (
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
