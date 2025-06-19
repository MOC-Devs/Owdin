import { Navigate, Route, BrowserRouter as Router,Routes, useNavigate} from "react-router-dom"
import Auth from "./components/Auth"
import Home from "./components/Home"
import { useSelector } from "react-redux"
import { selectIsAuthenticated } from "./features/auth/authSelectors"

function App() {
  const userAuthenticated = useSelector(selectIsAuthenticated)

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={userAuthenticated?<Home/>:<Navigate to="/auth"/>}/>
        <Route path='/auth' element={userAuthenticated?<Navigate to="/"/>:<Auth/>}/>
      </Routes>
    </Router>
    </>      
  )
}

export default App
