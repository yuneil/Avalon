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

new Selina();