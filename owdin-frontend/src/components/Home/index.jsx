import { useSelector } from "react-redux"
import useLogout from "../../hooks/useLogout"
import { selectAuthUser } from "../../features/auth/authSelectors"

const Home = () => {
  const [signout] = useLogout()
  const user = useSelector(selectAuthUser)

  const handleSignout = async ()=>{
    await signout();
    console.log('Logged Out: ',user)
  }

  return (
    <>
      <div>Home</div>
      <button onClick={handleSignout}>Logout</button>
    </>
  )
}

export default Home