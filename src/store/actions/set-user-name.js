import { getUserName } from "../../services/auth";

export const setName = () => {
    const name = getUserName();

    return function (dispatch) {
        dispatch({
            type: 'GET_USER_NAME',
            name: name,    
        });
    }
}