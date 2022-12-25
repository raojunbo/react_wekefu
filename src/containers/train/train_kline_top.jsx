
import React, { Component } from 'react'
import { Button } from 'antd';

import './train_kline_top.less'
import './train_kline_line_tool.less'


export default class TrainKlineTop extends Component {
    render() {
        return (
            <div className='train_line_top'>
                <Button onClick={() => this.props.showTool('config')}>训练设置</Button>
                <Button onClick={() => this.props.showTool('line')}>画图工具</Button>
                <Button onClick={() => this.props.showTool('note')}>云笔记</Button>
                <Button onClick={() => this.props.showTool('trainhistory')}>历史复盘</Button>
            </div>
        )
    }
}
