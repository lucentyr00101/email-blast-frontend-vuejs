import axios from 'axios'
import * as api from '@/utils/api'
import _ from 'lodash'

export default {
    data() {
        return {
            group: null,
            valid: false,
            contacts: [],
            selectedContacts: [],
            requiredRule: [
                v => !!v || 'This field is required!'
            ]
        }
    },
    methods: {
        getGroup() {
            axios.get(api.groups(this.$route.params.id).show, this.$auth.getHeader())
            .then(res => {
                this.group = res.data.data
                _.forEach(res.data.data.members, value => {
                    this.selectedContacts.push(value.id)
                })
            })
            .catch(err => console.log(err.response.data))
        },
        getContacts() {
            axios.get(api.contacts().index, this.$auth.getHeader())
                .then(res => {
                    this.contacts = res.data.data
                })
        },
        goBack() {
            this.$router.go(-1)
        },
        saveGroup() {
            let data = {
                name: this.group.group_name,
                members: this.selectedContacts
            }
            if(this.$refs.form.validate()) {
                axios.put(api.groups(this.group.id).update, data, this.$auth.getHeader())
                    .then(() => this.resetFields())
                    .then(() => this.getGroup())
                    .catch(err => console.log(err.response.data))
            }
        },
        resetFields() {
            this.group = null
            this.selectedContacts = []
        }
    },
    mounted() {
        this.getGroup()
        this.getContacts()
    }
}