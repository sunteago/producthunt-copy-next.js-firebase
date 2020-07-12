export default function createProdValidate(values) {
    const errors = {};

    //validate name

    if(!values.name) {
        errors.name = 'The username is required';
    }

    if(!values.company) {
        errors.company = 'The company name is required';
    }

    if(!values.url) {
        errors.url = 'The URL is required';
    } else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = 'URL is bad formatted or not valid'
    }

    if(!values.description) {
        errors.description = 'The description is required';
    }
    return errors;
}

/*
// validar email

!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

// validar URL

!/^(ftp|http|https):\/\/[^ "]+$/
*/