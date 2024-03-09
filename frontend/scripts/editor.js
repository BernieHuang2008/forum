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
			<div class="editor" editor-name="text">
				<label class="editor-element">Text: </label>
				<textarea class="editor-element" name="text1"></textarea>
			</div>
			<div class="editor" editor-name="markdown">
			
				<label class="editor-element">Markdown: </label>
				<textarea class="editor-element" name="text1"></textarea>
			</div>
		</div>
		<div id="editor-submit"></div>
	</div>
	`

	$$('#editor-control>button').forEach(button => {
		var editor = $(`.editor[editor-name="${button.innerText.toLowerCase()}"]`);

		button.onclick = function() {
			_switch_editor(button, editor)
		};
	})

	$('#editor-control>button').onclick();
}


function _switch_editor(button, editor) {
	var lastfocus = $('.editor.focus') || $('.editor');
	var container = $('#editor-container');
	var switcher = $("#editor-switch");

	// Sync Data
	var last_data = $$('.editor-element[name]', lastfocus);
	last_data.forEach(ele => {
		let name = ele.name;
		let this_ele = $(`.editor-element[name="${name}"]`, editor);
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


const editor = {
	render: _editor_render,
}