


export const validateLogin = (login: string): {isValid: boolean, message: string} => {
    if(login.length === 0){
        return {
            isValid: false,
            message: "Логин не должен быть пустым"
        }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
        isValid: emailRegex.test(login),
        message: "Неправильный логин или пароль"
    }
}

export const validatePassword = (password: string): {isValid: boolean, message: string}=> {
    const hasLettersRegex = /[a-zA-Z]/;
    if(!hasLettersRegex.test(password)){
        return {
            isValid: false,
            message: "Пароль должен содержать латинские буквы"
        } 
    }
    const hasUpperCaseAndLowerCaseRegex = /(?=.*[a-z])(?=.*[A-Z])/;
    if(!hasUpperCaseAndLowerCaseRegex.test(password)){
        return {
            isValid: false,
            message: "Пароль должен содержать маленькую и большую букву" 
        }
        
    }
    const minLengthRegex = /^.{9,}$/;
    if(!minLengthRegex.test(password)){
        return {
            isValid: false,
            message: "Пароль должен быть более 8 символов"
        }
            
    }
    const hasSpecialCharRegex = /[_-]/;
    if(!hasSpecialCharRegex.test(password)){
        return {
            isValid: false,
            message: "Пароль должен содержать - или _"
        } 
    }
    return {
        isValid: true,
        message: ""
    }
}

export const validateForm = (form: any) => {
    const {login, loginPerson, password} = form
    const loginValidation = validateLogin(login);
    const passwordValidation = validatePassword(password);
    
    if(!loginValidation.isValid){
        return loginValidation;
    }
    
    if(login === loginPerson){
        return {
            isValid: false,
            message: "Извините, Ваша почта не может быть такой же как почта семьи"
        }
    }

    if(!passwordValidation.isValid){
        return passwordValidation;
    }
    
    return {
        isValid: true,
        message: ""
    };
}