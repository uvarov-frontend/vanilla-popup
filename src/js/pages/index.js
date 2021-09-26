import Popup from '../modules/popup';

const popup = new Popup({
	btn: {
		classDefault: 'btn',
		classClose: 'popup-close',
	},
	popup: {
		classShow: 'popup-show',
	},
	overlay: {
		classDefault: 'overlay',
		classActive: 'overlay_show',
	},
});

popup.init();
