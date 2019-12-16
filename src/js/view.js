"use strict"

import {cShowPreviousSlideshowImage} from "./controller.js";
import {cShowNextSlideshowImage} from "./controller.js";
import {cGetSlideshowShownImage} from "./controller.js";

let vCurrentShownImageNumber;
let vSlideshowLength;
let slideshowImg;
let slideshowButtonRight;
let slideshowButtonLeft;

const vMakeButtonActive = (button) => {
    button.style.opacity = "1";
};

const vMakeButtonInactive = (button) => {
    button.style.opacity = "0.7";
};

export const vCreateSlideshow = (arrayOfImages, shownImageNumber) => {
    vCurrentShownImageNumber = shownImageNumber;
    vSlideshowLength = arrayOfImages.length;

    let mainContent = document.querySelector(".main-content");

    let slideshow = document.createElement("section");
    slideshow.className = "slideshow slideshow_theme_original";
    mainContent.append(slideshow);

    let slideshowContainer = document.createElement("div");
    slideshowContainer.className = "slideshow__container slideshow__container_theme_original";
    slideshow.append(slideshowContainer);

    slideshowButtonLeft = document.createElement("button");
    slideshowButtonLeft.className = "slideshow__button slideshow__button_theme_original slideshow__button_left";
    slideshowContainer.append(slideshowButtonLeft);
    
    let leftButtonImg = document.createElement("img");
    leftButtonImg.className = "slideshow__arrow-img slideshow__arrow-img_theme_original";
    leftButtonImg.setAttribute("src", "./img/arrow-left.png");
    leftButtonImg.setAttribute("alt", "arrow-left");
    slideshowButtonLeft.append(leftButtonImg);

    slideshowButtonRight = document.createElement("button");
    slideshowButtonRight.className = "slideshow__button slideshow__button_theme_original slideshow__button_right";
    slideshowContainer.append(slideshowButtonRight);

    let rightButtonImg = document.createElement("img");
    rightButtonImg.className = "slideshow__arrow-img slideshow__arrow-img_theme_original";
    rightButtonImg.setAttribute("src", "./img/arrow-left.png");
    rightButtonImg.setAttribute("alt", "arrow-right");
    slideshowButtonRight.append(rightButtonImg);

    if (shownImageNumber == 0) {
        vMakeButtonInactive(slideshowButtonLeft);
    }

    let slideshowImgContainer = document.createElement("div");
    slideshowImgContainer.className = "slideshow__img-container_theme_original slideshow__img_show";

    slideshowContainer.append(slideshowImgContainer);

    slideshowImg = document.createElement("img");
    slideshowImg.className = "slideshow__img slideshow__img_theme_original slideshow__img_show";

    if ( !("src" in arrayOfImages[shownImageNumber] && "alt" in arrayOfImages[shownImageNumber]) )  {
        throw new Error("Objects of arrayOfImages must have src and alt properties.");
    }

    for (let attributeName in arrayOfImages[shownImageNumber]) {  
        if (attributeName == "src") {
            slideshowImg.setAttribute(attributeName, arrayOfImages[shownImageNumber][attributeName]);
        } else if (attributeName == "alt") {
            slideshowImg.setAttribute(attributeName, arrayOfImages[shownImageNumber][attributeName]);
        } else {
            throw new Error("Invalid attribute name.");
        }
    }
    
    slideshowImgContainer.append(slideshowImg); 
};

const vChangeImgSrcAndAlt = (imageToShow) => {
    slideshowImg.classList.remove("slideshow__img_show");
    setTimeout( () => {
        slideshowImg.setAttribute("src", imageToShow["src"]);
        slideshowImg.setAttribute("alt", imageToShow["alt"]);
        slideshowImg.classList.add("slideshow__img_show");
    }, 300);
};

export const vShowSlideshowImage = (imageToShowNumber) => {
    let imageToShow = cGetSlideshowShownImage();
    vChangeImgSrcAndAlt(imageToShow);

    vCurrentShownImageNumber = imageToShowNumber;

    if (imageToShowNumber == 0) {
        vMakeButtonInactive(slideshowButtonLeft);
    } else {
        vMakeButtonActive(slideshowButtonLeft);
    }

    if (imageToShowNumber == vSlideshowLength - 1) {
        vMakeButtonInactive(slideshowButtonRight);
    } else {
        vMakeButtonActive(slideshowButtonRight);
    }
};

const vHangClicksOnSlideshowButtons = () => {
    let slideshowLeftButton = document.querySelector(".slideshow__button_left");
    slideshowLeftButton.addEventListener("click", () => {
        if (vCurrentShownImageNumber == 0) {
            vMakeButtonInactive(slideshowLeftButton);
            return;
        }

        vMakeButtonActive(slideshowLeftButton);
        cShowPreviousSlideshowImage();
    });

    let slideshowRightButton = document.querySelector(".slideshow__button_right"); 
    slideshowRightButton.addEventListener("click", () => {
        if (vCurrentShownImageNumber == vSlideshowLength - 1) {
            vMakeButtonInactive(slideshowRightButton);
            return;
        }

        vMakeButtonActive(slideshowRightButton);
        cShowNextSlideshowImage();
    });
};

setTimeout( () => vHangClicksOnSlideshowButtons());