import axios from "axios"

export const GET_PRODUCTS_STOCKS = "GET_PRODUCTS_STOCKS"
export const PUT_PRODUCT_STOCKS_SUCCES = "PUT_PRODUCT_STOCKS_SUCCES"
export const PUT_PRODUCT_STOCKS_REQUEST = "PUT_PRODUCT_STOCKS_REQUEST"
export const PUT_PRODUCT_STOCKS_FAILURE = "PUT_PRODUCT_STOCKS_FAILURE"

export const getProductsStocks = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`https://api.gstock.francelsoft.com/gstock/product/stock`, {
                headers: {
                    "Authorization": "admin",}})
            const products = response.data.result.content
                    console.log(products);
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
            console.log("working");
            const response = await axios.put(`https://api.gstock.francelsoft.com/gstock/product`, stockDetail, {
                headers: {
                    "Authorization": "admin",}})
            dispatch({
                type: PUT_PRODUCT_STOCKS_SUCCES,
                payload: response.data
            }) 
            console.log("bien");
            
        } catch(error) {
            dispatch({ type: PUT_PRODUCT_STOCKS_FAILURE, payload: error.message });
            console.error("Error al obtener el stock", error)
            console.log("mal");
        }
    }
}