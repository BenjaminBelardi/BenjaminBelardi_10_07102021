import AccountCard from "../components/AccountCard";
import { Redirect } from "react-router";
import { selectAuthUser } from "../utils/selector";
import { useLocation } from "react-router";
import {Form, Field} from 'react-final-form';
import { useState } from "react";
import { useSelector } from 'react-redux'  


export default function Profile(){

    // get the user email store in the history location state
    let location = useLocation()

    // get the user token by user email
    const userConnected = useSelector(selectAuthUser).isConnected //?? location.state.user
    
    const [userProfilOpen, setUserProfilOpen] = useState(false)

    // login page redirection if user not connected
    if (!userConnected){
        return <Redirect to="/login" />
    }

    const customField = ({type, label, placeholder, input, meta: {touched, error} }) => (
        <div className="input-wrapper">
            <input {...input} type={type} id={label} placeholder={placeholder}/>
            {touched && error && 
            <span className="error">{error}</span>}
        </div>
    )

    const displayProfilData = () => {
        setUserProfilOpen(!userProfilOpen)
    }

    const onSubmit = (values) => {
        console.log(values)
    }



    return (
    <main className="main bg-dark">
        <div className="header">
            <h1>Welcome back {location.state.user} !</h1>
            { userProfilOpen && 
            <Form
                onSubmit={onSubmit}
                // validate function : valid the date before sending
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

                render={({handleSubmit, submitting, pristine}) => (
                    <form onSubmit={handleSubmit}>
                         <div className="profil-field-wrapper">
                            <Field name='firstName' label='firstName' placeholder='Nom' component={customField} type="text" />
                            <Field name='lastName' label="lastName" placeholder='Prenom' component={customField} type="text" />
                        </div>
                        <div className="profil-btn-wrapper">
                            <button className="sign-in-button" type='submit' disabled={submitting || pristine} >Save</button>
                            <button className="sign-in-button" type='button' disabled={submitting || pristine} >Cancel</button>
                        </div>
                    </form>
                )}
            />}
            <button className="profil-edit-btn" onClick={displayProfilData}>Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
            <AccountCard accountTitle="Argent Bank Chekking (x8349)" amount="$2,082.79" amountDesc="Available Balance"/>
            <AccountCard accountTitle="Argent Bank Saving (x6712)" amount="$10,928.42" amountDesc="Available Balance"/>
            <AccountCard accountTitle="Argent Bank Credit Card (x8349)" amount="$184.30" amountDesc="Available Balance"/>
    </main>

    )
}