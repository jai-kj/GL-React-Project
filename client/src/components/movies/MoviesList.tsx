import { useEffect } from "react"
import { useUIState } from "../../context/context"
import useFetch from "../../hooks/useFetch"

import { INavLink } from "../../model/IMovies"

const MoviesList = ({ name, url }: INavLink) => {
    const state = useUIState()
    const { loading, error, fetchData } = useFetch(true)

    useEffect(() => {
        if (state[url]?.length || url === 'favourite') return
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
        <div className='h-full py-6'>
            {name} - {url}
        </div>
    )
}

export default MoviesList
