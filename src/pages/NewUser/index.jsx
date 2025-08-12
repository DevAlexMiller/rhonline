import Sidebar from "../../components/SideBar";
import { MyUser, Newuser, AdmInput } from "./styles";
import InputComponent from "../../components/Inputs";
import Button from "../../components/Button";

function NewUser() {
  return (
    <MyUser>
      <Sidebar />
      <Newuser>
        <img src="/rhonlineBlack.svg" alt="RH Online" className="rhLogo" />
        <h3>Adicionar novo usuário</h3>
        <hr />
        <div className="input">
            <div className="input-group">
                <label htmlFor="currentPassword"></label>
                <div className="input-field">
                    <InputComponent
                        id="currentPassword"
                        placeholder="CPF"
                        iconPath="/userBlack.svg"
                        type="password"
                        isPassword={false}
                    />
                </div>
            </div>
            <AdmInput>
                <p>Administrador</p>
                <input type="checkbox" />
            </AdmInput>
            <Button>Adicionar</Button>
        </div>
      </Newuser>
    </MyUser>
  );
}

export default NewUser;
