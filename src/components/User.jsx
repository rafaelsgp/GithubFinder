import { useState, useEffect } from "react";
import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";

import ErrorRepository from "./ErroRepository";
import Repository from "./Repository";

import classes from "./User.module.css";

const User = ({ user }) => {
  const [repository, setRepository] = useState([]);
  const [errorRepository, setErrorRepository] = useState(false);

  const login = user.login;

  const loadRepository = async () => {
    const repositoryName = user.login;

    const res = await fetch(
      `https://api.github.com/users/${repositoryName}/repos`
    );

    const data = await res.json();

    console.log(typeof data[0].stargazers_count, data[0].stargazers_count);

    if (res.status === 404) {
      setErrorRepository(true);
      return;
    }
    console.log(data);

    let repositoryData = [];

    if (data.length !== 0) {
      repositoryData = data
        .sort(({ stargazers_count: a }, { stargazers_count: b }) => b - a)
        .slice(0, 5)
        .map(({ name, language, stargazers_count, forks_count, html_url }) => ({
          name,
          language,
          stargazers_count,
          forks_count,
          html_url,
        }));
    }

    console.log(typeof repositoryData, repositoryData);
    setRepository(repositoryData);

    console.log(typeof repository, repository);
    const any = [1, 2, 3, 4, 5, 6];
    console.log(typeof any, any);
  };

  useEffect(() => {
    loadRepository();
  }, []);
  console.log(typeof repository, repository);
  return (
    <div className={classes.user}>
      <img src={user.avatar_url} alt={user.login} />
      <h2>{user.login}</h2>
      {user.location && (
        <p className={classes.location}>
          <MdLocationPin />
          <span>{user.location}</span>
        </p>
      )}
      <div className={classes.stats}>
        <div>
          <p>Seguidores:</p>
          <p className={classes.number}>{user.followers}</p>
        </div>
        <div>
          <p>Seguindo:</p>
          <p className={classes.number}>{user.following}</p>
        </div>
      </div>
      <Link
        to={`/repos/${login}`}
        element={<Repository />}
        state={{ repository, login }}
        onClick={() => loadRepository()}
      >
        Ver melhores projetos
      </Link>
      {errorRepository && <ErrorRepository errorRepository={errorRepository} />}
    </div>
  );
};

export default User;
