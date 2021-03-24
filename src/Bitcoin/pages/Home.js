import React from 'react' 
import { connect } from 'react-redux'

import classes from './Home.module.css'
import BitcoinValue from '../components/BitcoinValue/BitcoinValue'
import BitcoinChart from '../components/BitcoinChart/BitcoinChart'

const Home = props => {
    return (
        <div className={classes.Container}>
            <BitcoinValue />
            {props.chartvalue && <BitcoinChart />}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        chartvalue: state.bitcoin.chartvalue,
    }
}
export default connect(mapStateToProps)(Home)