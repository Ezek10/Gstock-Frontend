import { GET_PRODUCTS_STOCKS, 
        GET_CURRENT_USER,
        PUT_PRODUCT_STOCKS_FAILURE, 
        PUT_PRODUCT_STOCKS_REQUEST, 
        PUT_PRODUCT_STOCKS_SUCCES,
        PUT_PRODUCT_DETAIL_FAILURE,
        PUT_PRODUCT_DETAIL_REQUEST,
        PUT_PRODUCT_DETAIL_SUCCES, 
        PUT_TRANSACTION_BUY_FAILURE,
        PUT_TRANSACTION_BUY_REQUEST,
        PUT_TRANSACTION_BUY_SUCCES, 
        PUT_TRANSACTION_SELL_FAILURE,
        PUT_TRANSACTION_SELL_REQUEST,
        PUT_TRANSACTION_SELL_SUCCES, 
        PUT_USER_FAILURE,
        PUT_USER_REQUEST,
        PUT_USER_SUCCES, 
        DELETE_PRODUCTS_SUCCESS,
        DELETE_PRODUCTS_REQUEST,
        DELETE_PRODUCTS_FAILURE,
        DELETE_USER_SUCCESS,
        DELETE_USER_REQUEST,
        DELETE_USER_FAILURE,
        DELETE_TRANSACTION_SUCCES,
        DELETE_TRANSACTION_REQUEST,
        DELETE_TRANSACTION_FAILURE,
        GET_TRANSACTIONS,
        GET_TRANSACTION_CARDS,
        GET_SUPPLIERS,
        GET_CLIENTS,
        GET_SELLERS,
        GET_USERS,
        GET_LOGO
        } from "./actions"

const initialState = {
    products: [],
    resource: null,
    loading: false,
    error: null,
    transactions: [], 
    cards: {},
    suppliers: [],
    clients: [],
    sellers: [],
    users: [],
    logo: null,
    currentUser: {},
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_USER:
            return { ...state, currentUser: action.payload[0]}

        case GET_LOGO:
            return { ...state, logo: action.payload}

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

        case GET_SELLERS:
            return {...state, sellers: [...action.payload]}
        
        case GET_USERS:
            return {...state, users: [...action.payload]}

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

        case PUT_TRANSACTION_BUY_SUCCES:
            return { ...state, loading: false, resource: action.payload }
        case PUT_TRANSACTION_BUY_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case PUT_TRANSACTION_BUY_REQUEST:
            return { ...state, loading: true, error: null }

        case PUT_TRANSACTION_SELL_SUCCES:
            return { ...state, loading: false, resource: action.payload }
        case PUT_TRANSACTION_SELL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case PUT_TRANSACTION_SELL_REQUEST:
            return { ...state, loading: true, error: null }

        case PUT_USER_SUCCES:
            return { ...state, loading: false, resource: action.payload }
        case PUT_USER_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case PUT_USER_REQUEST:
            return { ...state, loading: true, error: null }

        case DELETE_PRODUCTS_SUCCESS:
            return { ...state, loading: false, products: state.products.filter(product => product.id !== action.payload)}
        case DELETE_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload}
        case DELETE_PRODUCTS_REQUEST:
            return { ...state, loading: true}

        case DELETE_USER_SUCCESS:
            return { ...state, loading: false, users: state.users.filter(user => user.id !== action.payload)}
        case DELETE_USER_FAILURE:
            return { ...state, loading: false, error: action.payload}
        case DELETE_USER_REQUEST:
            return { ...state, loading: true}
        
        case DELETE_TRANSACTION_SUCCES:
            return { ...state, loading: false, transactions: state.transactions.filter(transaction => transaction.id !== action.payload)}
        case DELETE_TRANSACTION_FAILURE:
            return { ...state, loading: false, error: action.payload}
        case DELETE_TRANSACTION_REQUEST:
            return { ...state, loading: true}

        default: return { ...state }
    }
}

export default rootReducer;