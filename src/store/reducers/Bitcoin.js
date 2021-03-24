import * as actionTypes from '../actions/actionTypes'

const initialState = {
    usdvalue: null,
    gbpvalue: null,
    eurvalue: null,
    chartvalue: null,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BITCOIN_VALUE_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FETCH_BITCOIN_VALUE_SUCCESS:
            return {
                ...state,
                usdvalue: action.usdvalue,
                gbpvalue: action.gbpvalue,
                eurvalue: action.eurvalue,
            }
        case actionTypes.FETCH_BITCOIN_VALUE_FAILED:
            return {
                isLoading: false,
                error: action.error
            }
        case actionTypes.FETCH_BITCOIN_CHART_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FETCH_BITCOIN_CHART_SUCCESS:
            return {
                ...state,
                chartvalue: action.chartvalue
            }
        case actionTypes.FETCH_BITCOIN_CHART_FAILED:
            return {
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }
}

export default reducer