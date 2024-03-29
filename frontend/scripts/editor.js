function _editor_render(container) {
	container.innerHTML += `
	<div id="editor">
		<h1>Comment</h1>
		<div id="editor-control">
			<div id="editor-switch"></div>
			<button>Text</button>
			<button>Markdown</button>
		</div>

		<div id="editor-container">
			<!-- Editor: Text -->
			<div class="editor" editor-name="text">
				<label class="editor-element">Text: </label>
				<textarea class="editor-element" name="text1"></textarea>
			</div>

			<!-- Editor: Markdown -->
			<div class="editor" editor-name="markdown">
				<label class="editor-element">Markdown: </label>
				<textarea class="editor-element" name="text1"></textarea>
				<label class="editor-element">Preview</label>
				<article class="editor-element box markdown-body">Markdown Preview</article>
			</div>
		</div>

		<div id="editor-submit">
			<button onclick="editor.submit()" class="green">Submit</button>
		</div>
	</div>
	`

	$$('#editor-control>button').forEach(button => {
		var editor = $(`.editor[editor-name="${button.innerText.toLowerCase()}"]`);

		button.onclick = function () {
			_switch_editor(button, editor)
		};

		// Check authority
		var tid = `t${window.curr.topicID}`;
		if (window.authority[`${tid}\0editor-${button.innerText.toLowerCase()}`] === false) {
			button.style.display = "none";
		}
		else {
			button.classList.add('allowed');
		}
	})

	// Default focus on the first editor
	$('#editor-control>button.allowed').onclick();

	$('.editor-element[name="text1"]', $('.editor[editor-name="markdown"]')).oninput = editor.previewmd;
}


function _switch_editor(button, editor) {
	var lastfocus = $('.editor.focus') || $('.editor');
	var container = $('#editor-container');
	var switcher = $("#editor-switch");
	var editor_name = button.innerText.toLowerCase();

	// Sync Data
	var last_data = $$('.editor-element[name]', lastfocus);
	last_data.forEach(ele => {
		let name = ele.name;
		let this_ele = $(`.editor-element[name="${name}"]`, editor);
		if (this_ele) {
			this_ele.value = ele.value;
			if (this_ele.oninput) this_ele.oninput();
		}
	})

	// Display all editors
	container.style.height = `${lastfocus.offsetHeight}px`;
	container.classList.remove('maxcontent');
	container.classList.remove('hideAll');

	// Unfocus
	lastfocus.classList.remove('focus');

	// Focus on
	editor.classList.add('focus');
	editor.scrollIntoView();
	container.style.height = `${editor.offsetHeight}px`;

	// Move switch
	var width = button.offsetWidth;
	var deltaWidth = width - switcher.offsetWidth;
	switcher.style.paddingLeft = `calc(${width}px - 0.25em)`;
	var left = button.offsetLeft - button.parentElement.offsetLeft - 3 + deltaWidth;
	switcher.style.left = `calc(${left}px + 0.6em)`;

	// Hide all editors
	container.classList.add('hideAll');
	setTimeout(() => {
		container.classList.add('maxcontent');
	}, 400);
}

function _editor_preview_md() {
	var content = $('.editor[editor-name="markdown"]>[name="text1"]');
	var preview = $('article.markdown-body');
	const options = {
		sanitize: true,
		smartLists: true,
		smartypants: true
	};
	preview.innerHTML = marked.parse(content.value, options);
	hljs.highlightAll();
}

function _editor_submit() {
	var editor = $('.editor.focus');
	var data = {};

	$$('.editor-element[name]', editor).forEach(ele => {
		let field_name = ele.name;
		let field_value = ele.value;
		data[field_name] = field_value;
	})

	request_sendpost({
		type: editor.attributes['editor-name'].value,
		data: data
	}).then(resp => {
		if (resp.status == "success") {
			alert("Success");
		} else {
			alert("Failed");
		}
	})
}

const editor = {
	render: _editor_render,
	previewmd: _editor_preview_md,
	submit: _editor_submit,
}