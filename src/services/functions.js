export function checkFileTypeVideos(fileType) {
    const acceptedTypes = [
        //Checar tipos de arquivo aceitos
        {name:'video/mp4', type:' .mp4'},
        {name:'video/webm', type:' .webm'}
    ]
    
    const isValid = acceptedTypes.find(type => type.name == fileType);

    if(isValid !== undefined) {
        return {valid: true};
    }

    else {
        //Mostra os formatos em mensagem na tela
        const formats = acceptedTypes.map(format => {
            return (format.type);
        })

        //setError(`Os formatos aceitos são ${formats}`)
        return {valid: false, acceptedFormats: `Os formatos aceitos são ${formats}`};
    }
}

export function checkFileTypeFiles(fileType) {
    const acceptedTypes = [
        //Checar tipos de arquivo aceitos
        {name:'application/msword', type:' .doc'},
        {name:'application/vnd.openxmlformats-officedocument.wordprocessingml.document', type:' .docx'},
        {name:'application/pdf', type:' .pdf'}
    ]
    
    const isValid = acceptedTypes.find(type => type.name == fileType);

    if(isValid !== undefined) {
        return {valid: true};
    }

    else {
        const formats = acceptedTypes.map(format => {
            return (format.type);
        })

        return {valid: false, acceptedFormats: `Os formatos aceitos são ${formats}`};
    }
}