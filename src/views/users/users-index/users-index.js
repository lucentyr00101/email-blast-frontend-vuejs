import axios from 'axios'
import * as api from '@/utils/api'

export default {
    data() {
        return {
            users: [],
            search: '',
            loading: true,
            valid: false,
            headers: [
                { text: 'ID', align: 'center', value: 'id' },
                { text: 'Name', align: 'center', value: 'name' },
                { text: 'Email', align: 'center', value: 'email' },
                { text: 'Credits', align: 'center', value: 'credits' },
                { text: 'User Role', align: 'center', value: 'user_role' },
                { text: 'Actions', align:'center', value: 'actions' }
            ],
            itemsPerPage: [10, 25, 50, 100, {"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}],
        }
    },
    mounted() {
        this.setUsers()
        Event.$on('addUserSuccess', () => {
            this.setUsers()
        })
    },
    components: {
        createModal: () => import('@/components/users/users-index/users-create-modal')
    },
    methods: {
        setUsers() {
            axios.get(api.users().index, this.$auth.getHeader())
                .then(res => {
                    setTimeout(() => {
                        this.users = res.data.data
                        this.loading = false
                    }, 300)
                })
                .catch( err => {
                    this.loading = false
                    console.log(err.response.data)
                })
        },
        deleteUser(id){
            if(confirm('Are you sure you want to delete this user?')) {
                axios.delete(api.users(id).delete, this.$auth.getHeader())
                    .then(() => {
                        this.setUsers()
                    })
                    .catch(err => {
                        console.log(err.response.data)
                    })
            }
        }
    },
    beforeDestroy() {
        Event.$off('addUserSuccess')
    }
}