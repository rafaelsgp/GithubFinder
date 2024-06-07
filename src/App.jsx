import { Link, Outlet, useLocation } from "react-router-dom";

import classes from "./App.module.css";

function App() {
  const { pathname } = useLocation();

  return (
    <div>
      <div className={classes.back_button}>
        {pathname !== "/" && <Link to="/">Voltar</Link>}
      </div>
      <div className={classes.app}>
        <h1>Github Finder</h1>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
