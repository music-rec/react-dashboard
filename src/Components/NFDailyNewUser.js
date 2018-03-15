import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Calendar, Badge } from 'antd';
import { BackTop } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import { Button, Dropdown, Icon, message } from 'antd';

import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";

import moment from 'moment';
import { DatePicker } from 'antd';

import {queryDailyNewUser, queryCurrentDailyNewUser} from '../Services/NFBusinessAPI';
import NFRootModel from '../Models/NFRootModel';

const { Content } = Layout;

@observer
class NFDailyNewUser extends React.Component {
    

  render() {
    function handleButtonClick(e) {
        message.info('Click on left button.');
        console.log('click left button', e);
      }
      function handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
      }

    function onChange(date, dateString) {
        console.log(date, dateString);
        if (dateString != null && dateString != "")
        {
            queryDailyNewUser(dateString);
        }
      }


       // 数据源
    var totalData ;
    var platNewUser;

    if (this.props.store.newUserData)
    {
        totalData = this.props.store.newUserData.totalUserData;
        platNewUser = this.props.store.newUserData.platUserData;

    }

    console.log("totalData", totalData);
    console.log("platNewUser", platNewUser);

    /*
        private String plat;
    
        private String time;
    
        //渠道人数，若渠道为0，则和total一样
        private Integer todayNumber;
    
        //今天总人数
        private Integer totalNumber;

            // 数据源
        const data = [
            { time: '1', todayNumber: 275, income: 2300 },
            { time: '2', todayNumber: 115, income: 667 },
            { time: '3', todayNumber: 120, income: 982 },
            { time: '4', todayNumber: 350, income: 5271 },
            { time: '5', todayNumber: 350, income: 5271 },
            { time: '6', todayNumber: 350, income: 5271 },
            { time: '7', todayNumber: 350, income: 5271 },
            { time: '8', todayNumber: 350, income: 5271 },
            { time: '9', todayNumber: 350, income: 5271 },
            { time: '10', todayNumber: 350, income: 5271 },
            { time: '11', todayNumber: 350, income: 5271 },
            { time: '12', todayNumber: 350, income: 5271 },
            { time: '13', todayNumber: 1350, income: 5271 },
            { time: '14', todayNumber: 150, income: 3710 }
        ];
       var platNewUser = [ 
            { time: '1', age: 21, gender: 'male' },
            { time: '2', age: 21, gender: 'male' },
            { time: '3', age: 21, gender: 'male' }
        ];
     
*/
        // 定义度量
        const cols = {
            todayNumber: { alias: '新用户 New users' },
            time: { alias: 'New User Today' }
        };
        const menu = (
            <Menu onClick={handleMenuClick}>
              <Menu.Item key="1">1st menu item</Menu.Item>
              <Menu.Item key="2">2nd menu item</Menu.Item>
              <Menu.Item key="3">3rd item</Menu.Item>
            </Menu>
          );
 

    return (
      <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>新增用户总览 Overview</Breadcrumb.Item>

                <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
                这里选择要查询的区服
                </Dropdown.Button>
                <DatePicker onChange={onChange}/>

                <Button  type="primary">查询</Button>
   
            </Breadcrumb>

            { totalData && 
                <Chart width={900} height={400} data={totalData} scale={cols}>
                    <Axis name="time" />
                    <Axis name="todayNumber"/>
                    <Tooltip/>
                    <Geom type="interval" position="time*todayNumber" color="todayNumber" />
                </Chart>
            }
            
            { platNewUser &&
                Object.keys(platNewUser).map((key) => (  
                    <div style={{ padding: 0, background: '#fff', minHeight: 360 }}>
                        { 
                        <div>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>{"渠道 plat: " + key}</Breadcrumb.Item>
                            </Breadcrumb>

                            <Chart height={320} width={900} data={platNewUser[key]} scale={cols}>
                            <Legend />
                            <Axis name="time" />
                            <Axis name="todayNumber" label={{formatter: val => `${val}`}}/>
                            <Tooltip crosshairs={{type : "y"}}/>
                            <Geom type="line" position="time*todayNumber" size={2} color={'city'} />
                            <Geom type='point' position="time*todayNumber" size={6} shape={'circle'} color={'city'} style={{ stroke: '#fff', lineWidth: 1}} />
                            </Chart>
                        </div>
                        }
                    </div> 
                  )) 
            }
                
          </Content>
    );
  }
}

export default NFDailyNewUser;