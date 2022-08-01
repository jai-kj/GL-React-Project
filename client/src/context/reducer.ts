import { IMovie } from "../model/IMovies"

export const ActionTypes = {
    GET_MOVIES: "GET_MOVIES",
    SET_MOVIE: "SET_MOVIE",
    RESET_MOVIE: "RESET_MOVIE",
    LOAD_FAVOURITES: "LOAD_FAVOURITES",
    ADD_TO_FAVOURITES: "ADD_TO_FAVOURITES",
    REMOVE_FROM_FAVOURITES: "REMOVE_FROM_FAVOURITES",
    SEARCH_MOVIES: "SEARCH_MOVIES",
    RESET_SEARCH: "RESET_SEARCH",
    SET_ALERT: "SET_ALERT",
    RESET_ALERT: "RESET_ALERT",
}

export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case ActionTypes.GET_MOVIES:
            return {
                ...state,
                [action?.payload?.url]: action?.payload?.data,
            }

        case ActionTypes.SET_MOVIE:
        case ActionTypes.RESET_MOVIE:
            return { ...state, movie: action?.payload }

        case ActionTypes.LOAD_FAVOURITES: {
            const favouritePosters = JSON.parse(
                localStorage.getItem("favourite-posters") ?? "[]"
            )
            const favourite = JSON.parse(
                localStorage.getItem("favourite") ?? "[]"
            )

            return { ...state, favouritePosters, favourite }
        }

        case ActionTypes.ADD_TO_FAVOURITES: {
            const favouritePosters = [
                ...state?.favouritePosters,
                action?.payload?.poster,
            ]
            const favourite = [...state?.favourite, action?.payload?.movie]

            localStorage.setItem(
                "favourite-posters",
                JSON.stringify(favouritePosters)
            )
            localStorage.setItem("favourite", JSON.stringify(favourite))

            return {
                ...state,
                favouritePosters,
                favourite,
            }
        }

        case ActionTypes.REMOVE_FROM_FAVOURITES: {
            const index = state?.favouritePosters?.indexOf(action?.payload)
            const favouritePosters = state?.favouritePosters
            const favourite = state?.favourite

            if (index > -1) {
                favouritePosters?.splice(index, 1)
                favourite?.splice(index, 1)
            }

            localStorage.setItem(
                "favourite-posters",
                JSON.stringify(favouritePosters)
            )
            localStorage.setItem("favourite", JSON.stringify(favourite))

            return { ...state, favouritePosters, favourite }
        }

        case ActionTypes.SEARCH_MOVIES: {
            const filtered = state[action?.payload?.url]?.filter(
                (movie: IMovie) => {
                    const regex = new RegExp(`${action.payload?.toMatch}`, "gi")
                    return (
                        movie?.title?.match(regex) || movie?.year?.match(regex)
                    )
                }
            )
            return { ...state, filtered }
        }
        case ActionTypes.RESET_SEARCH:
            return { ...state, filtered: null }

        case ActionTypes.SET_ALERT:
            return { ...state, alertMessage: action.payload }

        case ActionTypes.RESET_ALERT:
            return { ...state, alertMessage: "" }

        default:
            return state
    }
}
