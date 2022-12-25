import React, { Component } from 'react'
import './train_kline_note_tool.less'
import { Divider, List, Input, Button, Avatar, message } from 'antd';
import VirtualList from 'rc-virtual-list';

const { TextArea } = Input
const fakeDataUrl = 'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400

export default class TrainKlineNoteTool extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {
          'time': '2022年11月1日',
          'title': '我是标题1',
          'content': '我是内容1'
        },
        {
          'time': '2022年11月2日',
          'title': '我是标题2',
          'content': '我是内容2我是内容2我是内容2我是内容2我是内容2我是内容2我是内容2我是内容2我是内容2'
        }, {
          'time': '2022年11月1日',
          'title': '我是标题1',
          'content': '我是内容1'
        },
        {
          'time': '2022年11月2日',
          'title': '我是标题2',
          'content': '我是内容2我是内容2我是内容2我是内容2我是内容2我是内容2我是内容2我是内容2我是内容2'
        },
        {
          'time': '2022年11月1日',
          'title': '我是标题1',
          'content': '我是内容1'
        },
        {
          'time': '2022年11月2日',
          'title': '我是标题2',
          'content': '我是内容2我是内容2我是内容2我是内容2我是内容2我是内容2我是内容2我是内容2我是内容2'
        }
      ],
      loading: false
    }
  }

  setLoading(loading) {
    this.setState({
      loading: loading
    })
  }

  setData(data) {
    this.setState({
      data: data
    })
  }

  onScroll(e) {
    console.log('正在滚动')
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      // this.appendData()
    }
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
  render() {
    return (
      <div className='train_kline_note_tool'>
        <div className='train_kline_note_tool_close_row' onClick={() => this.props.closeTool()}>
          <div style={{ 'margin-right': 10, 'margin-top': 5, 'margin-bottom': 5 }}>
            <div class="iconfont  icon-close"></div>
          </div>
        </div>
        <List className='train_kline_note_tool_list'>
          <VirtualList data={this.state.data} height={ContainerHeight} itemHeight={47} itemKey="time" onScroll={(e) => this.onScroll(e)}>
            {(item) => (
              <List.Item key={item.time}>
                <div className='train_kline_note_tool_listitem'>
                  <div className='train_kline_note_tool_listitem_title'>{item.time}</div>
                  <div className='train_kline_note_tool_listitem_content'>{item.content}</div>
                </div>
              </List.Item>
            )}
          </VirtualList>
        </List>
        <TextArea rows={6} placeholder="请输入笔记内容" maxLength={100} />
        <Button style={{ 'margin': 10 }} type="primary">提交</Button>
      </div>
    )
  }

}