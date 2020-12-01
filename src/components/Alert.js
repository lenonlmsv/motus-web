import { useAlert } from 'react-alert';

export default function useAlertMessage(props) {
    const alert = useAlert();

    return (
        alert.show(props.m, {type: props.type})
    )
}