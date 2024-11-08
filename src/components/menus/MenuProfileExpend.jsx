import React from 'react';
import { Avatar, Dropdown, } from 'antd';
import {UserOutlined, TrophyOutlined, SettingOutlined } from '@ant-design/icons';

const MenuProfileExpend = () => {

  const items = [
  {
    label:  <div className='flex items-center justify-start w-60'>
              <Avatar size='large' shape='circle' style={{backgroundColor:'blue'}}>A</Avatar>
              <span className='text-lg font-bold pl-1'>Nguyen Van A</span>
            </div>,
    key: '1',
    disabled:true
  },
 {
    type: 'divider',
  },
  {
    label:<span className='w-36 h-8 flex items-center justify-start'>Thành tựu</span> ,
    key: '2',
    icon:<TrophyOutlined style={{fontSize:15}}/>
  },
  {
    label: <span className='w-36 h-8 flex items-center justify-start'>Cài đặt</span>,
    key: '3',
    icon:<SettingOutlined style={{fontSize:15}}/>
  },
  {
    type: 'divider',
  },
  {
    key: '4',
    label:<span className='w-36 h-8 flex items-center justify-start'>Đăng xuất</span>,
  },
  {
    type: 'divider',
  },
  {
    key: '5',
    label:<span className='w-36 h-8 flex items-center justify-start'>Quyền riêng tư</span>,
  },
  {
    key: '6',
    label:<span className='w-36 h-8 flex items-center justify-start'>Giúp đỡ và phản hồi</span>,
  },
  {
    key: '7',
    label:<span className='w-36 h-8 flex items-center justify-start'>Nâng cấp</span>,
  }
];

  return (
    <div className='cursor-pointer flex items-center'>
      <Dropdown menu={{items}} trigger={['click']} placement="bottomLeft">
        <Avatar
          style={{backgroundColor:'blue'}} shape="square" size='large'  icon={<UserOutlined />}
        />
      </Dropdown>
    </div>
  );
};

export default MenuProfileExpend;
