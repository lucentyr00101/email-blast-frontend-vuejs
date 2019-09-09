import { mapGetters } from "vuex";
import * as api from '@/utils/api'
import axios from 'axios'

export default {
    data() {
        return {
            el: 0,
            campaignNameHint: "Give your campaign an internal name to help organize and locate it easily within your account. For example: 'Sale_October'",
            subjectLineHint: "Write a subject line that clearly describes your email content. It will be visible in your recipient's inbox and is the first content they will see. For example: 'Private sale: 25% off our new collection",
            fromEmailHint: "Choose the email address to be shown in your recipients inbox when they receive your campaign or Add a new sender.",
            fromNameHint: "Enter a name (e.g. your company name) to help campaign recipients recognize you in their inbox.",
            requiredRule: [
                v => !!v || 'This field is required!'
            ],
            emailData: {
                campaignName: '',
                subjectLine: '',
                fromEmail: this.getAuthUser().email,
                fromName: this.getAuthUser().name,
                content: '',
                recipients: [],
            },
            groups: [],
            validOne: true,
            validTwo: true,
            validThree: true,
        }
    },
    methods: {
        ...mapGetters([
            'getAuthUser'
        ]),
        sendEmail() {
            let formData = new FormData()
            formData.append('content', this.content)

            axios.post(api.sendCampaign(), formData, this.$auth.getHeader())
                .then(() => {

                })
                .catch(err => {
                    console.log(err.response.data)
                })
        },
        finalSubmit() {
            let fd = new FormData()
            fd.append('campaign_name', this.emailData.campaignName)
            fd.append('subject_line', this.emailData.subjectLine)
            fd.append('content', this.emailData.content)
            fd.append('recipients', JSON.stringify(this.emailData.recipients))
            axios.post(api.emails().store, fd, this.$auth.getHeader())
                .then(res => {
                    console.log(res)
                    this.el = 4
                    Event.$emit('reloadAuthUserData')
                })
                .catch(err => console.log(err.response.data))
        }
    },
    components: {
        richTextEditor: () => import('@/components/emails/rich-text-editor-modal'),
        dragAndDropEditor: () => import('@/components/emails/drag-and-drop-editor-modal'),
        pasteYourCode: () => import('@/components/emails/paste-your-code-modal')
    },
    mounted() {
        Event.$on('emailContentDone', payload => {
            this.emailData.content = payload
        }),
        axios.get(api.groups().index, this.$auth.getHeader())
            .then(res => {
                this.groups = res.data.data
            })
            .catch(err => console.log(err.response.data))
    },
    beforeDestroy() {
        Event.$off('emailContentDone')
    }
}