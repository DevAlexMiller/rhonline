import React, { useState } from 'react';
import { FaBars, FaUserPlus } from 'react-icons/fa';
import { TiHome } from 'react-icons/ti';
import { ImKey, ImExit } from 'react-icons/im';
import { GiHouseKeys } from 'react-icons/gi';
import {MySidebar, MenuItem, IconContainer, Label} from './styles';

const Sidebar = ({ isAdmin }) => {
  const [open, setOpen] = useState(false);
  const menuItems = [
    { icon: <TiHome className='icon-home'/>, label: 'Início' },
    { icon: <ImKey />, label: 'Alterar senha' },
    ...(isAdmin
      ? [
          { icon: <GiHouseKeys />, label: 'Gerenciar senhas' },
          { icon: <FaUserPlus />, label: 'Novo usuário' }
        ]
      : []),
    { icon: <ImExit />, label: 'Sair' }
  ];

  return (
    <MySidebar $open={open}>
      <MenuItem style={{ marginBottom: '10vh' }}>
        <IconContainer onClick={() => setOpen(!open)}>
          <FaBars />
        </IconContainer>
        {open && <Label></Label>}
      </MenuItem>
      {menuItems.map((item, index) => (
        <MenuItem key={index}>
          <IconContainer>{item.icon}</IconContainer>
          {open && <Label>{item.label}</Label>}
        </MenuItem>
      ))}
    </MySidebar>
  );
};
export default Sidebar;