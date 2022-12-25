import { Switch, Button, Input, Select } from 'antd'
import React, { Component } from 'react'
import ProTypes from 'prop-types'
import './train_kline_bottom.less'

export default class TrainKlinebottom extends Component {
    static propTypes = {
        initMoney: ProTypes.number.isRequired, // 初始资金
        moneyAssets: ProTypes.number.isRequired, // 钱资产
        stockAssets: ProTypes.number.isRequired, // 股票资产
        stockCount: ProTypes.number.isRequired, // 股票数量
        totalAssets: ProTypes.number.isRequired, // 总资产

        toSellCount: ProTypes.number.isRequired, // 要卖的数量
        toBuyCount: ProTypes.number.isRequired,// 要买的数量

        remainLineCount: ProTypes.number.isRequired, //剩余k线

        isAutoMove: ProTypes.bool.isRequired, // 是否自动前进
        autoMoveSetingCallBack: ProTypes.func.isRequired, //是否自动前进的状态

        nextKLineCallBack: ProTypes.func.isRequired, // 点击下一个K线
        buyAndSellCallBack: ProTypes.func.isRequired, //  发起买入
        buyAndSellCountChangeCallBack: ProTypes.func.isRequired,
        buyAndSellPercentCallBack: ProTypes.func.isRequired //
    }
    constructor(props) {
        super(props)
    }
    render() {
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
        const profit = (this.props.totalAssets - this.props.initMoney)/this.props.initMoney
        const displayProfit = (100 * profit).toFixed(2)
        return (
            <div className='train_kline_bottom'>
                <div className='train_kline_bottom_display'>
                    <div className='train_kline_bottom_display_column'>
                        <div className='train_kline_bottom_display_item'>投入:{this.props.initMoney}</div>
                        <div className='train_kline_bottom_display_item'>资产:{this.props.totalAssets}</div>
                    </div>

                    <div className='train_kline_bottom_display_column'>
                        <div className='train_kline_bottom_display_item'>股票资产:{this.props.stockAssets}</div>
                        <div className='train_kline_bottom_display_item'>股票数量:{this.props.stockCount}</div>
                    </div>
                    <div className='train_kline_bottom_display_column'>
                    <div className='train_kline_bottom_display_item'>剩余资金:{this.props.moneyAssets}</div>
                    <div className='train_kline_bottom_display_item_red'>收益率:{displayProfit}</div>
                    </div>
                </div>

                <div className='train_kline_bottom_action'>


                    <Switch defaultChecked={false} onChange={(checked) => this.props.autoMoveSetingCallBack(checked)} />
                    <div className='train_kline_bottom_action_item'>自动前进</div>
                    <Button onClick={() => this.props.nextKLineCallBack()}>下一个K线</Button>

                    <div className='train_kline_bottom_action_item'>剩{this.props.remainLineCount}根</div>
                    <div className='train_kline_bottom_action_item'>
                        <Button onClick={() => this.props.buyAndSellCallBack(true)}>买入</Button>
                    </div>

                    <Input style={{ width: 100 }}
                        onChange={(event) => {
                            this.props.buyAndSellCountChangeCallBack(true, parseInt(event.target.value))
                        }}
                        placeholder="股票数量"
                        maxLength={16}
                        value={this.props.toBuyCount}
                    />

                    <Select
                        defaultValue={0.25}
                        style={{ width: 80 }}
                        onChange={(value) => this.props.buyAndSellPercentCallBack(true, value)}
                        options={selectOptions}
                    />

                    <div className='train_kline_bottom_action_item'>
                        <Button onClick={() => this.props.buyAndSellCallBack(false)}>卖出</Button>
                    </div>

                    <Input style={{ width: 100 }}
                        onChange={(value) => this.props.buyAndSellCountChangeCallBack(false, value)}
                        placeholder="股票数量"
                        maxLength={16}
                        value={this.props.toSellCount}
                    />
                    <Select
                        defaultValue={0.25}
                        style={{ width: 80 }}
                        onChange={(value) => this.props.buyAndSellPercentCallBack(false, value)}
                        options={selectOptions}
                    />
                </div>
            </div>
        )
    }
}
