import { Navigate } from 'react-router-dom'
import Main from '../containers/main/main'
import TrainKLine from '../containers/train/train_kline'
import PointFigure from '../containers/point/point_figure'
import TrainKlineHistory from '../containers/train/train_kline_history'
export default [
    {
        path: '/',
        element: <Navigate to='/main/trainkline' />
    },
    {
        path: '/login',
        element: <Main />
    },
    {
        path: '/register',
        element: <Main />
    },
    {
        path: '/main',
        element: <Main />,
        children: [
            {
                path: 'trainkline',
                element: <TrainKLine />
            },
            {
                path: 'pointfigure',
                element: <PointFigure />
            },
            {
                path: 'trainhistory',
                element: <TrainKlineHistory />
            }
        ]
    }
]
