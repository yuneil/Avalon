class Pathway {
    constructor(_container, _option) {
        this.container = _container;
        this.canvas = undefined;
        this.ctx = undefined;
        this.canvasCache = undefined;
        this.ctxCache = undefined;

        this.option = {
            lenPath: 8,
            widthCanvas: this.container.clientWidth,
            heightCanvas: this.container.clientHeight,
            widthUnit: undefined
        }
        this.option.widthUnit = this.container.clientWidth / this.option.lenPath;

        if (_option) {
            for (let item in _option) {
                this.option[item] = _option[item];
            }
        }
    }

    show() { this.init(); }

    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.option.widthCanvas;
        this.canvas.height = this.option.heightCanvas;
        this.ctx = this.canvas.getContext("2d");

        this.canvasCache = document.createElement('canvas');
        this.canvasCache.width = this.option.widthCanvas;
        this.canvasCache.height = this.option.heightCanvas;
        this.ctxCache = this.canvasCache.getContext('2d');

        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.container.appendChild(this.canvas);

        this.initStriker();
        this.initPath();
    }

    initPath() {
        let ctx = this.ctx, //todo: offline
            width = this.option.widthCanvas,
            height = this.option.heightCanvas;

        ctx.save();
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 3;
        ctx.beginPath();

        for (let index = 0; index < this.option.lenPath; index++) {
            ctx.moveTo(this.option.widthUnit * index, 0);
            ctx.lineTo(this.option.widthUnit * index, height);
        }
        ctx.moveTo(width, 0);
        ctx.lineTo(width, height);

        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    initStriker() {
        let ctx = this.ctx;

        ctx.save();
        ctx.fillStyle = "#502";
        for (let index = 0; index < this.option.lenPath; index++) {
            ctx.fillRect(this.option.widthUnit * index, this.option.heightCanvas - 70, this.option.widthUnit, 70);
        }
        ctx.restore();
    }

    highlightPath(arrIndex) {
        let ctx = this.ctx;

        ctx.save();
        ctx.fillStyle = "#303";
        for (let index = 0; index < this.option.lenPath; index++) {
            if (arrIndex.indexOf(index) < 0) continue;
            ctx.fillRect(this.option.widthUnit * index, 0, this.option.widthUnit, this.option.heightCanvas);
        }
        ctx.restore();
    }

    destory() {
        this.canvas = null;
        this.ctx = null;
        this.canvasCache = null;
        this.ctxCache = null;
    }
}