"use client";
import React from "react";
import { createContext } from "react";
type ApiContextType={
    apiUrl:string
}
export const ApiContext=createContext<ApiContextType>({
    apiUrl:''
})
const apiUrl=process.env.NODE_ENV==='production' ? 'https://note-taking-igzm.onrender.com' : 'http://localhost:5000'
type ApiProviderProps={
    children:React.ReactNode
}
const ApiProvider=({children}:ApiProviderProps)=>{
    return(
        <ApiContext value={{apiUrl}}>
        {children}
        </ApiContext>
    )
}
export default ApiProvider;