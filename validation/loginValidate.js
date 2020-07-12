export default function loginValidate(values) {
    const errors = {};
    if (!values.email) {
        errors.email = 'The email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email = 'The email is not valid';
    }

    if (!values.password) {
        errors.password = 'The password is required';
    } else if (values.password.length < 6) {
        errors.password = 'The password must be at least 6 characters long'
    }

    return errors;
}

/*
// validar email

!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

// validar URL

!/^(ftp|http|https):\/\/[^ "]+$/
*/