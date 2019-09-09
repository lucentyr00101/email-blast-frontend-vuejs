import axios from 'axios'
import * as api from '@/utils/api'

export default {
    data() {
        return {
            dialog: false,
            valid: false,
            items: [],
            groupData: {
                name: '',
                members: [],
            },
            requiredRules: [
                v => !!v || 'This field is required!'
            ],
            loading: false
        }
    },
    mounted() {
        axios.get(api.contacts().index, this.$auth.getHeader())
            .then(res => {
                this.items = res.data.data
            })
            .catch(err => console.log(err.response.data))
    },
    methods: {
        addGroup() {
            this.loading = true
            let formData = new FormData()
            formData.append('name', this.groupData.name)
            formData.append('members', JSON.stringify(this.groupData.members))

            axios.post(api.groups().store, formData, this.$auth.getHeader())
                .then(res => {
                    console.log(res)
                    Event.$emit('addGroupSuccess')
                    this.closeDialog()
                })
                .catch(err => console.log(err.response.data))
        },
        closeDialog() {
            this.dialog = false
            this.groupData = {
                name: '',
                members: [],
            }
            this.loading = false
        }
    }
}