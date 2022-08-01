import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useReducer,
} from "react"
import { IMovie } from "../model/IMovies"
import { ActionTypes, reducer } from "./reducer"

const movieStates: {
    [key: string]: IMovie[]
} = {
    "movies-in-theaters": [],
    "movies-coming": [],
    "top-rated-india": [],
    "top-rated-movies": [],
    favourite: [],
}

const currentMovie: IMovie = {
    id: "",
    title: "",
    year: "",
    genres: [],
    ratings: [],
    poster: "",
    contentRating: "",
    duration: "",
    releaseDate: "",
    averageRating: 0,
    originalTitle: "",
    storyline: "",
    actors: [],
    imdbRating: 0,
    posterurl: "",
}

const initialState: {
    [key: string]: any
} = {
    ...movieStates,
    movie: { ...currentMovie },
    favouritePosters: [],
    filtered: null,
    alertMessage: "",
}

const StateContext = createContext(initialState)
const DispatchContext = createContext<
    React.Dispatch<{ type: string; payload?: unknown }> | undefined
>(undefined)

export const ContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}

export const useUIState = () => useContext(StateContext)
export const useUIDispatch = () => {
    const dispatch = useContext(DispatchContext)

    if (!dispatch) throw new Error("Use dispatch within a Dispatch Provider")

    const setAlert = useCallback(
        (message: string, time: number = 5000) => {
            dispatch({ type: ActionTypes.SET_ALERT, payload: message })
            setTimeout(() => dispatch({ type: ActionTypes.RESET_ALERT }), time)
        },
        [dispatch]
    )

    const getMovieLists = useCallback(
        (url: string, data: IMovie) =>
            dispatch({
                type: ActionTypes.GET_MOVIES,
                payload: {
                    url,
                    data,
                },
            }),
        [dispatch]
    )

    const setMovie = useCallback(
        (movie: IMovie) =>
            dispatch({ type: ActionTypes.SET_MOVIE, payload: movie }),
        [dispatch]
    )

    const resetMovie = useCallback(
        () =>
            dispatch({
                type: ActionTypes.RESET_MOVIE,
                payload: { ...currentMovie },
            }),
        [dispatch]
    )

    const loadFavourites = useCallback(
        () => dispatch({ type: ActionTypes.LOAD_FAVOURITES }),
        [dispatch]
    )

    const addToFavourites = useCallback(
        (poster: string, movie: IMovie) => {
            dispatch({
                type: ActionTypes.ADD_TO_FAVOURITES,
                payload: {
                    poster,
                    movie,
                },
            })
            setAlert("Movie Added to Favourites!")
        },
        [dispatch, setAlert]
    )

    const removeFromFavourites = useCallback(
        (poster: string) => {
            dispatch({
                type: ActionTypes.REMOVE_FROM_FAVOURITES,
                payload: poster,
            })
            setAlert("Movie Removed from Favourites!")
        },
        [dispatch, setAlert]
    )

    const filterMovies = useCallback(
        (url: string, toMatch: string) =>
            dispatch({
                type: ActionTypes.SEARCH_MOVIES,
                payload: { url, toMatch },
            }),
        [dispatch]
    )

    const resetFilteredMovies = useCallback(
        () => dispatch({ type: ActionTypes.RESET_SEARCH }),
        [dispatch]
    )

    return useMemo(
        () => ({
            getMovieLists,
            setMovie,
            resetMovie,
            loadFavourites,
            addToFavourites,
            removeFromFavourites,
            filterMovies,
            resetFilteredMovies,
            setAlert,
        }),
        [
            getMovieLists,
            setMovie,
            resetMovie,
            loadFavourites,
            addToFavourites,
            removeFromFavourites,
            filterMovies,
            resetFilteredMovies,
            setAlert,
        ]
    )
}
