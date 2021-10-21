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
                <span className="nav-txt">Sign In</span>
            </NavLink>
        </div>):(
        <div className="nav-block">
            <NavLink className="main-nav-item" to="/profile">
                <FontAwesomeIcon icon={faUserCircle} />{" "}
                <span className="nav-txt">{userInfo.firstName}</span>
            </NavLink>
            <NavLink className="main-nav-item" to="/" onClick={signOut}>
            <FontAwesomeIcon icon={faSignOutAlt} />{" "}
                <span className="nav-txt nav-txt-hidden">Sign Out</span>
            </NavLink>
        </div>)}

        </nav>

    )
}