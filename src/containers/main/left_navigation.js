import React, { Component } from 'react'
import './left_navigation.less'

import { Link, NavLink } from 'react-router-dom'
export default class LeftNavigation extends Component {
  render() {
    return (
      <div className='left_navigation'>
        <NavLink to="pointfigure">点数图</NavLink>
        <NavLink>股票池</NavLink>
        <NavLink to="trainkline">训练图</NavLink>
        <NavLink>威资料</NavLink>
      </div>
    )
  }
}

