class ThingSky {
    constructor(element) {
        this.type = element[0];
        this.event = element[1];
        this.tStart = element[2];
        this.tEnd = element[3];
        this.pitch = element[4];
    }

    print(context) {
        context.save();
        context.fillRect(this.tStart * CONFIG.pixelSpeed, 100, (this.tEnd - this.tStart) * CONFIG.pixelSpeed, 200 - this.pitch / CONFIG.perPitch);
        context.restore();
    }

    // 若碰撞到物体，返回失败
    test(pitch) {
        return pitch < this.pitch;
    }
}