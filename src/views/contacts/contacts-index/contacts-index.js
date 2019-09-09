import axios from 'axios'
import * as api from '@/utils/api'

export default {
    data() {
        return {
            headers: [
                { text: 'First Name', align: 'center', value: 'first_name' },
                { text: 'Last Name', align: 'center', value:'last_name' },
                { text: 'Email', align: 'center', value: 'email' },
                { text: 'Actions', align:'center', value: 'actions' }
            ],
            search: '',
            contacts: [],
            loading: true,
            itemsPerPage: [10, 25, 50, 100, {"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}],
        }
    },
    methods: {
        setContacts() {
            axios.get(api.contacts().index, this.$auth.getHeader())
                .then(res => {
                    setTimeout(() => {
                        this.loading = false
                        this.contacts = res.data.data
                    }, 300)
                })
                .catch(err => {
                    console.log(err.response.data)
                    this.loading = false
                })
        },
        deleteContact(id) {
            if(confirm('Are you sure you want to delete this contact?')) {
                axios.delete(api.contacts(id).delete, this.$auth.getHeader())
                .then(() => {
                    this.setContacts()
                })
                .catch(err => console.log(err.response.data))
            }
        }
    },
    mounted() {
        this.setContacts()
        Event.$on('addContactSuccess', () => {
            this.setContacts()
            this.loading = true
            this.contacts = []
        })
    },
    components: {
        createModal: () => import('@/components/contacts/contacts-index/contacts-create-modal')
    },
    beforeDestroy() {
        Event.$off('addContactSuccess')
    }
}