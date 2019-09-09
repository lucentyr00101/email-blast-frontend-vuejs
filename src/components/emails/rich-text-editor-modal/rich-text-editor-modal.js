import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import axios from 'axios'
import { VueEditor } from "vue2-editor";
import * as api from '@/utils/api'

export default {
    data() {
        return {
            dialog: false,
            content: "",
            saveBtnText: 'Done',
            saveBtnDisabled: false,
        }
    },
    components: {
        VueEditor
    },
    methods: {
        sendEmail() {
            Event.$emit('emailContentDone', this.content)
            this.dialog = false
        },
        handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
            var formData = new FormData();
            formData.append('image', file)

            axios.post(api.uploadImage(), formData, this.$auth.getHeader())
                .then((result) => {
                    console.log(result)
                    let url = result.data // Get url from response
                    Editor.insertEmbed(cursorLocation, 'image', url.full_url);
                    resetUploader();
                })
                .catch((err) => {
                    console.log(err.response.data);
                })
        },
    }
}