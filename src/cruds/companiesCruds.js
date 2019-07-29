import ajax from './ajax.js';

const host = "https://baas.kinvey.com/";
const appKey = "kid_Symuamkq4";


function getAllCompanies() {

    let url = host + "appdata/" + appKey + "/Companies";
    let type = "GET";
    let status = 200; 

    return ajax(url, type, status);
}


function saveCompany(data) {

    let url = host + "appdata/" + appKey + "/Companies";
    let type = "POST";
    let status = 201; 

    return ajax(url, type,status, data);
}



export default {
    getAllCompanies,
    saveCompany
}