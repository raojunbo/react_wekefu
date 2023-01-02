import React, { Component } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

import TrainKlineTop from './train_kline_top';
import TrainKlinebottom from './train_kline_bottom'
import TrainKlineLineTool from './train_kline_line_tool'
import TrainKlineConfigTool from './train_kline_config_tool';
import TrainKlineNoteTool from './train_kline_note_tool';
import { randomOneStock, randomOneDate } from './train_kline_config_random.js'
import HQChart from 'hqchart';
import { a_symbol_sh } from './a_stock_symbol_sh';
import './train_kline.less'
import { Button } from 'antd';
import dayjs from 'dayjs';
function DefaultData() { }
DefaultData.GetKLineOption = function () {
    let data =
    {
        Type: 'K线训练',
        Symbol: '600000.sh', // 符号标识
        SymbolName: '浦发银行',// 符号名字
        Windows: //窗口指标
            [
                { Index: "MA", Modify: false, Change: false },
                { Index: "VOL", Modify: false, Change: false },
            ],
        IsShowCorssCursorInfo: true,
        CorssCursorInfo: { Left: 0, Right: 2, Bottom: 1, IsShowCorss: true },
        Border: //边框
        {
            Left: 1,
            Right: 25, //右边间距
            Top: 25,
            Bottom: 25,
        },
        KLine:
        {
            DragMode: 1,
            Right: 0,                            //复权 0 不复权 1 前复权 2 后复权
            Period: 0,                           //周期: 0 日线 1 周线 2 月线 3 年线 
            PageSize: 70,   // 一屏显示多少数据
            IsShowTooltip: true,
            MaxRequestDataCount: 2000,
            RightSpaceCount: 30

        },
        KLineTitle: {
            isShowName: false,
            isShowSettingInfo: false,
            isShowDateTime: true
        },
        Train: {
            DataCount: 200, // 训练数据
            StartDate: {
                Date: '20220905' // 起始日期
            }
        },
        Frame:  //子框架设置
            [
                { SplitCount: 3, IsShowLeftText: false },
                { SplitCount: 2, IsShowLeftText: false }
            ],
        ExtendChart:    //扩展图形
            [
                { Name: 'KLineTooltip' },  //手机端tooltip
                { Name: '背景图', FrameID: 0 }
            ],
        DrawTool: {
            // 存储到缓存中
            StorageKey: '4E7EA133-D6C8-4776-9869-1DDDCC5FA744'
        },
        EnableZoomUpDown: true
    };
    return data;
}

class TrainKLine extends Component {
    constructor(props) { //构造函数
        super(props);
        this.klineRef = React.createRef()
        this.initCanvas = this.initCanvas.bind(this);

        // 随机一个时间
        const selected_start_date = randomOneDate()
        const beginDate = dayjs(selected_start_date).format('YYYYMMDD')

        // 随机一个股票
        const selected_item = randomOneStock(a_symbol_sh)
        const Symbol = selected_item.symbol + '.sh'
        const SymbolName = selected_item.name
        // 构建初始Option
        let KLineOption = DefaultData.GetKLineOption()
        KLineOption.Train =  { DataCount: 200, DateTime: { Date: beginDate } }
        KLineOption.Symbol = Symbol
        KLineOption.SymbolName = SymbolName

        // 本地状态数据
        this.initMoney = 100000
        this.state = {
            initMoney: this.initMoney,// 初始资金
            moneyAssets: this.initMoney, // 剩余资金
            stockAssets: 0, // 股票资产，根据当前持有股票的数量和价格计算
            stockCount: 0, // 股票数量
            totalAssets: this.initMoney, // 总资产

            isAutoMove: false, // 是否自动移动kline
            remainLineCount: 0, // 剩余的k线

            latestKData: null, // 最后的一个k线数据
            orderID: 0, // 订单id
            latestTrade: null, // 上次的交易
            aryTrade: [], // 交易数组

            isShowLineTool: false, // 是否显示画图
            isShowNoteTool: false, // 是否显示笔记
            isShowConfigTool: false, // 是否显示配
            isShowPictureSettingTool: false,

            Symbol: selected_item.Symbol, // 符号标识 600000
            SymbolName: selected_item.name,// 符号名字 浦发银行
            StartDate: selected_start_date, // 开始日期

            KLine:
            {
                JSChart: null,
                Option: KLineOption
            }
        }
    }
    initCanvas() {

        if (this.state.KLine.JSChart) return;

        let chart = HQChart.Chart.JSChart.Init(document.getElementById("time_graph_canvas"));

        // 设置Kline的配置
        chart.SetOption(this.state.KLine.Option);
        // 保存图表的引用
        this.state.KLine.JSChart = chart;

        // JSCHART_EVENT_ID.RECV_TRAIN_MOVE_STEP 实际上是4
        chart.AddEventCallback({
            event: 4,
            callback: (event, data, obj) => {
                this.OnKLineMove(event, data, obj);
            }
        })
        // 18 一个画图完成
        chart.AddEventCallback({
            event: 18,
            callback: (event, data, obj) => {
                this.OnFinishDrawPicture(event, data, obj)
            }
        })
        // 23 选中某个画图
        chart.AddEventCallback({
            event: 23,
            callback: (event, data, obj) => {
                this.OnSelectDrawPicture(event, data, obj);
            }
        });
    }
    // 开始画图
    CreateDrawPicture(lineName) {
        if (lineName == '全部删除') {
            this.ClearChartDrawPicture()
            return
        }
        var drawOption =
        {
            LineColor: '#4169E1',    //线段颜色
            LineWidth: 2,            //线段宽度
            PointColor: 'rgb(255,130,71)'    //点颜色
        };
        this.state.KLine.JSChart.CreateChartDrawPicture(lineName, drawOption);
    }
    // 一个画图完成
    OnFinishDrawPicture(event, data, obj) {
        console.log('[KLineChart::OnFinishDrawPicture] data', data);
    }
    // 一个画图被选中
    OnClickDrawPicture(event, data, obj) {
        this.state.KLine.JSChart.JSChartContainer.OnSelectChartPicture()
    }
    // 清除所有画图
    ClearChartDrawPicture() {
        this.state.KLine.JSChart.JSChartContainer.ClearChartDrawPicture()
    }
    componentDidMount() {
        // 在挂载时初始化Canvas
        this.OnSize()
        // 当window的大小发生变化时
        window.onresize = () => {
            this.OnSize()
        }
        // 初始化画布
        this.initCanvas()
    }

    componentDidUpdate() {
        this.initCanvas()
        if (this.state.isAutoMove) {
            this.Run()
        } else {
            this.Stop()
        }
    }

    OnSize() {
        if (this.state.KLine.JSChart) {
            this.setState(() => {
                var styleText = this.getStyleText()
                this.klineRef.current.width = styleText.width
                this.klineRef.current.height = styleText.height
                this.state.KLine.JSChart.OnSize();
                return {}
            })
        }
    }

    OnKLineMove(event, data, obj) {
        // 得到最新的数据，也就算是最新显示出来的一条数据
        let latestKData = data.LastShowData
        const remainLineCount = data.TrainDataCount
        const { stockCount } = this.state
        const remainStockAssets = stockCount * latestKData.Close

        if (data.TrainDataCount <= 0) {
            latestKData = null
        }
        this.setState({
            latestKData: latestKData,
            remainLineCount: remainLineCount,
            stockAssets: parseInt(remainStockAssets)
        })
        this.calulateAssets()

        if (remainLineCount <= 0) {
            // 写入数据库
        }
    }

    MoveNextKLine() {
        this.state.KLine.JSChart.JSChartContainer.MoveNextKLineData()
    }
    Run() {
        this.state.KLine.JSChart.JSChartContainer.Run()
    }
    Stop() {
        this.state.KLine.JSChart.JSChartContainer.Stop()
    }
    getStyleText() {
        var chartHeight = window.innerHeight - 80;
        var chartWidth = window.innerWidth - 20;
        var styleText = {
            width: chartWidth + 'px',
            height: chartHeight + 'px',
        };
        return styleText
    }

    buy(toBuyCount) {
        let { latestKData, moneyAssets, stockCount, orderID, aryTrade, KLine } = this.state
        if (!latestKData) {
            return
        }
        const spend = latestKData.Close * toBuyCount
        if (toBuyCount <= 0) {
            alert("请输入正确的数量")
            return
        }
        if (spend > moneyAssets) {
            alert("钱不够了")
            return
        }
        ++orderID

        // 买入时是最后的数据的收盘价
        let trade = {
            Price: latestKData.Close, // 交易价格
            ID: orderID, // 交易id
            Vol: toBuyCount, // 交易数量
            Op: 0, // 买入
            Date: latestKData.Date, // 日期
            Time: latestKData.Time // 时间
        }
        aryTrade.push(trade)

        const remainMoneyAssets = moneyAssets - toBuyCount * latestKData.Close
        const remainStockCount = stockCount + toBuyCount
        const remainStockAssets = remainStockCount * latestKData.Close

        KLine.JSChart.JSChartContainer.BuyOrSell(trade, true);
        KLine.JSChart.JSChartContainer.MoveNextKLineData()

        // 修改状态去渲染
        this.setState({
            latestTrade: trade,
            moneyAssets: parseInt(remainMoneyAssets),
            stockCount: remainStockCount,
            stockAssets: parseInt(remainStockAssets),
            orderID: orderID,
            aryTrade: aryTrade
        })
    }
    sell(toSellCount) {
        let { latestKData, moneyAssets, stockCount, orderID, aryTrade, KLine } = this.state
        if (!latestKData) {
            return
        }
        if (stockCount < toSellCount) {
            alert("超出可卖数量")
            return
        }
        ++orderID
        // 卖出时是最后的数据的收盘价
        let trade = {
            Price: latestKData.Close,
            Vol: toSellCount,
            Op: 1,
            ID: orderID,
            Date: latestKData.Date,
            Time: latestKData.Time
        }
        aryTrade.push(trade)

        const remainMoneyAssets = moneyAssets + toSellCount * latestKData.Close
        const remainStockCount = stockCount - toSellCount
        const remainStockAssets = remainStockCount * latestKData.Close

        KLine.JSChart.JSChartContainer.BuyOrSell(trade, true)
        KLine.JSChart.JSChartContainer.MoveNextKLineData()

        // 修改状态去渲染
        this.setState({
            latestTrade: trade,
            moneyAssets: parseInt(remainMoneyAssets),
            stockCount: remainStockCount,
            stockAssets: parseInt(remainStockAssets),
            orderID: orderID,
            aryTrade: aryTrade
        })
    }
    calulateAssets() {
        const { stockCount, latestKData } = this.state
        if (latestKData == null) {
            return
        }
        const stockMoney = stockCount * latestKData.Close
        this.setState({
            stockMoney: stockMoney
        })
    }

    autoMoveSetingCallBack(value) {
        this.setState({
            isAutoMove: value
        })
    }

    showTool(toolName) {
        const { isShowLineTool, isShowNoteTool, isShowConfigTool } = this.state
        if (toolName === 'line') {
            this.setState({
                isShowLineTool: !isShowLineTool,
                isShowNoteTool: false,
                isShowConfigTool: false
            })
        }
        if (toolName === 'note') {
            this.setState({
                isShowLineTool: false,
                isShowNoteTool: !isShowNoteTool,
                isShowConfigTool: false
            })
        }
        if (toolName === 'config') {
            this.setState({
                isShowLineTool: false,
                isShowNoteTool: false,
                isShowConfigTool: !isShowConfigTool
            })
        }
        if (toolName === 'trainhistory') {
            let navigate = this.props.navigate
            navigate('/main/trainhistory')
        }

    }
    closeTool() {
        this.setState({
            isShowLineTool: false,
            isShowNoteTool: false,
            isShowConfigTool: false
        })
    }
    sureChangeConfig(query) {
        this.changeSymbol(query)
        this.setState({
            isShowConfigTool: false
        })
    }
    // 改变符号
    changeSymbol(query) {
        const { selected_item, selected_start_date } = query

        const beginDate = dayjs(selected_start_date).format('YYYYMMDD')


        let option = this.state.KLine.Option
        option.Symbol = selected_item.symbol + '.sh'
        option.SymbolName = selected_item.name
        option.Train = { DataCount: 200, DateTime: { Date: beginDate } }

        this.state.KLine.JSChart.JSChartContainer.RestartTrain(option)


        this.setState({
            moneyAssets: this.initMoney, // 剩余资金
            stockAssets: 0, // 股票资产，根据当前持有股票的数量和价格计算
            stockCount: 0, // 股票数量
            totalAssets: this.initMoney, // 总资产

            isAutoMove: false, // 是否自动移动kline
            remainLineCount: 0, // 剩余的k线

            latestKData: null, // 最后的一个k线数据
            orderID: 0, // 订单id
            latestTrade: null, // 上次的交易
            aryTrade: [], // 交易数组

            isShowLineTool: false, // 是否显示画图
            isShowNoteTool: false, // 是否显示笔记
            isShowConfigTool: false, // 是否显示配
            isShowPictureSettingTool: false,

            Symbol: selected_item.symbol, // 符号标识
            SymbolName: selected_item.name,// 符号名字
            StartDate: selected_start_date, // 其实时间
        })
    }
    zoomUp() {
        // OP_ZOOM_OUT:3,  //缩小
        // OP_ZOOM_IN:4,   //放大
        this.state.KLine.JSChart.JSChartContainer.ChartOperator({ 'ID': 4 })
    }
    zoomDown() {
        this.state.KLine.JSChart.JSChartContainer.ChartOperator({ 'ID': 3 })
    }
    render() {
        let {
            initMoney,
            isAutoMove,
            remainLineCount,
            moneyAssets,
            stockAssets,
            stockCount,
            latestKData,
            // toSellCount,
            // toBuyCount,
        } = this.state

        const { isShowConfigTool, isShowLineTool, isShowNoteTool } = this.state

        const selected_info = {
            'selected_item': { 'name': this.state.SymbolName, 'symbol': this.state.Symbol },
            'selected_start_date': this.state.StartDate
        }

        return (
            <div className='train_line_main'>
                <TrainKlineTop showTool={(toolName) => this.showTool(toolName)}></TrainKlineTop>
                {isShowLineTool ? <TrainKlineLineTool
                    toolSelect={(lineName) => this.CreateDrawPicture(lineName)}

                    closeTool={() => this.closeTool()}></TrainKlineLineTool> : null
                }
                {isShowNoteTool ? <TrainKlineNoteTool closeTool={() => this.closeTool()}></TrainKlineNoteTool> : null}
                {isShowConfigTool ? <TrainKlineConfigTool
                    closeTool={() => this.closeTool()}
                    selected_info={selected_info}
                    sureChangeConfig={(query) => this.sureChangeConfig(query)}></TrainKlineConfigTool> : null}
                <div>
                    <div className='train_kline_chart'>
                        <div style={this.getStyleText()} ref={this.klineRef} id="time_graph_canvas"></div>
                    </div>

                    <Button className='train_line_zoom_up' onClick={() => this.zoomUp()}>放大</Button>
                    <Button className='train_line_zoom_down' onClick={() => this.zoomDown()}>缩小</Button>
                    {/* <div className='train_line_zoom_up'>放大</div> */}
                    {/* <div className='train_line_zoom_down' >缩小</div> */}
                </div>

                <TrainKlinebottom
                    initMoney={initMoney}
                    moneyAssets={moneyAssets}
                    stockAssets={stockAssets}
                    stockCount={stockCount}
                    totalAssets={moneyAssets + stockAssets}

                    isAutoMove={isAutoMove}
                    remainLineCount={remainLineCount}

                    closePrice={latestKData == null ? 0 : latestKData.Close}

                    nextKLineCallBack={() => this.MoveNextKLine()}
                    autoMoveSetingCallBack={(value) => this.autoMoveSetingCallBack(value)}

                    buyCallBack={(value) => this.buy(value)}
                    sellCallBack={(value) => this.sell(value)}
                ></TrainKlinebottom>
            </div>
        )
    }
}

function widthRouter(Component) {
    // 函数组件
    function ComponentWithRouterProp(props) {
        let navigate = useNavigate()
        return (
            <Component {...props} navigate={navigate} ></Component>
        )
    }
    return ComponentWithRouterProp
}
export default widthRouter(TrainKLine)


