interface ValidationResult {
    success: boolean,
    message: string
}

export function validateFullName (name: string): ValidationResult {
    const regex = /^[a-zA-Z ]{2,30}$/;
    if(!regex.test(name)) return {
        success: false,
        message: "Invalid Fullname, only alphabets allowed"
    }
    if(name.split(" ").length < 2) return {
        success: false,
        message: "Please Enter Full Name"
    }
    if(name.split(" ").length > 3) return {
        success: false,
        message: "You cannot have more than 3 middle names"
    }
    return {
        success: true,
        message: ""
    }
}

export function validateEmail(email: string): ValidationResult {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!email.match(regex)) return {
        success: false,
        message: "Invalid Email"
    }
    return {
        success: true,
        message: ""
    }
}

export function validatePassowrd(password: string): ValidationResult {
    if(password.length < 8) return {
        success: false,
        message: "Password should be more than 8 charecters"
    }
    return {
        success: true,
        message: ""
    }
}