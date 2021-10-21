import { createSlice } from "@reduxjs/toolkit";
import { selectAuthUser , selectUserToken, selectAuthUserProfil} from "../utils/selector";
import {fetchUserProfile, updateUserProfile } from "../services/user.service"



const initialState = {
  status : "void",
  id: null,
  email :null,
  firstName :null,
  lastName: null,
  error : null 
}


export function fetchOrUpdateUserProfil (fetchOrUpdate, userInfo){
    return async (dispatch, getState) => {
        const user = selectAuthUser(getState()).login
        const storageToken = localStorage.getItem('userTokens') && JSON.parse(localStorage.getItem('userTokens')).token
        const freshToken = selectUserToken(getState())
        const token = storageToken || freshToken
        const status = selectAuthUserProfil(getState()).status
       
        if (status === 'pending' || status ==="updating" ) {
         return
    }
    dispatch(actions.fetching(user))
        try {
            if (fetchOrUpdate === "fetch"){
              const userData = await fetchUserProfile (token)
              dispatch(actions.resolved(userData.body))
            }else {
              const userData = await updateUserProfile (token, userInfo)
              dispatch(actions.resolved(userData.body))
            }
      
         } catch (error) {
            dispatch(actions.rejected(error))
            throw error
         }
        }
    }

export function clearUserData(){
  return async (dispatch) => {
    dispatch(actions.clearData())
  }

}

    const {actions, reducer } = createSlice({
        name: 'profile',
        initialState,
        reducers:{
          fetching :{
            prepare: (login) => ({
              payload: { login },
            }),
            reducer: (draft, action) => {
                    // update user name
                    draft.email = action.payload.login
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
                  if (draft.status === 'pending' || draft.status === 'updating') {
                    // set in resolved state and store the data
                    draft.id = action.payload.id
                    draft.email = action.payload.email
                    draft.firstName = action.payload.firstName
                    draft.lastName = action.payload.lastName
                    draft.status = 'resolved'
                    return
                  }
                  return
                },
            rejected: (draft, action) => {
                    if (draft.status === 'pending' || draft.status === 'updating') {
                      draft.error = action.payload
                      draft.firstName = null
                      draft.lastName = null
                      draft.status = 'rejected'
                      return
                    }
                    return
                  },
            clearData : () =>{
              return initialState
            }
          }    
      })
    
    export default reducer
