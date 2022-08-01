import { useEffect } from "react"
import useFetch from "../../hooks/useFetch"

import { useUIState } from "../../context/context"

import { IMovie, INavLink } from "../../model/IMovies"
import MovieItem from "./MovieItem"
import Loader from "../layout/Loader"

const MoviesList = ({ name, url }: INavLink) => {
    const state = useUIState()
    const { loading, error, fetchData } = useFetch(true)

    useEffect(() => {
        if (state[url]?.length || url === "favourite") return
        console.count(`Fetch api: `)
        fetchData(
            {
                method: "GET",
                url: `/${url}`,
                params: {
                    _sort: "id",
                    _order: "year",
                },
            },
            url
        )
    }, [fetchData, url, state])

    return (
        <div className='h-full'>
            {loading ? (
                <Loader />
            ) : !error && state[url]?.length ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-items-center gap-8 py-8'>
                    {state[url]?.map((movie: IMovie, index: number) => (
                        <MovieItem movie={movie} key={index} />
                    ))}
                </div>
            ) : (
                <p className='py-4'>
                    {error
                        ? "Internal Server Error. Please Reload the window!"
                        : "No records found to display!"}
                </p>
            )}
        </div>
    )
}

export default MoviesList
