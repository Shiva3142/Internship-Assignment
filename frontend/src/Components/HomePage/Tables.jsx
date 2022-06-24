import React from 'react'
import Row from './Row';

function Tables(object) {
    // console.log(object.data);
    return (
        <>
            <table cellSpacing="0">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Total Comfirmed</th>
                        <th>Total Recovered </th>
                        <th>Total Active </th>
                        <th>Total Death </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        object.data.map((value, index) => {
                            return (
                                
                                    <Row key={index} data={value} />
                                
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default Tables