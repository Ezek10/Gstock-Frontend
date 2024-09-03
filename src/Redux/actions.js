import axios from "axios"

export const GET_TRANSACTION_CARDS = "GET_TRANSACTION_CARDS"

export const GET_PRODUCTS_STOCKS = "GET_PRODUCTS_STOCKS"

export const GET_TRANSACTIONS = "GET_TRANSACTIONS"

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
            const response = await axios.get(`https://api.gstock.francelsoft.com/gstock/product/stock`, {
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

export const getTransactions = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get("https://api.gstock.francelsoft.com/gstock/transaction?page=1", {
                headers: {
                    "Authorization": "admin",}})
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
            const response = await axios.put(`https://api.gstock.francelsoft.com/gstock/product`, stockDetail, {
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
            const response = await axios.put(`https://api.gstock.francelsoft.com/gstock/stock`, productDetail, {
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
                console.log("funca");
                try {
                    dispatch({type: DELETE_PRODUCTS_REQUEST})
                    await axios.delete(`https://api.gstock.francelsoft.com/gstock/${productId}`)
                    
                    dispatch({
                        type: DELETE_PRODUCTS_SUCCESS,
                        payload: productId
                    })
                } catch (error) {
                    console.log("no funca");
                    dispatch({
                        type: DELETE_PRODUCTS_FAILURE,
                        payload: error.message
                    })
                }
            }
        }
        
        export const getTransactionCards = (page, filter_by_buy_type, filter_by_sell_type, filter_by_product, filter_by_specific_date, filter_by_start_date, filter_by_end_date, filter_by_supplier, filter_by_client, filter_by_seller) => {
            return async function (dispatch) {
                try {
                    const params = {};
                    if (page) params.page = page;
                    if (filter_by_buy_type) params.filter_by_buy_type = filter_by_buy_type;
                    if (filter_by_sell_type) params.filter_by_sell_type = filter_by_sell_type;
                    if (filter_by_product) params.filter_by_product = filter_by_product;
                    if (filter_by_specific_date) params.filter_by_specific_date = filter_by_specific_date;
                    if (filter_by_start_date) params.filter_by_start_date = filter_by_start_date;
                    if (filter_by_end_date) params.filter_by_end_date = filter_by_end_date;
                    if (filter_by_supplier) params.filter_by_supplier = filter_by_supplier;
                    if (filter_by_client) params.filter_by_client = filter_by_client;
                    if (filter_by_seller) params.filter_by_seller = filter_by_seller;
                    const response = await axios.get(`https://api.gstock.francelsoft.com/gstock/transaction/cards`, {
                        params,
                        headers: {
                            "Authorization": "admin",}})
                            const cards = response.data.result
                            dispatch({
                                type: GET_TRANSACTION_CARDS,
                                payload: cards
                            })
                        } catch (error) {
                            console.error("Error al obtener las tarjetas", error)
                        }
                    }
                }
                // page, filterByBuyType, filterBySellType, filterByProduct, filterBySpecificDate, filterByStartDate, filterByEndDate, filterBySupplier, filterByClient, filterBySeller