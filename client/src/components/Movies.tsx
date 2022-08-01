import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { useUIDispatch } from "../context/context"

import Navbar from "./layout/Navbar"
import Alert from "./layout/Alert"
import MovieInfo from "./movies/MovieInfo"
import MoviesList from "./movies/MoviesList"

const navLinks = [
    { url: "movies-in-theaters", name: "Movies In Theatres" },
    { url: "movies-coming", name: "Coming Soon" },
    { url: "top-rated-india", name: "Top Rated Indian" },
    { url: "top-rated-movies", name: "Top Rated Movies" },
    { url: "favourite", name: "Favourites" },
]

const Movies = () => {
    const [activeScreen, setActiceScreen] = useState(0)
    const { loadFavourites } = useUIDispatch()
    useEffect(() => loadFavourites(), [loadFavourites])

    return (
        <div className='flex flex-col h-full'>
            <Alert />
            <Navbar
                navLinks={navLinks}
                screen={activeScreen}
                setScreen={(index: number) => setActiceScreen(index)}
            />
            <div className='container mx-auto px-4 md:px-12 h-full overflow-y-scroll'>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <MoviesList
                                name={navLinks[activeScreen]?.name}
                                url={navLinks[activeScreen]?.url}
                            />
                        }
                    />
                    <Route path='/movie/:id' element={<MovieInfo />} />
                </Routes>
            </div>
        </div>
    )
}

export default Movies
