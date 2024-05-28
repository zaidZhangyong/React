import { useRoutes, Link } from "react-router-dom" //hook
import Router from "./router"
import { log } from "console"


function App() {
  const outlet = useRoutes(Router)
  console.log(outlet);

  return (
    <>
      <div className="App">
        {outlet}
      </div>
    </>
  )
}

export default App
