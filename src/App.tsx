import { Outlet } from "react-router-dom"
import Header from "./components/Header"

function App() {

  return (
    <>
<Header></Header>
      <div className="app-content">
      <Outlet>
      </Outlet>
      </div>
    </>
  )
}

export default App
