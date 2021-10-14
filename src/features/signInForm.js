/* ici il faut créer les action pour la validation et l'envoi du formulaire
utilisation du slice de la librairie reduxjs/toolkit
*/
import { createSlice } from "@reduxjs/toolkit";
//importer le selecteur ici
import { selectUser} from "../utils/selector";





// initial state of form feature fetch
const initialState = {
    //name : null
    // status: 'void',
    // data: null,
    // error: null,
}
// userAccount = {login , password}
export function submit(userAccount){
    // return a thunk
    return async (dispatch, getState) => {
        const selectUserByEmail = selectUser(userAccount.email)
        const status = selectUserByEmail(getState()).status
        if (status === 'pending' || status ==="updating" ) {
         return
    }
    dispatch(actions.fetching(userAccount))
    try {
        let login = JSON.stringify(userAccount)
        const response = await fetch(
            "http://localhost:3001/api/v1/user/login", {
            method: "POST",
             headers:{
                 'Content-Type': 'application/json'
             },
            body: login
            }
        )
        // on récupère le token si le login et le mdp sont correct
        const data = await response.json()
        dispatch(actions.resolved(userAccount, data))
        } catch (error) {
        dispatch(actions.rejected(userAccount, error))
        }
    }
}



function setVoidIfUndefined(draft, user) {
    if (draft[user] === undefined) {
      draft[user] = { status: 'void' }
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
                setVoidIfUndefined(draft, action.payload.userAccount.email)
                if (draft[action.payload.userAccount.email].status === 'void') {
                  draft[action.payload.userAccount.email].status = 'pending'
                  return
                }
                if (draft[action.payload.userAccount.email].status === 'rejected') {
                  draft[action.payload.userAccount.email].error = null
                  draft[action.payload.userAccount.email].status = 'pending'
                  return
                }
                if (draft[action.payload.userAccount.email].status === 'resolved') {
                  draft[action.payload.userAccount.email].status = 'updating'
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
              setVoidIfUndefined(draft, action.payload.userAccount.email)
              if (
                draft[action.payload.userAccount.email].status === 'pending' ||
                draft[action.payload.userAccount.email].status === 'updating'
              ) {
                draft[action.payload.userAccount.email].data = action.payload.data
                draft[action.payload.userAccount.email].status = 'resolved'
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
                setVoidIfUndefined(draft, action.payload.userAccount.email)
                if (
                  draft[action.payload.userAccount.email].status === 'pending' ||
                  draft[action.payload.userAccount.email].status === 'updating'
                ) {
                  draft[action.payload.userAccount.email].error = action.payload.error
                  draft[action.payload.userAccount.email].data = null
                  draft[action.payload.userAccount].email.status = 'rejected'
                  return
                }
                return
              },
            },
        },     
    })
export default reducer