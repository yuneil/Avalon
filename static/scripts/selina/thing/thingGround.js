class ThingGround {
    constructor(element) {
        this.type = element[0];
        this.event = element[1];
        this.tStart = element[2];
        this.tEnd = element[3];

        this.y = CONFIG.height * CONFIG.baseline;
        this.height = CONFIG.height - this.y;
    }

    print(context) {
        context.save();
        context.fillRect(this.tStart * CONFIG.pixelSpeed, this.y, (this.tEnd - this.tStart) * CONFIG.pixelSpeed, this.height);
        context.restore();
    }

    test(pitch) {
        return true;
    }
}