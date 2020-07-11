$('#sw-go').click(function() {
    $(this).find('i').toggleClass('fa-play fa-pause')
});
$('#sw-rst').click(function() {
    $('#sw-go').find('i').removeClass('fa-pause').addClass('fa-play')
});


var sw = {
    /* [INIT] */
    etime: null, // holds HTML time display
    erst: null, // holds HTML reset button
    ego: null, // holds HTML start/stop button
    timer: null, // timer object
    now: 0, // current timer
    init: function() {
        // Get HTML elements
        sw.etime = document.getElementById("sw-time");
        sw.erst = document.getElementById("sw-rst");
        sw.ego = document.getElementById("sw-go");

        // Attach listeners
        sw.erst.addEventListener("click", sw.reset);
        sw.erst.disabled = false;
        sw.ego.addEventListener("click", sw.start);
        sw.ego.disabled = false;
    },

    /* [ACTIONS] */
    tick: function() {
        // tick() : update display if stopwatch running

        // Calculate mins, secs, msecs
        sw.now++;
        var remain = sw.now;
        var mins = Math.floor(remain / 6000);
        remain -= mins * 6000;
        var secs = Math.floor(remain / 100);
        remain -= secs * 100;
        var msecs = remain;

        // Update the display timer
        if (mins < 10) {
            mins = "0" + mins;
        }
        if (secs < 10) {
            secs = "0" + secs;
        }
        if (msecs < 10) {
            msecs = "0" + msecs;
        }
        sw.etime.innerHTML = mins + ":" + secs + ":" + msecs;
    },

    start: function() {
        // start() : start the stopwatch

        sw.timer = setInterval(sw.tick, 10);
        sw.ego.removeEventListener("click", sw.start);
        sw.ego.addEventListener("click", sw.stop);
    },

    stop: function() {
        // stop() : stop the stopwatch

        clearInterval(sw.timer);
        sw.timer = null;
        sw.ego.removeEventListener("click", sw.stop);
        sw.ego.addEventListener("click", sw.start);
    },

    reset: function() {
        // reset() : reset the stopwatch

        // Stop if running
        if (sw.timer != null) {
            sw.stop();
        }

        // Reset time
        sw.now = -1;
        sw.tick();
    }
};

window.addEventListener("load", sw.init);