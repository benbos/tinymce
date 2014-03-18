function SMPlugins(field_name, url, type, win) {
	switch (type) {
	case 'image':
		if (tinyMCE.activeEditor.plugins.smimage.Ini) {
			tinyMCE.activeEditor.plugins.smimage.Ini(field_name, url, type, win);
			tinyMCE.activeEditor.execCommand('SMImageShow', true)
		}
		break;
	default:
		if (tinyMCE.activeEditor.plugins.smexplorer.Ini) {
			tinyMCE.activeEditor.plugins.smexplorer.Ini(field_name, url, type, win);
			tinyMCE.activeEditor.execCommand('SMExplorerShow', true)
		}
		break
	}
	return false
};