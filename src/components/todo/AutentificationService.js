import axios from 'axios'
import { API_URL }  from '../../Constants.js'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'autentificationUser'

class AutentificationService{

    executeBasicAuthenticationService(username, password){
        
        return axios.get(`${API_URL}/basicauth`,            {
                headers: {
                    authorization: this.createBasicAuthToken(username, password)
                }
            }        
        );
    }

    executeJwtAuthenticationService(username, password){
        
        console.log(username,password);

        return axios.post(`${API_URL}/authenticate`,{   
                username,
                password
            })
    }

    createBasicAuthToken(username,password){
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    createJwtToken(token){
        return 'Bearer ' + token
    
    }

    registerSucLogIn(username,password){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME,username);
        sessionStorage.setItem('autentificationPassword',password);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    registerSucLogInForJwt(username,password, token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME,username);
        sessionStorage.setItem('autentificationPassword',password);
        this.setupAxiosInterceptors(this.createJwtToken(token));
    
    }

    logOut(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem('autentificationPassword');
    }

    isUserLoggedIn(){
        let userId = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        let userPassword = sessionStorage.getItem('autentificationPassword');

        console.log('loggedIn', userId, userPassword)
        
        if ( userId == null || userPassword == null )
        {
            return null;
        }
        return true;
    }

    getLoggedInUserName(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
 
        if ( user == null)
        {
            return '';
        }
        return user;
    }


    setupAxiosInterceptors(basicAuthHeader){

        axios.interceptors.request.use(
            ( config ) => {
                if(this.isUserLoggedIn)
                {
                    config.headers.authorization = basicAuthHeader;
                }
                return config
            }
        )
    }

}

export default new AutentificationService()