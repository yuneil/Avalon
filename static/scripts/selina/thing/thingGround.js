class ThingGround {
    constructor(element) {
        this.type = element[0];
        this.event = element[1];
        this.tStart = element[2];
        this.tEnd = element[3];
    }

    print(context) {
        context.save();
        context.fillRect(this.tStart * CONFIG.pixelSpeed, 500, (this.tEnd - this.tStart) * CONFIG.pixelSpeed, CONFIG.height - 500);
        context.restore();
    }

    test(pitch) {
        return true;
    }
}