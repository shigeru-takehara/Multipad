var TEXT_AREA_INIT_SIZE = '40px';

var currentSelectedIndex;
var currentWorkspace;

Vue.component('rec', {
	mounted: function() {
		loadLib();
		pwa.webUtil.addCloseAppListener();
		getOptions();
	},
	data: function () {
		return {
			saveParams: function(event) {
				backupData();
				saveParams();
			},
			clearAll: function(event) {
				clearAll();
			},
			goBack: function(event) {
				window.history.back();
			},
			changeOrder: function(event) {
				pwa.webUtil.onClickOpen('changeOrder');
			},
			compare: function(event) {
				pwa.webUtil.onClickOpen('compare');
			},
			minimize: function(event) {
				minimize();
			}
		}
	},
	props: ['options','buttondisabled','status'],
	template: `
		<div>
			<div class="header" id="header">
				<button class="button" v-on:click="saveParams" title="Save Record.">Save</button>
				<button class="button" v-on:click="clearAll" title="Clear All Contents.">Clear All</button>
				<button class="button" v-on:click="changeOrder" title="Change the Order.">Change Order</button>
				<button class="button" v-on:click="compare" title="Compare Contents.">Compare</button>
				<button class="button" v-on:click="minimize" title="Minimize Workspace.">Minimize</button>
				<button class="button" onClick="openEditor()" title="Open External Editor.">Open in Editor</button>
				<button class="button" v-on:click="goBack" title="Go Back to Index Page.">Back</button> <span id="headerMessage">Use Right-Mouse-Button to Popup "Workspace".</span>
			</div>
			<div class="content">
				<fieldset>
					<textarea id="textAreaStatus1" v-model="options.form1.memo1" placeholder="Workspace 1" title="Workspace 1" rows="1" oncontextmenu="doubleClickOnWorkspace('1')" onfocus="trackCurrentWorkspace('1')"></textarea>
					<textarea id="textAreaStatus2" v-model="options.form1.memo2" placeholder="Workspace 2" title="Workspace 2" rows="1" oncontextmenu="doubleClickOnWorkspace('2')" onfocus="trackCurrentWorkspace('2')"></textarea>
					<textarea id="textAreaStatus3" v-model="options.form1.memo3" placeholder="Workspace 3" title="Workspace 3" rows="1" oncontextmenu="doubleClickOnWorkspace('3')" onfocus="trackCurrentWorkspace('3')"></textarea>
					<textarea id="textAreaStatus4" v-model="options.form1.memo4" placeholder="Workspace 4" title="Workspace 4" rows="1" oncontextmenu="doubleClickOnWorkspace('4')" onfocus="trackCurrentWorkspace('4')"></textarea>
					<textarea id="textAreaStatus5" v-model="options.form1.memo5" placeholder="Workspace 5" title="Workspace 5" rows="1" oncontextmenu="doubleClickOnWorkspace('5')" onfocus="trackCurrentWorkspace('5')"></textarea>
					<textarea id="textAreaStatus6" v-model="options.form1.memo6" placeholder="Workspace 6" title="Workspace 6" rows="1" oncontextmenu="doubleClickOnWorkspace('6')" onfocus="trackCurrentWorkspace('6')"></textarea>
					<textarea id="textAreaStatus7" v-model="options.form1.memo7" placeholder="Workspace 7" title="Workspace 7" rows="1" oncontextmenu="doubleClickOnWorkspace('7')" onfocus="trackCurrentWorkspace('7')"></textarea>
					<textarea id="textAreaStatus8" v-model="options.form1.memo8" placeholder="Workspace 8" title="Workspace 8" rows="1" oncontextmenu="doubleClickOnWorkspace('8')" onfocus="trackCurrentWorkspace('8')"></textarea>
					<textarea id="textAreaStatus9" v-model="options.form1.memo9" placeholder="Workspace 9" title="Workspace 9" rows="1" oncontextmenu="doubleClickOnWorkspace('9')" onfocus="trackCurrentWorkspace('9')"></textarea>
					<textarea id="textAreaStatus10" v-model="options.form1.memo10" placeholder="Workspace 10" title="Workspace 10" rows="1" oncontextmenu="doubleClickOnWorkspace('10')" onfocus="trackCurrentWorkspace('10')"></textarea>
					<textarea id="textAreaStatus11" v-model="options.form1.memo11" placeholder="Workspace 11" title="Workspace 11" rows="1" oncontextmenu="doubleClickOnWorkspace('11')" onfocus="trackCurrentWorkspace('11')"></textarea>
					<textarea id="textAreaStatus12" v-model="options.form1.memo12" placeholder="Workspace 12" title="Workspace 12" rows="1" oncontextmenu="doubleClickOnWorkspace('12')" onfocus="trackCurrentWorkspace('12')"></textarea>
					<textarea id="textAreaStatus13" v-model="options.form1.memo13" placeholder="Workspace 13" title="Workspace 13" rows="1" oncontextmenu="doubleClickOnWorkspace('13')" onfocus="trackCurrentWorkspace('13')"></textarea>
					<textarea id="textAreaStatus14" v-model="options.form1.memo14" placeholder="Workspace 14" title="Workspace 14" rows="1" oncontextmenu="doubleClickOnWorkspace('14')" onfocus="trackCurrentWorkspace('14')"></textarea>
					<textarea id="textAreaStatus15" v-model="options.form1.memo15" placeholder="Workspace 15" title="Workspace 15" rows="1" oncontextmenu="doubleClickOnWorkspace('15')" onfocus="trackCurrentWorkspace('15')"></textarea>
					<textarea id="textAreaStatus16" v-model="options.form1.memo16" placeholder="Workspace 16" title="Workspace 16" rows="1" oncontextmenu="doubleClickOnWorkspace('16')" onfocus="trackCurrentWorkspace('16')"></textarea>
					<textarea id="textAreaStatus17" v-model="options.form1.memo17" placeholder="Workspace 17" title="Workspace 17" rows="1" oncontextmenu="doubleClickOnWorkspace('17')" onfocus="trackCurrentWorkspace('17')"></textarea>
					<textarea id="textAreaStatus18" v-model="options.form1.memo18" placeholder="Workspace 18" title="Workspace 18" rows="1" oncontextmenu="doubleClickOnWorkspace('18')" onfocus="trackCurrentWorkspace('18')"></textarea>
					<textarea id="textAreaStatus19" v-model="options.form1.memo19" placeholder="Workspace 19" title="Workspace 19" rows="1" oncontextmenu="doubleClickOnWorkspace('19')" onfocus="trackCurrentWorkspace('19')"></textarea>
					<textarea id="textAreaStatus20" v-model="options.form1.memo20" placeholder="Workspace 20" title="Workspace 20" rows="1" oncontextmenu="doubleClickOnWorkspace('20')" onfocus="trackCurrentWorkspace('20')"></textarea>
				</fieldset>
			</div>
			
			<div id="editor" class="modal">
			  <div class="modal-content">
				<span class="close" onClick="closeEditor()">&times;</span>
				<button class="button" onClick="pwa.webUtil.onClickOpen('openFile')" title="Open a file">Open File</button>
				<button class="button" onClick="copyContent()" title="Copy content">Select All & Copy</button>
				<button class="button" onClick="saveInEditor()" title="Save Record.">Save</button>
				<button class="button" onClick="openEditor()" title="Open External Editor.">Open in Editor</button> <span id="editorMessage"></span>
				<textarea id="edit" placeholder="" rows="45"></textarea>
			  </div>
			</div>
			
			<div id="openFile" class="modal">
			  <div class="modal-content">
				<span class="close" onClick="closeOpenFile()">&times;</span>
				<button class="button" onClick="getFileContent();closeOpenFile(true)" title="Open a file">Open</button>
				<input id="openFileName" type="file" name="name" />
				<input id="openFilePath" type="text" name="name" placeholder="File Path here; when you choose file, please copy the path and paste it here." />
			  </div>
			</div>
			
			<div id="changeOrder" class="modal">
			  <div class="modal-content">
				<span class="close" onClick="closeChangeOrder()">&times;</span>
				<button class="button" onClick="changeOrder();closeChangeOrder()" title="Open a file">Change Order</button>
				<label>Moving Workspace:</label>
				<select id="changeOrderSrc">
					<option value="1">Workspace 1</option>
					<option value="2">Workspace 2</option>
					<option value="3">Workspace 3</option>
					<option value="4">Workspace 4</option>
					<option value="5">Workspace 5</option>
					<option value="6">Workspace 6</option>
					<option value="7">Workspace 7</option>
					<option value="8">Workspace 8</option>
					<option value="9">Workspace 9</option>
					<option value="10">Workspace 10</option>
					<option value="11">Workspace 11</option>
					<option value="12">Workspace 12</option>
					<option value="13">Workspace 13</option>
					<option value="14">Workspace 14</option>
					<option value="15">Workspace 15</option>
					<option value="16">Workspace 16</option>
					<option value="17">Workspace 17</option>
					<option value="18">Workspace 18</option>
					<option value="19">Workspace 19</option>
					<option value="20">Workspace 20</option>
				</select>
				<label>Destination Workspace:</label>
				<select id="changeOrderDst">
					<option value="1">Workspace 1</option>
					<option value="2">Workspace 2</option>
					<option value="3">Workspace 3</option>
					<option value="4">Workspace 4</option>
					<option value="5">Workspace 5</option>
					<option value="6">Workspace 6</option>
					<option value="7">Workspace 7</option>
					<option value="8">Workspace 8</option>
					<option value="9">Workspace 9</option>
					<option value="10">Workspace 10</option>
					<option value="11">Workspace 11</option>
					<option value="12">Workspace 12</option>
					<option value="13">Workspace 13</option>
					<option value="14">Workspace 14</option>
					<option value="15">Workspace 15</option>
					<option value="16">Workspace 16</option>
					<option value="17">Workspace 17</option>
					<option value="18">Workspace 18</option>
					<option value="19">Workspace 19</option>
					<option value="20">Workspace 20</option>
				</select>
			  </div>
			</div>

			<div id="compare" class="modal">
			  <div class="modal-content">
				<span class="close" onClick="closeCompare()">&times;</span>
				<button class="button" onClick="compare();closeCompare()" title="Compare Contents">Compare</button>
				<select id="compContent1">
					<option value="1">Workspace 1</option>
					<option value="2">Workspace 2</option>
					<option value="3">Workspace 3</option>
					<option value="4">Workspace 4</option>
					<option value="5">Workspace 5</option>
					<option value="6">Workspace 6</option>
					<option value="7">Workspace 7</option>
					<option value="8">Workspace 8</option>
					<option value="9">Workspace 9</option>
					<option value="10">Workspace 10</option>
					<option value="11">Workspace 11</option>
					<option value="12">Workspace 12</option>
					<option value="13">Workspace 13</option>
					<option value="14">Workspace 14</option>
					<option value="15">Workspace 15</option>
					<option value="16">Workspace 16</option>
					<option value="17">Workspace 17</option>
					<option value="18">Workspace 18</option>
					<option value="19">Workspace 19</option>
					<option value="20">Workspace 20</option>
				</select>
				<select id="compContent2">
					<option value="1">Workspace 1</option>
					<option value="2">Workspace 2</option>
					<option value="3">Workspace 3</option>
					<option value="4">Workspace 4</option>
					<option value="5">Workspace 5</option>
					<option value="6">Workspace 6</option>
					<option value="7">Workspace 7</option>
					<option value="8">Workspace 8</option>
					<option value="9">Workspace 9</option>
					<option value="10">Workspace 10</option>
					<option value="11">Workspace 11</option>
					<option value="12">Workspace 12</option>
					<option value="13">Workspace 13</option>
					<option value="14">Workspace 14</option>
					<option value="15">Workspace 15</option>
					<option value="16">Workspace 16</option>
					<option value="17">Workspace 17</option>
					<option value="18">Workspace 18</option>
					<option value="19">Workspace 19</option>
					<option value="20">Workspace 20</option>
				</select>
			  </div>
			</div>
		</div>
	`
});

var rec = new Vue({ 
	el: '#rec',
	data: {
		options: {
			form1:{memo1: '', memo2: '', memo3: '', memo4: '', memo5: '', memo6: '', memo7: '', memo8: '', memo9: '', memo10: '',
					memo11: '', memo12: '', memo13: '', memo14: '', memo15: '', memo16: '', memo17: '', memo18: '', memo19: '', memo20: '',
					ht1: TEXT_AREA_INIT_SIZE, ht2: TEXT_AREA_INIT_SIZE, ht3: TEXT_AREA_INIT_SIZE, ht4: TEXT_AREA_INIT_SIZE, ht5: TEXT_AREA_INIT_SIZE, ht6: TEXT_AREA_INIT_SIZE, ht7: TEXT_AREA_INIT_SIZE, ht8: TEXT_AREA_INIT_SIZE, ht9: TEXT_AREA_INIT_SIZE, ht10: TEXT_AREA_INIT_SIZE, ht11: TEXT_AREA_INIT_SIZE, ht12: TEXT_AREA_INIT_SIZE, ht13: TEXT_AREA_INIT_SIZE, ht14: TEXT_AREA_INIT_SIZE, ht15: TEXT_AREA_INIT_SIZE, ht16: TEXT_AREA_INIT_SIZE, ht17: TEXT_AREA_INIT_SIZE, ht18: TEXT_AREA_INIT_SIZE, ht19: TEXT_AREA_INIT_SIZE, ht20: TEXT_AREA_INIT_SIZE}
		},
		buttondisabled: false,
		status: ""
	}
});

function trackCurrentWorkspace(val) {
	currentWorkspace = val;
}

function minimize() {
	if (!currentWorkspace) {
		return;
	}
	var tx = document.getElementById('textAreaStatus' + currentWorkspace);
	tx.style.height = TEXT_AREA_INIT_SIZE;
}

function getOptions() {
	axios
		.get(pwa.webUtil.URL + 'util/getData.jjs?MY-DATA/' + JSON_FILE)
		.then(response => {
			if (response.data) {
				if (response.data) {
					rec.options = response.data;
				}
			}
			initWorkspace();
		});
}

function saveParams(editorFlag) {
	const tx = document.getElementsByTagName('textarea');
	for (let i = 0; i < tx.length; i++) {
		if (tx[i].id.indexOf('textAreaStatus') == 0) {
			rec.options.form1["ht" + (i+1)] = tx[i].style.height;
		}
	}

	var data = JSON.stringify(rec.options);
	data = encodeURIComponent(data);
	axios
		.get(pwa.webUtil.URL + 'util/saveData.jjs?MY-DATA/' + JSON_FILE + '&' + data)
		.catch(error => alert(error + " - fail to save data."));
	rec.status += "Parameters are saved."; // not used
	
	if (editorFlag) {
		document.getElementById("editorMessage").innerHTML="Saved successfully.";
		setTimeout(function(){
			document.getElementById("editorMessage").innerHTML='';
		},2000);	
	}
	else {
		document.getElementById("headerMessage").innerHTML="Saved successfully.";
		setTimeout(function(){
			document.getElementById("headerMessage").innerHTML='Use Right-Mouse-Button to Popup "Workspace".';
		},2000);
	}
}

function backupData() {
	axios
		.get(pwa.webUtil.URL + 'app/backupData.jjs')
		.catch(error => console.log(error));
}

function loadLib() {
	document.title = REC_TITLE;
	axios
		.get(pwa.webUtil.URL + REC_LOAD_LIB)
		.catch(error => console.log(error));
}

function doubleClickOnWorkspace(id) {
	currentSelectedIndex = id;
	var val = rec.options.form1['memo' + currentSelectedIndex];
	if (!val) {
		val = "";
	}
	document.getElementById("edit").value = val;
	pwa.webUtil.onClickOpen('editor');
}

function closeEditor() {
	pwa.webUtil.onClickClose('editor');
	rec.options.form1['memo' + currentSelectedIndex] = document.getElementById('edit').value;
	document.getElementById('textAreaStatus' + currentSelectedIndex).value = document.getElementById('edit').value;
}

function closeOpenFile(keepFlag) {
	pwa.webUtil.onClickClose('openFile');
	if (keepFlag) return;
	
	document.getElementById("openFileName").value = "";
	document.getElementById("openFilePath").value = "";
}

function copyContent() {
	var copyText = document.getElementById('edit');
	copyText.select();
	copyText.setSelectionRange(0, 99999)
	document.execCommand("copy");
}

function getFileContent() {
	var fileName = document.getElementById("openFileName").value;
	var filePath = document.getElementById("openFilePath").value;
	
	var fileSeparator = '\\' ;
	var fileParts = fileName.split(fileSeparator);
	var fileFullPath = filePath + '\\' + fileParts[fileParts.length-1];
	
	axios
		.get(pwa.webUtil.URL + 'util/getData.jjs?' + fileFullPath)
		.then(response => {
			if (response.data) {
				document.getElementById('edit').value = response.data;
				rec.options.form1['memo' + currentSelectedIndex] = response.data;
			}
		});
}

function saveInEditor() {
	rec.options.form1['memo' + currentSelectedIndex] = document.getElementById('edit').value;
	document.getElementById('textAreaStatus' + currentSelectedIndex).value = document.getElementById('edit').value;
	backupData();
	saveParams(true);
}

function clearAll() {
	if (!confirm("Are you sure?")) {
		return;
	}
	rec.options.form1.memo1 = '';
	rec.options.form1.memo2 = '';
	rec.options.form1.memo3 = '';
	rec.options.form1.memo4 = '';
	rec.options.form1.memo5 = '';
	rec.options.form1.memo6 = '';
	rec.options.form1.memo7 = '';
	rec.options.form1.memo8 = '';
	rec.options.form1.memo9 = '';
	rec.options.form1.memo10 = '';
	rec.options.form1.memo11 = '';
	rec.options.form1.memo12 = '';
	rec.options.form1.memo13 = '';
	rec.options.form1.memo14 = '';
	rec.options.form1.memo15 = '';
	rec.options.form1.memo16 = '';
	rec.options.form1.memo17 = '';
	rec.options.form1.memo18 = '';
	rec.options.form1.memo19 = '';
	rec.options.form1.memo20 = '';

	rec.options.form1.ht1 = TEXT_AREA_INIT_SIZE;
	rec.options.form1.ht2 = TEXT_AREA_INIT_SIZE;
	rec.options.form1.ht3 = TEXT_AREA_INIT_SIZE;
	rec.options.form1.ht4 = TEXT_AREA_INIT_SIZE;
	rec.options.form1.ht5 = TEXT_AREA_INIT_SIZE;
	rec.options.form1.ht6 = TEXT_AREA_INIT_SIZE;
	rec.options.form1.ht7 = TEXT_AREA_INIT_SIZE;
	rec.options.form1.ht8 = TEXT_AREA_INIT_SIZE;
	rec.options.form1.ht9 = TEXT_AREA_INIT_SIZE;
	rec.options.form1.ht10 = TEXT_AREA_INIT_SIZE;
	rec.options.form1.ht11 = TEXT_AREA_INIT_SIZE;
	rec.options.form1.ht12 = TEXT_AREA_INIT_SIZE;
	rec.options.form1.ht13 = TEXT_AREA_INIT_SIZE;
	rec.options.form1.ht14 = TEXT_AREA_INIT_SIZE;
	rec.options.form1.ht15 = TEXT_AREA_INIT_SIZE;
	rec.options.form1.ht16 = TEXT_AREA_INIT_SIZE;
	rec.options.form1.ht17 = TEXT_AREA_INIT_SIZE;
	rec.options.form1.ht18 = TEXT_AREA_INIT_SIZE;
	rec.options.form1.ht19 = TEXT_AREA_INIT_SIZE;
	rec.options.form1.ht20 = TEXT_AREA_INIT_SIZE;

	const tx = document.getElementsByTagName('textarea');
	for (let i = 0; i < tx.length; i++) {
		tx[i].style.height = TEXT_AREA_INIT_SIZE;
	}
}

function changeOrder() {
	var src = parseInt(document.getElementById("changeOrderSrc").value);
	var dst = parseInt(document.getElementById("changeOrderDst").value);
	
	var srcVal = rec.options.form1["memo" + src];
	var dstVal = rec.options.form1["memo" + dst];
	if (dstVal) {
		if (src < dst) {
			for(var i=src; i<dst; ) {
				rec.options.form1["memo" + i] = rec.options.form1["memo" + (++i)];
			}
		}
		else {
			for(var i=src; i>dst; ) {
				rec.options.form1["memo" + i] = rec.options.form1["memo" + (--i)];
			}
		}
	}
	else {
		rec.options.form1["memo" + src] = "";
	}
	rec.options.form1["memo" + dst] = srcVal;
}

function closeChangeOrder() {
	pwa.webUtil.onClickClose('changeOrder');
	document.getElementById("changeOrderSrc").value = "";
	document.getElementById("changeOrderDst").value = "";
}

function closeCompare() {
	pwa.webUtil.onClickClose('compare');
	document.getElementById("compare1").value = "";
	document.getElementById("compare2").value = "";
}

function compare() {
	var content1 = rec.options.form1["memo" + document.getElementById("compContent1").value];
	var content2 = rec.options.form1["memo" + document.getElementById("compContent2").value];

	content1 = encodeURIComponent(content1);
	content2 = encodeURIComponent(content2);
	axios
		.get(pwa.webUtil.URL + 'app/compare.jjs?' + content1 + '&' + content2)
		.catch(error => console.log(error));
}

function openEditor() {
	var content = rec.options.form1["memo" + currentWorkspace];

	content = encodeURIComponent(content);
	axios
		.get(pwa.webUtil.URL + 'app/openEditor.jjs?' + currentWorkspace + '&' + content)
		.catch(error => console.log(error));
}

function openEditorBase(val) {
	var content = rec.options.form1["memo" + val];

	content = encodeURIComponent(content);
	axios
		.get(pwa.webUtil.URL + 'app/openEditor.jjs?' + val + '&' + content)
		.catch(error => console.log(error));
}

function initWorkspace() {
	const tx = document.getElementsByTagName('textarea');
	for (let i = 0; i < tx.length; i++) {
		if (tx[i].id.indexOf('textAreaStatus') == 0) {
			if (tx[i].value == '') {
				tx[i].setAttribute("style", "height:" + TEXT_AREA_INIT_SIZE + "px;"); // removed overflow-y:hidden;
			} else {
				tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;");
			}
			tx[i].addEventListener("input", OnInput, false);
			tx[i].style.height = rec.options.form1["ht" + (i+1)];

			tx[i].addEventListener('contextmenu', e => {
			  e.preventDefault();
			});
		}
	}
}

function OnInput() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
}



