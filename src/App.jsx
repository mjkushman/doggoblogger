import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes-nav/AppRoutes";
import Appbar from "./routes-nav/Appbar";
import ScrollToHashElement from "./common/ScrollToHashElement";
import Copyright from "./common/Copyright";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import "./App.css";
import UserContext from "./common/UserContext";
import AutobloggerApi from "./api";

function App() {

  const LOCAL_STORAGE_KEY = 'token'
  const [currentUser, setCurrentUser] = useState("")

   // Create and store current user state.
  // By default, will retrieve user from local storage. If user is null, then return an empty object.  Otherwise, parse the object and return it as currentUser.
  const [token, setToken] = useState(() => {
    try {
      const value = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (value == null) return null;
      //   console.log("retrieved from localStorage:", value);
      return JSON.parse(value);
    } catch (error) {
      console.log("error retrieving token:", error);
    }
  });



  useEffect( () => {
    async function updateUserUponToken(token){
      console.log('running updateUserUponToken. TOKEN:', token)
      setCurrentUser(() => {
        console.log('running setCurentUser. TOKEN:', token)
        if(!token) return // if there is no token, Return without trying to decode it.
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(token)); // persist the token in local storage

        let decodedToken = jwtDecode(token)
        console.log('TOKEN DECODED:',decodedToken)
        AutobloggerApi.token = token
        return decodedToken
      })
    }
    updateUserUponToken(token)
  },[token])


  const context ={
    currentUser,
    // setCurrentUser, // do I need to pass this in context? I don't think so. Any function should use setToken instead which should update the current user.
    setToken,
    LOCAL_STORAGE_KEY
  }


  // {/* <ScrollToHashElement/> */}
  return (
    <UserContext.Provider value={context}>
    <BrowserRouter>
      <Appbar />
      <AppRoutes />
      <Copyright/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
