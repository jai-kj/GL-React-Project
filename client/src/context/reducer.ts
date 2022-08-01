export const ActionTypes = {
    GET_MOVIES: "GET_MOVIES",
    SET_MOVIE: "SET_MOVIE",
    RESET_MOVIE: "RESET_MOVIE",
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

        default:
            return state
    }
}
