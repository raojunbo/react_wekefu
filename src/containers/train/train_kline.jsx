import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom';

import TrainKlineTop from './train_kline_top';
import TrainKlinebottom from './train_kline_bottom'
import TrainKlineLineTool from './train_kline_line_tool'
import TrainKlineConfigTool from './train_kline_config_tool';
import TrainKlineNoteTool from './train_kline_note_tool';
import {randomOneStock,randomOneDate, stockformatDate} from './train_kline_config_random.js'
import HQChart from 'hqchart';
import { a_symbol_sh } from './a_stock_symbol_sh';
import './train_kline.less'

function DefaultData() { }
DefaultData.GetKLineOption = function () {
    let data =
    {
        Type: 'K线训练',
        Symbol:'', // 符号标识
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
                // 20180201
                Date: '20221105'
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
        }
    };
    return data;
}

class TrainKLine extends Component {
    constructor(props) { //构造函数
        super(props);
        this.klineRef = React.createRef()
        this.initCanvas = this.initCanvas.bind(this);

        const money = 50000
        this.state = {
            // 初始化数据
            initMoney: money,// 初始资金
            moneyAssets: money, // 剩余资金
            stockAssets: 0, // 股票资产，根据当前持有股票的数量和价格计算
            stockCount: 0, // 股票数量
            totalAssets: money, // 总资产

            // 界面控制
            toBuyCount: 0, // 要买的数量
            toSellCount: 0, // 要卖的数量
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

            Symbol:'', // 符号标识
            SymbolName: '',// 符号名字
            StartDate:null,

            KLine:
            {
                JSChart: null,
                Option: DefaultData.GetKLineOption()
            }
        }
    }
   
    initCanvas() {

        if (this.state.KLine.JSChart) return;

        // this.state.KLine.Option.Symbol = this.state.symbol;

        const query = {
            'selected_item':  randomOneStock(a_symbol_sh),
            'selected_start_date': randomOneDate()
        }
        this.changeSymbol(query)


        let chart = HQChart.Chart.JSChart.Init(document.getElementById("time_graph_canvas"));

        // 设置Kline的配置

        chart.SetOption(this.state.KLine.Option);
        // 保存图表的引用
        this.state.KLine.JSChart = chart;

        // JSCHART_EVENT_ID.RECV_TRAIN_MOVE_STEP 实际上是4
        chart.AddEventCallback({
            event: 4 ,
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
        chart.AddEventCallback( {
            event: 23, 
            callback:(event,data,obj)=>{
                 this.OnSelectDrawPicture(event,data,obj); 
            }
       });
    }
    // 开始画图
    CreateDrawPicture(lineName) {
        if(lineName == '全部删除') {
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

    buy() {
        let { latestKData, toBuyCount, moneyAssets, stockCount, orderID, aryTrade, KLine } = this.state
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
        // KLine.JSChart.KLineTrainChartContainer.BuyOrSell(trade, true);
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
    sell() {
        let { latestKData, toSellCount, moneyAssets, stockCount, orderID, aryTrade, KLine } = this.state
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
    buyAndSellPercentCallBack(isBuy, persent) {
        // 通过persent计算出股票数量
        // console.log("买入与卖出百分比设置了")
        const { moneyAssets, stockCount } = this.state
        if (isBuy) {
            const { latestKData } = this.state
            let toBuyCount = (moneyAssets / latestKData.Close) * persent
            this.setState({
                toBuyCount: parseInt(toBuyCount)
            })
        } else {
            let toSellCount = stockCount * persent
            this.setState({
                toSellCount: parseInt(toSellCount)
            })
        }
    }
    buyAndSellCountChangeCallBack(isBuy, count) {
        let { latestKData, moneyAssets, stockCount } = this.state

        if (isBuy) {
            const spend = latestKData.Close * count
            if (count <= 0) {
                alert("请输入正确的数量")
                return
            }
            if (count > moneyAssets) {
                alert("钱不够了")
                return
            }
            this.setState({
                toBuyCount: count
            })
        } else {
            if (count > stockCount) {
                alert("超出可卖数量")
                return
            }
            this.setState({
                toSellCount: count
            })
        }
    }
    buyAndSellCallBack(isBuy) {
        if (isBuy) {
            this.buy()
        } else {
            this.sell()
        }
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
            isShowNoteTool: false
        })
    }
    
    sureChangeConfig(query) {
        this.changeSymbol(query)
        this.setState({
            isShowConfigTool: false
        })
    }
    changeSymbol(query) {
        const { selected_item, selected_start_date } = query
        
        this.setState(() => {
             // 请求时间的标准化
            const beginDate = stockformatDate(selected_start_date)
            var option = {
                Symbol: selected_item.symbol + '.sh',
                Train: { DataCount: 200, DateTime: { Date: beginDate } },
            }
            this.state.KLine.JSChart.JSChartContainer.RestartTrain(option)

            return {
                Symbol: selected_item.symbol,
                SymbolName: selected_item.name,
                StartDate: selected_start_date,
                aryTrade: [],
                latestKData: null,
                latestTrade: null
            }
        })
    }

    render() {
        let { initMoney, isAutoMove,
            remainLineCount,
            moneyAssets,
            stockAssets,
            stockCount,
            toSellCount,
            toBuyCount,
        } = this.state
        const { isShowConfigTool, isShowLineTool, isShowNoteTool} = this.state
        
        const selected_info = {
            'selected_item': {'name': this.state.SymbolName, 'symbol': this.state.Symbol},
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
                {isShowConfigTool ? <TrainKlineConfigTool selected_info={selected_info} sureChangeConfig={(query) => this.sureChangeConfig(query)}></TrainKlineConfigTool> : null}
                <div className='train_kline_chart' style={this.getStyleText()} ref={this.klineRef} id="time_graph_canvas"></div>
                <TrainKlinebottom
                    initMoney={initMoney}
                    moneyAssets={moneyAssets}
                    stockAssets={stockAssets}
                    stockCount={stockCount}
                    totalAssets={moneyAssets + stockAssets}

                    isAutoMove={isAutoMove}
                    remainLineCount={remainLineCount}
                    toSellCount={toSellCount}
                    toBuyCount={toBuyCount}

                    nextKLineCallBack={() => this.MoveNextKLine()}
                    autoMoveSetingCallBack={(value) => this.autoMoveSetingCallBack(value)}
                    buyAndSellCountChangeCallBack={(isBuy, value) => this.buyAndSellCountChangeCallBack(isBuy, value)}
                    buyAndSellCallBack={(isBuy) => this.buyAndSellCallBack(isBuy)}
                    buyAndSellPercentCallBack={(isBuy, persent) => this.buyAndSellPercentCallBack(isBuy, persent)}
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


