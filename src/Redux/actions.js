import axios from "axios"
const URL = import.meta.env.VITE_URL_DEV

export const GET_TRANSACTION_CARDS = "GET_TRANSACTION_CARDS"

export const GET_PRODUCTS_STOCKS = "GET_PRODUCTS_STOCKS"

export const GET_TRANSACTIONS = "GET_TRANSACTIONS"

export const GET_SUPPLIERS = "GET_SUPPLIERS"

export const GET_CLIENTS = "GET_CLIENTS"

export const PUT_PRODUCT_STOCKS_SUCCES = "PUT_PRODUCT_STOCKS_SUCCES"
export const PUT_PRODUCT_STOCKS_REQUEST = "PUT_PRODUCT_STOCKS_REQUEST"
export const PUT_PRODUCT_STOCKS_FAILURE = "PUT_PRODUCT_STOCKS_FAILURE"

export const PUT_PRODUCT_DETAIL_SUCCES = "PUT_PRODUCT_DETAIL_SUCCES"
export const PUT_PRODUCT_DETAIL_REQUEST = "PUT_PRODUCT_DETAIL_REQUEST"
export const PUT_PRODUCT_DETAIL_FAILURE = "PUT_PRODUCT_DETAIL_FAILURE"

export const DELETE_PRODUCTS_SUCCESS = "DELETE_PRODUCTS_SUCCESS"
export const DELETE_PRODUCTS_REQUEST = "DELETE_PRODUCTS_REQUEST"
export const DELETE_PRODUCTS_FAILURE = "DELETE_PRODUCTS_FAILURE"

export const getProductsStocks = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL}/product/stock`, {
                headers: {
                    "Authorization": "admin",}})
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
            const response = await axios.get(`${URL}/transaction?page=1`, {
                params: filters,
                headers: {"Authorization": "admin",}
            })
            const products = response.data.result.content
            dispatch({
                type: GET_TRANSACTIONS,
                payload: products
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
            const response = await axios.put(`${URL}/product`, stockDetail, {
                headers: {
                    "Authorization": "admin",}})
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
            const response = await axios.put(`${URL}/stock`, productDetail, {
                headers: {
                    "Authorization": "admin",}})
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
            await axios.delete(
                `${URL}/product`,
                {
                    params: {"product_id": productId},
                    headers: {"Authorization": "admin"}
                }
            );

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
            const response = await axios.get(
                `${URL}/transaction/cards`,
                {
                    params: filters, 
                    headers: {"Authorization": "admin"}
                }
            );
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
            const response = await axios.get(`${URL}/supplier?page=1`, {
                headers: {
                    "Authorization": "admin",}})
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
            const response = await axios.get(`${URL}/client?page=1`, {
                headers: {
                    "Authorization": "admin",}})
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
