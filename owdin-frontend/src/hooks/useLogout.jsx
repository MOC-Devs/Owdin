import { useDispatch } from 'react-redux'
import { logoutUser } from '../features/auth/api'
import { logout,loginFailure } from '../features/auth/index'

const useLogout = () => {
    const dispatch = useDispatch()

    const signout = async () => {
        try {
            await logoutUser();
            dispatch(logout())
        }
        catch (err) {
            dispatch(loginFailure(err.message));
        }
    }
    return [signout]
}

export default useLogout