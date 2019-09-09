import axios from 'axios'
import * as api from '@/utils/api'

export default {
    data() {
        return {
            contact: {},
            nameRules: [
                v => !!v || 'Name is required',
            ],
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@+/.test(v) || 'Email must be valid'
            ],
            valid: true,
        }
    },
    methods: {
        getContact() {
            axios.get(api.contacts(this.$route.params.id).show, this.$auth.getHeader())
                .then(res => {
                    this.contact = res.data.data
                })
                .catch(err => console.log(err))
        },
        goBack() {
            this.$router.go(-1)
        },
        saveContact() {
            axios.put(api.contacts(this.$route.params.id).update, this.contact, this.$auth.getHeader())
                .then(() => {
                    this.$router.push({ name: 'contacts-index' })
                })
                .catch(err => console.log(err.response.data))
        }
    },
    mounted() {
        this.getContact()
    }
}