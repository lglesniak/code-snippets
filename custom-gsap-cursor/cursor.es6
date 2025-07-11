import {gsap} from "gsap";

let isVisible = false;

const cursorDefault = document.querySelector(".custom-cursor-ball");
const cursorSlider = document.querySelector(".custom-cursor-slider");

let xBTo = gsap.quickTo(".custom-cursor-ball", "left", {duration: 0.16, ease: "slow(0.2,0.1,false)"});
let yBTo = gsap.quickTo(".custom-cursor-ball", "top", {duration: 0.16, ease: "slow(0.2,0.1,false)"});

let xSTo = gsap.quickTo(".custom-cursor-slider", "left", {duration: 0.08, ease: "slow(0.2,0.1,false)"});
let ySTo = gsap.quickTo(".custom-cursor-slider", "top", {duration: 0.08, ease: "slow(0.2,0.1,false)"});


document.addEventListener("mousemove", mouseMove);


document.body.addEventListener("mouseenter", function (e) {
    const target = e.target;

    if (isTargetBlack(target)) {
        makeCursorWhite();
    }

    if(isNoTarget(target)) {
        gsap.to(cursorDefault, { scale: 0 });
    } else {
        gsap.to(cursorDefault, { scale: 1 });

        if (isTargetValid(target)) {
            if(!cursorDefault.classList.contains("-target")) {
                cursorDefault.classList.add("-target");
            }
            cursorDefault.classList.remove("-slider");
            cursorSlider.classList.remove("-active");

        } else {
            cursorDefault.classList.remove("-slider");
            cursorSlider.classList.remove("-active");
        }

        //Remove the navigation cursor - hero section
        // else if(isSliderTarget(target)) {
        //     if(target.classList.contains("swiper-button-prev")) {
        //         cursorSlider.classList.add("-left-arrow");
        //         cursorSlider.classList.remove("-right-arrow");
        //     } else {
        //         cursorSlider.classList.add("-right-arrow");
        //         cursorSlider.classList.remove("-left-arrow");
        //     }
        //
        //     cursorDefault.classList.remove("-target");
        //     cursorSlider.classList.add("-active");
        //
        //
        //     if(!cursorDefault.classList.contains("-slider")) {
        //         cursorDefault.classList.add("-slider");
        //     }
        // }

    }
}, true);

document.body.addEventListener("mouseleave", function (e) {
    const target = e.target;

    if (isTargetBlack(target)) {
        makeCursorDefault();
    }

    if(isNoTarget(e.relatedTarget)) {
        gsap.to(cursorDefault, { scale: 0 });
    } else {
        gsap.to(cursorDefault, {scale: 1});

        if (isTargetValid(target) && !isTargetValid(e.relatedTarget)) {
            cursorDefault.classList.remove("-target");
        } else if (isSliderTarget(target)) {
            cursorDefault.classList.remove("-slider");
            cursorSlider.classList.remove("-active");
        }

        if ((target.classList.contains('swiper-button-prev') || target.classList.contains('swiper-button-next')) && target.classList.contains('swiper-button-disabled')) {
            cursorDefault.classList.remove("-target");
        }
    }

}, true);

document.addEventListener('mouseout', (e) => {
    if (e.relatedTarget === null || e.relatedTarget === document.querySelector('html') || !isTargetValid(e.relatedTarget) || isNoTarget(e.relatedTarget)) {
        // cursor outside window
        gsap.to(cursorDefault, { scale: 0 });
    }
});

document.addEventListener('mouseover', (e) => {
    if ((e.target !== cursorDefault || !isTargetValid(e.relatedTarget)) && !isNoTarget(e.relatedTarget)) {
        // cursor inside window
        gsap.to(cursorDefault, { scale: 1 });
    }
});

function mouseMove(e) {

    const cursorPosition = {
        left: e.clientX,
        top: e.clientY
    };

    xBTo(cursorPosition.left);
    yBTo(cursorPosition.top);
    xSTo(cursorPosition.left);
    ySTo(cursorPosition.top);

    if (!isVisible) {
        cursorDefault.classList.add("-active");
        isVisible = true;
    }
}

function isTargetValid(target) {
    if (target == null) return false;
    //this triggers make cursor bigger & transparent (only with borders)
    const validSelectors = [
        "a",
        ".btn",
        ".open-more",
        ".scroll-up",
        "section:not(.hero) .swiper-button-next:not(.swiper-button-disabled)",
        "section:not(.hero) .swiper-button-prev:not(.swiper-button-disabled)",
        ".thumbs-slider .slide",
        ".menu-opener",
        ".collapse-section .item-head",
        ".video-open-trigger",
        ".youtube-open-trigger",
        ".close-button",
        ".select",
        ".section-accordion-01 .panel-accordion",
        ".section-accordion-02 .panel-title",
        "input",
        "label",
        ".video-js:not(.vjs-youtube)",
        ".video-js:not(.vjs-youtube) *",
        ".video-js:not(.vjs-youtube) .vjs-big-play-button",
        ".video-js:not(.vjs-youtube) .vjs-poster",
        ".video-js:not(.vjs-youtube) .vjs-play-control",
        ".video-js:not(.vjs-youtube) .vjs-fullscreen-control",
        ".video-js:not(.vjs-youtube) .vjs-volume-control",
        ".video-js:not(.vjs-youtube) .vjs-mute-control",
        ".video-js:not(.vjs-youtube) .vjs-icon-placeholder",
        ".video-js:not(.vjs-youtube) .vjs-slider-bar",
        ".video-js:not(.vjs-youtube) .vjs-play-progress",
        ".video-js:not(.vjs-youtube) .vjs-volume-level",
        ".video-js:not(.vjs-youtube) .vjs-progress-control",
        ".video-js:not(.vjs-youtube) .vjs-mouse-display",
        ".video-js:not(.vjs-youtube) .vjs-progress-holder",
        ".video-js:not(.vjs-youtube) .vjs-slider",
        ".video-js:not(.vjs-youtube) .vjs-time-tooltip",
        ".video-js:not(.vjs-youtube) .vjs-slider-bar",
        ".video-js:not(.vjs-youtube) .vjs-time-tooltip",
        ".video-modal",
        ".video-modal .close-button",
        ".video-modal .modal-overlay",
        ".video-modal .modal-box",
    ];
    //check if the trigger is in the validSelectors array
    return validSelectors.some((selector) => target.matches(selector));
}

function isTargetBlack(target) {
    if (target == null) return false;
    //this triggers make cursor white
    const blackSelectors = [
        ".-black",
        ".-mode-dark",
        ".dark-surface-secondary",
        ".dark-surface-primary",
        ".dark-surface-tertiary",
        ".site-header.open-menu .fixed-header",
        ".site-header.open-menu .main-header",
        ".site-header:not(.-main-positive) .main-header",
        "section:not(.-black) .video-box"
    ];
    //check if the trigger is in the blackSelectors array
    return blackSelectors.some((selector) => target.matches(selector));
}

function isNoTarget(target) {
    if (target == null) return true;
    //this triggers disabled custom cursor
    const defaultSelectors = [
        ".vjs-youtube",
        ".vjs-youtube .vjs-poster",
        ".vjs-youtube *",
        ".vjs-youtube .vjs-control-bar",
        ".contact-form-section",
        ".contact-form-section *",
    ];
    //check if the trigger is in the blackSelectors array
    return defaultSelectors.some((selector) => target.matches(selector));
}
function isSliderTarget(target) {
    if (target == null) return false;
    //this triggers make the cursor bigger & contain arrows
    const arrowsSelectors = [
        ".swiper-navigation.tablet-hide .swiper-button-prev",
        ".swiper-navigation.tablet-hide .swiper-button-next"
    ];
    //check if the trigger is in the arrowsSelectors array
    return arrowsSelectors.some((selector) => target.matches(selector));
}

export function makeCursorWhite() {
    document.querySelector(".custom-cursor-ball").classList.add("-white");
}

export function makeCursorDefault() {
    document.querySelector(".custom-cursor-ball").classList.remove("-white");
}