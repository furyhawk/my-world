import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    selectAllPopulation
} from './populationSlice'


export const PopulationTable = () => {
    const population = useSelector(selectAllPopulation)
    console.log(population)

    // const renderedPopulation = population.map(population => {
    //     return (
    //         <div>
                
    //         </div>
    //     )
    // })

    return (
        <section className="populationTable">
            <h2>Population</h2>
            {/* {renderedPopulation} */}
        </section>
    )
}