import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaUserPlus, FaUser } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { ImKey, ImExit } from "react-icons/im";
import { GiHouseKeys } from "react-icons/gi";
import { MySidebar, MenuItem, IconContainer, Label } from "./styles";
import { jwtDecode } from "jwt-decode"; // 🛑 Importação necessária

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [cpfAsPassword, setCpfAsPassword] = useState(false);
  const sidebarRef = useRef(null); 
  const navigate = useNavigate();

  // 🛑 EXTRAÇÃO SEGURA DO TOKEN
  const authData = useMemo(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return {
        isAdmin: decoded.isAdmin // ✅ Status de admin extraído do Token
      };
    } catch (error) {
      console.error("Erro ao decodificar token na Sidebar:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    // Flag de segurança (troca obrigatória) permanece no localStorage após o login
    const cpfAsPassFlag = localStorage.getItem("CPF_AS_PASSWORD") === "true";
    setCpfAsPassword(cpfAsPassFlag);

    if (sessionStorage.length > 0) {
      sessionStorage.clear();
    }
  }, []);

  // Fecha a sidebar ao clicar fora dela
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  function onVerificationClick(index) {
    if (!open) {
      setOpen(true);
      return;
    }

    // 🛑 BLOQUEIO DE NAVEGAÇÃO (Forçar troca de senha)
    if (cpfAsPassword && index !== 2 && index !== 6) {
      alert("Você deve trocar sua senha antes de navegar para outras páginas.");
      navigate("/newPassword");
      return;
    }

    const routes = {
      1: "/home",
      2: "/newPassword",
      3: "/resetPassword",
      4: "/newUser",
      5: "/perfil",
      6: "/", // Logout
    };

    if (index === 6) {
      localStorage.clear(); // Limpa token e flags de segurança
      navigate("/");
      return;
    }

    if (routes[index]) {
      navigate(routes[index]);
    }

    setOpen(false); 
  }

  // Define os itens do menu baseando-se no isAdmin decodificado do Token
  const menuItems = [
    { icon: <TiHome className="icon-home" />, label: "Início", index: 1 },
    { icon: <ImKey />, label: "Alterar senha", index: 2 },
    ...(authData?.isAdmin // 🛑 Usa dado do Token para mostrar opções de admin
      ? [
          { icon: <GiHouseKeys />, label: "Gerenciar senhas", index: 3 },
          { icon: <FaUserPlus />, label: "Novo usuário", index: 4 },
        ]
      : []),
    { icon: <FaUser />, label: "Perfil", index: 5 },
    { icon: <ImExit />, label: "Sair", index: 6 },
  ];

  const getMenuItemStyle = (index) => {
    if (cpfAsPassword && index !== 2 && index !== 6) {
      return { pointerEvents: "none", opacity: 0.5 };
    }
    return {};
  };

  return (
    <MySidebar ref={sidebarRef} $open={open}>
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
          style={getMenuItemStyle(item.index)}
        >
          <IconContainer>{item.icon}</IconContainer>
          {open && <Label>{item.label}</Label>}
        </MenuItem>
      ))}
    </MySidebar>
  );
};

export default Sidebar;