import axios from "axios"

export const GET_PRODUCTS_STOCKS = "GET_PRODUCTS_STOCKS"

export const PUT_PRODUCT_STOCKS_SUCCES = "PUT_PRODUCT_STOCKS_SUCCES"
export const PUT_PRODUCT_STOCKS_REQUEST = "PUT_PRODUCT_STOCKS_REQUEST"
export const PUT_PRODUCT_STOCKS_FAILURE = "PUT_PRODUCT_STOCKS_FAILURE"

export const PUT_PRODUCT_DETAIL_SUCCES = "PUT_PRODUCT_DETAIL_SUCCES"
export const PUT_PRODUCT_DETAIL_REQUEST = "PUT_PRODUCT_DETAIL_REQUEST"
export const PUT_PRODUCT_DETAIL_FAILURE = "PUT_PRODUCT_DETAIL_FAILURE"

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