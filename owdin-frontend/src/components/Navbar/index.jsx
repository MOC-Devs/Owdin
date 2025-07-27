import { Link } from 'react-router-dom'
import useLogout from '../../hooks/useLogout'
import { selectAuthUser } from '../../features/auth/selectors'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const [signout] = useLogout()
    const user = useSelector(selectAuthUser)

    const handleSignout = async () => {
        await signout();
    }
    return (
        <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
            <div className="text-xl font-bold text-gray-500">
                Owdin Logo
            </div>
            <div className="hidden md:flex space-x-6 text-gray-600 font-medium">
                <Link to="/" className='hover:text-blue-600 transition'>Friends</Link>
                <Link to="/" className='hover:text-blue-600 transition'>Groups</Link>
                <Link to="/" className='hover:text-blue-600 transition'>Settings</Link>
            </div>
            <div>
                <button onClick={handleSignout} className="bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-600">
                    Logout
                </button>
            </div>
        </nav>

    )
}

export default Navbar