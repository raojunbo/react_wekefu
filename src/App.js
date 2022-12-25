import logo from './logo.svg';
import './App.css';
import { useRoutes } from 'react-router-dom'
import routes from './routes/routes';
// 引入hqchart里的iconfont样式
// import 'hqchart/src/jscommon/umychart.resource/css/tools.css'
// k线上的标记
import 'hqchart/src/jscommon/umychart.resource/font/iconfont.css'
// import './components/jscommon/umychart.resource/font/iconfont.css'

function App() {
  const routeElements = useRoutes(routes)
  return (
    <div className='App'>
      {/* <div className='AppTest'>你好</div> */}
       {routeElements}
     </div>
  );
}

export default App;
