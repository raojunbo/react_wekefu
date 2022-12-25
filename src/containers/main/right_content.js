import React from 'react'

import { Outlet } from 'react-router-dom'
import './right_content.less'
export default function RightContent() {
  return (
    <div className='right_content'>
         <Outlet></Outlet>
    </div>
  )
}
