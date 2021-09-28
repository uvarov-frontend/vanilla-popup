/* eslint-disable no-console */
class Popup {
	constructor(option) {
		this.btn = {
			classDefault: option.btn.classDefault,
			classClose: option.btn.classClose,
			el: undefined,
		};
		this.popup = {
			classShow: option.popup.classShow,
			show: false,
			active: undefined,
			el: undefined,
		};
		this.overlay = {
			classDefault: option.overlay.classDefault,
			classActive: option.overlay.classActive,
			enabled: undefined,
			el: undefined,
		};
	}

	hasOverlay() {
		this.overlay.enabled = this.btn.el.dataset.popupOverlay === 'true';
		if (this.overlay.enabled) {
			this.overlay.el = document.querySelector(`.${this.overlay.classDefault}`);
		}
		return this.overlay.enabled && this.overlay.el;
	}

	closePopup(element) {
		const close = element.classList.contains(this.btn.classClose);
		if (!this.popup.active) this.popup.active = document.querySelector('.popup-show');
		const popup = element.closest(`#${this.popup.active.id}`);

		if (close || !popup) {
			this.popup.active.classList.remove('popup-show');
			this.popup.show = false;
			if (this.hasOverlay()) this.overlay.el.classList.remove(this.overlay.classActive);
		}
	}

	openPopup() {
		if (this.hasOverlay()) this.overlay.el.classList.add(this.overlay.classActive);

		this.popup.el.classList.add(this.popup.classShow);
		this.popup.active = this.popup.el;
		this.popup.show = true;
	}

	hasPopup(btn) {
		const hasPopupNext = btn.nextElementSibling?.id === btn.dataset.popupId;
		this.btn.el = btn;
		this.popup.el = hasPopupNext ? btn.nextElementSibling : document.getElementById(btn.dataset.popupId);

		if (!this.popup.el) {
			console.error(`Not found: #${btn.dataset.popupId}`);
			return;
		}
		this.openPopup();
	}

	hasClick() {
		document.addEventListener('click', (e) => {
			const element = e.target;
			const hasBtn = element.classList.contains(this.btn.classDefault);
			const hasAttr = element.dataset.popupId;

			if (this.popup.show && hasBtn && hasAttr !== this.popup.active.id) {
				this.closePopup(element);
				this.hasPopup(element);
			} else if (this.popup.show) {
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
