

function Registration(formData) {

    if (formData.password.localeCompare(formData.repeatPassword) != 0)  {
        formData.password = "";
        formData.repeatPassword = "";
        return "Passwords did not match!!!";   
    }

    return "OK";
}


export default {
    Registration
}

