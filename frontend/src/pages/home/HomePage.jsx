// import React from 'react'

import { useAuthStore } from "../../store/authUser";
import Authscreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const HomePage = () => {
  const {user} = useAuthStore();
  return (
    <div >
      {user?< HomeScreen/>:<Authscreen/>}
    </div>
  )
}

export default HomePage
