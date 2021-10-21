import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle} from '@fortawesome/free-solid-svg-icons'
import { useDispatch} from 'react-redux'
import {Form, Field} from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { signUp } from '../features/signUpForm'
import { useHistory } from 'react-router'


const customField = ({type, label, input, meta: {touched, error} }) => (
    <div className="input-wrapper">
        <label htmlFor={label}>{label}</label>
        <input {...input} />
        {touched && error && 
        <span className="error">{error}</span>}
    </div>
)

function SignUpForm() {
    let history = useHistory()
    const dispatch = useDispatch()
    const onSubmit = (values) => {
        return new Promise(resolve =>
            dispatch(signUp(values))
            .then(()=> {
                const location = { 
                    pathname : "/login"
            }
                resolve(true)
                history.replace(location)
            })
            .catch ((error) => {
                resolve ({[ FORM_ERROR ]: error})
            })
        )
    }

    return(
        <main className="main bg-dark">
            <section className="sign-in-content">
            <FontAwesomeIcon icon={faUserCircle} />
            <h1>Sign Up</h1>
            <Form
                onSubmit={onSubmit}
                // validate function : valid the date before sending
                validate={values => {
                    const errors ={}
                    if (!values.email){
                        errors.email = 'Required'
                    }
                    if(!values.password) {
                        errors.password = 'Required'
                    }
                    if(!values.firstName) {
                        errors.firstName = 'Required'
                    }
                    if(!values.lastName) {
                        errors.lastName = 'Required'
                    }

                    return errors
                }}

                render={({handleSubmit, submitting, pristine, submitError}) => (
                    <form onSubmit={handleSubmit}>
                        {submitError && <span className="error">{submitError}</span>}
                        <Field name='email' label="Email" component={customField} type="email" />
                        <Field name='password' label="Password" component={customField} type="password" />
                        <Field name='firstName' label="First name" component={customField} type="text" />
                        <Field name='lastName' label="Last name" component={customField} type="text" />
                        <button className="sign-in-button" type='submit' disabled={submitting || pristine} >Sign Up</button>  
                    </form>
                )}
            />
            </section>         
        </main>
    )
}
export default SignUpForm