import axios from "axios"
const URL = import.meta.env.VITE_URL_DEV

export const GET_TRANSACTION_CARDS = "GET_TRANSACTION_CARDS"

export const GET_PRODUCTS_STOCKS = "GET_PRODUCTS_STOCKS"

export const GET_TRANSACTIONS = "GET_TRANSACTIONS"

export const GET_SUPPLIERS = "GET_SUPPLIERS"

export const GET_CLIENTS = "GET_CLIENTS"

export const GET_SELLERS = "GET_SELLERS"

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
        //francelsoft
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlemVxdWllbG1hcmNlbDJAZ21haWwuY29tIiwiYXVkIjoicHVibGljIiwiaXNzIjoiZ3N0b2NrLmZyYW5jZWxzb2Z0LmNvbSIsImV4cCI6MTgyNTkzNzAzNy42MzQ1NjM0fQ.s52_MCzeOqirJD165tHbVyjJKb3aP3togDLM3HTNC1s",
        //local
        //"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlemVxdWllbG1hcmNlbDJAZ21haWwuY29tIiwiYXVkIjoicHVibGljIiwiaXNzIjoibG9jYWxob3N0IiwiZXhwIjoxODI2MzQyNTAxLjUxNjk1NX0.YObKaDV_xNswaUcgjazzGS6X9d6TdR1cutf_B5nctvc",
    }}
);

export const getProductsStocks = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL}/product/stock`, getHeaders());
            const products = response.data.result.content
            dispatch({
                type: GET_PRODUCTS_STOCKS,
                payload: products
            })
        } catch(error){
            console.error("Error al obtener el stock", error)
        }
    }
}

export const getTransactions = (filters) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL}/transaction?page=1`, {params: filters, ...getHeaders()})
            const transactions = response.data.result.content
            dispatch({
                type: GET_TRANSACTIONS,
                payload: transactions
            })
        } catch (error) {
            console.error("Error al obtener las transacciones", error)
        }
    }
}

export const putProductStock = (stockDetail) => {
    return async function (dispatch) {
        dispatch({type: PUT_PRODUCT_STOCKS_REQUEST})
        try {
            const response = await axios.put(`${URL}/product`, stockDetail, getHeaders())
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
            const response = await axios.put(`${URL}/stock`, productDetail, getHeaders())
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
            await axios.delete(`${URL}/product`, {params: {"product_id": productId}, ...getHeaders()});

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
            const response = await axios.get(`${URL}/transaction/cards`, {params: filters, ...getHeaders()});
            const cards = response.data.result;

            dispatch({
                type: GET_TRANSACTION_CARDS,
                payload: cards
            })
        } catch (error) {
            console.error("Error al obtener las tarjetas", error)
        }
    }
}

export const getSuppliers = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL}/supplier?page=1`, getHeaders())
            const suppliers = response.data.result.content
            dispatch({
                type: GET_SUPPLIERS,
                payload: suppliers
            })
        } catch (error){
            console.error("Error al obtener los proveedores", error)
        }
    }
}

export const getClients = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL}/client?page=1`, getHeaders())
            const clients = response.data.result.content
            dispatch({
                type: GET_CLIENTS,
                payload: clients
            })
        } catch (error){
            console.error("Error al obtener los proveedores", error)
        }
    }
}

export const getSellers = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL}/seller?page=1`, getHeaders())
            const sellers = response.data.result.content
            dispatch({
                type: GET_SELLERS,
                payload: sellers
            })
        } catch (error){
            console.error("Error al obtener los proveedores", error)
        }
    }
}

export const postBuyTransaction = async (cart) => {
    try {
        const response = await axios.post(`${URL}/transaction/buy`, cart, getHeaders());
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al cargar la compra");
    }
};

export const postSellTransaction = async (cart) => {
    try {
        const response = await axios.post(`${URL}/transaction/sell`, cart, getHeaders());
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al cargar la venta");
    }
};
