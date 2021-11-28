/* eslint-disable no-console */
class Popup {
	constructor(option) {
		this.element = {
			btn: undefined,
			popup: undefined,
			overlay: undefined,
		};

		this.status = {
			popup: {
				show: false,
				active: undefined,
			},
			overlay: {
				enabled: undefined,
			},
		};

		this.class = {
			btn: {
				default: option?.class?.btn?.default || 'btn',
				close: option?.class?.btn?.close || 'popup-close',
			},
			popup: {
				show: option?.class?.popup?.show || 'popup-show',
			},
			overlay: {
				default: option?.class?.overlay?.default || 'overlay',
				active: option?.class?.overlay?.active || 'overlay_show',
			},
		};
	}

	hasOverlay() {
		this.status.overlay.enabled = this.element.btn.dataset.popupOverlay === 'true';
		if (this.status.overlay.enabled) {
			this.element.overlay = document.querySelector(`.${this.class.overlay.default}`);
		}
		return this.status.overlay.enabled && this.element.overlay;
	}

	closePopup(element) {
		const close = element.classList.contains(this.class.btn.close);
		if (!this.status.popup.active) this.status.popup.active = document.querySelector(`.${this.class.popup.show}`);
		const popup = element.closest(`#${this.status.popup.active.id}`);

		if (close || !popup) {
			this.status.popup.active.classList.remove(this.class.popup.show);
			this.status.popup.show = false;
			if (this.hasOverlay()) this.element.overlay.classList.remove(this.class.overlay.active);
		}
	}

	openPopup() {
		if (this.hasOverlay()) this.element.overlay.classList.add(this.class.overlay.active);

		this.element.popup.classList.add(this.class.popup.show);
		this.status.popup.active = this.element.popup;
		this.status.popup.show = true;
	}

	hasPopup(btn) {
		const hasPopupNext = btn.nextElementSibling?.id === btn.dataset.popupId;
		this.element.btn = btn;
		this.element.popup = hasPopupNext ? btn.nextElementSibling : document.getElementById(btn.dataset.popupId);

		if (!this.element.popup) {
			console.error(`Not found: #${btn.dataset.popupId}`);
			return;
		}
		this.openPopup();
	}

	hasClick() {
		document.addEventListener('click', (e) => {
			const element = e.target;
			const hasBtn = element.classList.contains(this.class.btn.default);
			const hasAttr = element.dataset.popupId;

			if (this.status.popup.show && hasBtn && hasAttr !== this.status.popup.active.id) {
				this.closePopup(element);
				this.hasPopup(element);
			} else if (this.status.popup.show) {
				this.closePopup(element);
			} else if (hasBtn && hasAttr) {
				this.hasPopup(element);
			}
		});
	}

	init() {
		document.addEventListener('DOMContentLoaded', () => {
			this.hasClick();
		});
	}
}

export default Popup;
