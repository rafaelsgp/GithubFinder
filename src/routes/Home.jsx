import { useState } from "react";

import Search from "../components/Search";
import User from "../components/User";
import Error from "../components/Error";

const Home = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const loadUser = async (userName) => {
    setError(false);
    setUser(null);

    const res = await fetch(`https://api.github.com/users/${userName}`);

    const data = await res.json();

    if (res.status === 404) {
      setError(true);
      return;
    }

    const { avatar_url, login, location, followers, following } = data;

    const userData = { avatar_url, login, location, followers, following };

    console.log(typeof userData, userData);

    setUser(userData);
  };
  console.log(typeof user, user);
  return (
    <div>
      <Search loadUser={loadUser} />
      {user && <User user={user} />}
      {error && <Error />}
    </div>
  );
};

export default Home;
