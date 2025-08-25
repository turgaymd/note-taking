'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Note from "./note";
import {Modal, ModalBody, ModalContent, ModalHeader, useDisclosure} from "@nextui-org/modal"
import AddIcon from '@mui/icons-material/Add';

const Notes=()=>{
    const [title, setTitle]=useState('')
    const [note, setNote]=useState('')
    const {isOpen, onOpen, onOpenChange, onClose}=useDisclosure()
    const [notes, setNotes]=React.useState([]);

  useEffect(()=>{
    // localStorage.removeItem('notes')
    const data=localStorage.getItem('notes');
    if(data){
        const response= JSON.parse(data) 
        setNotes(response)
    }   
}, [])
    useEffect(()=>{
        const getNotes=async()=>{
          const results=await axios.get('http://localhost:5000/api/')
        setNotes(results.data)
        }
        getNotes()
      
        localStorage.setItem('notes',JSON.stringify(notes))
       },[notes])

    const handleForm=async (e:any)=>{
        e.preventDefault();
        
        try{
const results= await axios.post('http://localhost:5000/api/notes/', {title:title, description:note},  {
    headers:{
        'Content-Type':'application/json',
    }
})
    if(title.trim()){    
            setNotes([...notes, results.data])      
            setTitle('')
            setNote('')
            onClose()
        }
        }
        catch(err){
           console.log(err)
        }
    }
    return(
        <div>
                  <div className="text-center add">
                   <button type="submit" className="outline-none text-white" onClick={onOpen}>
                    <AddIcon/>
                   </button>
                   </div>
             
        <Note  title={title} setTitle={setTitle} note={note} notes={notes} setNotes={setNotes} setNote={setNote}/>

        <div className="pt-8 text-center flex justify-center align-center" >
            
             <Modal isOpen={isOpen} onOpenChange={onOpenChange}>                    
                    <ModalContent>                      
                                   <ModalHeader>
                            Create Note
                        </ModalHeader>
                    <ModalBody>

                    <form  onSubmit={handleForm} className="flex flex-col gap-4  ">
                            <label>
                              <input type="text" className="w-full outline-none rounded bg-gray-100 py-2 px-3" placeholder="Title"  value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                            </label>
                            <label>
                                <textarea cols={9} rows={5} placeholder="Take a note"  className="bg-gray-100 outline-none rounded px-4 py-2 w-full" value={note} onChange={(e)=>setNote(e.target.value)}/>
                            </label>
                            <div className="text-center pb-5"> 
                                 <button type="submit" className="bg-blue-500 rounded outline-none py-2 px-8 text-white">Add</button>
                                 </div>
                           </form>

                    </ModalBody>
                         
                         
                 
                    {/* <ModalFooter>
                    <button className="" onClick={()=>setOpen(false)}>Close</button>
                    </ModalFooter> */}
                    </ModalContent>
                    </Modal>

        </div>
                

</div>     
     
    )
}
export default Notes;