import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaUserPlus } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { ImKey, ImExit } from "react-icons/im";
import { GiHouseKeys } from "react-icons/gi";
import { MySidebar, MenuItem, IconContainer, Label } from "./styles";

const Sidebar = ({ isAdmin }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function onVerificationClick(index) {
    if (!open) return; // só navega se a sidebar estiver aberta

    const routes = {
      1: "/home",
      2: "/newPassword",
      3: "/resetPassword",
      4: "/newUser",
      5: "/",
    };

    if (routes[index]) {
      navigate(routes[index]);
    }
  }

  const menuItems = [
    { icon: <TiHome className="icon-home" />, label: "Início", index: 1 },
    { icon: <ImKey />, label: "Alterar senha", index: 2 },
    ...(isAdmin
      ? [
          { icon: <GiHouseKeys />, label: "Gerenciar senhas", index: 3 },
          { icon: <FaUserPlus />, label: "Novo usuário", index: 4 },
        ]
      : []),
    { icon: <ImExit />, label: "Sair", index: 5 },
  ];

  return (
    <MySidebar $open={open}>
      <MenuItem style={{ marginBottom: "17vh" }}>
        <IconContainer onClick={() => setOpen(!open)}>
          <FaBars />
        </IconContainer>
        {open && <Label></Label>}
      </MenuItem>

      {menuItems.map((item, idx) => (
        <MenuItem key={idx} onClick={() => onVerificationClick(item.index)}>
          <IconContainer>{item.icon}</IconContainer>
          {open && <Label>{item.label}</Label>}
        </MenuItem>
      ))}
    </MySidebar>
  );
};

export default Sidebar;
