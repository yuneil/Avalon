class Stage {
    constructor(_container, _option) {
        this.container = _container;
        this.canvas = undefined;
        this.ctx = undefined;
        this.canvasMap = undefined;
        this.map = undefined;
        this.factory = new FactoryThing();

        this.initTime = undefined;
        this.isRunning = false;
        this.monstor = undefined;

        this.option = {
            mapId: "1",
        }

        this.init();
    }

    init() {
        this.container = document.getElementById('divStage');
        this.canvas = document.createElement('canvas');
        this.canvas.width = CONFIG.width;
        this.canvas.height = CONFIG.height;
        this.ctx = this.canvas.getContext('2d');

        var _this = this;
        $.getJSON('/scripts/selina/map/' + this.option.mapId + '.json', function(res) {
            _this.map = res;
            _this.initMap();
        });
    }

    show() { this.init(); }

    initMap() {
        this.canvasMap = document.createElement('canvas'); // 离线缓存，整张地图
        this.canvasMap.width = this.map.totalTime * CONFIG.pixelSpeed; //最大速度下，每秒50像素
        this.canvasMap.height = CONFIG.height;
        var ctx = this.canvasMap.getContext('2d');

        for (var i = 0; i < this.map.data.length; i++) {
            var thing = this.factory.getEntity(this.map.data[i]);
            thing.print(ctx);
        }
        this.container.appendChild(this.canvas);

        this.initSprite();
        this.start();
    }

    start() {
        this.initTime = new Date();
        this.isRunning = true;
        this.render();
    }

    render() {
        var _this = this;

        function play() {
            if (!_this.isRunning) return;
            var now = new Date();
            var elapse = now - _this.initTime;
            _this.ctx.clearRect(0, 0, CONFIG.width, CONFIG.height);
            _this.ctx.drawImage(_this.canvasMap, elapse / 1000 * 50, 0, CONFIG.width, CONFIG.height, 0, 0, CONFIG.width, CONFIG.height);

            _this.monstor.y -= 1;
            _this.monstor.paint(_this.ctx);
            requestAnimationFrame(play);
        }
        play();
    }

    initSprite() {
        var sprite = {}
        sprite.x = 20;
        sprite.y = 300;
        sprite.size = 10;
        sprite.paint = function run(context) {
            context.save();
            context.fillStyle = '#e11';
            context.fillRect(this.x, this.y, sprite.size, sprite.size);
            context.restore();
        }

        this.monstor = sprite;
    }

    initWidget() {

    }
}