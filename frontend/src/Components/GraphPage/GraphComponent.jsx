import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useState } from 'react';
import { useEffect } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function GraphComponent({ data, type }) {
    let [labels, updateLabels] = useState();
    let [dataElements, updatedataElements] = useState();
    useEffect(() => {
        let templabels = []
        let tempdata = []
        data.forEach(element => {
            templabels.push(element.date)
            tempdata.push(element[type])
        });
        updateLabels(templabels)
        updatedataElements(tempdata)
    }, [data, type])

    return (
        <>
            <div style={{ background: "white" }}>
                <Bar data={{
                    labels,
                    datasets: [
                        {
                            label: 'Graph of ' + type + " cases",
                            data: dataElements,
                            backgroundColor: 'rgb(255, 99, 132)',
                        },
                    ],
                }} options={{
                    responsive: true,
                }} />;
            </div>
        </>
    )
}

export default GraphComponent