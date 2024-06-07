import { useLocation } from "react-router-dom";

import { FiStar } from "react-icons/fi";
import { AiOutlineFork } from "react-icons/ai";
import { IoCodeSlashSharp } from "react-icons/io5";
import { RiExternalLinkLine } from "react-icons/ri";

import classes from "./Repository.module.css";

const Repository = () => {
  const { state } = useLocation();
  const repository = state.repository;
  const login = state.login;

  console.log(login);
  console.log(repository);
  console.log(repository[0]);

  if (typeof repository[0] != "undefined") {
    console.log("objeto existente");
  } else {
    console.log("objeto vazio");
  }

  return (
    <div className={classes.repository}>
      <p>Explore os repositórios do usuário: {login}</p>
      <div className={classes.repos}>
        {typeof repository[0] != "undefined" ? (
          repository.map((repos) => (
            <div className={classes.repos_container}>
              <p>{repos.name}</p>
              <p>
                <IoCodeSlashSharp /> {repos.language}
              </p>
              <div className={classes.repos_stats}>
                <div className={classes.repos_stat}>
                  <div className={classes.icon_stat}>
                    <FiStar />
                  </div>
                  <div className={classes.p_stat}>
                    <p>{repos.stargazers_count}</p>
                  </div>
                </div>
                <div className={classes.repos_stat}>
                  <div className={classes.icon_stat}>
                    <AiOutlineFork />
                  </div>
                  <div className={classes.p_stat}>
                    <p>{repos.forks_count}</p>
                  </div>
                </div>
              </div>
              <a href={repos.html_url}>
                Ver código <RiExternalLinkLine />
              </a>
            </div>
          ))
        ) : (
          <div>
            <p>O usuário não possui repositórios</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Repository;
