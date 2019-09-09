import axios from "axios";
import * as api from '@/utils/api'

export default {
    data() {
        return {
            contact: {
                first_name: '',
                last_name: '',
                email: ''
            },
            valid: true,
            dialog: false,
            nameRules: [
                v => !!v || 'Name is required',
            ],
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@+/.test(v) || 'Email must be valid'
            ],
        }
    },
    methods: {
        closeDialog() {
            this.contact = {
                first_name: '',
                last_name: '',
                email: '',
            }
            this.dialog = false
        },
        addUser() {
            let formData = new FormData()
            formData.append('first_name', this.contact.first_name)
            formData.append('last_name', this.contact.last_name)
            formData.append('email', this.contact.email)

            axios.post(api.contacts().store, formData, this.$auth.getHeader())
                .then(() => {
                    Event.$emit('addContactSuccess')
                    this.closeDialog()
                })
                .catch(err => {
                    console.log(err.response.data)
                    this.closeDialog()
                })
        }
    }
}