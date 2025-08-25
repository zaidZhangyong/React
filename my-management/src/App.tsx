import { useRoutes } from "react-router-dom"; //hook
import Router from "./router";

function App() {
  const Routers = useRoutes(Router);
  return <>{Routers}</>;
}

export default App;
