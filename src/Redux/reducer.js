import { GET_PRODUCTS_STOCKS, 
        PUT_PRODUCT_STOCKS_FAILURE, 
        PUT_PRODUCT_STOCKS_REQUEST, 
        PUT_PRODUCT_STOCKS_SUCCES,
        PUT_PRODUCT_DETAIL_FAILURE,
        PUT_PRODUCT_DETAIL_REQUEST,
        PUT_PRODUCT_DETAIL_SUCCES } from "./actions"

const initialState = {
    products: [],
    resource: null,
    loading: false,
    error: null
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_STOCKS:
            return { ...state, products: [...action.payload]}
        case PUT_PRODUCT_STOCKS_SUCCES:
            return { ...state, loading: false, resource: action.payload }
        case PUT_PRODUCT_STOCKS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case PUT_PRODUCT_STOCKS_REQUEST:
            return { ...state, loading: true, error: null }
        case PUT_PRODUCT_DETAIL_SUCCES:
            return { ...state, loading: false, resource: action.payload }
        case PUT_PRODUCT_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case PUT_PRODUCT_DETAIL_REQUEST:
            return { ...state, loading: true, error: null }
        default: return { ...state }
    }
}

export default rootReducer;