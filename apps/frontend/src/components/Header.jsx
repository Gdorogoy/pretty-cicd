import { useState } from 'react';
import { Button, Drawer, Menu } from 'antd';
import {
  MenuOutlined,
  UserOutlined,
  InboxOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import './Header.css';

const menuItems = [
  {
    key: 'last-workflow',
    icon: <InboxOutlined />,
    label: 'Last Workflow run',
  },
  {
    key: 'create-workflow',
    icon: <PlusOutlined />,
    label: 'Create Workflow',
  },
  {
    type: 'divider',
  },
  {
    key: 'workflow-runs',
    icon: <UnorderedListOutlined />,
    label: 'Workflow Runs',
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Settings',
  },
];

const Header = ({ onMenuSelect }) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const handleMenuClick = ({ key }) => {
    onMenuSelect?.(key);
    onClose();
  };

  return (
    <>
      <header className="app-header">
        <Button
          type="text"
          icon={<MenuOutlined />}
          aria-label="Open menu"
          className="app-header__btn"
          onClick={showDrawer}
        />
        <Button
          type="text"
          icon={<UserOutlined />}
          aria-label="User menu"
          className="app-header__btn"
        />
      </header>

      <Drawer
        title="Menu"
        placement="left"
        onClose={onClose}
        open={open}
        size={260}
      >
        <Menu
          mode="inline"
          items={menuItems}
          onClick={handleMenuClick}
          className="app-header__menu"
        />
      </Drawer>
    </>
  );
};

export default Header;
