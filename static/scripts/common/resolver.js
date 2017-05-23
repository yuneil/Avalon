class Resolver {
    constructor() {
        this.isRunning = false;
        this.callback;
    }

    init(callback) {
        var _this = this;
        this.callback = callback;
        this.ctxAudio = new window.AudioContext();
        this.analyser = this.ctxAudio.createAnalyser();
        this.buf = new Float32Array(1024);
        this.input;
        this.error;
        this.frequency;
        this.pitch;

        this.analyser.fftSize = 2048;
        this.MIN_SAMPLES = 0; // will be initialized when AudioContext is created.

        navigator.getUserMedia({
            audio: true
        }, eventGetUserMedia, function() {
            console.log('can not get user media.')
        });

        function eventGetUserMedia(stream) {
            _this.input = _this.ctxAudio.createMediaStreamSource(stream);
            var low = _this.ctxAudio.createBiquadFilter();
            low.frequency.value = 1000.0;
            low.type = 'lowpass';

            _this.input.connect(low);
            low.connect(_this.analyser);
        }
        return this;
    }

    start() {
        this.isRunning = true;
        this.updatePitch();
    }

    stop() {
        this.isRunning = false;
    }

    updatePitch() {
        var _this = this;

        var strTone = "";
        if (!this.isRunning) {
            // console.log(strTone);
            console.log('=========');
            strTone = '';
            return;
        }

        this.analyser.getFloatTimeDomainData(this.buf);

        this.frequency = this.pitch = this.autoCorrelate(this.buf, this.ctxAudio.sampleRate);

        this.callback(this.pitch);

        // var lastKey;
        // for (var key in AppConfig.dictTone) {
        //     if (pitch > 0 && key > pitch) {
        //         // strTone += AppConfig.dictTone[key] + " ";
        //         console.log(AppConfig.dictTone[lastKey] + " pitch:" + pitch + ' key:' + lastKey);
        //         break;
        //     }
        //     lastKey = key;
        // }

        // console.log(pitch);
        setTimeout(function() {
            _this.updatePitch();
        }, 100);

    }

    autoCorrelate(buf, sampleRate) {
        var SIZE = buf.length;
        var MAX_SAMPLES = Math.floor(SIZE / 2);
        var best_offset = -1;
        var best_correlation = 0;
        var rms = 0;
        var foundGoodCorrelation = false;
        var correlations = new Array(MAX_SAMPLES);

        for (var i = 0; i < SIZE; i++) {
            var val = buf[i];
            rms += val * val;
        }

        rms = Math.sqrt(rms / SIZE);
        if (rms < 0.01) // not enough signal
            return -1;

        var lastCorrelation = 1;
        for (var offset = this.MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
            var correlation = 0;

            for (var i = 0; i < MAX_SAMPLES; i++) {
                correlation += Math.abs((buf[i]) - (buf[i + offset]));
            }
            correlation = 1 - (correlation / MAX_SAMPLES);
            correlations[offset] = correlation; // store it, for the tweaking we need to do below.
            if ((correlation > 0.9) && (correlation > lastCorrelation)) {
                foundGoodCorrelation = true;
                if (correlation > best_correlation) {
                    best_correlation = correlation;
                    best_offset = offset;
                }
            } else if (foundGoodCorrelation) {
                var shift = (correlations[best_offset + 1] - correlations[best_offset - 1]) / correlations[best_offset];
                return sampleRate / (best_offset + (8 * shift));
            }
            lastCorrelation = correlation;
        }
        if (best_correlation > 0.01) {
            // console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
            return sampleRate / best_offset;
        }
        return -1;
        //	var best_frequency = sampleRate/best_offset;
    }

    destory() {

    }

}