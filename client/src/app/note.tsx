'use client';
import React, { useRef, useState } from "react";
import { useContext } from "react";
import { ApiContext } from "../../ApiContext";
import {Modal, ModalBody, ModalContent, ModalHeader, useDisclosure} from "@nextui-org/modal"
// import EditIcon from '@mui/icons-material/Edit'; 
// import DeleteIcon from '@mui/icons-material/Delete'; 
// import SaveIcon from '@mui/icons-material/Save'; 
import axios from "axios"
export type NoteType={
  _id:string,
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

    const [edited, setEdited] = useState<string | null>(null);
    const {isOpen, onOpen, onOpenChange, onClose}=useDisclosure()
    const inputRef=useRef<HTMLInputElement | null>(null);
    const textareaRef=useRef<HTMLTextAreaElement | null>(null);
    const {apiUrl}=useContext(ApiContext)

    const handleDelete=async (id:string)=>{
      console.log(id)
      await axios.delete(`${apiUrl}/api/notes/${id}`, {
        headers:{
          'Content-Type':"application/json"
        }
      })
        setNotes(notes.filter((note:NoteType)=>note._id!==id))
 }

 const handleEdit=async(id:string, title:string, description:string)=>{
    setEdited(id)
    setTitle(title)
    setNote(description)
    setTimeout(()=>{
    textareaRef.current?.focus()
       })
           onOpen()
 }
 
 const handleSave=async(id:string, title:string, description:string)=>{

    await axios.put(`${apiUrl}/api/notes/${id}`,{
    title,
    description
  },
{
  headers:{
    "Content-Type":"application/json",  
  }
}
)
      setNotes(
      notes.map((item:NoteType)=>item._id===id ? { ...item, title,description}   : item ))
      setEdited(null)
      setTitle('')
      setNote('')
      onClose()
 }
const handleSubmit=(e:React.FormEvent)=>{
  e.preventDefault()
  if (edited){
 handleSave(edited!,title,note)
  }
 
}
const handleClose=()=>{
  setEdited(null)
  setTitle('')
  setNote('')
}
    return(
         <div className="flex justify-center gap-4 flex-wrap pt-4 mt-4">
        { notes.map((item:NoteType)=>{
            return (
                <div className="card flex flex-col flex-wrap rounded shadow-lg py-2 px-4 gap-2" key={item._id}>
                   <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={handleClose}>                    
                    <ModalContent>                      
                                   <ModalHeader>
                            Edit Note
                        </ModalHeader>
                    <ModalBody>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <label>
                              <input type="text" className="w-full outline-none rounded bg-gray-100 py-2 px-3" placeholder={title}  value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                            </label>
                            <label>
                                <textarea cols={9} rows={5} placeholder="Take a note"  className="bg-gray-100 outline-none rounded px-4 py-2 w-full" value={note} onChange={(e)=>setNote(e.target.value)}/>
                            </label>
                            <div className="text-center pb-5"> 
                                 <button type="submit" className="bg-blue-500 rounded outline-none py-2 px-8 text-white">Update</button>
                                 </div>
                           </form>
                    </ModalBody>
                        </ModalContent>
                                        </Modal>
                         <div className="flex ">
            <div>
          <label htmlFor="title"></label>
            <input className="font-bold pt-2 text-xl"  type="text"  ref={edited===item._id ? inputRef : null} value={item.title}  readOnly={edited!==item._id}   onChange={(e)=>setTitle(e.target.value)} placeholder="title"/>
            </div>
              <div className="dropdown">
            <button className="dropdown-btn">...</button>
            <div className="dropdown-menu">
             
  <button onClick={()=>handleEdit(item._id, item.title, item.description)}> Edit</button>
  <button onClick={()=>handleDelete(item._id)}> Delete </button>
          </div>
            </div>
            </div>
         <label htmlFor="desc"></label>
            <textarea id='desc'  ref={edited===item._id ? textareaRef : null}  value={item.description} readOnly={edited!==item._id} onChange={(e)=>setNote(e.target.value)} placeholder="note"/>
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