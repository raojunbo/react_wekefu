import React, { Component } from 'react'
import { Button, Select, DatePicker } from 'antd';
import { a_symbol_sh } from './a_stock_symbol_sh';
import './train_kline_config_tool.less'
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { randomOneDate, stockformatDate, randomOneStock } from './train_kline_config_random.js'

export default class TrainKlineConfigTool extends Component {
    constructor(props) {
        super(props)
        this.dateRef = React.createRef()
        // 状态
        this.state = {
            'selected_item': props.selected_info.selected_item,
            'selected_start_date': props.selected_info.selected_start_date
        }
    }
    sureChangeTrainConfig() {
        const { selected_item, selected_start_date } = this.state
        const query = {
            'selected_item': selected_item,
            'selected_start_date': selected_start_date
        }
        this.props.sureChangeConfig(query)
    }
    randomOneStockIndexAction() {
        const randomStock = randomOneStock(a_symbol_sh)
        this.setState({
            'selected_item': randomStock
        })
    }
    randomOneDateAction() {
        this.setState(() => {
            return {
                'selected_start_date': randomOneDate()
            }
        })
    }
    manualChangeOneDate(date, dateString) {
        this.setState(() => {
            return {
                'selected_start_date': date
            }
        })
    }
    handleChange() {
        console.log("这是市场切换")
    }
    render() {
        const { selected_item, selected_start_date } = this.state
        console.log('这是即将要进行渲染' + JSON.stringify(selected_item))
        return (
            <div className='train_kline_line_config_tool'>
                <div className='train_kline_line_config_tool_content'>
                    <div className='train_kline_line_config_tool_row'>
                        <div className="line_margin">市场：&nbsp;</div>
                        <Select
                            defaultValue="A股市场日线"
                            style={{ width: 140 }}
                            onChange={() => this.handleChange()}
                            options={[
                                {
                                    value: 'A_Stock_day',
                                    label: 'A股市场日线',
                                },
                                // {
                                //     value: 'cry_Stock_day',
                                //     label: '数字货币日线',
                                // },
                                // {
                                //     value: 'cry_Stock_4hour',
                                //     label: '数字货币4小时',
                                // }
                            ]}
                        />
                    </div>
                    <div className='train_kline_line_config_tool_row'>
                        <div className="line_margin">个股： &nbsp;</div>
                        <div className="line_margin">{selected_item.name} &nbsp;</div>
                        <Button type='primary' onClick={() => this.randomOneStockIndexAction()}>随机一次</Button>
                    </div>

                    <div className='train_kline_line_config_tool_row'>
                        <div className="line_margin">起始时间： &nbsp;</div>

                        <DatePicker value={dayjs(stockformatDate(selected_start_date, 'YYYY-MM-DD'), 'YYYY-MM-DD')} onChange={(date, dateString) => this.manualChangeOneDate(date, dateString)} />
                        &nbsp;&nbsp;
                        <Button type='primary' onClick={() => this.randomOneDateAction()}>随机一次</Button>
                    </div>
                </div>
                <div className='train_kline_line_config_tool_row_sure'>
                    <Button type='primary' onClick={() => this.sureChangeTrainConfig()}>确定</Button>
                </div>
            </div>
        )
    }
}

TrainKlineConfigTool.propTypes = {
    selected_symbol: PropTypes.string
}