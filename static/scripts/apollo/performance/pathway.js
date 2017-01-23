class Pathway {
    constructor(_container, _option) {
        this.container = _container;
        this.canvas = undefined;
        this.ctx = undefined;
        this.canvasCache = undefined;
        this.ctxCache = undefined;

        this.option = {
            lenPath: 6,
        }
        if (_option) {
            for (let item in _option) {
                this.option[item] = _option[item];
            }
        }
    }

    show() { this.init(); }

    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
        this.ctx = this.canvas.getContext("2d");

        this.canvasCache = document.createElement('canvas');
        this.canvasCache.width = this.canvas.width;
        this.canvasCache.height = this.canvas.height;
        this.ctxCache = this.canvasCache.getContext('2d');

        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.container.appendChild(this.canvas);

        this.initPath();
        this.initStriker();
    }

    initPath() {
        let ctx = this.ctx,
            width = this.canvas.width,
            height = this.canvas.height;

        ctx.save();
        ctx.strokeStyle = "#0000ff";
        ctx.lineWidth = 5;
        ctx.beginPath();

        let unitWidth = width / this.option.lenPath;
        for (let index = 0; index < this.option.lenPath; index++) {
            ctx.moveTo(unitWidth * index, 0);
            ctx.lineTo(unitWidth * index, height);
        }
        ctx.moveTo(width, 0);
        ctx.lineTo(width, height);

        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    initStriker() {

    }

    destory() {
        this.canvas = null;
        this.ctx = null;
        this.canvasCache = null;
        this.ctxCache = null;
    }
}