"use client";
import { createContext,useState } from "react";
type NoteContextType={
    notes:NoteType[],
    setNotes:React.Dispatch<React.SetStateAction<NoteType[]>>
}

export const NoteContext=createContext<NoteContextType>({
    notes:[],
    setNotes:()=>{}
});
export type NoteType={
  _id:string,
  title:string,
  description:string,
  createdAt:string

}
type NoteProviderProps={
    children:React.ReactNode
}
const NoteProvider=({children}:NoteProviderProps)=>{
      const [notes, setNotes]=useState<NoteType[]>([]);
    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {children}
        </NoteContext.Provider>
    )
}
export default NoteProvider;