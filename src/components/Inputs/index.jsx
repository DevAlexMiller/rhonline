import React, { useState } from 'react';
import { InputWrapper, MyInput, IconButton } from './styles';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const InputComponent = ({ placeholder, iconPath, isPassword = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword(prev => !prev);

  return (
    <InputWrapper>
      <MyInput
        type={isPassword && showPassword ? 'text' : isPassword ? 'password' : 'text'}
        placeholder={placeholder}
        iconPath={iconPath}
      />
      {isPassword && (
        <IconButton onClick={toggleVisibility} type="button">
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </IconButton>
      )}
    </InputWrapper>
  );
};

export default InputComponent;
