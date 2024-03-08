function _editor_render(container) {
	container.innerHTML += `
	<div id="editor">
		<h1>Comment</h1>
		<div id="editor-control">
			<button>Text</button>
			<button>Advance</button>
		</div>
		<div id="editor-container">
			<div class="editor" editor-name="text">
				<textarea class="editor-element" name="text1"></textarea>
			</div>
			<div class="editor" editor-name="advance">
				<label class="editor-element">Name :</label>
				<input class="editor-element" name="title1">
				<textarea class="editor-element" name="text1"></textarea>
			</div>
		</div>
		<div id="editor-submit"></div>
	</div>
	`

	$$('#editor-control>button').forEach(button => {
		var editor = $(`.editor[editor-name="${button.innerText.toLowerCase()}"]`);

		button.onclick = _switch_editor(button, editor);
	})

	$('#editor-control>button').onclick();
}


function _switch_editor(button, editor) {
	return function() {
		var lastfocus = $('.editor.focus') || $('.editor');
		var container = $('#editor-container');

		// Sync Data
		var last_data = lastfocus.querySelectorAll('.editor-element[name]');
		last_data.forEach(ele => {
			let name = ele.name;
			let this_ele = editor.querySelector(`.editor-element[name="${name}"]`);
			if (this_ele) {
				this_ele.value = ele.value;
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

		// Hide all editors
		container.classList.add('hideAll');
		setTimeout(() => {
			container.classList.add('maxcontent');
		}, 400);
	}
}


const editor = {
	render: _editor_render,
}