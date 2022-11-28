import React, { useState } from 'react';
import LeftNavigation from '../../components/left_navigation';
import { Navigate, Outlet,  useNavigate, useParams } from 'react-router-dom'

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { Header, Sider, Content } = Layout;

function Main() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div>
            <LeftNavigation/>
            <div >
                <Outlet></Outlet>
            </div>
            
        </div>
    )
};


export default Main;