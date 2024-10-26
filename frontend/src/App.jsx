import {Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/SignUpPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/searchPage";
import SearchHistoryPage from "./pages/searchHistoryPage";
import NotFoundPage from "./pages/404page";
function App() {
  const {user,isCheckingAuth,authCheck} = useAuthStore()
  // console.log("auth user is here ",user)
  //use-effect so that it runs only once
  useEffect(()=>{
    authCheck();
  },[authCheck]);
  if(isCheckingAuth){
    return(
      <div className="h-screen bg-black flex ">
          <Loader className="justify-center items-center animate-spin text-red-600 w-10 h-10"/>
      </div>
    )
  }
  return (
    <>
    <Routes>
         <Route path='/' element ={<HomePage/>}/>
         <Route path='/login' element ={!user?<LoginPage/>:<Navigate to={"/"}/>}/>
         <Route path='/signup' element ={!user ?<SignUpPage/>:<Navigate to ={"/"}/>}/>
         <Route path='/watch/:id' element ={user ?<WatchPage/>:<Navigate to ={"/login"}/>}/>
         <Route path='/search' element ={user ?<SearchPage/>:<Navigate to ={"/login"}/>}/>
         <Route path='/history' element ={user ?<SearchHistoryPage/>:<Navigate to ={"/login"}/>}/>
         <Route path='/*' element ={<NotFoundPage/>}/>
    </Routes>
    <Toaster/>
     <Footer/>
     </>
  )
}

export default App
