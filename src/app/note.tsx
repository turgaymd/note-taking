'use client';
import { useRef, useState } from "react";
// import EditIcon from '@mui/icons-material/Edit'; 
// import DeleteIcon from '@mui/icons-material/Delete'; 
// import SaveIcon from '@mui/icons-material/Save'; 
import axios from "axios"
const Note=({note, name, setNote, setTitle, notes,  setNotes}: any)=>{
    // const months=
    // [
    //   'January', 'February','March','April','May','June','July','August','September','October','November','December'
    // ]
    // const date=new Date()
    // const year=date.getFullYear()
    // const month=months[date.getMonth()]
    // const day=date.getDate()
    const [edited, setEdited] = useState<number | null>(null);
    const [readOnly, setReadOnly]=useState(true)
    const inputRef=useRef<HTMLInputElement | null>(null);
    const textareaRef=useRef<HTMLTextAreaElement | null>(null);


    const handleDelete=async (id:number)=>{
      console.log(id)
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers:{
          'Content-Type':"application/json"
        }
      })
        setNotes(notes.filter((note:any)=>note.id!==id))
 }

 const handleEdit=async(id:number, title:any, description:any)=>{
      setReadOnly(false)
 
    setEdited(id)
    setTitle(title)
    setNote(description)
       setTimeout(()=>{
        textareaRef.current?.focus()
       })
 }
 
 const handleSave=async(id:any, title:any, description:any,)=>{
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
      notes.map((item:any)=>item._id===id ? { ...item, title,description}   : item ))
      setEdited(null)
      setTitle('')
      setNote('')
     
     
 }

    return(
         <div className="flex justify-center gap-4 flex-wrap pt-4 mt-4">
        { notes.map((item:any)=>{
            return (
                <div className="card flex flex-col flex-wrap rounded shadow-lg py-2 px-4 gap-2" key={item._id}>
        <div className="flex ">
          <div>
          <label htmlFor="title"></label>
            <input className="font-bold pt-2 text-xl"  type="text"  ref={edited===item._id ? inputRef : null} defaultValue={item.title}  readOnly={true}   onChange={(e)=>setTitle(e.target.value)} placeholder="title"/>
            </div>
  
          <div className="dropdown">
            <button className="dropdown-btn">...</button>
            <div className="dropdown-menu">
               { 
        edited===item._id ?  <button  onClick={()=>handleSave(edited,name,note
          
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