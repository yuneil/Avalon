class ThingSky {
    constructor(element) {
        this.type = element[0];
        this.event = element[1];
        this.tStart = element[2];
        this.tEnd = element[3];
        this.pitch = element[4];

        this.heightBase = CONFIG.height * CONFIG.baseline;
        this.y = 0;
    }

    print(context) {
        context.save();
        context.fillRect(this.tStart * CONFIG.pixelSpeed, 0, (this.tEnd - this.tStart) * CONFIG.pixelSpeed, this.heightBase - this.pitch / CONFIG.perPitch);
        context.restore();
    }

    // 若碰撞到物体，返回失败
    test(pitch) {
        return pitch < this.pitch;
    }
}