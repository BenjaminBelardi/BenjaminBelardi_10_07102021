import AccountCard from "../components/AccountCard"
import { selectAuthUserProfil } from "../utils/selector"
import {Form, Field} from 'react-final-form'
import { useState } from "react"
import { useSelector, useDispatch} from 'react-redux'  
import { useEffect } from "react"
import { fetchOrUpdateUserProfil } from "../features/profile"
import { logout } from '../features/signInForm'
import {clearUserData} from '../features/profile'
import { useHistory } from "react-router"
import { FORM_ERROR } from 'final-form'



export default function Profile(){

    const history = useHistory()
    const dispatch = useDispatch()
    const userInfo = useSelector(selectAuthUserProfil)
   
    //local state to store profil edit formular status (open or closed)
    const [userProfilOpen, setUserProfilOpen] = useState(false)
   
    // function to open or closed the profil edit form
    const displayProfilData = () => {
        setUserProfilOpen(!userProfilOpen)
    }

     //get the user data from the store
    useEffect(() => {
        dispatch(fetchOrUpdateUserProfil("fetch"))
        .catch ((error) => {
            dispatch(logout())
            dispatch(clearUserData())
            const location = { 
                pathname : "/"
            }
            history.replace(location)
        })
    },[dispatch, history])


       
    const customField = ({type, label, placeholder, input, meta: {touched, error} }) => (
        <div className="profil-input-wrapper">
            <input {...input} type={type} id={label} placeholder={placeholder}/>
            {touched && error && 
            <span className="error">{error}</span>}
        </div>
    )

    

    // send a request to update the user data
    const onSubmit = (values) => {
        return new Promise(resolve => 
            dispatch(fetchOrUpdateUserProfil("update", values))
            .then(()=> {
                resolve(true)
            })
            .catch ((error) => {
                resolve({ [FORM_ERROR] : error})
            })
        )
    }

    return (
    <main className="main bg-dark">
        <div className="header">
            <h1>Welcome back {userInfo.firstName} !</h1>
            { userProfilOpen &&
            <Form
                onSubmit={onSubmit}
                // validate function : validate the fields before sending
                validate={values => {
                    const errors ={}
                    if (!values.firstName){
                        errors.firstName = 'Required'
                    }
                    if(!values.lastName) {
                        errors.lastName = 'Required'
                    }
                    return errors
                }}

                render={({handleSubmit, submitting, pristine, submitError}) => (
                    <section className="profil-edit-content">
                    <form onSubmit={handleSubmit}>
                         <div className="profil-field-wrapper">
                            {submitError && <span className="error">{submitError}</span>}
                            <Field name='firstName' label='firstName' placeholder={userInfo.firstName} component={customField} type="text" />
                            <Field name='lastName' label="lastName" placeholder={userInfo.lastName} component={customField} type="text" />
                        </div>
                        <div className="profil-btn-wrapper">
                            <button className="sign-in-button mgr2 btn-profil-widht" type='submit' disabled={submitting || pristine} >Save</button>
                            <button className="sign-in-button btn-profil-widht" type='button' onClick={displayProfilData} >Cancel</button>
                        </div>
                    </form>
                    </section>
                )}
            />}
           { ! userProfilOpen &&
           <button className="profil-edit-btn" onClick={displayProfilData}>Edit Name</button> }
        </div>
        <h2 className="sr-only">Accounts</h2>
            <AccountCard accountTitle="Argent Bank Chekking (x8349)" amount="$2,082.79" amountDesc="Available Balance"/>
            <AccountCard accountTitle="Argent Bank Saving (x6712)" amount="$10,928.42" amountDesc="Available Balance"/>
            <AccountCard accountTitle="Argent Bank Credit Card (x8349)" amount="$184.30" amountDesc="Available Balance"/>
    </main>

    )
}