import axios from "axios"

const headers = {
    "customer": "admin",
}

export const GET_PRODUCTS_STOCKS = "GET_PRODUCTS_STOCKS"

export const getProductsStocks = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`https://api.gstock.francelsoft.com/product/stock`, { headers })
            const products = response.data

            dispatch({
                type: GET_PRODUCTS_STOCKS,
                payload: products
            })
        } catch(error){
            console.error("Error al obtener el stock", error)
        }
    }
}