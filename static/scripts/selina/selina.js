class Selina {
    constructor() {
        this.init();
    }

    init() {
        var container = document.getElementById("divStage");
        CONFIG.width = container.clientWidth;
        CONFIG.height = container.clientHeight;
        new Stage(container);
    }
}

// temp 记录音符
var temp = []
var content = {
    lastTime: 0,
    arr: []
}

new Selina();