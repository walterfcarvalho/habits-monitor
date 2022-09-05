import Login from '../Login'

const LockedRoute = ({child}) => {

  function isLogged() {

    const token = JSON.parse(localStorage.getItem("habbit-monitor"))
    
    return token && token.hasOwnProperty("uid")

  }
    return isLogged() 
      ? child 
      : <Login/>
}

export default LockedRoute
