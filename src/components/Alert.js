import { useAlert } from 'react-alert';

export default function useAlertMessage(m, type) {
    const alert = useAlert();

    return (
        alert.show(m, {type: type})
    )
}