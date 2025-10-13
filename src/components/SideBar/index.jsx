import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaUserPlus } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { ImKey, ImExit } from "react-icons/im";
import { GiHouseKeys } from "react-icons/gi";
import { MySidebar, MenuItem, IconContainer, Label } from "./styles";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cpfAsPassword, setCpfAsPassword] = useState(false); // 🛑 NOVO ESTADO
  const navigate = useNavigate();

  useEffect(() => {
    const adminFlag = localStorage.getItem('isAdmin') === 'true'; 
    setIsAdmin(adminFlag);
    
    // 🛑 VERIFICA O FLAG DE SENHA INSEGURA
    const cpfAsPassFlag = localStorage.getItem('CPF_AS_PASSWORD') === 'true';
    setCpfAsPassword(cpfAsPassFlag);

    if (sessionStorage.length > 0) {
        sessionStorage.clear();
    }
  }, []);

  function onVerificationClick(index) {
    // Se sidebar estiver fechada, abre antes de executar ação
    if (!open) {
      setOpen(true);
      return;
    }

    // 🛑 BLOQUEIO DE NAVEGAÇÃO
    // Se a senha for o CPF, só permite ir para a tela de troca de senha (index 2) ou sair (index 5)
    if (cpfAsPassword && index !== 2 && index !== 5) {
        alert('Você deve trocar sua senha antes de navegar para outras páginas.');
        // Força a navegação de volta para a tela de troca de senha
        navigate('/newPassword'); 
        return;
    }


    // Roteamento
    const routes = {
      1: "/home",
      2: "/newPassword", 
      3: "/resetPassword",
      4: "/newUser",
      5: "/", // Logout
    };

    // Se for logout (índice 5)
    if (index === 5) {
      localStorage.clear(); 
      navigate("/");
      return;
    }

    // Se for outra rota
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
    
    // 🛑 Lógica para aplicar estilo de bloqueio visual
    const getMenuItemStyle = (index) => {
        // Se a senha for o CPF E o item não for a rota de troca de senha (2) ou Sair (5), aplica o estilo de bloqueio.
        if (cpfAsPassword && index !== 2 && index !== 5) {
            return { pointerEvents: 'none', opacity: 0.5 };
        }
        return {};
    };

  return (
    <MySidebar $open={open}>
      <MenuItem style={{ marginBottom: "17vh" }}>
        <IconContainer onClick={() => setOpen(!open)}>
          <FaBars />
        </IconContainer>
        {open && <Label></Label>}
      </MenuItem>

      {menuItems.map((item, idx) => (
        <MenuItem 
            key={idx} 
            onClick={() => onVerificationClick(item.index)}
            style={getMenuItemStyle(item.index)} // 🛑 Aplica o estilo de bloqueio
        >
          <IconContainer>{item.icon}</IconContainer>
          {open && <Label>{item.label}</Label>}
        </MenuItem>
      ))}
    </MySidebar>
  );
};

export default Sidebar;