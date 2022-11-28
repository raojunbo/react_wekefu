import React, { Component } from 'react'
import { Button } from 'antd'
export default class LeftNavigation extends Component {
  render() {
    return (
      <div className='left_nav'>
        <Button>训练</Button>
        <Button>点数</Button>
        <Button>股票池</Button>
        <Button>资料</Button>
      </div>
    )
  }
}

