export default (Vue) => {
    Vue.auth = {
        setToken(token, expiration){
            localStorage.setItem('token', token);
            localStorage.setItem('expiration', expiration);
        },
        getToken() {
            const token = localStorage.getItem('token');
            const expiration = localStorage.getItem('expiration');

            if(!token || !expiration){
                return null;
            }

            if(Date.now() > parseInt(expiration)){
                this.destroyToken();
                return null;
            } else {
                return token;
            }
        },
        destroyToken() {
            localStorage.removeItem('token');
            localStorage.removeItem('expiration');
        },
        isAuthenticated() {
            if(this.getToken()){
                return true;
            } else {
                return false;
            }
        },
        getHeader() {
            if (this.isAuthenticated()) {
                const header = {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${this.getToken()}`
                    }
                }
                return header
            }
        },
    }

    Object.defineProperties(Vue.prototype, {
        $auth: {
            get() {
                return Vue.auth;
            }
        }
    })
}