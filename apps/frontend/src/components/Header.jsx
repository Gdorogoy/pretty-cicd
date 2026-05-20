import { Button } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <Button
        type="text"
        icon={<MenuOutlined />}
        aria-label="Open menu"
        className="app-header__btn"
      />
      <Button
        type="text"
        icon={<UserOutlined />}
        aria-label="User menu"
        className="app-header__btn"
      />
    </header>
  );
};

export default Header;
