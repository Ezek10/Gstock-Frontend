import { GET_PRODUCTS_STOCKS, 
        PUT_PRODUCT_STOCKS_FAILURE, 
        PUT_PRODUCT_STOCKS_REQUEST, 
        PUT_PRODUCT_STOCKS_SUCCES,
        PUT_PRODUCT_DETAIL_FAILURE,
        PUT_PRODUCT_DETAIL_REQUEST,
        PUT_PRODUCT_DETAIL_SUCCES, 
        DELETE_PRODUCTS_SUCCESS,
        DELETE_PRODUCTS_REQUEST,
        DELETE_PRODUCTS_FAILURE,
        GET_TRANSACTIONS,
        GET_TRANSACTION_CARDS,
        GET_SUPPLIERS,
        GET_CLIENTS} from "./actions"

const initialState = {
    products: [],
    resource: null,
    loading: false,
    error: null,
    transactions: [], 
    cards: {},
    suppliers: [],
    clients: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_STOCKS:
            return { ...state, products: [...action.payload]}

        case GET_TRANSACTIONS:
            return {...state, transactions: [...action.payload]}

        case GET_TRANSACTION_CARDS:
            return {...state, cards: {...action.payload}}

        case GET_SUPPLIERS:
            return {...state, suppliers: [...action.payload]}

        case GET_CLIENTS:
            return {...state, clients: [...action.payload]}

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

        case DELETE_PRODUCTS_SUCCESS:
            return { ...state, loading: false, products: state.products.filter(product => product.id !== action.payload)}
        case DELETE_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload}
        case DELETE_PRODUCTS_REQUEST:
            return { ...state, loading: true}
  
        default: return { ...state }
    }
}

export default rootReducer;