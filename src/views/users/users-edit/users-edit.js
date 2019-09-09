import axios from 'axios'
import * as api from '@/utils/api'
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            user: null,
            valid: true,
            nameRules: [
                v => !!v || 'Name is required',
            ],
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@+/.test(v) || 'Email must be valid'
            ],
            creditsRules: [
                v => !!v || 'Credits field is required'
            ]
        }
    },
    methods: {
        getUser() {
            axios.get(api.users(this.$route.params.id).show, this.$auth.getHeader())
                .then(res => {
                    this.user = res.data.data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        goBack() {
            this.$router.go(-1)
        },
        saveUser() {
            if(this.$refs.form.validate()) {
                axios.put(api.users(this.$route.params.id).update, this.user, this.$auth.getHeader())
                    .then(() => {
                        if(this.$route.params.id === this.$store.state.authenticatedUser.authUser.id) {
                            this.setAuthUser()
                        }
                        this.$router.push({ name: 'users-index' })
                    })
                    .catch(err => {
                        console.log(err.response.data)
                    })
            }
        },
        ...mapActions([
            'setAuthUser'
        ])
    },
    mounted() {
        this.getUser()
    }
}