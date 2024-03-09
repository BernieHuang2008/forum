function request_posts(id) {
	    return fetch(`http://localhost:9999/forum/t/${id}`)
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

function request_post(id) {
	    return fetch(`http://localhost:9999/forum/p/${id}`)
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

function request_cate(id) {
	    return fetch(`http://localhost:9999/forum/c/${id}`)
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

function request_catelist() {
	    return fetch(`http://localhost:9999/forum/cl`)
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

function request_sendpost(data) {
    return fetch('http://localhost:9999/forum/newpost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        return data;
    });
}

function request_authority() {
    return fetch('http://localhost:9999/forum/authority')
    .then(response => response.json())
    .then(data => {
        window.authority = data.authority;
    });
}