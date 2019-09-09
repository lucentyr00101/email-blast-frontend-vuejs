import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
            mini: false,
            loading: false
        }
    },
    methods: {
        logout() {
            this.$auth.destroyToken()
            this.$router.go("{ name: 'login' }")
        },
        ...mapActions([
            'setAuthUser'
        ])
    },
    mounted() {
        if(this.$auth.isAuthenticated()) {
            this.setAuthUser()
        }
        Event.$on('reloadAuthUserData', () => {
            this.setAuthUser()
        })
    },
    computed: {
        ...mapGetters([
            'getAuthUser'
        ])
    },
    beforeDestroy() {
        Event.$off('reloadAuthUserData')
    }
}