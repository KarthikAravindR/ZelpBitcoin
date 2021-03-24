import * as actionTypes from './actionTypes'
import axios from 'axios'

export const fetchBitcoinValueStart = () => {
    return {
        type: actionTypes.FETCH_BITCOIN_VALUE_START
    }
}
export const fetchBitcoinValueSuccess = (usdvalue, gbpvalue, eurvalue) => {
    return {
        type: actionTypes.FETCH_BITCOIN_VALUE_SUCCESS,
        usdvalue: usdvalue,
        gbpvalue: gbpvalue,
        eurvalue: eurvalue,
    }
}
export const fetchBitcoinValueFailed = (error) => {
    return {
        type: actionTypes.FETCH_BITCOIN_VALUE_FAILED,
        error: error
    }
}
export const fetchBitcoinValue = () => {
    return dispatch => {
        dispatch(fetchBitcoinValueStart())
        axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then(response => {
                dispatch(fetchBitcoinValueSuccess(response.data.bpi.USD.rate_float, response.data.bpi.GBP.rate_float, response.data.bpi.EUR.rate_float))
            })
            .catch(error => {
                console.log(error)
                dispatch(fetchBitcoinValueFailed(error))
            })
    }
}

export const fetchBitcoinChartStart = () => {
    return {
        type: actionTypes.FETCH_BITCOIN_CHART_START
    }
}
export const fetchBitcoinChartSuccess = (chartvalue) => {
    return {
        type: actionTypes.FETCH_BITCOIN_CHART_SUCCESS,
        chartvalue: chartvalue,
    }
}
export const fetchBitcoinChartFailed = (error) => {
    return {
        type: actionTypes.FETCH_BITCOIN_CHART_FAILED,
        error: error
    }
}
export const fetchBitcoinChart = (currency) => {
    let today = new Date()
    let priorDate = new Date().setDate(today.getDate()-60)
    let startDate = formatDate(priorDate)
    let endDate = formatDate(today)
    return dispatch => {
        dispatch(fetchBitcoinChartStart())
        axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`)
            .then(response => {
                dispatch(fetchBitcoinChartSuccess(response.data.bpi))
            })
            .catch(error => {
                dispatch(fetchBitcoinChartFailed(error))
            })
    }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}