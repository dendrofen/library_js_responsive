//scale responsive
const scaleResponsive = {
    init() {
        this.lastVw = null;
        this.lastVh = null;

        this.update(true);
        window.addEventListener('resize', () => { this.update() }, 'passive');
        return this;
    },
    get designWidth() {
        return this.isMobile ? 320 : 1440;
    },
    get designHeight() {
        return this.isMobile ? 820 : 820;
    },
    get isMobile() {
        return this.vw <= 480;
    },
    get vw() {
        return window.innerWidth ? window.innerWidth : window.screen.width;
    },
    get vh() {
        return window.innerHeight ? window.innerHeight : window.screen.height;
    },
    get scale() {
        return this.scaleH;
    },
    get scaleH() {
        return Math.round((this.vh / this.designHeight) * 100) / 100
    },
    get scaleW() {
        return Math.round((this.vw / this.designWidth) * 100) / 100
    },
    get items() {
        return document.querySelectorAll('.scale__responsive');
    },
    isStoped(item){
        return getComputedStyle(item).getPropertyValue('--js-stop-scale') == 1;
    },
    update(updateTransform = false) {
        if (this.vh === this.lastVh) {
            return;
        }

        this.lastVh = this.vh;
        this.items.forEach(item => {
            if (updateTransform || item.dataset.defaultTransform === undefined) {
                item.dataset.defaultTransform = getComputedStyle(item).getPropertyValue('--transform');
            }
            let updatedTransform = item.dataset.defaultTransform;

            if (!this.isStoped(item)) {
                updatedTransform = updatedTransform + ` scale(${this.scale})`;
            }

            item.style.transform = updatedTransform.trim();
        })
    }
}.init();
