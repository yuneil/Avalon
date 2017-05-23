class Stage {
    constructor(_container, _option) {
        this.container = _container;
        this.divPitch = undefined;
        this.canvas = undefined;
        this.ctx = undefined;
        this.canvasMap = undefined;
        this.ctxMap = undefined;
        this.map = undefined;
        this.factory = new FactoryThing();
        this.arrThing = [];

        this.initTime = undefined;
        this.isRunning = false;
        this.monstor = undefined;

        this.sprite = undefined;
        this.imgSprite = undefined;

        this.resolver = new Resolver();
        this.elapseTime = 0;

        this.option = {
            mapId: "Careless_Whisper",
            // mapId: "1",
        }

        this.init();
    }

    init() {
        this.container = document.getElementById('divStage');
        this.canvas = document.createElement('canvas');
        this.canvas.width = CONFIG.width;
        this.canvas.height = CONFIG.height;
        this.ctx = this.canvas.getContext('2d');

        this.divPitch = $('#divPitch');

        var _this = this;
        $.getJSON('/scripts/selina/map/' + this.option.mapId + '.json', function(res) {
            _this.map = res;
            _this.initMap();
            _this.initSpriteImage();
        });
    }

    show() { this.init(); }

    initMap() {
        this.canvasMap = document.createElement('canvas'); // 离线缓存，整张地图
        this.canvasMap.width = this.map.totalTime * CONFIG.pixelSpeed; //最大速度下，每秒50像素
        this.canvasMap.height = CONFIG.height;
        this.ctxMap = this.canvasMap.getContext('2d');

        for (var i = 0; i < this.map.data.length; i++) {
            var thing = this.factory.getEntity(this.map.data[i]);
            this.arrThing.push(thing);
            thing.print(this.ctxMap);
        }
        this.container.appendChild(this.canvas);

        this.initSprite();
        this.start();
    }

    start() {
        this.initTime = new Date();
        this.isRunning = true;
        this.resolver.start();
        this.render();
    }

    initSpriteImage() {
        this.imgSprite = document.getElementById('imgSprite');
    }

    render() {
        var _this = this;

        function play() {
            if (!_this.isRunning) return;
            _this.elapseTime = (new Date() - _this.initTime) / 1000;
            _this.ctx.clearRect(0, 0, CONFIG.width, CONFIG.height);

            // 移动到地图对应位置
            _this.ctx.drawImage(_this.canvasMap, _this.elapseTime * 50, 0, CONFIG.width, CONFIG.height, 0, 0, CONFIG.width, CONFIG.height);

            // 屎球震动
            _this.monstor.paint(_this.ctx);
            requestAnimationFrame(play);
        }
        play();
    }

    initSprite() {
        this.sprite = {
            x: 20,
            y: CONFIG.height * (1 - CONFIG.baseline),
            size: 50,
            elapseLast: undefined,
        };
        var _this = this;

        this.sprite.paint = function(context) {
            if (!_this.imgSprite) return;
            context.save();
            _this.ctx.drawImage(_this.imgSprite, 0, 0, 50, 50, this.x, this.y, _this.sprite.size, _this.sprite.size);
            context.restore();
        };

        this.sprite.over = function() {
            console.log('game over~');
        };

        // 命中测试，确认小屎球是否碰到墙壁边缘
        this.sprite.test = function(pitch) {
            for (var i = 0, item; i < _this.arrThing.length; i++) {
                item = _this.arrThing[i];
                // 如果当前时间在物体出现时间内
                if (_this.elapseTime >= item.tStart && _this.elapseTime <= item.tEnd) {
                    // 如果物体没有碰到边界
                    if (!item.test()) {
                        return false;
                    }
                }
            }
            return true;
        };

        this.monstor = this.sprite;

        this.resolver.init(function(pitch) {
            //显示当前音调 其实是频率~
            _this.divPitch.html(pitch);

            //屏幕中心
            var y = CONFIG.height * CONFIG.baseline - (pitch / CONFIG.perPitch);


            _this.ctxMap.save();
            _this.ctxMap.fillStyle = '#e11';
            _this.ctxMap.moveTo(_this.sprite.x + CONFIG.width - 300 + _this.elapseLast * 50, _this.sprite.y);
            _this.ctxMap.lineTo(_this.sprite.x + CONFIG.width - 300 + _this.elapseTime * 50, y);
            _this.ctxMap.lineWidth = 1;
            _this.ctxMap.strokeStyle = "#ff0000";
            _this.ctxMap.stroke();
            // _this.ctxMap.fillRect(_this.sprite.x + CONFIG.width - 300 + elapse / 1000 * 50, y, 5, 5);
            _this.ctxMap.restore();


            // temp 记录音符
            content.arr.push(pitch);
            if (_this.elapseLast - content.lastTime > 2) {;
                temp.push([1, 0, content.lastTime, _this.elapseLast, parseFloat(Math.max.apply(null, content.arr)).toFixed(2)]);
                content.arr = [];
                content.lastTime = _this.elapseTime;
            }

            _this.sprite.y = y;
            _this.elapseLast = _this.elapseTime;

            // 如果碰到屏幕边缘，则game over
            // if (!_this.sprite.test(pitch)) {
            //     console.log("upper: " + (CONFIG.height / 2 + 200) + "; lowwer: " + (_this.sprite.y < CONFIG.height / 2 - 200) + "; now:" + (pitch / 10 + CONFIG.height / 2 - 100));
            //     _this.sprite.over();
            // }
        });
    }

    initWidget() {

    }
}