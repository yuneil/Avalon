class InstrumentPiano extends InstrumentBase {
    constructor() {
        super();
        this.init();
    }

    init() {
        var isSP, ctx, xml, data, frequencyRatioTempered, keyboards;

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        ctx = new AudioContext();

        xml = new XMLHttpRequest();
        xml.responseType = 'arraybuffer';
        xml.open('GET', '/sound/referenceNote/pianoBase.wav', true);
        xml.onload = function() {
            ctx.decodeAudioData(
                xml.response,
                function(_data) {
                    data = _data;
                },
                function(e) {
                    alert(e.err);
                }
            );
        };
        xml.send();

        isSP = typeof window.ontouchstart !== 'undefined';

        frequencyRatioTempered = 1.059463;

        keyboards = Array.prototype.slice.call(
            document.getElementsByClassName('keyboard')
        );
        keyboards.reverse().map(function(keyboard, index) {
            var i, frequencyRatio;
            frequencyRatio = 1;
            for (i = 0; i < index; i++) {
                frequencyRatio /= frequencyRatioTempered;
            }
            keyboard.addEventListener(isSP ? 'touchstart' : 'click', function() {
                var bufferSource;
                bufferSource = ctx.createBufferSource();
                bufferSource.buffer = data;
                bufferSource.playbackRate.value = frequencyRatio;
                bufferSource.connect(ctx.destination);
                bufferSource.start(0);
            });
        });
    }
    destory() {}
}