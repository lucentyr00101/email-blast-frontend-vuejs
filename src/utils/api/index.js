export const clientID = () => {
    return 2
}

export const clientSecret = () => {
    return `Ok2fQh2ykQdMselLrTFcvwWloyR6SWxBhMmsFlDv`
}

export const login = () => {
    return 'oauth/token';
}

export const users = id => {
    return {
        index : `/api/users`,
        store : `/api/users`,
        show  : `/api/users/${id}`,
        update: `/api/users/${id}`,
        delete: `/api/users/${id}`
    }
}

export const getAuthUser = () => {
    return `/api/auth`
}

export const contacts = id => {
    return {
        index : `/api/contacts`,
        store : `/api/contacts`,
        show  : `/api/contacts/${id}`,
        update: `/api/contacts/${id}`,
        delete: `/api/contacts/${id}`
    }
}

export const sendCampaign = () => {
    return `api/send-campaign`
}

export const uploadImage = () => {
    return `api/upload-image`
}

export const groups = id => {
    return {
        index : `/api/groups`,
        store : `/api/groups`,
        show  : `/api/groups/${id}`,
        update: `/api/groups/${id}`,
        delete: `/api/groups/${id}`
    }
}

export const emails = id => {
    return {
        index : `/api/emails`,
        store : `/api/emails`,
        show  : `/api/emails/${id}`,
        update: `/api/emails/${id}`,
        delete: `/api/emails/${id}`
    }
}