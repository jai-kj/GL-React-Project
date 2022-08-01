import { Link } from "react-router-dom"
import { useUIDispatch } from "../../context/context"
import { MovieItemProp } from "../../model/IMovies"

const MovieItem = ({ movie }: MovieItemProp) => {
    const { setMovie } = useUIDispatch()

    return (
        <Link
            to={`/movie/${movie?.id}`}
            onClick={() => setMovie(movie)}
            className='w-full h-80 border border-stone-200 cursor-pointer hover:scale-105 transition-all'
        >
            <div className='w-full h-60'>
                <img
                    src={`http://localhost:5000/img/${movie?.poster}`}
                    alt=''
                    className='w-full h-full'
                />
            </div>
            <div className='w-full h-20 flex flex-col items-center justify-evenly'>
                <p className='font-semibold text-center'>{movie?.title}</p>
                <p className='text-xs flex flex-row items-center space-x-1'>
                    <span>Add to Favourites</span>
                    <span className='text-sm text-stone-400 cursor-pointer hover:text-red-500'>
                        &#10084;
                    </span>
                </p>
            </div>
        </Link>
    )
}

export default MovieItem
