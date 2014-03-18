(function () {
	tinymce.PluginManager.requireLangPack('smimage');
	var ID = '';
	var INPUT = '';
	var TYPE = '';
	var WINDOW = null;
	tinymce.create('tinymce.plugins.SMImagePlugin', {
		init: function (ed, url) {
			ed.addCommand('SMImageShow', function () {
				var get = 'id=1' + '&dir_root=' + ed.getParam('plugin_smimage_directory', '') + '&server=' + ed.getParam('plugin_smimage_server', '') + '&thumbnail_size=' + ed.getParam('plugin_smimage_thumbnail_size', '') + '&show_thumbnail=' + ed.getParam('plugin_smimage_show_thumbnail', '') + '&jpg_quality=' + ed.getParam('plugin_smimage_jpg_quality', '') + '&orderby=' + ed.getParam('plugin_smimage_orderby', '') + '&show_upload=' + ed.getParam('plugin_smimage_show_upload', '') + '&show_image_menu=' + ed.getParam('plugin_smimage_show_image_menu', '') + '&show_folder_menu=' + ed.getParam('plugin_smimage_show_folder_menu', '') + '&show_newfolder=' + ed.getParam('plugin_smimage_show_newfolder', '') + '&thumbnails_perpage=' + ed.getParam('plugin_smimage_thumbnails_perpage', '') + '&upload_filesize=' + ed.getParam('plugin_smimage_upload_filesize', '') + '&check_session_variable=' + ed.getParam('plugin_smimage_check_session_variable', '') + '&document_root=' + ed.getParam('plugin_smimage_document_root', '');
				ed.windowManager.open({
					file: url + '/index.php?get=' + SMImage_BinToHex(SMImage_RC4(get)),
					width: ed.getParam('plugin_smimage_width', '800'),
					height: ed.getParam('plugin_smimage_height', '500'),
					inline: 1
				},
				{
					plugin_url: url
				})
			});
			ed.addButton('smimage', {
				title: 'smimage.desc',
				cmd: 'SMImageShow',
				image: url + '/img/icon.gif'
			})
		},
		getInfo: function () {
			return {
				longname: '',
				author: 'Jens Stolinski',
				authorurl: 'http://synasys.de/',
				infourl: 'http://synasys.de/',
				version: '1.5.5'
			}
		},
		Ini: function (id, input, type, win) {
			ID = id;
			INPUT = input;
			TYPE = type;
			WINDOW = win
		},
		ShowIni: function () {
			alert("Id: " + ID + "\nInput: " + INPUT + "\nType: " + TYPE + "\nWindow: " + WINDOW)
		},
		GetWindow: function () {
			return WINDOW
		},
		GetId: function () {
			return ID
		},
		SetWindow: function (win) {
			WINDOW = win
		}
	});
	tinymce.PluginManager.add('smimage', tinymce.plugins.SMImagePlugin)
})();
function SMImage_RC4(data) {
	s = new Array();
	key = 'f62Z4Dpv7RpBCY3MJcrOcV7nwySM7k7XijkFeCFMVnTdaa9RyXcLZl81CxkK2TGgZnWbXGvQ6nyOs2lSLJIH2ahxf0FDSgQbykByzpSL62EKluUzfWmHarf4qPYUtNUi';
	for (var i = 0; i < 256; i++) {
		s[i] = i
	}
	var j = 0;
	var x;
	for (i = 0; i < 256; i++) {
		j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
		x = s[i];
		s[i] = s[j];
		s[j] = x
	}
	i = 0;
	j = 0;
	var ct = '';
	for (var y = 0; y < data.length; y++) {
		i = (i + 1) % 256;
		j = (j + s[i]) % 256;
		x = s[i];
		s[i] = s[j];
		s[j] = x;
		ct += String.fromCharCode(data.charCodeAt(y) ^ s[(s[i] + s[j]) % 256])
	}
	return ct
};
function SMImage_BinToHex(data) {
	var b16_digits = '0123456789abcdef';
	var b16_map = new Array();
	for (var i = 0; i < 256; i++) {
		b16_map[i] = b16_digits.charAt(i >> 4) + b16_digits.charAt(i & 15)
	}
	var result = new Array();
	for (var i = 0; i < data.length; i++) {
		result[i] = b16_map[data.charCodeAt(i)]
	}
	return result.join('')
};