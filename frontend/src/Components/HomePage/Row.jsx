import React from 'react'
import { motion } from "framer-motion"

function Row({ data }) {
    let indianformat = Intl.NumberFormat('en-IN');
    return (
        <>

            <tr>
                <td>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <strong>{data.date}</strong>
                    </motion.div>
                </td>
                <td >
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>


                        <div className='comfirmed'>

                            {indianformat.format(data.total_confirmed)}
                        </div>

                        <div className='deltacount comfirmed'>+{indianformat.format(data.delta_confirmed)}</div>

                    </motion.div>

                </td>
                <td >
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                        <div className='recovered'>

                            {indianformat.format(data.total_recovered)}
                        </div>

                        <span className='deltacount recovered'>+{indianformat.format(data.delta_recovered)}</span>

                    </motion.div>

                </td>
                <td >
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                        <div className='active'>

                            {indianformat.format(data.total_active)}
                        </div>


                        <span className='deltacount active'>{indianformat.format(data.delta_active)}</span>

                    </motion.div>
                </td>
                <td >
                    <div className='death'>

                        {indianformat.format(data.total_deaths)}
                    </div>

                    <span className='deltacount death'>+{indianformat.format(data.delta_deaths)}</span>


                </td>
            </tr>
        </>
    )
}

export default Row