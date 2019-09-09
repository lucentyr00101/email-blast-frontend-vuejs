
import axios from 'axios'
import { getAuthUser } from '@/utils/api'

function getHeader() {
    if (localStorage.getItem('token')) {
        const header = {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        return header
    }
}

export const setAuthUser = ({commit}) => {
    axios.get(getAuthUser(), getHeader())
        .then(res => {
            commit('setAuthUser', res.data.data)
        })
        .catch(err => {
            console.log(err.response.data)
        })
}