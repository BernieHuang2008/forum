function refresh_content(dom) {
	$("#content").innerHTML = "";
	$("#content").appendChild(dom);
}

function renderdata_catelist(cates) {
	var dom_ul = $('#sidebar>#categories>ul');

	cates.forEach(c => {
		let title = c.title;
		let icon = c.icon;

		let dom_li = document.createElement('li');
		let dom_a = document.createElement('a');
		dom_a.href = `javascript:render_c('${title}')`;
		let dom_iconspan = document.createElement('span');
		dom_iconspan.classList.add('icon');
		dom_iconspan.style.background = icon;
		let dom_textspan = document.createElement('span');
		dom_textspan.classList.add('text');
		dom_textspan.innerText = title;

		dom_a.appendChild(dom_iconspan);
		dom_a.appendChild(dom_textspan);
		dom_li.appendChild(dom_a);
		dom_ul.appendChild(dom_li);
	})
}

function renderdata_topiclist(topics) {
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
		let dom_td = [1, 2, 3].map(_ => document.createElement('td'));

		// Title (dom_td[0])
		let dom_title = document.createElement('h6');
		dom_title.classList.add('topic-link-title');
		dom_title.innerText = t.title;
		let dom_tags = document.createElement('div'); // TODO
		dom_tags.classList.add('topic-link-tags');

		// Participater (dom_td[1])
		// TODO

		// Time (dom_td[2])
		dom_td[2].innerText = t.time; // TODO

		dom_td[0].appendChild(dom_title);
		dom_td[0].appendChild(dom_tags);
		dom_td.forEach(d => dom_tr.appendChild(d));
		dom_tbody.appendChild(dom_tr);
	})
}

function renderdata_posts(posts) {
	var dom_posts = document.createElement('div');

	posts.forEach(post => {
		var data = post.data;
		var dom = undefined;

		switch (post.type) {
			case "text":
				dom = _renderwidget_text(data);
				break;
			default:
				return; // continue
		}

		var dom_post = document.createElement('div');
		dom_post.classList.add('post');
		dom_post.appendChild(dom);
		dom_posts.appendChild(dom_post);
	})

	refresh_content(dom_posts);
}

function _renderwidget_text(data) {
	var dom_text = document.createElement('p');
	dom_text.classList.add('widget');
	dom_text.classList.add('widget-text');
	dom_text.innerText = data;
	return dom_text;
}