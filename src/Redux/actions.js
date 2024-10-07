import axios from "axios"
const GSTOCK_URL = import.meta.env.VITE_GSTOCK_URL
const USER_URL = import.meta.env.VITE_USER_URL

export const GET_TRANSACTION_CARDS = "GET_TRANSACTION_CARDS"

export const GET_PRODUCTS_STOCKS = "GET_PRODUCTS_STOCKS"

export const GET_TRANSACTIONS = "GET_TRANSACTIONS"

export const GET_SUPPLIERS = "GET_SUPPLIERS"

export const GET_CLIENTS = "GET_CLIENTS"

export const GET_SELLERS = "GET_SELLERS"

export const GET_LOGIN_GOOGLE = "GET_LOGIN_GOOGLE"
export const GET_LOGOUT = "GET_LOGOUT"

export const PUT_PRODUCT_STOCKS_SUCCES = "PUT_PRODUCT_STOCKS_SUCCES"
export const PUT_PRODUCT_STOCKS_REQUEST = "PUT_PRODUCT_STOCKS_REQUEST"
export const PUT_PRODUCT_STOCKS_FAILURE = "PUT_PRODUCT_STOCKS_FAILURE"

export const PUT_PRODUCT_DETAIL_SUCCES = "PUT_PRODUCT_DETAIL_SUCCES"
export const PUT_PRODUCT_DETAIL_REQUEST = "PUT_PRODUCT_DETAIL_REQUEST"
export const PUT_PRODUCT_DETAIL_FAILURE = "PUT_PRODUCT_DETAIL_FAILURE"

export const DELETE_PRODUCTS_SUCCESS = "DELETE_PRODUCTS_SUCCESS"
export const DELETE_PRODUCTS_REQUEST = "DELETE_PRODUCTS_REQUEST"
export const DELETE_PRODUCTS_FAILURE = "DELETE_PRODUCTS_FAILURE"

const getHeaders = () => ({
    headers: {
        //"Authorization": `Bearer ${localStorage.getItem('access_token')}`
        //localhost para dev
        //si estan en localhost comenten la linea de arriba y descomenten la de abajo
        //y no sigan el flujo de autorizacion porque los va a llevar a dev
        //vayan directamente a http://localhost/home
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlemVxdWllbG1hcmNlbDJAZ21haWwuY29tIiwiYXVkIjoicHVibGljIiwiaXNzIjoiZ3N0b2NrLmZyYW5jZWxzb2Z0LmNvbSIsImV4cCI6MTc1OTg0NDk1OH0.fM46jlTddXv862Q12jyYKip3OGxjpNDSXm6g4cc4mYk"
    }}
);

const handleUnauthorizedError = (error) => {
    if (error.response && error.response.status === 401) {
        window.location.href = `${USER_URL}/refresh_token`;
    }
};

export const getProductsStocks = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${GSTOCK_URL}/product/stock`, getHeaders());
            const products = response.data.result.content
            console.log(response);
            dispatch({
                type: GET_PRODUCTS_STOCKS,
                payload: products
            })
        } catch(error){
            console.error("Error al obtener el stock", error)
            handleUnauthorizedError(error)
        }
    }
}

export const getTransactions = (filters) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${GSTOCK_URL}/transaction`, {params: filters, ...getHeaders()});
            const transactions = response.data.result.content
            
            dispatch({
                type: GET_TRANSACTIONS,
                payload: transactions
            })
        } catch (error) {
            console.error("Error al obtener las transacciones", error)
            handleUnauthorizedError(error)
        }
    }
}

export const putProductStock = (stockDetail) => {
    return async function (dispatch) {
        dispatch({type: PUT_PRODUCT_STOCKS_REQUEST})
        try {
            const response = await axios.put(`${GSTOCK_URL}/product`, stockDetail, getHeaders())
            dispatch({
                type: PUT_PRODUCT_STOCKS_SUCCES,
                payload: response.data
            })
        } catch(error) {
            dispatch({ type: PUT_PRODUCT_STOCKS_FAILURE, payload: error.message });
            console.error("Error al cambiar los datos del producto", error)
        }
    }
}

export const putProductDetail = (productDetail) => {
    return async function (dispatch) {
        dispatch({type: PUT_PRODUCT_DETAIL_REQUEST})
        try {
            const response = await axios.put(`${GSTOCK_URL}/stock`, productDetail, getHeaders())
            dispatch({
                type: PUT_PRODUCT_DETAIL_SUCCES,
                payload: response.data
            }) 
        } catch(error) {
            dispatch({ type: PUT_PRODUCT_DETAIL_FAILURE, payload: error.message });
            console.error("Error al cambiar los datos del producto", error)
        }
    }
}

export const deleteProducts = (productId) => {
    return async function (dispatch) {
        try {
            dispatch({type: DELETE_PRODUCTS_REQUEST})
            await axios.delete(`${GSTOCK_URL}/product`, {params: {"product_id": productId}, ...getHeaders()});

            dispatch({
                type: DELETE_PRODUCTS_SUCCESS,
                payload: productId
            })
        } catch (error) {
            dispatch({
                type: DELETE_PRODUCTS_FAILURE,
                payload: error.message
            })
        }
    }
}

export const getTransactionCards = (filters) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${GSTOCK_URL}/transaction/cards`, {params: filters, ...getHeaders()});
            const cards = response.data.result;

            dispatch({
                type: GET_TRANSACTION_CARDS,
                payload: cards
            })
        } catch (error) {
            console.error("Error al obtener las tarjetas", error)
            handleUnauthorizedError(error)
        }
    }
}

export const getSuppliers = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${GSTOCK_URL}/supplier?page=1`, getHeaders());
            const suppliers = response.data.result.content
            dispatch({
                type: GET_SUPPLIERS,
                payload: suppliers
            })
        } catch (error){
            console.error("Error al obtener los proveedores", error)
            handleUnauthorizedError(error)
        }
    }
}

export const getClients = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${GSTOCK_URL}/client?page=1`, getHeaders());
            const clients = response.data.result.content
            dispatch({
                type: GET_CLIENTS,
                payload: clients
            })
        } catch (error){
            console.error("Error al obtener los proveedores", error)
            handleUnauthorizedError(error)
        }
    }
}

export const getSellers = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${GSTOCK_URL}/seller?page=1`, getHeaders());
            const sellers = response.data.result.content
            dispatch({
                type: GET_SELLERS,
                payload: sellers
            })
        } catch (error){
            console.error("Error al obtener los proveedores", error)
            handleUnauthorizedError(error)
        }
    }
}

export const postBuyTransaction = async (cart) => {
    try {
        const response = await axios.post(`${GSTOCK_URL}/transaction/buy`, cart, getHeaders());
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al cargar la compra");
    }
};

export const postSellTransaction = async (cart) => {
    try {
        const response = await axios.post(`${GSTOCK_URL}/transaction/sell`, cart, getHeaders());
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al cargar la venta");
    }
};

export const putBuyTransaction = async (cart) => {
    try {
        const response = await axios.put(`${GSTOCK_URL}/transaction/buy`, cart, getHeaders());
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al cargar la compra");
    }
};

export const getLoginGoogle = () => {
    window.location.href = `${USER_URL}/login/google`;
};

export const getLogout = () => {
    window.location.href = `${USER_URL}/logout`;
};
