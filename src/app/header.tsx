"use client"

// import SearchIcon from '@mui/icons-material/Search';
const Header=()=>{
 
    return(
        <div>
        <header className="flex justify-between p-4">
            <div>
   <h2 className="font-bold text-2xl text-slate-500 ">Notes</h2>
            </div>
         <div>
      {/* <form className="flex-1 relative">
        <div className='search-box'>
 <input type="text" placeholder="search notes..." className=" rounded bs-gray-100 text-2xl bg-slate-200 text-white px-3 py-2"/>
        </div>
           <button className='search-icon absolute'> <SearchIcon/></button>
      
        </form> */}
         </div>
  
        </header>
        </div>
    )
}
export default Header