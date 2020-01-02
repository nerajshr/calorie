import {Button, DatePicker, Dropdown, Icon, Menu, TimePicker} from "antd";
import React, {useState} from "react";
const { RangePicker } = DatePicker;

const dateFormat = 'DD/MM/YYYY';


// function handleMenuClick(e) {
//     // message.info('Click on menu item.');
//     console.log('click', e);
// }




function CalorieContentHeader(){
    const [filter, setFilter] = useState("Filter");
    const [timeFilter, setTimeFilter] = useState('none');
    const [dateFilter, setDateFilter] = useState( 'none');

    const menu = (
        <Menu onClick={onHandleMenuClick}>
            <Menu.Item key="1" >
                <Icon type="filter" />
                By Date
            </Menu.Item>
            <Menu.Item key="2">
                <Icon type="filter" />
                By Time
            </Menu.Item>
        </Menu>
    );

    function onHandleMenuClick(e){
        switch (e.key) {
            case "1": setFilter("By Date");
                setDateFilter("");
                setTimeFilter('none');
                break;
            case "2": setFilter("By Time");
                setDateFilter('none');
                setTimeFilter('');
                break;
            default: setFilter("Filter")
        }
    }
    return(
        <div>
            <Dropdown overlay={menu} >
                <Button style={{marginRight:'20px'}}>
                    {filter} <Icon type="down" />
                </Button>
            </Dropdown>
            <RangePicker
                style={{display:dateFilter}}
                format={dateFormat}
            />

            <TimePicker style={{display: timeFilter}} format="HH:mm" placeholder="start-time"/>
            <TimePicker style={{display: timeFilter}} format="HH:mm" placeholder="end-time"/>
            <span style={{float:'right'}}>
                <Button  type="primary" shape="circle" icon="plus" size="large" />
            </span>
        </div>
    );
}

export default CalorieContentHeader;