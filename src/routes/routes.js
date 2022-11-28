import { Navigate } from 'react-router-dom'
import Main from '../containers/main/main'
// 全局路由配置入口
export default [
    {
        path: '/',
        element: <Navigate to='/main'/>
    },
    // main下面的子路由
    {
        path: '/main',
        element: <Main />,
        children: [
            // {
            //     path: 'dashen',
            //     element: <Dashen />
            // },
            // {
            //     path: 'laoban',
            //     element: <Laoban />
            // }
        ]
    },
   
    // {
    //     path: '*',
    //     element: <NotFound />
    // },
]