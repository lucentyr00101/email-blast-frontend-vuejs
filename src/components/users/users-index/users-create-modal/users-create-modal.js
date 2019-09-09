import axios from 'axios'
import * as api from '@/utils/api'

export default {
    data() {
        return {
            dialog: false,
            valid: true,
            user: {
                name: '',
                email: '',
                password: '',
                credits: '',
                confirm_password: '',
            },
            nameRules: [
                v => !!v || 'Name is required',
            ],
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@+/.test(v) || 'Email must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required'
            ],
            creditsRules: [
                v => !!v || 'Credits field is required'
            ]
        }
    },
    methods: {
        addUser() {
            if(this.$refs.form.validate()) {

                let formData = new FormData()
                formData.append('name', this.user.name)
                formData.append('password', this.user.password)
                formData.append('email', this.user.email)
                formData.append('credits', this.user.credits)

                axios.post(api.users().store, formData, this.$auth.getHeader())
                    .then(res => {
                        console.log(res)
                        this.closeDialog()
                        Event.$emit('addUserSuccess')
                    })
                    .catch(err => {
                        this.closeDialog()
                        console.log(err)
                    })
            }
        },
        closeDialog() {
            this.user = {
                name: '',
                email: '',
                credits: '',
                password: '',
                confirm_password: '',
            }
            this.dialog = false
        }
    }
}