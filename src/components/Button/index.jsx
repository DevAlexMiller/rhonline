import {MyButton} from './styles'

function Button({ children }){

    return(
        <div>
            <MyButton>{ children } </MyButton>
        </div>
    )

}

export default Button;