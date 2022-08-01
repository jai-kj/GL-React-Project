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

const initialState: {
    [key: string]: any
} = {
    ...movieStates
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

    return useMemo(() => ({ getMovieLists }), [getMovieLists])
}
