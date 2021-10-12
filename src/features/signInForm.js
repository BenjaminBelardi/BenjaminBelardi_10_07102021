/* ici il faut créer les action pour la validation et l'envoi du formulaire
utilisation du slice de la librairie reduxjs/toolkit
*/

import { createSlice } from "@reduxjs/toolkit";
//importer le secteur ici
import { selectForm } from "../utils/selector";



// initial state of form feature fetch
const initialState = {
    status: 'void',
    data: null,
    error: null,
}
// userAccount = {login , password}
export function submit(userAccount){
    // return a thunk
    return async (dispatch, getState) => {
        const status = selectForm(getState()).status
        if (status === 'pending') {
         return
    }
    dispatch(actions.fetching(userAccount))
    try {
        let login = JSON.stringify(userAccount)
        console.log(login)
        const response = await fetch(
            "http://localhost:3001/api/v1/user/login", {
            method: "POST",
             header:{
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
             },
            body: login
            }
        )
        // on récupère le token si le login et le mdp sont correct
        const token = await response.json()
        dispatch(actions.resolved(userAccount.email, token))
        } catch (error) {
        dispatch(actions.rejected(userAccount.email, error))
        }
    }
}



function setVoidIfUndefined(draft, userAccount) {
    if (draft[userAccount] === undefined) {
      draft[userAccount] = { status: 'void' }
    }
  }


const {actions, reducer } = createSlice({
    name: 'signInForm',
    initialState,
    reducers:{
        fetching: {
            prepare: (userAccount) => ({
                payload : {userAccount}
            }),
            reducer:(draft, action) => {
                setVoidIfUndefined(draft, action.payload.userAccount)
                if (draft[action.payload.userAccount].status === 'void') {
                  draft[action.payload.userAccount].status = 'pending'
                  return
                }
                if (draft[action.payload.userAccount].status === 'rejected') {
                  draft[action.payload.userAccount].error = null
                  draft[action.payload.userAccount].status = 'pending'
                  return
                }
                if (draft[action.payload.userAccount].status === 'resolved') {
                  draft[action.payload.userAccount].status = 'updating'
                  return
                }
            },  
        },
        resolved: { // prepare permet de modifier le payload
            prepare: (userAccount, data) => ({
              payload: { userAccount, data },
            }),
            // la fonction de reducer
            reducer: (draft, action) => {
              setVoidIfUndefined(draft, action.payload.userAccount)
              if (
                draft[action.payload.userAccount].status === 'pending' ||
                draft[action.payload.userAccount].status === 'updating'
              ) {
                draft[action.payload.userAccount].data = action.payload.token
                draft[action.payload.userAccount].status = 'resolved'
                return
              }
              return
            },
        },
        rejected:{
            prepare: (userAccount, error) => ({
                payload: {userAccount, error },
              }),
              reducer: (draft, action) => {
                setVoidIfUndefined(draft, action.payload.userAccount)
                if (
                  draft[action.payload.userAccount].status === 'pending' ||
                  draft[action.payload.userAccount].status === 'updating'
                ) {
                  draft[action.payload.userAccount].error = action.payload.error
                  draft[action.payload.userAccount].data = null
                  draft[action.payload.userAccount].status = 'rejected'
                  return
                }
                return
              },
            },
        },     
    })
export default reducer