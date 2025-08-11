import React from 'react';
import { ResetPage, MyGrid } from './styles';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../../components/SideBar';
import Grid from '../../components/Grid';
import usersJson from './users.json';
import { MdLockReset } from "react-icons/md";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const description = searchParams.get('description');
  console.log('CPF recebido:', description);

  const listaUsuarios = Object.values(usersJson || {});

  const handleRedefinir = (codigo, nome, cpf) => {
    console.log(`Redefinir senha -> Código: ${codigo}, Nome: ${nome}, CPF: ${cpf}`);
  };

  const dadosComAcao = listaUsuarios.map((u) => ({
    'Código': u['Código'],
    'Nome': u['Nome'],
    'CPF': u['CPF'],
    'Redefinir': (
      <button
        onClick={() => handleRedefinir(u['Código'], u['Nome'], u['CPF'])}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 4
        }}
        title={`Redefinir senha de ${u['Nome']}`}
        aria-label={`Redefinir senha de ${u['Nome']}`}
      >
        <MdLockReset size="1.2rem" />
      </button>
    )
  }));

  const columns = [
    { key: 'Código', label: 'Código' },
    { key: 'Nome', label: 'Nome' },
    { key: 'CPF', label: 'CPF' },
    { key: 'Redefinir', label: 'Redefinir' }
  ];

  return (
    <ResetPage>
      <Sidebar isAdmin={true} />
      <MyGrid>
        <img src="/rhonlineBlack.svg" alt="Logo" />
        <Grid columns={columns} data={dadosComAcao} />
      </MyGrid>
    </ResetPage>
  );
}

export default ResetPassword;