function getModal(id) {
	return document.getElementById(id);
}

function onClickOpen(id) {
	var modal = getModal(id);
	modal.style.display = "block";
}

function onClickClose(id) {
	var modal = getModal(id);
	modal.style.display = "none";
}