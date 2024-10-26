//zustand=global state management library
import {create} from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast'

export const useAuthStore= create((set)=>({
    user:null,
    isSigningUp:false,
    isCheckingAuth:true,
    isLoggingOut:false,
    isLoggingIn:false,
    signup: async (credentials)=>{
        set({isSigningUp:true})
        try{
            const response = await axios.post("/api/v1/auth/signup",credentials)
            set({user:response.data.user,isSigningUp:false})
            toast.success("Account craeted successfully")
        }
        catch(error){
            toast.error(error.response.data.message || "signup failed")
            set({isSigningUp:false,user:null})
        }
    },
    login: async (credentials)=>{
        set({isLoggingIn:true})
        try {
            const response = await axios.post("/api/v1/auth/login",credentials);
            set({user:response.data.user,isLoggingIn:false});
            toast.success("logged in successfully");
        } catch (error) {
            set({isLoggingIn:false,user:null})
            toast.error(error.response.data.message||"login failed")
        }

    },
    logout: async ()=>{
        set({isLoggingOut:true})
        try {
            await axios.post("api/v1/auth/logout")
            set({user:null,isLoggingOut:false})
            toast.success("logged out successfully")
        } catch (error) {
            set({isLoggingOut:false})
            toast.error(error.response.data.message||"log out failed")
        }
    },
    authCheck: async ()=>{
        try{
            const response = await axios.get("/api/v1/auth/authCheck")
            set({user:response.data.user,isCheckingAuth:false})
        }
        catch(error){
            set({isCheckingAuth:false,user:null})
            // toast.error(error.response.data.message || "an error occured")
            console.log(error.response.data.message)

        }
    }
}))