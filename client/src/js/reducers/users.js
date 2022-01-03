/**
 * Get all users
 * @returns Array
 */
function getUsers(){
  if(!localStorage.getItem('USERS')){
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => {
    for(var i = 0; i < json.length; i++ ){
      json[i].favorit = false
    }
      localStorage.setItem('USERS', JSON.stringify(json));
    })
  }
  return JSON.parse(localStorage.getItem('USERS'));
}

/**
 * Update selected user (favorit) status 
 * @returns Array
 */
function setUserStatusToFavorit(id){
  const users = JSON.parse(localStorage.getItem('USERS'));

  const usersUpdated = users.map(user=>{
    if( user.id === Number(id) && user.hasOwnProperty('favorit') && user.favorit === true){
      user.favorit = false
    } else if( user.id === Number(id) ){
      user.favorit = true
    }
    return user
  })

    localStorage.setItem('USERS', JSON.stringify(usersUpdated));
    return JSON.parse(localStorage.getItem('USERS'));
}


const usersReducer  = (state = [], action) => {
    switch(action.type){
      case "GET_USERS":
        state = getUsers()
        return state;
      case "UPDATE_USER_FAVORITE_STATUS": 
      state = setUserStatusToFavorit(action.payload)
          return state;
      default:
        return false;
    }
  }
  
  export default usersReducer;