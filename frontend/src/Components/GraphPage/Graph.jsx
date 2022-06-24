import React, { useEffect, useState } from 'react'
import '../../Styles/GraphPage/Graph.scss'
import Header from '../Templates/Header'
import { motion } from "framer-motion"
import GraphComponent from './GraphComponent';

function Graph() {
    let [graphData, updategraphData] = useState(null);
    let [type, updatetype] = useState("total_confirmed")
    async function getTypeData(value = "total_confirmed") {
        updategraphData(null);
        try {
            let response = await fetch("/specific", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    type: value
                })
            });
            // console.log(response);
            // console.log(response.status);
            let result = await response.json();
            // console.log(result);
            if (response.status === 200) {
                updategraphData(result);
            } else {
                // window.alert("Data Not Found");
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getTypeData();
    }, [])



    return (
        <>
            <motion.div initial={{ y: "100vh" }} animate={{ y: "0" }} exit={{ y: "100vh" }}>
                <Header />

                <h3 style={{ textAlign: 'center' }}>Please Choose The Options from following</h3>
                <div className="inputContainer">
                    <select name="type" value={type} onChange={(event) => {
                        updatetype(event.target.value)
                        getTypeData(event.target.value);
                    }} id="type">
                        <option value="total_confirmed">Total Comfirmed</option>
                        <option value="total_recovered">Total Recovered</option>
                        <option value="total_active">Total Active</option>
                        <option value="total_deaths">Total Deaths</option>
                        <option value="delta_confirmed">Daily Confirmed</option>
                        <option value="delta_recovered">Daily Recovered</option>
                        <option value="delta_active">Daily Change in Active</option>
                        <option value="delta_deaths">Daily Deaths</option>
                    </select>
                </div>

                <div className="graph">
                    {
                        graphData ? (
                            <>
                                {
                                    window.innerWidth < 700 ? (
                                        <>
                                            <p style={{ textAlign: "center", fontSize: "0.8em", margin: "10px" }}>Best View is in Desktop View</p>

                                        </>
                                    ) : (
                                        <>

                                        </>
                                    )
                                }
                                <GraphComponent data={graphData} type={type} />
                            </>
                        ) : (
                            <>
                                <div className="loaderContainer">
                                    <div className="loader"></div>
                                    <p>Please Wait, We are Fetching the data.....</p>
                                </div>
                            </>
                        )
                    }
                </div>
            </motion.div>
        </>
    )
}

export default Graph