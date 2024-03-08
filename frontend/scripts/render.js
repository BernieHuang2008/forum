function capitalize(s) {
	return s.charAt(0).toUpperCase() + s.slice(1);
}

function refresh_content(dom) {
	$("#content").innerHTML = "";
	$("#content").appendChild(dom);
}

function renderdata_catelist(cates) {
	var dom_ul = $('#sidebar>#categories>ul');

	cates.forEach(c => {
		let title = c.title;
		let icon = c.icon;

		let li = document.createElement('li');
		li.innerHTML = `
			<a>
				<span class="icon" style="background: ${icon}"></span>
				<span class="text">${title}</span>
			</a>
		`
		$('a', li).onclick=function() {
			render_category(c.id);
		}
		$('span.icon', li).style.background = icon;
		$('span.text', li).innerText = title;

		dom_ul.appendChild(li);
	})
}

function renderdata_category(topics) {
	var dom_content = $('#content');
	dom_content.innerHTML = `
		<div id="tpoics-controller">
			<div class="floatright">
				<button><svg class="icon"><use href="#plus"></use></svg>New Topic</button>
			</div>
		</div>
		<div id="topics-list">
			<table id="topics">
				<thead>
					<tr>
						<td class="topic-list titles">Topic</td>
						<td class="topic-list posters"></td>
						<td class="topic-list time">Time</td>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
		`
	var dom_tbody = $('table#topics tbody');

	topics.forEach(t => {
		let dom_tr = document.createElement('tr');
		dom_tr.innerHTML = "<td></td> <td></td> <td></td>";

		let td = $$('td', dom_tr);

		// Title (td[0])
		td[0].innerHTML = `
			<h6 class="topic-link-title">${0}</h6>
			<div class="topic-link-tags"></div>
		`
		$('h6', td[0]).innerText = t.title;
		$('h6', td[0]).onclick = function() {
			render_posts(t.id);
		};

		// Participater (td[1])
		// TODO

		// Time (td[2])
		td[2].innerText = t.time; // TODO

		dom_tbody.appendChild(dom_tr);
	})
}

function renderdata_posts(posts) {
	var dom_posts = document.createElement('div');
	dom_posts.classList.add('posts-container');

	posts.forEach(post => {
		var data = post.data;
		var dom_content = undefined;

		switch (post.type) {
			case "text":
				dom_content = _renderwidget_text(data);
				break;
			default:
				return; // continue
		}

		var dom_post = document.createElement('div');
		dom_post.classList.add('post');
		dom_post.innerHTML = `
			<div class="post-poster">
				<img class="poster photo">
				<span class="poster name"></span>
				<div class="post-info"></div>
			</div>
		`
		$('.poster.photo', dom_post).src = post.poster_photo;
		$('.poster.name', dom_post).innerText = post.poster;
		$('.post-info', dom_post).innerText = `${capitalize(post.type)} · ${post.time}`

		dom_post.appendChild(dom_content);
		dom_posts.appendChild(dom_post);
	})

	refresh_content(dom_posts);

	editor.render($('#content'));
}

function render_catelist() {
	request_catelist().then(data => {
		renderdata_catelist(data);
	})
}

function render_category(id) {
	request_cate(id).then(data => {
		renderdata_category(data);
	})
}

function render_posts(id) {
	request_posts(id).then(data => {
		renderdata_posts(data);
	})
}


function _renderwidget_text(data) {
	var dom_text = document.createElement('p');
	dom_text.classList.add('widget');
	dom_text.classList.add('widget-text');
	dom_text.innerText = data;
	return dom_text;
}