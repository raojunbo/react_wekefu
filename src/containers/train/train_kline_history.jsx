import React, { Component } from 'react'
import { List, Input, Button, Avatar, message, Divider } from 'antd';
import { LeftOutlined } from '@ant-design/icons'
import VirtualList from 'rc-virtual-list';
import './train_kline_history.less'
import widthRouter from '../../routes/withRouter';
// const { TextArea } = Input
const fakeDataUrl = 'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400

class TrainKlineHistory extends Component {
  constructor(props) {
    super(props)
    this.klineRef = React.createRef()
    this.state = {
      data: [
        {
          'time': '2022年11月1日',
          'symbol': '拼多多',
          'earnings': '收益',
          'rank': '1'
        },
        {
          'time': '2022年11月2日',
          'symbol': '拼多多',
          'earnings': '收益',
          'rank': '1'
        }, {
          'time': '2022年11月3日',
          'symbol': '拼多多',
          'earnings': '收益',
          'rank': '1'
        },
        {
          'time': '2022年11月4日',
          'symbol': '拼多多',
          'earnings': '收益',
          'rank': '1'
        },
        {
          'time': '2022年11月5日',
          'symbol': '拼多多',
          'earnings': '收益',
          'rank': '1'
        }
      ],
      loading: false
    }
  }

  componentDidMount() {
    this.OnSize()
    window.onresize = () => {
      this.OnSize()
    }
  }

  OnSize() {
    // var chartHeight = window.innerHeight - 40;
    var chartWidth = window.innerWidth - 70;
    var chartHeight = window.innerHeight - 80;
    var chartWidth = window.innerWidth - 70;
    var styleText = {
      width: chartWidth + 'px',
      height: chartHeight + 'px',
    };
    this.klineRef.current.width = styleText.width
    this.klineRef.current.height = styleText.height
    // var styleText = {
    // width: chartWidth + 'px',
    // height: chartHeight + 'px',
    // };
    // this.klineRef.current.width = styleText.width
    // this.klineRef.current.height = styleText.height


    // if (this.state.KLine.JSChart) {
    // this.state.KLine.JSChart.OnSize();
    // }
  }

  // setLoading(loading) {
  //   this.setState({
  //     loading: loading
  //   })
  // }

  // setData(data) {
  //   this.setState({
  //     data: data
  //   })
  // }

  onScroll(e) {
    // console.log('正在滚动')
    // if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
    // this.appendData()
    // }
  }

  // loadMoreData() {
  // if (this.state.loading) {
  //   return;
  // }
  // this.setLoading(true);
  // setTimeout(() => {
  //   let templist = [
  //     {
  //       'title': '我是标题1',
  //       'content': '我是内容1'
  //     },
  //     {
  //       'title': '我是标题2',
  //       'content': '我是内容2'
  //     }
  //   ]
  //   this.setData([...this.state.data, ...body.results]);
  //   this.setLoading(false);
  //   console.log('网络请求成功')
  // }, 3);
  // fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
  //   .then((res) => res.json())
  //   .then((body) => {
  //     this.setData([...this.state.data, ...body.results]);
  //     this.setLoading(false);
  //     console.log('网络请求成功')
  //   })
  //   .catch(() => {
  //     this.setLoading(false);
  //   });
  // }

  appendData() {
    // setTimeout(() => {
    //   let templist = [
    //     {
    //       'time':'1',
    //       'title': '我是标题1',
    //       'content': '我是内容1'
    //     },
    //     {
    //       'time':'2',
    //       'title': '我是标题2',
    //       'content': '我是内容2'
    //     }
    //   ]
    //   this.setData([...this.state.data, ...templist]);
    //   this.setLoading(false);
    //   console.log('网络请求成功')
    // }, 3);

    // fetch(fakeDataUrl)
    //   .then((res) => res.json())
    //   .then((body) => {
    //     this.setData(this.state.data.concat(body.results));
    //     message.success(`${body.results.length} more items loaded!`);
    //   });
  }

  componentDidMount() {
    // this.appendData()
  }
  backClick() {
    console.log('返回按钮点击了吗啊')
    const { navigate } = this.props
    navigate(-1)
  }
  buttonClick(item) {
    console.log(item)
    console.log('点击了吗')
  }
  render() {
    return (
      <div className='train_history_main'>
        <div className='train_line_history_nav'>
          <div className='train_line_history_back' onClick={() => this.backClick()}>
            <LeftOutlined />
          </div>

          历史复盘
          <div className='train_line_history_right_space'></div>
        </div>
        <div className='train_kline_history_list_header'>
          <div className='train_kline_history_list_item_element'>日期</div>
          <div className='train_kline_history_list_item_element'>股票</div>
          <div className='train_kline_history_list_item_element'>收益</div>
          <div className='train_kline_history_list_item_element'>排行</div>
        </div>
        <List >
          <VirtualList data={this.state.data} height={ContainerHeight} itemHeight={47} itemKey="time" onScroll={(e) => this.onScroll(e)}>
            {(item) => (
              <List.Item key={item.time} onClick={() => this.buttonClick(item)}>
                <div className='train_kline_history_list_item_element'>{item.time}</div>
                <div className='train_kline_history_list_item_element'>{item.symbol}</div>
                <div className='train_kline_history_list_item_element'>{item.earnings}</div>
                <div className='train_kline_history_list_item_element'>{item.rank}</div>
              </List.Item>
            )}
          </VirtualList>
        </List>
      </div>
    )
  }
}

export default widthRouter(TrainKlineHistory)