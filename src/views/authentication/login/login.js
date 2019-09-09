import axios from 'axios'
import * as api from '@/utils/api'

export default {
    data() {
        return {
            step: 1,
            user: {
                email: '',
                password: '',
            },
            loginBtnLoading: false,
            alert: {
                message: '',
                type: 'success',
                value: false
            },
            show: false,
        }
    },
    methods: {
        submitData() {
            this.loginBtnLoading = true
            let formData = new FormData()
            formData.append('username', this.user.email)
            formData.append('password', this.user.password)
            formData.append('client_id', api.clientID())
            formData.append('client_secret', api.clientSecret())
            formData.append('grant_type', 'password')
            axios.post(api.login(), formData)
                .then(res => {
                    // this.loginBtnLoading = false
                    this.showAlert('success')
                    this.$auth.setToken(res.data.access_token, res.data.expires_in + Date.now())
                    setTimeout(() => {
                        this.$router.go("{ name: 'home' }")
                    },1800)
                })
                .catch(err => {
                    this.loginBtnLoading = false
                    this.resetFields()
                    this.step = 1
                    this.showAlert('err')
                    console.log(err)
                })
        },
        showAlert(type) {
            if(type === 'err') {
                this.alert.message = 'Invalid username / password'
                this.alert.type = 'error'
                this.alert.value = true
            } else {
                this.alert.message = 'Successfully logged in. Redirecting to dashboard...'
                this.alert.type = 'success'
                this.alert.value = true
            }
        },
        resetFields() {
            this.user.email = ''
            this.user.password = ''
        },
    },
}
