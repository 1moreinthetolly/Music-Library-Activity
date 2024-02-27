import { useEffect, useState, Suspense } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import Spinner from './components/Spinner'
import './App.css'
import { createResource as fetchData } from './helper'


function App(){
    let [searchTerm, setSearchTerm] = useState('')
    let [message] = useState('Search for Music!')
    let [data, setData] = useState(null)

    useEffect(() => {
        if(searchTerm) {
            document.title=`${searchTerm} Music`
            console.log(fetchData(searchTerm))
            setData(fetchData(searchTerm))
    }
    }, [searchTerm])

    const handleSearch = (e, term) => {
        e.preventDefault()
        setSearchTerm(term)
    }

    const renderGallery = () => {
        if(data) {
            return (
                <Suspense fallback={<Spinner />}>
                    <Gallery data ={data} />
                </Suspense>
            )
        }
    }  

    return (
        <div className="App">
            <SearchBar handleSearch={handleSearch} />
            {message}
            {renderGallery()}
        </div>
    )
}    


export default App