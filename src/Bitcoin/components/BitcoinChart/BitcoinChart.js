import React from 'react'
import { connect } from 'react-redux'
import { Line } from 'react-chartjs-2';

import classes from './BitcoinChart.module.css'

const BitcoinChart = props => {
    const { chartvalue } = props
    const data = {
        labels: Object.keys(chartvalue),
        datasets: [
            {
                label: 'Last 60 days Trend',
                lineTension: 0.1,
                backgroundColor: '#DDF4E6',
                borderColor: '#4ACD8F',
                borderWidth: 1,
                hoverBackgroundColor: 'rgb(9, 255, 0)',
                hoverBorderColor: 'rgb(9, 255, 0)',
                data: Object.values(chartvalue)
            }
        ]
    };
    return (
        <div className={classes.Container}>
            <Line
                height='400px'
                width="700px"
                data={data}
                options={{
                    title: {
                        display: true,
                        fontSize: 20
                    },
                    scales: {
                        xAxes: [{
                            ticks: { display: true },
                            gridLines: {
                                display: false,
                                drawBorder: true
                            }
                        }],
                        yAxes: [{
                            ticks: { display: true },
                            gridLines: {
                                display: true,
                                drawBorder: true
                            }
                        }]
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }}
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        chartvalue: state.bitcoin.chartvalue,
    }
}
export default connect(mapStateToProps)(BitcoinChart)