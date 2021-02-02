import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered , deaths }, country}) => {
    const [dailyData, setDailyData] = useState({}); // [] reaplced by {}

    useEffect(() => {
        const fetchAPI = async () => {
            const initialDailyData = await fetchDailyData(); //setDailyData(await fetchDailyData()); replaced const initialDailyData = await fetchDailyData();
        
            setDailyData(initialDailyData); //added
        }

        fetchAPI();
    }, []);

    const barChart = (
        confirmed
        ? (
          <Bar 
          data={{
              labels: ['Infected', 'Recovered', 'Deaths'],
              datasets: [{
                  label: 'People',
                  backgroundColor: [
                      'rgb(255,140,0)',
                      'rgb(155, 229, 170)',
                      'rgba(255, 0,0,0.5)'
                  ],
                  data:[confirmed.value, recovered.value, deaths.value],
              },
            ],
          }}
          options={{
              legend: {display: false},
              title: {display: true, text: `Current state in ${country}`},
          }}
          />  
        ) : null
    );

    //.length replaced by [0]  Changes within <Line confirmed replaced by data, deaths reaplced by data
    const lineChart = (
        dailyData[0] 
        ? (
        <Line 
        data={{
            labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
            datasets: [{
                data: dailyData.map(( data ) => data.confirmed),
                label: 'Infected',
                borderColor: '#FF7F50',
                fill: true,
            }, {
                data: dailyData.map(( data ) => data.recovered),
                label: 'Recovered',
                borderColor: 'green',
                backgroundColor: 'rgba(0,255,0,0.5)',
                fill: true,
            }
            ], 
            }}
        />
        ) :null
    );

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    );
};

export default Chart;