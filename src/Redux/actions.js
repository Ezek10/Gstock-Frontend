import axios from "axios"
const GSTOCK_URL = import.meta.env.VITE_GSTOCK_URL
const USER_URL = import.meta.env.VITE_USER_URL

export const GET_TRANSACTION_CARDS = "GET_TRANSACTION_CARDS"

export const GET_PRODUCTS_STOCKS = "GET_PRODUCTS_STOCKS"

export const GET_TRANSACTIONS = "GET_TRANSACTIONS"

export const GET_SUPPLIERS = "GET_SUPPLIERS"

export const GET_CLIENTS = "GET_CLIENTS"

export const GET_SELLERS = "GET_SELLERS"

export const GET_USERS = "GET_USERS"

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

export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS"
export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST"
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE"

export const PUT_TRANSACTION_BUY_SUCCES = "PUT_TRANSACTION_BUY_SUCCES"
export const PUT_TRANSACTION_BUY_REQUEST = "PUT_TRANSACTION_BUY_REQUEST"
export const PUT_TRANSACTION_BUY_FAILURE = "PUT_TRANSACTION_BUY_FAILURE"

export const PUT_TRANSACTION_SELL_SUCCES = "PUT_TRANSACTION_SELL_SUCCES"
export const PUT_TRANSACTION_SELL_REQUEST = "PUT_TRANSACTION_SELL_REQUEST"
export const PUT_TRANSACTION_SELL_FAILURE = "PUT_TRANSACTION_SELL_FAILURE"

export const DELETE_TRANSACTION_SUCCES = "DELETE_TRANSACTION_SUCCES"
export const DELETE_TRANSACTION_REQUEST = "DELETE_TRANSACTION_REQUEST"
export const DELETE_TRANSACTION_FAILURE = "DELETE_TRANSACTION_FAILURE"

export const PUT_USER_SUCCES = "PUT_USER_SUCCES"
export const PUT_USER_REQUEST = "PUT_USER_REQUEST"
export const PUT_USER_FAILURE = "PUT_USER_FAILURE"


const getHeaders = () => ({
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
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
    debugger
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

export const getUsers = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${USER_URL}/users/all`, getHeaders());
            console.log(response);
            
            const users = response.data
            dispatch({
                type: GET_USERS,
                payload: users
            })
        } catch (error){
            console.error("Error al obtener los usuarios", error)
            handleUnauthorizedError(error)
        }
    }
}

export const postNewUser = async (user) => {
    try {
        const response = await axios.post(`${USER_URL}/users/create`, user, getHeaders());
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al crear un usuario nuevo");
    }
};

export const putUser = (user) => {
    return async function (dispatch) {
        dispatch({type: PUT_USER_REQUEST})
        try {
            const response = await axios.put(`${USER_URL}/users/update`, user, getHeaders())
            dispatch({
                type: PUT_USER_SUCCES,
                payload: response.data
            }) 
        } catch(error) {
            dispatch({ type: PUT_USER_FAILURE, payload: error.message });
            console.error("Error al cambiar los datos del usuario", error)
        }
    }
}

export const deleteUser = (userId) => {
    return async function (dispatch) {
        try {
            dispatch({type: DELETE_USER_REQUEST})
            await axios.delete(`${USER_URL}/users/delete`, {params: {"user_id": userId}, ...getHeaders()});

            dispatch({
                type: DELETE_USER_SUCCESS,
                payload: userId
            })
        } catch (error) {
            dispatch({
                type: DELETE_USER_FAILURE,
                payload: error.message
            })
        }
    }
}

export const putTransactionBuy = (transactionDetail) => {
    return async function (dispatch) {
        dispatch({type: PUT_TRANSACTION_BUY_REQUEST})
        try {
            const response = await axios.put(`${GSTOCK_URL}/transaction/buy`, transactionDetail, getHeaders())
            dispatch({
                type: PUT_TRANSACTION_BUY_SUCCES,
                payload: response.data
            }) 
        } catch(error) {
            dispatch({ type: PUT_TRANSACTION_BUY_FAILURE, payload: error.message });
            console.error("Error al cambiar los datos de la transacción", error)
        }
    }
}

export const putTransactionSell = (transactionDetail) => {
    return async function (dispatch) {
        dispatch({type: PUT_TRANSACTION_SELL_REQUEST})
        try {
            const response = await axios.put(`${GSTOCK_URL}/transaction/sell`, transactionDetail, getHeaders())
            dispatch({
                type: PUT_TRANSACTION_SELL_SUCCES,
                payload: response.data
            }) 
        } catch(error) {
            dispatch({ type: PUT_TRANSACTION_SELL_FAILURE, payload: error.message });
            console.error("Error al cambiar los datos de la transacción", error)
        }
    }
}

export const deleteTransaction = (id) => {
    return async function (dispatch) {
        try {
            dispatch({type: DELETE_TRANSACTION_REQUEST})
            await axios.delete(`${GSTOCK_URL}/transaction`, {params: {"transaction_id": id}, ...getHeaders()});

            dispatch({
                type: DELETE_TRANSACTION_SUCCES,
                payload: id
            })
        } catch (error) {
            dispatch({
                type: DELETE_TRANSACTION_FAILURE,
                payload: error.message
            })
        }
    }
}