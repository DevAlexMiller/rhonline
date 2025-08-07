import React, { useState } from 'react';
import { FaBars, FaUserPlus } from 'react-icons/fa';
import { TiHome } from 'react-icons/ti';
import { ImKey, ImExit } from 'react-icons/im';
import { GiHouseKeys } from 'react-icons/gi';
import {MySidebar, MenuItem, IconContainer, Label} from './styles';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isAdmin }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function onVerificationClick(index) {
    if (index == 1){
    }
    
    else if (index == 2){
    }
  }

  const menuItems = [
    { icon: <TiHome className='icon-home' onClick={onVerificationClick(1)}/>, label: 'Início' },
    { icon: <ImKey onClick={onVerificationClick(2)}/>, label: 'Alterar senha' },
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
      <MenuItem style={{ marginBottom: '17vh' }}>
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