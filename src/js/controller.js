"use strict"

// обработать ошибки при вызове функции контроллера, к. создает слайдшоу

// view => slideshow.js
let vCurrentShownImageNumber;
let vSlideshowLength;
let slideshowImg;
let slideshowButtonRight;
let slideshowButtonLeft;

const makeButtonActive = (button) => {
    button.style.opacity = "1";
};

const makeButtonInactive = (button) => {
    button.style.opacity = "0.7";
};

const vCreateSlideshow = (arrayOfImages, shownImageNumber) => {
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
        makeButtonInactive(slideshowButtonLeft);
    }

    let slideshowImgContainer = document.createElement("div");
    slideshowImgContainer.className = "slideshow__img-container_theme_original slideshow__img_show";

    slideshowContainer.append(slideshowImgContainer);

    slideshowImg = document.createElement("img");
    slideshowImg.className = "slideshow__img slideshow__img_theme_original slideshow__img_show";

    for (let attributeName in arrayOfImages[shownImageNumber]) {
        slideshowImg.setAttribute(attributeName, arrayOfImages[shownImageNumber][attributeName]);
    }
    
    slideshowImgContainer.append(slideshowImg); 
};

const vChangeImgSrcAndAlt = (imageToShow) => {
    slideshowImg.classList.remove("slideshow__img_show");
    setTimeout( () => {
        slideshowImg.setAttribute("src", imageToShow["src"]);
        slideshowImg.setAttribute("alt", imageToShow["alt"]);
        slideshowImg.classList.add("slideshow__img_show");
    }, 500);

};

const vShowSlideshowImage = (imageToShowNumber) => {
    let imageToShow = cGetSlideshowShownImage();
    vChangeImgSrcAndAlt(imageToShow);

    vCurrentShownImageNumber = imageToShowNumber;

    if (imageToShowNumber == 0) {
        makeButtonInactive(slideshowButtonLeft);
    } else {
        makeButtonActive(slideshowButtonLeft);
    }

    if (imageToShowNumber == vSlideshowLength - 1) {
        makeButtonInactive(slideshowButtonRight);
    } else {
        makeButtonActive(slideshowButtonRight);
    }
};

const vHangClicksOnSlideshowButtons = () => {
    let slideshowLeftButton = document.querySelector(".slideshow__button_left");
    slideshowLeftButton.addEventListener("click", () => {
        if (vCurrentShownImageNumber == 0) {
            makeButtonInactive(slideshowLeftButton);
            return;
        }

        makeButtonActive(slideshowLeftButton);
        cShowPreviousSlideshowImage();
    });

    let slideshowRightButton = document.querySelector(".slideshow__button_right"); 
    slideshowRightButton.addEventListener("click", () => {
        if (vCurrentShownImageNumber == vSlideshowLength - 1) {
            makeButtonInactive(slideshowRightButton);
            return;
        }

        makeButtonActive(slideshowRightButton);
        cShowNextSlideshowImage();
    });
};

setTimeout( () => vHangClicksOnSlideshowButtons());

// controller => slideshow.js
const cCreateSlideshow = (arrayOfImages, shownImage) => {
    mCreateSlideshow(arrayOfImages, shownImage);
    vCreateSlideshow(
        mGetSlideshow(), mGetSlideshowShownImageNumber()
    );
};

const cGetSlideshowLength = () => {
    return mGetSlideshowLength();
};

const cGetSlideshowShownImage = () => {
    return mGetSlideshowShownImage();
};

const cShowPreviousSlideshowImage = () => {
    mShowPreviousSlideshowImage();
    let newShownImage = mSlideshow.getShownImageNumber();
    vShowSlideshowImage(newShownImage);                                     
};

const cShowNextSlideshowImage = () => {
    mShowNextSlideshowImage();
    let newShownImage = mSlideshow.getShownImageNumber();
    vShowSlideshowImage(newShownImage);      
};

// model => slideshow.js 
class MImages {
    constructor (array, shownImageNumber) {
        this.array = array;
        this.shownImage = array[shownImageNumber];
        this.shownImageNumber = shownImageNumber - 1;
        // обработать эти поля!!! ^
    }

    setImageArray(array) {
        this.array = array;
    }

    setShownImage(imageNumberInArray) {
        if (this.shownImageNumber == imageNumberInArray) return;

        this.shownImage = this.array[imageNumberInArray];
        this.shownImageNumber = imageNumberInArray;
    }

    getImagesArray() {
        return this.array;
    }

    getShownImageNumber() {
        return this.shownImageNumber;
    }

    getShownImage() {
        return this.shownImage;
    }
};

let mSlideshow = {};

const mCreateSlideshow = (arrayOfImages, shownImage) => {
    mSlideshow = new MImages(arrayOfImages, shownImage);
};

const mGetSlideshow = () => {
    return mSlideshow.getImagesArray();
};

const mGetSlideshowShownImageNumber = () => {
    return mSlideshow.getShownImageNumber();
};

const mGetSlideshowShownImage = () => {
    return mSlideshow.getShownImage();
};

const mChangeSlideshowImage = (imageToShowNumber) => {
    mSlideshow.setShownImage(imageToShowNumber);
};

const mShowPreviousSlideshowImage = () => {
    let currentShownImage = mSlideshow.getShownImageNumber();
    let imageToShowNumber = currentShownImage - 1;
    mChangeSlideshowImage(imageToShowNumber);
};

const mShowNextSlideshowImage = () => {
    let currentShownImage = mSlideshow.getShownImageNumber();
    let imageToShowNumber = currentShownImage + 1;
    mChangeSlideshowImage(imageToShowNumber);
};

// slideshow.js => main.js
let arrayOfImages = [
    {src: "./img/banner-1.png", alt: "banner-1"},
    {src: "./img/banner-2.png", alt: "banner-2"},
    {src: "./img/banner-3.png", alt: "banner-3"},
    {src: "./img/banner-0.png", alt: "banner-4"},
    {src: "./img/banner-1.png", alt: "banner-5"},
    {src: "./img/banner-2.png", alt: "banner-6"},
    {src: "./img/banner-3.png", alt: "banner-7"},
    {src: "./img/banner-0.png", alt: "banner-8"},
    {src: "./img/banner-1.png", alt: "banner-9"},
    {src: "./img/banner-0.png", alt: "banner-10"},
    {src: "./img/banner-1.png", alt: "banner-11"},
    {src: "./img/banner-2.png", alt: "banner-12"},
    {src: "./img/banner-3.png", alt: "banner-13"},
    {src: "./img/banner-0.png", alt: "banner-14"},
    {src: "./img/banner-1.png", alt: "banner-15"},
    {src: "./img/banner-2.png", alt: "banner-16"},
    {src: "./img/banner-3.png", alt: "banner-17"},
    {src: "./img/banner-0.png", alt: "banner-18"},
    {src: "./img/banner-1.png", alt: "banner-19"},
];

let slideshowImages = cCreateSlideshow(arrayOfImages, 1);