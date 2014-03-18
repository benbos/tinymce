var IMAGE_SERVER = '';
var IMAGE_FILE = '';
var IMAGE_WIDTH = '';
var IMAGE_HEIGHT = '';
var IMAGE_STYLE = '';
function SMImage_DeleteImage(get, file) {
	var b = window.confirm('"' + file + '"\n' + tinyMCEPopup.getLang('smimage.message_image_delete', '?'));
	if (b) {
		window.location.href = "index.php?get=" + get + "&file=" + file + "&action=delete"
	}
};
function SMImage_RenameImage(get, file) {
	var ext = GetFileExt(file);
	var s = Prompt.show(tinyMCEPopup.getLang('smimage.image_rename', '?') + ":", GetFileNameWithoutExt(file));
	if (s) {
		window.location.href = "index.php?get=" + get + "&file=" + file + "&name=" + s.rtrim() + '.' + ext + "&action=rename"
	}
};
function SMImage_RenameImage2(get, file, obj) {
	var b = window.confirm('"' + file + '"  ->  "' + obj.value + '"' + '\n' + tinyMCEPopup.getLang('smimage.message_image_rename', '?'));
	if (b) {
		window.location.href = "index.php?get=" + get + "&file=" + file + "&name=" + obj.value + "&action=rename"
	} else {
		obj.value = file;
		obj.style.backgroundColor = 'transparent';
		obj.style.borderWidth = '0px';
		obj.blur()
	}
};
function SMImage_RenameFolder(get, folder) {
	var s = Prompt.show(tinyMCEPopup.getLang('smimage.folder_rename', '?') + ":", folder);
	if (s) {
		window.location.href = "index.php?get=" + get + "&folder=" + folder + "&name=" + s + "&action=rename"
	}
};
function SMImage_RenameFolder2(get, folder, obj) {
	var b = window.confirm('"' + folder + '"  ->  "' + obj.value + '"' + '\n' + tinyMCEPopup.getLang('smimage.message_folder_rename', '?'));
	if (b) {
		window.location.href = "index.php?get=" + get + "&folder=" + folder + "&name=" + obj.value + "&action=rename"
	} else {
		obj.value = folder;
		obj.style.backgroundColor = 'transparent';
		obj.style.borderWidth = '0px';
		obj.blur()
	}
};
function SMImage_DeleteFolder(get, folder) {
	var b = window.confirm('"' + folder + '"\n' + tinyMCEPopup.getLang('smimage.message_folder_delete', '?'));
	if (b) {
		window.location.href = "index.php?get=" + get + "&folder=" + folder + "&action=delete"
	}
};
function SMImage_RotateImage(get, file, degrees) {
	var b = window.confirm('"' + file + '"\n' + tinyMCEPopup.getLang('smimage.message_image_rotate', '?'));
	if (b) {
		window.location.href = "index.php?get=" + get + "&file=" + file + "&degrees=" + degrees + "&action=rotate"
	}
};
function SMImage_NewFolder(get) {
	var s = Prompt.show(tinyMCEPopup.getLang('smimage.folder_new', '?') + ":");
	if (s) {
		window.location.href = "index.php?get=" + get + "&name=" + s + "&action=newfolder"
	}
};
function SMImage_PageReload(get) {

	var timeStamp = new Date().getTime();

	window.location.href = 'index.php?get=' + get + '&time=' + timeStamp;
};
function SMImage_ShowImageMenu(id, display) {
	if (document.getElementById(id) != null) {
		document.getElementById(id).style.display = display
	}
};
function SMImage_Insert(server, file, width, height, style) {
	
	tinyMCEPopup.restoreSelection();
	var win = tinyMCEPopup.editor.plugins.smimage.GetWindow();
	var ed = tinyMCEPopup.editor;
	var obj = ed.selection.getNode();
	IMAGE_SERVER = server;
	IMAGE_FILE = file;
	IMAGE_WIDTH = width;
	IMAGE_HEIGHT = height;
	IMAGE_STYLE = style;
	if (win == null && obj.nodeName != 'IMG') {
		SMImage_SetImageDataWindowTitle(GetFileName2(file));
		SMImage_SetImageDataEdit(document.form_imagedata.edit3, IMAGE_STYLE);
		SMImage_SetImageDataAlignmentIni();
		SMImage_ShowImageData()
	} else {
		SMImage_InsertImage()
	}
};
function SMImage_InsertNewImage(alt, title, style) {
	var args = {};
	var ed = tinyMCEPopup.editor;
	tinymce.extend(args, {
		src: IMAGE_SERVER + IMAGE_FILE,
		width: IMAGE_WIDTH,
		height: IMAGE_HEIGHT,
		alt: alt,
		title: title,
		style: style
	});
	tinyMCEPopup.restoreSelection();
	ed.execCommand('mceInsertContent', false, '<img id="__mce_tmp" />', {
		skip_undo: 1
	});
	ed.dom.setAttribs('__mce_tmp', args);
	ed.dom.setAttrib('__mce_tmp', 'id', '');
	ed.undoManager.add();
	tinyMCEPopup.close()
};
function SMImage_InsertImage() {
	tinyMCEPopup.restoreSelection();
	var win = tinyMCEPopup.editor.plugins.smimage.GetWindow();
	
	if (win == null) {
		var args = {};
		var ed = tinyMCEPopup.editor;
		var obj = ed.selection.getNode();
		if (obj.nodeName == 'IMG') {
			tinymce.extend(args, {
				src: IMAGE_SERVER + IMAGE_FILE,
				width: IMAGE_WIDTH,
				height: IMAGE_HEIGHT
			});
			ed.dom.setAttribs(obj, args);
			tinyMCEPopup.close()
		}
	} else {
		tinyMCEPopup.editor.plugins.smimage.SetWindow(null);
		var id = tinyMCEPopup.editor.plugins.smimage.GetId();
		var s = tinyMCEPopup.editor.settings['document_base_url'];
		var src = IMAGE_SERVER + IMAGE_FILE;
		if (IMAGE_SERVER == '') {
			src = src.replace(s, '')
		}
		win.document.getElementById(id).value = src;
		if (win.ImageDialog && win.ImageDialog.getImageData) {
			win.ImageDialog.getImageData()
		}
		if (win.ImageDialog && win.ImageDialog.showPreviewImage) {
			win.ImageDialog.showPreviewImage(src)
		}
		tinyMCEPopup.close();
		win.focus()
	}
};
function SMImage_OpenFolder(get) {

	var timeStamp = new Date().getTime();

	window.location.href = 'index.php?get=' + get + '&time=' + timeStamp;
};
function SMImage_BackFolder(get) {
	window.location.href = 'index.php?get=' + get + '&action=back' + '&time=' + timeStamp;
};
function SMImage_Upload(get, file) {
	if (SMImage_CheckFormIsNaN(document.form1.edit3)) {
		window.alert(tinyMCEPopup.getLang('smimage.message_upload_4', '?'));
		return
	}
	if (document.form1.input1.value != '' && document.form1.edit1.value != '') {
		if (GetFileExt(file.toLowerCase()) != 'jpg' && GetFileExt(file.toLowerCase()) != 'jpeg' && GetFileExt(file.toLowerCase()) != 'gif' && GetFileExt(file.toLowerCase()) != 'png') {
			window.alert(tinyMCEPopup.getLang('smimage.message_upload_3', '?'))
		} else {
			document.getElementById('wait').style.display = 'block';
			document.form1.action = "index.php?get=" + get + "&action=upload";
			document.form1.submit()
		}
	} else {
		window.alert(tinyMCEPopup.getLang('smimage.message_upload_2', '?'))
	}
};
function Upload_ShowFileName() {
	document.form1.edit1.value = GetFileName(document.form1.input1.value);
	document.form1.edit2.value = '.' + GetFileExt(document.form1.input1.value)
};
function SMImage_SetImageDataWindowTitle(title) {
	var obj = null;
	obj = document.getElementById("window_imagedata_top");
	if (obj) {
		obj.innerHTML = title
	}
};
function SMImage_SetImageDataEdit(edit, s) {
	var obj = null;
	obj = edit;
	if (obj) {
		obj.value = s
	}
};
function SMImage_ShowImageData() {
	var obj = null;
	obj = document.getElementById("window_imagedata");
	if (obj) {
		document.getElementById('wait').style.display = 'block';
		obj.style.display = 'block';
		document.form_imagedata.edit1.focus()
	}
};
function SMImage_CloseImageData() {
	var obj = null;
	obj = document.getElementById("window_imagedata");
	if (obj) {
		document.getElementById('wait').style.display = 'none';
		obj.style.display = 'none'
	}
};
function SMImage_CheckFormIsNaN(obj) {
	if (isNaN(obj.value)) {
		obj.style.borderColor = '#ff3300';
		return true
	} else {
		obj.style.borderColor = '';
		return false
	}
};
function SMImage_SetImageDataAlignmentIni() {
	var obj1 = document.getElementById("imagedata_alignment_1");
	var obj2 = document.getElementById("imagedata_alignment_2");
	var obj3 = document.getElementById("imagedata_alignment_3");
	var edit = document.form_imagedata.edit3;
	obj1.style.borderColor = '';
	obj2.style.borderColor = '';
	obj3.style.borderColor = '';
	obj1.title = tinyMCEPopup.getLang('smimage.insert_alignment_1_hint', '?');
	obj2.title = tinyMCEPopup.getLang('smimage.insert_alignment_2_hint', '?');
	obj3.title = tinyMCEPopup.getLang('smimage.insert_alignment_3_hint', '?');
	var strReg1 = /(float:)([ ]*)(left;)/g;
	var strReg2 = /(float:)([ ]*)(right;)/g;
	var regex1 = new RegExp(strReg1);
	var regex2 = new RegExp(strReg2);
	if (regex1.test(edit.value)) {
		obj2.style.borderColor = '#ff3300'
	} else if (regex2.test(edit.value)) {
		obj3.style.borderColor = '#ff3300'
	} else {
		obj1.style.borderColor = '#ff3300'
	}
};
function SMImage_SetImageDataAlignment(obj, style) {
	var obj1 = document.getElementById("imagedata_alignment_1");
	var obj2 = document.getElementById("imagedata_alignment_2");
	var obj3 = document.getElementById("imagedata_alignment_3");
	if (obj1 && obj2 && obj3) {
		obj1.style.borderColor = '';
		obj2.style.borderColor = '';
		obj3.style.borderColor = '';
		obj.style.borderColor = '#ff3300';
		var edit = document.form_imagedata.edit3;
		var strReg = /(float:)([a-zA-Z ]+)(;)/g;
		var regex = new RegExp(strReg);
		if (regex.test(edit.value)) {
			edit.value = edit.value.replace(strReg, style);
			edit.value = edit.value.replace(/^\s+/, '').replace(/\s+$/, '')
		} else {
			edit.value = style + ' ' + edit.value;
			edit.value = edit.value.replace(/^\s+/, '').replace(/\s+$/, '')
		}
	}
};
function SMImage_WindowResize() {
	var obj = null;
	obj = document.getElementById("main");
	if (obj) {
		obj.style.height = GetWindowHeight() - 66 + 'px';
		obj.style.width = GetWindowWidth() - 8 + 'px'
	}
	obj = document.getElementById("main_upload");
	if (obj) {
		obj.style.height = GetWindowHeight() - document.getElementById("upload").offsetHeight - 70 + 'px';
		obj.style.width = GetWindowWidth() - 8 + 'px'
	}
	obj = document.getElementById('div_table');
	if (obj) {
		obj.style.height = GetWindowHeight() - 83 + 'px';
		obj.style.width = GetWindowWidth() + 'px'
	}
	obj = document.getElementById('table');
	if (obj) {
		obj.style.width = document.getElementById('div_table').offsetWidth + 'px'
	}
	obj = document.getElementById("wait");
	if (obj) {
		obj.style.height = GetWindowHeight() + 'px';
		obj.style.width = GetWindowWidth() + 'px'
	}
	obj = document.getElementById("wait_animation");
	if (obj) {
		obj.style.top = GetWindowHeight() / 2 - 45 + 'px';
		obj.style.left = GetWindowWidth() / 2 - 45 + 'px'
	}
	obj = document.getElementById("window_imagedata");
	if (obj) {
		obj.style.top = GetWindowHeight() / 2 - 138 + 'px';
		obj.style.left = GetWindowWidth() / 2 - 150 + 'px'
	}
};
function SMImage_ShowThumbnail(id, src, size, jpg_quality) {
	obj = document.getElementById(id);
	if (obj) {
		img = new Image();
		img.src = 'php/thumbnail.php?src=' + src + '&size=' + size + '&jpg_quality=' + jpg_quality;
		document.images[id].src = img.src
	}
};
function SMImage_LoadThumbnail(a, dir, thumbnail_size, jpg_quality) {
	for (i = 0; i < a.length; i++) {
		if (document.getElementById('thumbnail' + i) != null) {
			document.getElementById('thumbnail' + i).style.display = 'block'
		}
	}
	for (i = 0; i < a.length; i++) {
		SMImage_ShowThumbnail('th' + i, '' + dir + a[i] + '', '' + thumbnail_size + '', '' + jpg_quality + '')
	}
};
function SMImage_MenuIni() {
	if (document.getElementById('m11')) {
		document.getElementById('m11').title = tinyMCEPopup.getLang('smimage.menu_hint_11', '?')
	}
	if (document.getElementById('m12')) {
		document.getElementById('m12').title = tinyMCEPopup.getLang('smimage.menu_hint_12', '?')
	}
	if (document.getElementById('m2')) {
		document.getElementById('m2').title = tinyMCEPopup.getLang('smimage.menu_hint_2', '?')
	}
	if (document.getElementById('m3')) {
		document.getElementById('m3').title = tinyMCEPopup.getLang('smimage.menu_hint_3', '?')
	}
	if (document.getElementById('m4')) {
		document.getElementById('m4').title = tinyMCEPopup.getLang('smimage.menu_hint_4', '?')
	}
	if (document.getElementById('m5')) {
		document.getElementById('m5').title = tinyMCEPopup.getLang('smimage.menu_hint_5', '?')
	}
};
function SMTableIni() {
	var obj = null;
	var a = new Array('smtable_h1', 'smtable_h2', 'smtable_h3', 'smtable_h4');
	for (i = 0; i < a.length; i++) {
		obj = document.getElementById(a[i]);
		if (obj != null) {
			if (((obj.title * 1) % 2) == 0) {
				SMTable_Header_SetTitle(obj, tinyMCEPopup.getLang('smimage.table_sort_hint_2', '?'))
			} else {
				SMTable_Header_SetTitle(obj, tinyMCEPopup.getLang('smimage.table_sort_hint_1', '?'))
			}
		}
	}
};
var edit = false;
function SMImage_InputFileClick(obj) {
	if (!edit) {
		obj.style.backgroundColor = '#ffffff';
		obj.style.borderWidth = '1px'
	} else {
		obj.style.backgroundColor = 'transparent';
		obj.style.borderWidth = '0px'
	}
};
function SMImage_InputFileBlur(obj, file) {
	if (!edit) {
		obj.value = file;
		obj.style.backgroundColor = 'transparent';
		obj.style.borderWidth = '0px'
	}
};
function SMImage_InputFileEnter(e, obj, file, get) {
	if (!e) {
		e = window.event
	}
	if (e.keyCode == 13) {
		edit = true;
		if (file != obj.value) {
			SMImage_RenameImage2(get, file, obj)
		} else {
			obj.style.backgroundColor = 'transparent';
			obj.style.borderWidth = '0px';
			edit = false;
			obj.blur()
		}
		edit = false
	}
};
function SMImage_InputFolderClick(obj) {
	if (!edit) {
		obj.style.backgroundColor = '#ffffff';
		obj.style.borderWidth = '1px'
	} else {
		obj.style.backgroundColor = 'transparent';
		obj.style.borderWidth = '0px'
	}
};
function SMImage_InputFolderBlur(obj, folder) {
	if (!edit) {
		obj.value = folder;
		obj.style.backgroundColor = 'transparent';
		obj.style.borderWidth = '0px'
	}
};
function SMImage_InputFolderEnter(e, obj, folder, get) {
	if (!e) {
		e = window.event
	}
	if (e.keyCode == 13) {
		edit = true;
		if (folder != obj.value) {
			SMImage_RenameFolder2(get, folder, obj)
		} else {
			obj.style.backgroundColor = 'transparent';
			obj.style.borderWidth = '0px';
			edit = false;
			obj.blur()
		}
		edit = false
	}
};
function GetFileName(s) {
	var i = s.lastIndexOf("\\") + 1;
	var ss = GetFileExt(s);
	return s.substring(i, s.length - ss.length - 1)
};
function GetFileName2(s) {
	var i = s.lastIndexOf("/") + 1;
	
	return s.substring(i, s.length)
};
function GetFileExt(s) {
	var i = s.lastIndexOf(".") + 1;
	return s.substr(i, s.length)
};
function GetFileNameWithoutExt(s) {
	var i = s.lastIndexOf(".") + 1;
	return s.substr(0, i - 1)
};
function GetWindowHeight() {
	var h = 0;
	if (self.innerHeight) {
		h = self.innerHeight
	} else if (document.documentElement && document.documentElement.clientHeight) {
		h = document.documentElement.clientHeight
	} else if (document.body) {
		h = document.body.clientHeight
	}
	return h
};
function GetWindowWidth() {
	var w = 0;
	if (self.innerWidth) {
		w = self.innerWidth
	} else if (document.documentElement && document.documentElement.clientWidth) {
		w = document.documentElement.clientWidth
	} else if (document.body) {
		w = document.body.clientWidth
	}
	return w
};
String.prototype.ltrim = function (clist) {
	if (clist) {
		return this.replace(new RegExp('^[' + clist + ']+'), '')
	}
	return this.replace(/^\s+/, '')
};
String.prototype.rtrim = function (clist) {
	if (clist) {
		return this.replace(new RegExp('[' + clist + ']+$'), '')
	}
	return this.replace(/\s+$/, '')
};
function ImagePreloader() {
	document.ipreload = new Array();
	if (document.images) {
		for (var i = 0; i < ImagePreloader.arguments.length; i++) {
			document.ipreload[i] = new Image();
			document.ipreload[i].src = "img/" + ImagePreloader.arguments[i]
		}
	}
};
function Button_MouseOver(obj) {
	if (obj) {
		obj.setAttribute('className', 'button_mouseover');
		obj.setAttribute('class', 'button_mouseover')
	}
};
function Button_MouseOut(obj) {
	if (obj) {
		obj.setAttribute('className', 'button_mouseout');
		obj.setAttribute('class', 'button_mouseout')
	}
};
function Input_OnFocus(obj) {
	obj.style.backgroundColor = '#ebf5ff'
};
function Input_OnBlur(obj) {
	obj.style.backgroundColor = ''
};
ImagePreloader('jsmbutton/bg.png', 'jsmbutton/bg_active.png', 'jsmbutton/rbg.png', 'jsmbutton/rbg_active.png', 'window_top.gif');
ImagePreloader('image_menu_bg.gif', 'image_menu_active_bg.gif');
ImagePreloader('table_th_bg.gif', 'table_th_active_bg.gif', 'table_th_down_bg.gif', 'table_tr_active_bg.gif', 'icon_up_9x11.png', 'icon_down_9x11.png', 'icon_none_9x11.png');
ImagePreloader('icon_delete_16x16.png', 'icon_insert_16x16.png', 'icon_rename_16x16.png', 'icon_rotate_left_16x16.png', 'icon_rotate_right_16x16.png');
ImagePreloader('icon_image_16x16.png', 'icon_folder_16x16.png', 'icon_folder_back_16x16.png');
ImagePreloader('wait.gif', 'wait_2.gif');
document.title = document.title + ' (1.5.5)';