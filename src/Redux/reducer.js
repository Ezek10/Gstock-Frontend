import { GET_PRODUCTS_STOCKS } from "./actions"

const initialState = {
    products: {},
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_STOCKS:
            return { ...state, products: [...action.payload]}
        default: return { ...state }
    }
}

export default rootReducer;