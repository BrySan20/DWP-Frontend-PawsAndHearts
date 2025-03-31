// src/utils/ValidationUtils.js
export const validateEmail = (email) => {
  // Regular expression to validate email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Invalid email format' };
  }
  
  if (email.includes(' ')) {
    return { isValid: false, message: 'Email must not contain spaces' };
  }
  
  return { isValid: true, message: '' };
};

export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (password.includes(' ')) {
    return { isValid: false, message: 'Password must not contain spaces' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one special character' };
  }
  
  return { isValid: true, message: '' };
};

export const validateFullName = (fullName) => {
  if (!fullName) {
    return { isValid: false, message: 'Full name is required' };
  }
  
  if (fullName.trim().length < 3) {
    return { isValid: false, message: 'Full name must be at least 3 characters long' };
  }
  
  return { isValid: true, message: '' };
};

export const validateForm = ({ email, password, fullName = null }) => {
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);
  let fullNameValidation = { isValid: true, message: '' };
  
  if (fullName !== null) {
    fullNameValidation = validateFullName(fullName);
  }
  
  const isFormValid = emailValidation.isValid && passwordValidation.isValid && fullNameValidation.isValid;
  
  let errorMessage = '';
  if (!emailValidation.isValid) {
    errorMessage = emailValidation.message;
  } else if (!passwordValidation.isValid) {
    errorMessage = passwordValidation.message;
  } else if (!fullNameValidation.isValid) {
    errorMessage = fullNameValidation.message;
  }
  
  return { isValid: isFormValid, message: errorMessage };
};
