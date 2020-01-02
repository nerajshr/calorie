import {Layout, Menu} from "antd";
import React from "react";
const {Sider} = Layout;


function CalorieSideBar(){
    return(
        <Sider width={200} style={{ background: '#fff' }}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
            >

                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2">Expected Calories</Menu.Item>
            </Menu>
        </Sider>
    );
}

export default CalorieSideBar;