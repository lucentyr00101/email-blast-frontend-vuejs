import axios from 'axios';
import * as api from '@/utils/api'

export default {
    data() {
        return {
            headers: [
                { text: 'ID', align: 'center', value: 'id' },
                { text: 'Group Name', align: 'center', value: 'group_name' },
                { text: 'Last Updated', align: 'center', value: 'updated_at' },
                { text: 'Date Created', align: 'center', value: 'created_at' },
                { text: 'Actions', align: 'center', value: 'actions' },
            ],
            search: '',
            itemsPerPage: [10, 25, 50, 100, {"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}],
            items: [],
            loading: true
        }
    },
    components: {
        groupsCreateModal: () => import('@/components/groups/groups-create-modal')
    },
    methods: {
        loadGroups() {
            this.loading = true
            axios.get(api.groups().index, this.$auth.getHeader())
                .then(res => {
                    this.items = res.data.data
                    this.loading = false
                })
                .catch(err => {
                    console.log(err.response.data)
                    this.loading = false
                })
        },
        deleteGroup(id) {
            if(confirm('Are you sure you want to delete this user?')) {
                axios.delete(api.groups(id).delete, this.$auth.getHeader())
                    .then(() => {
                        this.loadGroups()
                    })
                    .catch(err => {
                        console.log(err.response.data)
                    })
            }
        }
    },
    mounted() {
        this.loadGroups()
        Event.$on('addGroupSuccess', () => {
            this.loadGroups()
        })
    },
    beforeDestroy() {
        Event.$off("addGroupSuccess")
    }
}