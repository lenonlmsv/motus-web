const USERNAME = ''

export default function setUserName(state = USERNAME, action) {
    if (action.type == 'GET_USER_NAME') {
        return action.name
    }

    return state
}
