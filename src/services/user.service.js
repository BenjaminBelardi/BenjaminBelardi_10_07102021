const URL_API_BASE = "http://localhost:3001/api/v1/"

export const  fetchUserProfile = async (token) => {
    const response = await fetch(
        URL_API_BASE + "user/profile", {
        method: "POST",
         headers:{
             'Content-Type': 'application/json',
             'Authorization' : 'Bearer' + token 
         },
        }
    )
    const jsonData = await handleResponse(response)
    //const jsonData = await response.json()
    sessionStorage.setItem("userData", JSON.stringify({ jsonData }))
    return jsonData
}

export const  updateUserProfile = async (token , userInfo) => {
    const toSend = JSON.stringify(userInfo)
    const response = await fetch(
        URL_API_BASE + "user/profile", {
        method: "PUT",
         headers:{
             'Content-Type': 'application/json',
             'Authorization' : 'Bearer' + token 
         },
         body:
             toSend
        }
    )
    const jsonData = await handleResponse(response)
    //const jsonData = await response.json()
    sessionStorage.setItem("userData", JSON.stringify({ jsonData }))
    return jsonData
}

export const  createUser = async (userInfo) => {
    const toSend = JSON.stringify(userInfo)
    const response = await fetch(
        URL_API_BASE + "user/signup", {
        method: "POST",
         headers:{
             'Content-Type': 'application/json',
         },
         body:
             toSend
        }
    )
    const jsonData = await handleResponse(response)
    return jsonData
}




function handleResponse(response) {
    return response.text().then(text => {
      const data = text && JSON.parse(text)
        if (!response.ok) {
            if (response.status === 400) {
               console.log("Bad Request")
            }
          const error = data && data.message.Error
          throw new Error(error)
        }
      return data
    })
  }

  