export const selectUsers = (state) => state.user

const voidUser = { status: 'void' }

export const selectUser = (userEmail) => (state) => {
    return state.user[userEmail] ?? voidUser
  }
  