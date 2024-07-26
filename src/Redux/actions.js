import axios from "axios"

export const GET_PRODUCTS_STOCKS = "GET_PRODUCTS_STOCKS"

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