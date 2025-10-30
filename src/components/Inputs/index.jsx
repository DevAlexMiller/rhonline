import React, { useState } from 'react';
import { InputWrapper, MyInput, IconButton } from './styles';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const InputComponent = ({ placeholder, iconPath, isPassword = false, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword(prev => !prev);

  return (
    <InputWrapper>
      <MyInput
        type={isPassword && showPassword ? 'text' : isPassword ? 'password' : 'text'}
        placeholder={placeholder}
        iconPath={iconPath}
        value={value}
        onChange={onChange}
      />
      {isPassword && (
        <IconButton onClick={toggleVisibility} type="button" tabIndex={-1}>
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </IconButton>
      )}
    </InputWrapper>
  );
};

export default InputComponent;