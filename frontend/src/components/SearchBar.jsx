import { useState } from "react"
import { useDispatch } from "react-redux"
import { getFilterProductsThunks } from "../redux/thunks/productsThunk"

export default function SearchBar(){
    const dispatch = useDispatch()
    const [query, setQuery] = useState("")

    const handleSearch =()=>{
        dispatch(getFilterProductsThunks(query))
        setQuery("")
    }

    return (
        <div className="border-2 w-full flex  rounded-lg border-purple-primary ">
            <input value={query} onChange={(e)=> setQuery(e.target.value)} type="text" className="outline-none w-full px-2" placeholder="Search here" />
            <button onClick={handleSearch} className="bg-purple-primary text-white text-sm px-3 rounded-r-md cursor-pointer">Search</button>
        </div>
    )
}