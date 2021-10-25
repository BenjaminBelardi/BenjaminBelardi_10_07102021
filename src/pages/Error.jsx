import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import { NavLink } from "react-router-dom"


export function Error () {

    return(
        <main className="main main-error bg-dark">
            <section className="error-container">
                <FontAwesomeIcon icon={faExclamationTriangle} />
                <p>Oups something went wrong !</p>
                <p>Please return to Home page</p>
                <NavLink to="/">Home</NavLink>
            </section>
        </main>
        
    )
}