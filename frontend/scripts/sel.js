function $(s, t) {
	t = t || document;
	return t.querySelector(s);
}

function $$(s, t) {
	t = t || document;
	return t.querySelectorAll(s);
}