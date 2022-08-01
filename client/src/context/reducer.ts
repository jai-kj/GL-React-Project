export const ActionTypes = {
    GET_MOVIES: "GET_MOVIES",
}

export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case ActionTypes.GET_MOVIES:
            return {
                ...state,
                [action?.payload?.url]: action?.payload?.data,
            }
        default:
            return state
    }
}
