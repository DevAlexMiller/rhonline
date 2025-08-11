import Sidebar from "../../components/SideBar";
import { MyUser, Newuser } from "./styles";
import InputComponent from "../../components/Inputs";
import Button from "../../components/Button";

function NewUser() {
  return (
    <MyUser>
      <Sidebar isAdmin={true} />
      <Newuser>
        <img src="/rhonlineBlack.svg" alt="RH Online" className="rhLogo" />
        <p>Adicionar novo usuário</p>
        <hr />
        <div className="input">
            <div className="input-group">
                <label htmlFor="currentPassword">CPF</label>
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
            <Button>Adicionar</Button>
        </div>
      </Newuser>
    </MyUser>
  );
}

export default NewUser;
