import React from 'react'

import s from './DirectionsRender.module.css'

/**
* @author
* @function DirectionsRender
**/

export const DirectionsRender = (props) => {
  return(
    <div className={s.window}>
        <div className={s.inputs}>
            <input type="text" placeholder='Origin'/>
            <input type="text" placeholder='Destination'/>
            <button>Calculate</button>
        </div>
        <div className={s.info}>

        </div>
    </div>
   )
  }
