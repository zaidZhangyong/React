import { useRoutes } from "react-router-dom" //hook
import Router from "./router"


function App() {
  const outlet = useRoutes(Router)
  return (
    <>
      <div className="App">
        {outlet}
      </div>
    </>
  )
}

export default App
