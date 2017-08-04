let photo = document.getElementsByClassName("photo")[0],
    mag = null,
    zoom = null;

let createMagnifier = function() {
    let magEl = document.createElement("div");
    magEl.classList.add("magnifier");
    mag = magEl;
    photo.appendChild(magEl);
};

let removeMagnifier = function() {
    if (mag) {
        photo.removeChild(mag);
        mag = null;
    }
};

let createZoomedPhoto = function() {
    zoom = document.createElement("div");
    zoom.classList.add("zoom");
    document.body.appendChild(zoom);
};

let removeZoomedPhoto = function() {
    if (zoom) {
        document.body.removeChild(zoom);
        zoom = null;
    }
};

let onMouseEnter = function() {
    createMagnifier();
    createZoomedPhoto();
};

let onMouseLeave = function() {
    removeMagnifier();
    removeZoomedPhoto();
};

let onMouseMove = function(e) {
    let photoBounding = photo.getBoundingClientRect(),
        x = e.clientX - photoBounding.left,
        y = e.clientY - photoBounding.top,
        photoSize = parseInt(window.getComputedStyle(photo).height);
        magSize = parseInt(window.getComputedStyle(mag).height),
        MAX_POSITION = photoSize - magSize;

    x -= magSize / 2;
    y -= magSize / 2;

    if (x + magSize > photoSize) {
        x = MAX_POSITION;
    }

    if (y + magSize > photoSize) {
        y = MAX_POSITION;
    }

    if (x < 0) {
        x = 0;
    }

    if (y < 0) {
        y = 0;
    }

    let transformCSSValues = "translate(" + x + "px," + y + "px)";
    mag.style.transform = transformCSSValues;
    zoom.style.backgroundPosition = -x * 2 + "px " + -y * 2 + "px";
};

photo.addEventListener("mouseenter", onMouseEnter, false);
photo.addEventListener("mouseleave", onMouseLeave, false);
photo.addEventListener("mousemove", onMouseMove, false);