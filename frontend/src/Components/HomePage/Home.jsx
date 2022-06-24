import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import '../../Styles/HomePage/Homepage.scss'
import Header from "../Templates/Header";
import Tables from './Tables';
import { motion } from "framer-motion"


function Home() {

    let [finaldata, updatefinaldata] = useState(null);
    let [totaldata, updatetotaldata] = useState(null);
    let indianformat = Intl.NumberFormat('en-IN');
    async function getData() {
        try {
            let response = await fetch('/gettotaldata', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }
            })
            // console.log(response);
            let result = await response.json();
            // console.log(result);
            console.log(response.status);
            if (response.status === 200) {
                updatefinaldata(result)
                updatetotaldata(result[0])
                // console.log(totaldata);
            } else {
                window.alert("data not found")
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                <Header />

                <main className="homepage">

                    {
                        totaldata ? (<>
                            <motion.div initial={{ x: "100vw" }} animate={{ x: "0" }} exit={{ x: "100vw" }}>
                                <h1>Final Counts for year 2020</h1>
                                <div className="totalCards">
                                    {/* {JSON.stringify(totaldata)} */}

                                    <div className="totalcard comfirmed_cases">
                                        <h2 >Total confirmed</h2>
                                        <h3>{indianformat.format(totaldata.total_confirmed)}</h3>
                                    </div>

                                    <div className="totalcard recovered_cases">
                                        <h2>Total Recovered</h2>
                                        <h3>{indianformat.format(totaldata.total_recovered)}</h3>
                                    </div>

                                    <div className="totalcard active_cases">
                                        <h2>Total Active</h2>
                                        <h3>{indianformat.format(totaldata.total_active)}</h3>
                                    </div>

                                    <div className="totalcard death_cases">
                                        <h2>Total Deaths</h2>
                                        <h3>{indianformat.format(totaldata.total_deaths)}</h3>
                                    </div>

                                </div>
                            </motion.div>
                        </>) : (<>
                            <div className="loaderContainer">
                                <div className="loader"></div>
                                <p>Please Wait, We are Fetching the data.....</p>
                            </div>

                        </>)
                    }
                    {
                        finaldata ? (<>
                            <motion.div initial={{ width: "0" }} animate={{ width: "auto" }} exit={{ width: "0" }}>
                                <h1>Historical Counts for year 2020</h1>
                                {/* {JSON.stringify(finaldata)} */}
                                <div className="tableContainer">
                                    <div className='scrollablediv'>
                                        <Tables data={finaldata} />
                                    </div>
                                </div>
                            </motion.div>
                        </>) : (<>


                        </>)
                    }
                </main>
            </motion.div>
        </>
    )
}

export default Home