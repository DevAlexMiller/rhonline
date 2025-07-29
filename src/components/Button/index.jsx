import { MyButton } from './styles';

function Button({ children, onClick }) {
    return (
        <MyButton onClick={onClick}>
            {children}
        </MyButton>
    );
}

export default Button;
