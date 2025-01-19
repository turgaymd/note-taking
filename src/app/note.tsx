'use client';
import { useRef, useState } from "react";
import EditIcon from '@mui/icons-material/Edit'; 
import DeleteIcon from '@mui/icons-material/Delete'; 
import SaveIcon from '@mui/icons-material/Save'; 

const Note=({note, name, setNote, setName, notes,  setNotes}: any)=>{
    const months=
    [
      'January', 'February','March','April','May','June','July','August','September','October','November','December'
    ]
    const date=new Date()
    const year=date.getFullYear()
    const month=months[date.getMonth()]
    const day=date.getDate()
    const [edited, setEdited] = useState<number | null>(null);
    const [readOnly, setReadOnly]=useState(true)
    const inputRef=useRef<HTMLInputElement | null>(null);
    const textareaRef=useRef<HTMLTextAreaElement | null>(null);
    const handleDelete=(id:number)=>{
        setNotes(notes.filter((note:any)=>note.id!==id))
 }

 const handleEdit=(id:number, name:any, description:any)=>{
    setReadOnly(false)
    setTimeout(() => document.getElementById(`input-${id}`)?.focus(), 0);
    setEdited(id)
    setName(name)
    setNote(description)
 }
 
 const handleSave=(id:any, name:any, note:any,)=>{
   setReadOnly(true)
      setNotes(
        notes.map((item:any)=>
        item.id===id ? {
          ...item,    
          text:name,
          description:note,
        }   : item 
        ))
        setEdited(null)
        setName('')
        setNote('')
     
     
 }

    return(
         <div className="flex justify-center gap-4 flex-wrap pt-4 mt-4">
        { notes.map((item:any)=>{
            return (
                <div className="card flex flex-col flex-wrap rounded shadow-lg py-2 px-4 gap-2" key={item.id}>
        <div>

            <input className="font-bold pt-2 text-xl"  type="text"  ref={edited===item.id ? inputRef : null} defaultValue={item.text}  readOnly={readOnly} onChange={(e)=>setName(e.target.value)}/>
            </div>
        <div>
            <textarea id='desc'  ref={edited===item.id ? textareaRef : null}  defaultValue={item.description} readOnly={readOnly} onChange={(e)=>setNote(e.target.value)} />
        </div>
        <div className="flex justify-between items-center mt-8">
        <div><p className="text-slate-500">{day} {month} {year}</p></div>
        <div className="text-end flex justify-end gap-1">
        
      {
        edited===item.id ?  <button  onClick={()=>handleSave(edited,name,note
          
          )}>

<SaveIcon/>
        </button> :
  
   <button>
       < EditIcon onClick={()=>handleEdit(item.id, item.text, item.description)}/>   
    </button>
      }
        <button>
        <DeleteIcon onClick={()=>handleDelete(item.id)}/>
        </button>
     
        </div>
        </div>
        </div>
            )
          })
        }
        </div>

    )
}
export default Note;