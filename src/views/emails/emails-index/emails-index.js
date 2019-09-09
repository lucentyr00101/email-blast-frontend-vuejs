
import axios from 'axios'
import * as api from '@/utils/api'

export default {
    data() {
        return {
            emails: [],
            headers: [
                { text: 'ID', align: 'center', value: 'id' },
                { text: 'Campaign Name', align: 'center', value: 'campaign_name' },
                { text: 'Subject Line', align: 'center', value: 'subject_line' },
                { text: 'Actions', align: 'center', value: 'actions'}
            ],
            itemsPerPage: [10, 25, 50, 100, {"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}],
            search: '',
            loading: true
        }
    },
    methods: {
        getEmails() {
            axios.get(api.emails().index, this.$auth.getHeader())
                .then(res => {
                    this.emails = res.data.data
                    this.loading = false
                })
                .catch(err => console.log(err.response.data))
        }
    },
    mounted() {
        this.getEmails()
    }
}