import Axios from 'axios';

const loginUrl = "http://localhost:3500/login";

export default {
    state : {
        isAuthenticated : false,
        jwt             : null
    },
    getters : {
        authenticatedAxios(state){
            return Axios.create({
                headers : {
                    "Authorization" : `bearer<${state.jwt}>` 
                }
            })
        }
    },
    mutations : {
        setAuthenticated(state, header) {
            state.isAuthenticated = true,
            state.jwt             = header;
        },
        clearAuthentication(){
            state.isAuthenticated = false,
            state.jwt             = null;
        }
    },
    actions : {
        async authenticate(context, credentials){
            let response = await Axios.post(loginUrl, credentials);
            if(response.data.success) {
                context.commit("setAuthenticated", response.data.token);
            }
        }
    }
}