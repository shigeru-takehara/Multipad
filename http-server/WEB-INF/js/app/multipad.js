function removeSpecialCharacters(val) {
	return val.replace(/[^ a-zA-Z0-9_-]/g,'');
}

function addSubject(val) {
	val = removeSpecialCharacters(val);
	var answer = confirm("Are you sure with '" + val + "' to create a new title?");
	if (answer && validate(val)) {
		axios.get(pwa.webUtil.URL + 'app/addSubject.jjs?' + val);
	}
	closeAddSubjectDialog();
	refreshPage();
}

function copySubject(src, dst) {
	dst = removeSpecialCharacters(dst);
	var answer = confirm("Are you sure with '" + src + "' to copy and create '" + dst + "' for the new title?");
	if (answer && validate(dst)) {
		axios.get(pwa.webUtil.URL + 'app/addSubject.jjs?' + dst + '&' + src);
	}
	closeCopySubjectDialog();
	refreshPage();
}

function renameSubject(src, dst) {
	dst = removeSpecialCharacters(dst);
	var answer = confirm("Are you sure with the new title:'" + dst + "'?");
	if (answer && validate(dst)) {
		axios.get(pwa.webUtil.URL + 'app/addSubject.jjs?' + dst + '&' + src)
		.then(response => {
			delSubject(src, true);
			closeRenameSubjectDialog();
			refreshPage();
		});
	}
}

function delSubject(val, notAsk) {
	var answer;
	if (!notAsk) {
		var answer = confirm("Are you sure with '" + val + "' to delete?");
	} else {
		answer = true;
	}

	if (answer) {
		axios.get(pwa.webUtil.URL + 'app/delSubject.jjs?' + val);
	}
	
	closeDelSubjectDialog();
	refreshPage();
}

function closeAddSubjectDialog() {
	clearNewSubjectValue();
	pwa.webUtil.onClickClose('addSub');
}

function closeCopySubjectDialog() {
	clearCopySubjectValue();
	pwa.webUtil.onClickClose('copySub');
}

function closeDelSubjectDialog() {
	clearDelSubjectValue();
	pwa.webUtil.onClickClose('delSub');
}

function closeRenameSubjectDialog() {
	clearRenameSubjectValue();
	pwa.webUtil.onClickClose('renameSub');
}

function closeConfigDialog() {
	pwa.webUtil.onClickClose('config');
}

function clearNewSubjectValue() {
	(document.getElementById('newSubject')).value = "";
}

function clearCopySubjectValue() {
	(document.getElementById('copySrcSubject')).value = "";
	(document.getElementById('copyDstSubject')).value = "";
}

function clearDelSubjectValue() {
	(document.getElementById('delSelect')).value = "";
}

function clearRenameSubjectValue() {
	(document.getElementById('renameSelect')).value = "";
}

function validate(val) {
	return true;
}

function refreshPage() {
	setTimeout(function(){location.reload();}, 1000);
}

function closeArchiveDialog() {
	clearArchiveValue();
	pwa.webUtil.onClickClose('archive');
}

function closeRestoreDialog() {
	clearRestoreValue();
	pwa.webUtil.onClickClose('restore');
}

function clearArchiveValue() {
	document.getElementById("archiveSelect").value = "";
}

function clearRestoreValue() {
	document.getElementById("restoreSelect").value = "";
}

function getIndexList(elementId) {

	axios
	.get(pwa.webUtil.URL + 'app/getTitleList.jjs')
	.then(response => {
		if (response.data) {
			populateTitleOptions(elementId, response.data);
		}
	});
}

function populateTitleOptions(elementId, titleList) {
	var select = document.getElementById(elementId); 
	var size = Object.keys(titleList).length;
	select.innerHTML = ""; // remove all options
	for(var i=0; i<size; i++)
	{
		var opt = document.createElement("option");
		opt.value= titleList[i]; 
		opt.innerHTML = titleList[i]; // whatever property it has

		// then append it to the select element
		select.appendChild(opt);
	}
}

function archiveSubject(title) {
	var answer = confirm("Are you sure with '" + title + "' to archive?");
	if (answer) {
		axios.get(pwa.webUtil.URL + 'app/delSubject.jjs?' + title + '&archive');
	}
	closeArchiveDialog();
	refreshPage();
}	

function getArchiveList(elementId) {

	axios
	.get(pwa.webUtil.URL + 'app/getArchiveTitleList.jjs')
	.then(response => {
		if (response.data) {
			populateTitleOptions(elementId, response.data);
		}
	});
}

function restoreSubject(title) {
	if (!title) {
		return;
	}
	var answer = confirm("Are you sure with '" + title + "' to restore?");
	if (answer) {
		axios.get(pwa.webUtil.URL + 'app/addSubject.jjs?' + title + '&&restore');
	}
	closeArchiveDialog();
	refreshPage();
}	

function getConfig() {
	axios
	.get(pwa.webUtil.URL + 'util/getData.jjs?UTIL/edit.bat')
	.then(response => {
		if (response.data) {
			(document.getElementById('editorSetup')).value = response.data;
		}
	});

	axios
	.get(pwa.webUtil.URL + 'util/getData.jjs?UTIL/compare.bat')
	.then(response => {
		if (response.data) {
			(document.getElementById('comparatorSetup')).value = response.data;
		}
	});
}

function saveConfig() {
	data = encodeURIComponent((document.getElementById('editorSetup')).value);
	axios
		.get(pwa.webUtil.URL + 'util/saveData.jjs?UTIL/edit.bat&' + data)
		.catch(error => alert(error + " - fail to save data."));

	data = encodeURIComponent((document.getElementById('comparatorSetup')).value);
	axios
		.get(pwa.webUtil.URL + 'util/saveData.jjs?UTIL/compare.bat&' + data)
		.catch(error => alert(error + " - fail to save data."));
}