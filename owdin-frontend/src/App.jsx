import { Navigate, Route, BrowserRouter as Router,Routes, useNavigate} from "react-router-dom"
import Auth from "./components/Auth"
import Home from "./components/Pages/Home"
import { useDispatch, useSelector } from "react-redux"
import { selectIsAuthenticated } from "./features/auth/selectors"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { fetchExpensesRequest } from "./features/expense"
import { fetchAllUsersRequest } from "./features/auth"


function App() {
  const userAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      (user) => {
        if(user){
          dispatch(fetchExpensesRequest())
          dispatch(fetchAllUsersRequest())
        }
      }
    );
  })

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
