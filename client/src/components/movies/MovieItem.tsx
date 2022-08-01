import { useCallback } from "react"
import { Link } from "react-router-dom"
import { useUIDispatch, useUIState } from "../../context/context"
import { MovieItemProp } from "../../model/IMovies"

const MovieItem = ({ movie }: MovieItemProp) => {
    const { favouritePosters } = useUIState()
    const { setMovie, addToFavourites, removeFromFavourites } = useUIDispatch()

    const isAddedToFavourites = useCallback(
        () => favouritePosters?.includes(movie?.poster),
        [favouritePosters, movie?.poster]
    )

    const handleAddToFavourites = useCallback(() => {
        console.log("isAddedToFavourites :", isAddedToFavourites())
        isAddedToFavourites()
            ? removeFromFavourites(movie?.poster)
            : addToFavourites(movie?.poster, movie)
    }, [isAddedToFavourites, removeFromFavourites, addToFavourites, movie])

    return (
        <div className='w-full h-80 border border-stone-200'>
            <Link
                to={`/movie/${movie?.id}`}
                onClick={() => setMovie(movie)}
                className='cursor-pointer'
            >
                <div className='w-full h-60'>
                    <img
                        src={`http://localhost:5000/img/${movie?.poster}`}
                        alt=''
                        className='w-full h-full'
                    />
                </div>
            </Link>
            <div className='w-full h-20 flex flex-col items-center justify-evenly'>
                <Link
                    to={`/movie/${movie?.id}`}
                    onClick={() => setMovie(movie)}
                    className='hover:scale-105 transition-all cursor-pointer'
                >
                    <p className='font-semibold text-center'>{movie?.title}</p>
                </Link>
                <p
                    className='text-xs flex flex-row items-center space-x-0.5 cursor-pointer text-center'
                    onClick={handleAddToFavourites}
                >
                    <span>
                        {isAddedToFavourites()
                            ? "Remove from Favourites"
                            : "Add to Favourites"}
                    </span>
                    <span
                        className={`text-sm cursor-pointer ${isAddedToFavourites()
                            ? "text-red-500 hover:text-stone-400"
                            : "text-stone-400 hover:text-red-500"
                            }`}
                    >
                        &#10084;
                    </span>
                </p>
            </div>
        </div>
    )
}

export default MovieItem
