"use client"

import SearchIcon from '@mui/icons-material/Search';
import { useContext} from 'react';
import { NoteContext } from '../../NoteContext';
import axios from 'axios';
import { ApiContext } from '../../ApiContext';
const Header=()=>{
 const {apiUrl}=useContext(ApiContext)
 const {setNotes}=useContext(NoteContext)
 const handleSearch=async (e:React.FormEvent)=>{
        e.preventDefault()
    const query=(e.target as HTMLFormElement)[0] as HTMLInputElement
   const {data}= await axios.get(`${apiUrl}/api/search?keyword=${query.value}`)
   setNotes(data)

 }
    return(
        <div>
        <header className="flex justify-between p-4">
            <div>
   <h2 className="font-bold text-2xl text-slate-500 ">Notes</h2>
            </div>
         <div>
      <form className="flex-1 relative" onSubmit={handleSearch}>
        <div className='search-box'>
 <input type="text" placeholder="search notes..." className=" rounded-lg text-2xl border border-gray-300 px-3 py-2"/>
        </div>
           <button className='search-icon absolute text-gray-500' aria-label="search"> <SearchIcon /></button>
      
        </form>
         </div>
        </header>
        </div>
    )
}
export default Header