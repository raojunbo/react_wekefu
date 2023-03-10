import { Switch, Button, Input, Select } from 'antd'
import React, { Component } from 'react'
import ProTypes from 'prop-types'
import './train_kline_bottom.less'
import { json } from 'react-router-dom'

export default class TrainKlinebottom extends Component {
    static propTypes = {
        initMoney: ProTypes.number.isRequired, // 初始资金
        moneyAssets: ProTypes.number.isRequired, // 钱资产
        stockAssets: ProTypes.number.isRequired, // 股票资产
        stockCount: ProTypes.number.isRequired, // 股票数量
        totalAssets: ProTypes.number.isRequired, // 总资产

        closePrice: ProTypes.number.isRequired,// 收盘价（重新计算可买数量）

        remainLineCount: ProTypes.number.isRequired, //剩余k线  
        isAutoMove: ProTypes.bool.isRequired, // 是否自动前进
        autoMoveSetingCallBack: ProTypes.func.isRequired, //是否自动前进的状态

        nextKLineCallBack: ProTypes.func.isRequired, // 点击下一个K线

        buyCallBack: ProTypes.func.isRequired, //  发起买入
        sellCallBack: ProTypes.func.isRequired, //  发起卖出
    }
    constructor(props) {
        super(props)
        this.state = {
            'toSellPercent': selectOptions[0].value,
            'toBuyPercent': selectOptions[0].value
        }
    }
    buyAndSellCallBack(name, value) {
        this.setState({
            [name]: value
        })
    }
    buyPercentChange(value) {
        this.setState({
            "toBuyPercent": value
        })
    }
    sellPercentChange(value) {
        this.setState({
            "toSellPercent": value
        })
    }
    render() {
        const { initMoney, moneyAssets, stockAssets, stockCount, totalAssets, closePrice } = this.props
        const profit = (totalAssets - initMoney) / initMoney
        const displayProfit = (100 * profit).toFixed(2)

        let { toBuyPercent, toSellPercent } = this.state

        const toBuyCount = parseInt(toBuyPercent * (moneyAssets / closePrice))
        const toSellCount = parseInt(toSellPercent * stockCount)

        return (
            <div className='train_kline_bottom'>
                <div className='train_kline_bottom_display'>
                    <div className='train_kline_bottom_display_column'>
                        <div className='train_kline_bottom_display_item'>总投入:{initMoney}</div>
                        <div className='train_kline_bottom_display_item'>总资产:{totalAssets}</div>
                    </div>

                    <div className='train_kline_bottom_display_column'>
                        <div className='train_kline_bottom_display_item'>股票价值:{stockAssets}</div>
                        <div className='train_kline_bottom_display_item'>股票数量:{stockCount}</div>
                    </div>
                    <div className='train_kline_bottom_display_column'>
                        <div className='train_kline_bottom_display_item'>剩余资金:{moneyAssets}</div>
                        <div className={displayProfit >= 0 ? 'train_kline_bottom_display_item_red' : "train_kline_bottom_display_item_green"}>收益率:{displayProfit}%</div>
                    </div>
                </div>
                

                <div className='train_kline_bottom_action'>
                    <Switch defaultChecked={false} onChange={(checked) => this.props.autoMoveSetingCallBack(checked)} />
                    <div className='train_kline_bottom_action_item' style={{'width':80}}>自动前进</div>
                    <Button onClick={() => this.props.nextKLineCallBack()}>下一个K线</Button>

                    <div className='train_kline_bottom_action_item' style={{'width':80}}>剩{this.props.remainLineCount}根</div>
                    <div className='train_kline_bottom_action_item'>
                        <Button onClick={() => this.props.buyCallBack(toBuyCount)}>买入</Button>
                    </div>

                    <Input style={{ width: 100 }}
                        onChange={(event) => {
                            this.buyAndSellCallBack('toBuyCount', parseInt(event.target.value))
                        }}
                        placeholder="股票数量"
                        maxLength={16}
                        value={toBuyCount}
                    />

                    <Select
                        defaultValue={0.25}
                        style={{ width: 80 }}
                        onChange={(value) => this.buyPercentChange(value)}
                        options={selectOptions}
                    />

                    <div className='train_kline_bottom_action_item'>
                        <Button onClick={() => this.props.sellCallBack(toSellCount)}>卖出</Button>
                    </div>

                    <Input style={{ width: 100 }}
                        onChange={(value) => this.buyAndSellCallBack('toSellCount', value)}
                        placeholder="股票数量"
                        maxLength={16}
                        value={toSellCount}
                    />
                    <Select
                        defaultValue={0.25}
                        style={{ width: 80 }}
                        onChange={(value) => this.sellPercentChange(value)}
                        options={selectOptions}
                    />
                </div>
            </div>
        )
    }
}

const selectOptions = [
    {
        value: 0.25,
        label: '25%',
    },
    {
        value: 0.5,
        label: '50%',
    },
    {
        value: 0.75,
        label: '75%',
    },
    {
        value: 1,
        label: '100%',
    },
]
