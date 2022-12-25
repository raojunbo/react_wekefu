import React, { Component } from 'react'
import './train_kline_line_tool.less'
import { Col, Row } from 'antd'

const TOOL_LIST =
    [
        [
            { HTML: { Title: '线段', IClass: 'symbolIkcon icon-draw_line', ID: 'icon-segment' }, Name: '线段' },
            { HTML: { Title: '尺子', IClass: 'iconfont icon-ruler', ID: 'icon_ruler' }, Name: '尺子' },
            { HTML: { Title: '射线', IClass: 'iconfont icon-draw_rays', ID: 'icon-beam' }, Name: '射线' },
            { HTML: { Title: '标价线', IClass: 'iconfont icon-price_line', ID: 'icon-price-line' }, Name: '标价线' },
            { HTML: { Title: '垂直线', IClass: 'iconfont icon-vertical_line', ID: 'icon-vertical-line' }, Name: '垂直线' },
            { HTML: { Title: '箭头', IClass: 'iconfont icon-draw_rays', ID: 'icon-beam2' }, Name: '箭头' },
            { HTML: { Title: '趋势线', IClass: 'iconfont icon-draw_trendline', ID: 'icon-trendline' }, Name: '趋势线' },
            { HTML: { Title: '水平线', IClass: 'iconfont icon-draw_hline', ID: 'icon-hline' }, Name: '水平线' },
            { HTML: { Title: '水平线段', IClass: 'iconfont icon-draw_hlinesegment', ID: 'icon-hlineseg' }, Name: '水平线段' },
            { HTML: { Title: '平行射线', IClass: 'iconfont icon-draw_p_rays_lines', ID: 'icon-rayslineseg' }, Name: '平行射线' },
            { HTML: { Title: '平行线', IClass: 'iconfont icon-draw_parallel_lines', ID: 'icon-parallellines' }, Name: '平行线' },
            { HTML: { Title: '平行通道', IClass: 'iconfont icon-draw_parallelchannel', ID: 'icon-parallelchannel' }, Name: '平行通道' },
            { HTML: { Title: '价格通道线', IClass: 'iconfont icon-draw_pricechannel', ID: 'icon-pricechannel' }, Name: '价格通道线' },
            { HTML: { Title: 'M头W底', IClass: 'iconfont icon-draw_wavemw', ID: 'icon-wavemw' }, Name: 'M头W底' },
            { HTML: { Title: '头肩型', IClass: 'iconfont icon-draw_head_shoulders_bt', ID: 'icon-Head-Shoulders' }, Name: '头肩型' },
            { HTML: { Title: '波浪尺', IClass: 'iconfont icon-waveruler', ID: 'icon-wave-ruler' }, Name: '波浪尺' },
            { HTML: { Title: 'AB波浪尺', IClass: 'iconfont icon-waveruler', ID: 'icon-wave-ruler' }, Name: 'AB波浪尺' },
            { HTML: { Title: '箱型线', IClass: 'iconfont icon-draw_box', ID: 'icon-drawbox' }, Name: '箱型线' },
            { HTML: { Title: '涂鸦线段', IClass: 'iconfont icon-draw_line', ID: 'icon-segment2' }, Name: '涂鸦线段' },

        ],
        [
            { HTML: { Title: '圆弧', IClass: 'iconfont icon-draw_arc', ID: 'icon-arc' }, Name: '圆弧线' },
            { HTML: { Title: '矩形', IClass: 'iconfont icon-rectangle', ID: 'icon-rect' }, Name: '矩形' },
            { HTML: { Title: '平行四边形', IClass: 'iconfont icon-draw_quadrangle', ID: 'icon-quad' }, Name: '平行四边形' },
            { HTML: { Title: '三角形', IClass: 'iconfont icon-draw_triangle', ID: 'icon-triangle' }, Name: '三角形' },
            { HTML: { Title: '圆', IClass: 'iconfont icon-draw_circle', ID: 'icon-circle' }, Name: '圆' },
            { HTML: { Title: '对称角度', IClass: 'iconfont icon-draw_symangle', ID: 'icon-symangle' }, Name: '对称角度' },
        ],
        [
            { HTML: { Title: '文本', IClass: 'iconfont icon-draw_text', ID: 'icon-text' }, Name: '文本' },
            { HTML: { Title: '向上箭头', IClass: 'iconfont icon-arrow_up', ID: 'icon-arrowup' }, Name: 'icon-arrow_up' },
            { HTML: { Title: '向下箭头', IClass: 'iconfont icon-arrow_down', ID: 'icon-arrowdown' }, Name: 'icon-arrow_down' },
            { HTML: { Title: '向左箭头', IClass: 'iconfont icon-arrow_left', ID: 'icon-arrowleft' }, Name: 'icon-arrow_left' },
            { HTML: { Title: '向右箭头', IClass: 'iconfont icon-arrow_right', ID: 'icon-arrowright' }, Name: 'icon-arrow_right' },
        ],
        [
            { HTML: { Title: '江恩角度线', IClass: 'iconfont icon-draw_gannfan', ID: 'icon-gannfan' }, Name: '江恩角度线' },
            { HTML: { Title: '斐波那契周期线', IClass: 'iconfont icon-draw_fibonacci', ID: 'icon-fibonacci' }, Name: '斐波那契周期线' },
            { HTML: { Title: '阻速线', IClass: 'iconfont icon-draw_resline', ID: 'icon-resline' }, Name: '阻速线' },
            { HTML: { Title: '黄金分割', IClass: 'iconfont icon-draw_goldensection', ID: 'icon-goldensection' }, Name: '黄金分割' },
            { HTML: { Title: '百分比线', IClass: 'iconfont icon-draw_percentage', ID: 'icon-percentage' }, Name: '百分比线' },
            { HTML: { Title: '波段线', IClass: 'iconfont icon-draw_waveband', ID: 'icon-waveband' }, Name: '波段线' },
            { HTML: { Title: '线形回归线', IClass: 'iconfont icon-linear_3', ID: 'icon-waveband2' }, Name: '线形回归线' },
            { HTML: { Title: '线形回归带', IClass: 'iconfont icon-linear_1', ID: 'icon-waveband3' }, Name: '线形回归带' },
            { HTML: { Title: '延长线形回归带', IClass: 'iconfont icon-linear_2', ID: 'icon-waveband5' }, Name: '延长线形回归带' },
        ],
        [{ HTML: { Title: '全部删除', IClass: 'iconfont icon-recycle_bin', ID: 'icon-delete' }, Name: '全部删除' }]
    ]
export default class TrainKlineLineTool extends Component {
    constructor(props) {
        super(props)
    }
    toolSelect(toolName) {
        this.props.toolSelect(toolName)
    }
    render() {
        const rows = []
        for (let i = 0; i < TOOL_LIST.length; i++) {
            const col_list = TOOL_LIST[i]
            let cols = []
            for (let j = 0; j < col_list.length; j++) {
                const iClass = col_list[j].HTML.IClass
                const Name = col_list[j].Name
                cols.push(
                    <Col key={(i + j).toString()} onClick={() => this.toolSelect(Name)}>
                        <div className='train_kline_line_tool_item'>
                            <div className={iClass}></div>
                        </div>
                    </Col>,
                );
            }
            rows.push(cols)
        }
        return (
            <div className='train_kline_line_tool'>
                <div className='train_kline_line_tool_close_row' onClick={() => this.props.closeTool()}>
                    <div style={{ 'margin-right': 10, 'margin-top': 5, 'margin-bottom': 5 }}>
                        <div class="iconfont  icon-close"></div>
                    </div>
                </div>

                {
                    rows.map((item, index) => {
                        return (
                            <div>
                                <div className='train_kline_tool_separte_line_style'></div>
                                <Row> {item} </Row>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}