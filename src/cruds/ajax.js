import appStore from "../store/appStore"

const appKey = "kid_Symuamkq4";
const appSecret = "54feb18bada744759eb3a4706cb6c139";
const authorization = btoa(appKey + ':' + appSecret);

const contentTypeHeader = ["Content-Type", "application/json"];
const authorizationHeader = ["Authorization", "Basic " + authorization];
const kinveyVersionHeader = ["X-Kinvey-API-Version", "3"];


function ajax(url, type, status, data) {
    
    return new Promise ((resolve, reject) => {
        //console.log(appStore.state)
        const request = new XMLHttpRequest();

        request.open(type, url);

        request.setRequestHeader(...contentTypeHeader);

        if ((appStore.state.authToken != "" && appStore.state.isGuest === false)  ) {
            let authToken = $getAuthToken();
            request.setRequestHeader("Authorization", authToken);
        }
        else if (appStore.state.user.username == "guest" && type == "GET") {
            request.setRequestHeader("Authorization", $getAuthToken());
        }
        else {
            request.setRequestHeader(...authorizationHeader);
        } 

        request.setRequestHeader(...kinveyVersionHeader);

        request.onreadystatechange = function() {

            if(this.readyState == 4 && this.status == status) {

                let responseData;

                if (request.response) {
                    responseData = $processResponse(request.response); 
                }
                                
                resolve(responseData);                              
            }
            else if (this.status >= 400) {
                reject(this.status);
            }

        }

        request.onerror = () => { reject(this.status) };

        request.send(JSON.stringify(data));
    })
}

function $processResponse(response) {

    function processObj(obj) {
        obj.authorid = obj._acl.creator;
        obj.datecreated = new Date(obj._kmd.ect).getTime();
        obj.datemodified = new Date(obj._kmd.lmt).getTime();

        if (obj._kmd.hasOwnProperty("authtoken")) {
            obj.authtoken = obj._kmd.authtoken;
        }

        delete obj._acl;
        delete obj._kmd;
    }


    let parsedResponse = JSON.parse(response);
    
    if (typeof parsedResponse === 'object' && parsedResponse.constructor === Array) {
        for (let i = 0; i < parsedResponse.length; i++) {
            processObj(parsedResponse[i])
        }
    }
    else if (typeof parsedResponse === 'object' && parsedResponse.constructor === Object) {
        processObj(parsedResponse)
    }

    console.log(parsedResponse);
    
    return parsedResponse; 
}


function $getAuthToken() {    
    return `Kinvey ${appStore.state.authToken}`;
}

export default ajax;
