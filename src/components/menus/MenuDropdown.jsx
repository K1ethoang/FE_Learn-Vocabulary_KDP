import React from 'react';
import { Button, Dropdown, } from 'antd';
import { PlusOutlined, BookOutlined, FolderOutlined, TeamOutlined } from '@ant-design/icons';

const MenuDropdown = () => {

  const items = [
  {
    label: <span className='w-36 h-8 flex items-center justify-start'>Học phần</span>,
    key: '1',
    icon: <BookOutlined style={{fontSize:15}}/>,
  },
  {
    label:<span className='w-36 h-8 flex items-center justify-start'>Thư mục</span> ,
    key: '2',
    icon:<FolderOutlined style={{fontSize:15}}/>
  },
  {
    label: <span className='w-36 h-8 flex items-center justify-start'>Lớp</span>,
    key: '3',
    icon:<TeamOutlined style={{fontSize:15}}/>
  },
];

  return (
    <div>
      <Dropdown menu={{items}} trigger={['click']} placement="bottomLeft">
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="large"
        />
      </Dropdown>
    </div>
  );
};

export default MenuDropdown;
