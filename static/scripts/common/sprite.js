var ImagePainter = function(imageUrl) {
    this.image = new Image;
    this.image.src = imageUrl;
};

ImagePainter.prototype = {
    image: undefined,

    paint: function(sprite, context) {
        if (this.image !== undefined) {
            if (!this.image.complete) {
                this.image.onload = function(e) {
                    sprite.width = this.width;
                    sprite.height = this.height;

                    context.drawImage(this, // this is image
                        sprite.x, sprite.y,
                        sprite.width, sprite.height);
                };
            } else {
                context.drawImage(this.image, sprite.x, sprite.y,
                    sprite.width, sprite.height);
            }
        }
    }
};


var SpriteAnimator = function(painters, elapsedCallback) {
    this.painters = painters;
    if (elapsedCallback) {
        this.elapsedCallback = elapsedCallback;
    }
};

SpriteAnimator.prototype = {
    painters: [],
    duration: 1000,
    startTime: 0,
    index: 0,
    elapsedCallback: undefined,

    end: function(sprite, originalPainter) {
        sprite.animating = false;

        if (this.elapsedCallback) {
            this.elapsedCallback(sprite);
        } else {
            sprite.painter = originalPainter;
        }
    },

    start: function(sprite, duration) {
        var endTime = +new Date() + duration,
            period = duration / (this.painters.length),
            interval = undefined,
            animator = this, // for setInterval() function
            originalPainter = sprite.painter;

        this.index = 0;
        sprite.animating = true;
        sprite.painter = this.painters[this.index];

        interval = setInterval(function() {
            if (+new Date() < endTime) {
                sprite.painter = animator.painters[++animator.index];
            } else {
                animator.end(sprite, originalPainter);
                clearInterval(interval);
            }
        }, period);
    },
};




var Sprite = function(id, painter, behaviors) {
    if (id !== undefined) this.id = id;
    if (painter !== undefined) this.painter = painter;
    if (behaviors !== undefined) this.behaviors = behaviors;

    return this;
};

Sprite.prototype = {
    x: 0,
    y: 0,
    width: 10,
    height: 10,
    velocityX: 0,
    velocityY: 0,
    visible: true,
    animating: false,
    // object with paint(sprite, context)
    painter: undefined,
    // objects with execute(sprite, context, time)
    behaviors: [],

    paint: function(context) {
        if (this.painter !== undefined && this.visible) {
            this.painter.paint(this, context);
        }
    },

    update: function(context, time) {
        for (var i = this.behaviors.length; i > 0; --i) {
            this.behaviors[i - 1].execute(this, context, time);
        }
    }
};