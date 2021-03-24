import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../../store/actions/index'
import classes from './BitcoinValue.module.css'

const BitcoinValue = props => {
    const [selectValue, setSelectValue] = React.useState('United States Dollar');
    const {onFetchBitcoinValue, onFetchBitcoinChart} = props

    React.useEffect(() => {
        onFetchBitcoinValue()
    }, [onFetchBitcoinValue])
    
    React.useEffect(() => {
        onFetchBitcoinChart('USD')
    }, [onFetchBitcoinChart])
    
    const handleSelectChange = event => {
        setSelectValue(event.target.value)
        // onFetchBitcoinValue()
        if (event.target.value === 'United States Dollar') {
            onFetchBitcoinChart('USD')
        } else if (event.target.value === 'British Pound Sterling') {
            onFetchBitcoinChart('GBP')
        } else if (event.target.value === 'Euro') {
            onFetchBitcoinChart('EUR')
        }
    }

    let displayvalue = null
    if (selectValue === 'United States Dollar') {
        displayvalue = props.usdvalue
    } else if (selectValue === 'British Pound Sterling') {
        displayvalue = props.gbpvalue
    } else if (selectValue === 'Euro') {
        displayvalue = props.eurvalue
    }

    return (
        <div className={classes.Container}>
            <p>1 Bitcoin Equals</p>
            <select onChange={handleSelectChange}>
                <option value="United States Dollar">United States Dollar</option>
                <option value="British Pound Sterling">British Pound Sterling</option>
                <option value="Euro">Euro</option>
            </select>
            {displayvalue && <div className={classes.bitcoinValue}>{displayvalue + ' ' + selectValue}</div>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        usdvalue: state.bitcoin.usdvalue,
        gbpvalue: state.bitcoin.gbpvalue,
        eurvalue: state.bitcoin.eurvalue,
    }
}
const mapDispatchToState = dispatch => {
    return {
        onFetchBitcoinValue: () => { dispatch(actions.fetchBitcoinValue()) },
        onFetchBitcoinChart: (currency) => { dispatch(actions.fetchBitcoinChart(currency)) },
    }
}
export default connect(mapStateToProps, mapDispatchToState)(BitcoinValue)