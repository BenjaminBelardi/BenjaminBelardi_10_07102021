export const selectUserToken = (state) => {
    return state.user.data && state.user.data.body.token
}

export const selectAuthUser = (state) => state.user
export const selectAuthUserProfil = (state) => state.userProfile
