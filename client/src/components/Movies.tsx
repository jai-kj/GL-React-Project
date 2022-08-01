import { useState } from "react"
import { Route, Routes } from "react-router-dom"

import Navbar from "./layout/Navbar"
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

    return (
        <div className='flex flex-col h-full'>
            <Navbar
                navLinks={navLinks}
                screen={activeScreen}
                setScreen={(index: number) => setActiceScreen(index)}
            />
            <div className='container mx-auto px-4 md:px-12 h-full overflow-y-auto'>
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
                </Routes>
            </div>
        </div>
    )
}

export default Movies
