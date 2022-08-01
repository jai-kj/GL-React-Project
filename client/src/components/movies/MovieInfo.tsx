import { useCallback, useMemo } from "react"
import { Link } from "react-router-dom"
import { useUIDispatch, useUIState } from "../../context/context"

const MovieInfo = () => {
    const { movie, favouritePosters } = useUIState()
    const { resetMovie, addToFavourites, removeFromFavourites } =
        useUIDispatch()

    const isAddedToFavourites = useCallback(
        () => favouritePosters?.includes(movie?.poster),
        [favouritePosters, movie?.poster]
    )

    const handleAddToFavourites = useCallback(() => {
        isAddedToFavourites()
            ? removeFromFavourites(movie?.poster)
            : addToFavourites(movie?.poster, movie)
    }, [isAddedToFavourites, removeFromFavourites, addToFavourites, movie])

    const movieDuration = useMemo(() => {
        const time = movie?.duration?.slice(2, 5)
        if (!time || Number.isNaN(time)) return `0`

        const hrs = Math.floor(parseInt(time) / 60)
        const minutes = parseInt(time) % 60

        return `${hrs} ${hrs === 1 ? "hr" : "hrs"} ${minutes > 0 ? `${minutes} minutes` : ""
            }`
    }, [movie?.duration])

    return (
        <div className='w-full h-full flex flex-col py-4'>
            <div className='border-b border-stone-300 h-12 flex'>
                <Link
                    to='/'
                    onClick={() => resetMovie()}
                    className='h-10 border border-stone-500 rounded-md hover:border-blue-500 hover:bg-blue-500 hover:text-white flex items-center px-4'
                >
                    <span>&#8592; Back</span>
                </Link>
            </div>
            <div className='flex flex-col h-[calc(100%_-_3rem)] md:flex-row'>
                <div className='w-full flex flex-col items-center md:items-start md:w-1/4 py-4'>
                    <div className='w-5/6 h-auto'>
                        <img
                            src={`http://localhost:5000/img/${movie?.poster}`}
                            alt=''
                            className='w-full h-full'
                        />
                    </div>
                    <p
                        className='text-base flex flex-row items-center space-x-0.5 cursor-pointer text-center p-2'
                        onClick={handleAddToFavourites}
                    >
                        <span>
                            {isAddedToFavourites()
                                ? "Remove from Favourites"
                                : "Add to Favourites"}
                        </span>
                        <span
                            className={`text-xl cursor-pointer ${isAddedToFavourites()
                                ? "text-red-500 hover:text-stone-400"
                                : "text-stone-400 hover:text-red-500"
                                }`}
                        >
                            &#10084;
                        </span>
                    </p>
                </div>
                <div className='w-full md:w-3/4 text-stone-800 p-4'>
                    <h2 className='text-3xl font-bold text-center md:text-left mb-4'>
                        {movie?.title} ({movie?.year})
                    </h2>
                    <div className='flex flex-col space-y-2.5'>
                        <div className='flex'>
                            <div className='w-full md:w-1/5 font-semibold'>IMDB Rating</div>
                            <div className='w-full md:w-4/5'>
                                {movie?.imdbRating}
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='w-full md:w-1/5 font-semibold'>
                                Content Rating
                            </div>
                            <div className='w-full md:w-4/5'>
                                {movie?.contentRating}
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='w-full md:w-1/5 font-semibold'>
                                Average Rating
                            </div>
                            <div className='w-full md:w-4/5'>
                                {movie?.averageRating}
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='w-full md:w-1/5 font-semibold'>Duration</div>
                            <div className='w-full md:w-4/5'>
                                {movieDuration}
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='w-full md:w-1/5 font-semibold'>Genres</div>
                            <div className='w-full md:w-4/5'>
                                {movie?.genres?.length
                                    ? movie?.genres
                                        ?.map((genre: string) => genre)
                                        ?.join(", ")
                                    : ""}
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='w-full md:w-1/5 font-semibold'>Actors</div>
                            <div className='w-full md:w-4/5'>
                                {movie?.actors?.length
                                    ? movie?.actors
                                        ?.map((actor: string) => actor)
                                        ?.join(", ")
                                    : ""}
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='w-full md:w-1/5 font-semibold'>Release Date</div>
                            <div className='w-full md:w-4/5'>
                                {movie?.releaseDate
                                    ? new Date(
                                        movie?.releaseDate
                                    )?.toDateString()
                                    : ""}
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2 md:flex-row md:space-y-0'>
                            <div className='w-full md:w-1/5 font-semibold'>Storyline</div>
                            <div className='w-full md:w-4/5'>
                                {movie?.storyline}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieInfo
