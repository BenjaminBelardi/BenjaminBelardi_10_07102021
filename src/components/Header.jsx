import { NavLink} from 'react-router-dom'
import logo from '../assets/argentBankLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthUserProfil } from "../utils/selector";
import { logout } from '../features/signInForm'
import {clearUserData} from '../features/profile'

export default function Header () {

    let location = useLocation()
    const dispatch = useDispatch()

    const userInfo = useSelector(selectAuthUserProfil)

    const signOut = () => {
        dispatch(logout())
        dispatch(clearUserData())
    }


    return(
        <nav className="main-nav">
        <NavLink className="" to="/">
            <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo"/>
            <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        {location.pathname !== "/profile" ?(
        <div>
            <NavLink className="main-nav-item" to="/login">
                <FontAwesomeIcon icon={faUserCircle} />
                {/* <i class="fa fa-user-circle"></i> */}
                Sign In
            </NavLink>
        </div>):(
        <div>
            <NavLink className="main-nav-item" to="/profile">
                <FontAwesomeIcon icon={faUserCircle} />
                {/* <i class="fa fa-user-circle"></i> */}
                {userInfo.firstName}
            </NavLink>
            {/* <NavLink className="main-nav-item" to="/login" onClick> 
                <FontAwesomeIcon icon={faSignOutAlt} />
                Sign Out
            </NavLink> */}
            <FontAwesomeIcon icon={faSignOutAlt} />
            <button className="main-nav-item" type='button' onClick={signOut}>Sign Out</button>
        </div>)}

        </nav>

    )
}