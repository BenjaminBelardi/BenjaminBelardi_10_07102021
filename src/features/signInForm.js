/* ici il faut créer les action pour la validation et l'envoi du formulaire
utilisation du slice de la librairie reduxjs/toolkit
*/
import { createSlice } from "@reduxjs/toolkit";
//importer le selecteur ici
import { selectAuthUser , selectAuthUserProfil} from "../utils/selector";
import {fetchLogin} from "../services/auth.service";




// initial state of form feature fetch
const initialState = {
    status: 'void',
    login : null,
    isConnected : false,
    data: null,
    error: null,
}

// userAccount = {login , password}
export function login(userAccount){
    const login = userAccount.email
    // return a thunk
    return async (dispatch, getState) => {
        const status = selectAuthUser(getState()).status
        if (status === 'pending' || status ==="updating" ) {
         return
    }
    dispatch(actions.fetching(login))
    try { 
      const loginData = await fetchLogin (userAccount)
      dispatch(actions.resolved(loginData))

    } catch (error) {
      dispatch(actions.rejected(error))
      throw (error)
    }
  }
}

export function logout (){
  return async (dispatch) => {
    dispatch(actions.logout())
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("userData")
  }
}




const {actions, reducer } = createSlice({
    name: 'login',
    initialState,
    reducers:{
      fetching :{
        prepare: (login) => ({
          payload: { login },
        }),
        reducer: (draft, action) => {
                // update user name
                draft.login = action.payload.login
                if (draft.status === 'void') {
                  draft.status = 'pending'
                  return
                }
                if (draft.status === 'rejected') {
                  draft.error = null
                  draft.status = 'pending'
                  return
                }
                if (draft.status === 'resolved') {
                  draft.status = 'updating'
                  return
                }
          },
      },  
        resolved: (draft, action) => {
          // if request in progress
              if (draft.status === 'pending' ||draft.status === 'updating') {
                // set in resolved state and store the data
                draft.isConnected = true
                draft.data = action.payload
                draft.status = 'resolved'
                return
              }
              return
            },
        rejected: (draft, action) => {
                if (draft.status === 'pending' || draft.status === 'updating') {
                  draft.error = action.payload
                  draft.data = null
                  draft.status = 'rejected'
                  return
                }
                return
              },
        logout : () => {
          return initialState
        } 
      }    
  })

export default reducer