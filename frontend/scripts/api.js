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