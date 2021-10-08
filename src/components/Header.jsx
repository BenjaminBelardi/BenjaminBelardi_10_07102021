import { NavLink} from 'react-router-dom'
import logo from '../assets/argentBankLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

export default function Header () {

    return(
        <nav className="main-nav">
        <NavLink className="" to="/">
            <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo"/>
            <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        <div>
            <NavLink className="main-nav-item" to="./sign-in.html">
                <FontAwesomeIcon icon={faUserCircle} />
                {/* <i class="fa fa-user-circle"></i> */}
                Sign In
            </NavLink>
        </div>
        </nav>

    )
}