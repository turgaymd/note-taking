'use client';
import React, { useRef, useState } from "react";
import { useContext } from "react";
import { ApiContext } from "../../ApiContext";
// import EditIcon from '@mui/icons-material/Edit'; 
// import DeleteIcon from '@mui/icons-material/Delete'; 
// import SaveIcon from '@mui/icons-material/Save'; 
import axios from "axios"
export type NoteType={
  _id:number
  title:string,
  description:string,
  createdAt:string

}

type NoteProps={
  note:string,
  setNote:React.Dispatch<React.SetStateAction<string>>,
  setTitle:React.Dispatch<React.SetStateAction<string>>,
  notes:NoteType[],
  setNotes:React.Dispatch<React.SetStateAction<NoteType[]>>
  title:string
}
const Note=({note, title, setNote, setTitle, notes,  setNotes}: NoteProps)=>{

    const [edited, setEdited] = useState<number | null>(null);
    const [readOnly, setReadOnly]=useState(true)
    const inputRef=useRef<HTMLInputElement | null>(null);
    const textareaRef=useRef<HTMLTextAreaElement | null>(null);
     const apiUrl=useContext(ApiContext)

    const handleDelete=async (id:number)=>{
      console.log(id)
      await axios.delete(`${apiUrl}/api/notes/${id}`, {
        headers:{
          'Content-Type':"application/json"
        }
      })
        setNotes(notes.filter((note:NoteType)=>note._id!==id))
 }

 const handleEdit=async(id:number, title:string, description:string)=>{
      setReadOnly(false)
    setEdited(id)
    setTitle(title)
    setNote(description)
    setTimeout(()=>{
    textareaRef.current?.focus()
       })
 }
 
 const handleSave=async(id:number, title:string, description:string,)=>{
    await axios.put(`http://localhost:5000/api/notes/${id}`,{
    title,
    description
  },
{
  headers:{
    "Content-Type":"application/json",  
  }
}
)
   setReadOnly(true)
      setNotes(
      notes.map((item:NoteType)=>item._id===id ? { ...item, title,description}   : item ))
      setEdited(null)
      setTitle('')
      setNote('')
     
     
 }

    return(
         <div className="flex justify-center gap-4 flex-wrap pt-4 mt-4">
        { notes.map((item:NoteType)=>{
            return (
                <div className="card flex flex-col flex-wrap rounded shadow-lg py-2 px-4 gap-2" key={item._id}>
        <div className="flex ">
          <div>
          <label htmlFor="title"></label>
            <input className="font-bold pt-2 text-xl"  type="text"  ref={edited===item._id ? inputRef : null} defaultValue={item.title}  readOnly={readOnly}   onChange={(e)=>setTitle(e.target.value)} placeholder="title"/>
            </div>
  
          <div className="dropdown">
            <button className="dropdown-btn">...</button>
            <div className="dropdown-menu">
               { 
        edited===item._id ?  <button  onClick={()=>handleSave(edited,title,note
          
          )}>
Save
        </button> :
  <button onClick={()=>handleEdit(item._id, item.title, item.description)}> Edit</button>
      }
         
        <button onClick={()=>handleDelete(item._id)}> Delete </button>
           
          </div>
            </div>
         
        </div>
         <label htmlFor="desc"></label>
            <textarea id='desc'  ref={edited===item._id ? textareaRef : null}  defaultValue={item.description} readOnly={edited!==item._id} onChange={(e)=>setNote(e.target.value)} placeholder="note"/>
        <div className="flex justify-between items-center mt-8">
        <div><p>
          {new Date(item.createdAt).toLocaleDateString('en-Us', {
            year:'numeric',
            month:"2-digit",
            day:"2-digit"
          })}
          </p></div>
      

        </div>
        </div>
            )
          })
        }
        </div>

    )
}
export default Note;