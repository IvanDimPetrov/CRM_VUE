import ajax from './ajax.js'

const host = "https://baas.kinvey.com/";
const appKey = "kid_Symuamkq4";

function registerUser(data) {
    
    let url = host + "user/" + appKey;
    let type = "POST";
    let status = 201;

    return ajax(url, type, status, data);
}


function loginUser(data) {

    let url = host + "user/" + appKey + "/login";
    let type = "POST";
    let status = 200; 

    return ajax(url, type, status, data);
}

function logoutUser() {

    let url = host + "user/" + appKey + "/_logout";
    let type = "POST";
    let status = 204; 

    return ajax(url, type, status);
}

export default {
    registerUser,
    loginUser,
    logoutUser
}