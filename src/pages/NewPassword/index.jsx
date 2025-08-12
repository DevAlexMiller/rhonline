import Sidebar from "../../components/SideBar";
import { MyPassword, NewPassword } from "./styles";
import InputComponent from "../../components/Inputs";
import Button from "../../components/Button";

function Password() {
  return (
    <MyPassword>
      <Sidebar />

      <NewPassword>
        <img src="/rhonlineBlack.svg" alt="RH Online" className="rhLogo" />

        <div className="user-info">
          <img src="/userBlack.svg" alt="Ícone usuário" className="userLogo" />
          <div className="labels">
            <p>Nome:</p>
            <hr />
            <p>Cargo:</p>
            <hr />
          </div>
        </div>

        <div className="input">
  <div className="input-group">
    <label htmlFor="currentPassword">Senha atual</label>
    <div className="input-field">
      <InputComponent
        id="currentPassword"
        placeholder=""
        iconPath="/keyBlack.svg"
        type="password"
        isPassword={true}
      />
    </div>
  </div>

  <div className="input-group">
    <label htmlFor="newPassword">Nova senha</label>
    <div className="input-field">
      <InputComponent
        id="newPassword"
        placeholder=""
        iconPath="/keyBlack.svg"
        type="password"
        isPassword={true}
      />
    </div>
  </div>

  <Button>Salvar</Button>
</div>

      </NewPassword>
    </MyPassword>
  );
}

export default Password;
