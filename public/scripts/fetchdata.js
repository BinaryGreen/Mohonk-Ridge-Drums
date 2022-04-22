async function fetchData(url = '', data = {}, methodType) {
    const response = await fetch(`http://localhost:3000${url}`, {
        method: methodType,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    if(response.ok) {
        return await response.json();
    } else {
        throw await response.json()
    }
}

export default fetchData;