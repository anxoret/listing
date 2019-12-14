"use strict"

// обработать ошибки при вызове функции контроллера, к. создает слайдшоу
// сделать дозированность изображений в слайдшоу

// view => slideshow.js
let vCurrentShownImageNumber;
let vSlideshowLength;

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

    arrayOfImages.forEach( function(image, imageNumber) {
        let slideshowImgContainer = document.createElement("div");

        if (imageNumber == shownImageNumber) {
            slideshowImgContainer.className = "slideshow__img-container slideshow__img-container_theme_original slideshow__img-container_show"
        } else {
            slideshowImgContainer.className = "slideshow__img-container slideshow__img-container_theme_original";
        }

        slideshowContainer.append(slideshowImgContainer);

        let slideshowImg = document.createElement("img");
        slideshowImg.className = "slideshow__img slideshow__img_theme_original";

        for (let attributeName in image) {
            slideshowImg.setAttribute(attributeName, image[attributeName]);
        }
        
        slideshowImgContainer.append(slideshowImg); 
    });

    let slideshowButtonLeft = document.createElement("button");
    slideshowButtonLeft.className = "slideshow__button slideshow__button_theme_original slideshow__button_left";
    slideshowContainer.append(slideshowButtonLeft);

    let leftButtonImg = document.createElement("img");
    leftButtonImg.className = "slideshow__img slideshow__img_theme_original";
    leftButtonImg.setAttribute("src", "./img/arrow-left.png");
    leftButtonImg.setAttribute("alt", "arrow-left");
    slideshowButtonLeft.append(leftButtonImg);

    let slideshowButtonRight = document.createElement("button");
    slideshowButtonRight.className = "slideshow__button slideshow__button_theme_original slideshow__button_right";
    slideshowContainer.append(slideshowButtonRight);

    let rightButtonImg = document.createElement("img");
    rightButtonImg.className = "slideshow__img slideshow__img_theme_original";
    rightButtonImg.setAttribute("src", "./img/arrow-left.png");
    rightButtonImg.setAttribute("alt", "arrow-right");
    slideshowButtonRight.append(rightButtonImg);
};

const vShowSlideshowImage = (imageToShow) => {
    let currentShownImageContainer = document.querySelector(".slideshow__img-container_show");
    currentShownImageContainer.classList.remove("slideshow__img-container_show");

    let imageContainerToShow = document.querySelectorAll(".slideshow__img-container")[imageToShow];
    imageContainerToShow.classList.add("slideshow__img-container_show");
};

vCurrentShownImageNumber = shownImageNumber;
vSlideshowLength = arrayOfImages.length;

// const vCheckSlideshowImageNumber = (imaNumber) => {
//     if ()
// };

const vStopButtonClickEvent = () => {
    
};

const vHangClicksOnSlideshowButtons = () => {
    let slideshowLeftButton = document.querySelector(".slideshow__button_left");
    slideshowLeftButton.addEventListener("click", () => {
        
        cShowPreviousSlideshowImage();
    });

    let slideshowRightButton = document.querySelector(".slideshow__button_right"); 
    slideshowRightButton.addEventListener("click", () => {
        cShowNextSlideshowImage();
    });
};

setTimeout( () => vHangClicksOnSlideshowButtons());

// controller => slideshow.js
const cCreateSlideshow = (arrayOfImages, shownImage) => {
    mCreateSlideshow(arrayOfImages, shownImage);
    vCreateSlideshow(
        mGetSlideshow(), mGetSlideshowShownImage()
    );
};

const cGetSlideshowLength = () => {
    return mGetSlideshowLength();
};

const cShowPreviousSlideshowImage = () => {
    mShowPreviousSlideshowImage();
    let newShownImage = mSlideshow.getShownImage();
    vShowSlideshowImage(newShownImage);                                     
};

const cShowNextSlideshowImage = () => {
    mShowNextSlideshowImage();
    let newShownImage = mSlideshow.getShownImage();
    vShowSlideshowImage(newShownImage);      
};

// model => slideshow.js 
class MImages {
    constructor (array, shownImage) {
        this.array = array;
        this.shownImage = shownImage - 1;
        // обработать эти 2 поля!!! ^
    }

    setImageArray(array) {
        this.array = array;
    }

    setShownImage(imageNumberInArray) {
        if (this.shownImage == imageNumberInArray) return;

        this.shownImage = imageNumberInArray;
    }

    getImagesArray() {
        return this.array;
    }

    // getImagesArrayLength() {
    //     return this.array.length;
    // }

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

// const mGetSlideshowLength = () => {
//     return mSlideshow.getImagesArrayLength();
// };

const mGetSlideshowShownImage = () => {
    return mSlideshow.getShownImage();
};

const mChangeSlideshowImage = (imageToShow) => {
    mSlideshow.setShownImage(imageToShow);
};

const mShowPreviousSlideshowImage = () => {
    let currentShownImage = mSlideshow.getShownImage();
    let imageToShow = currentShownImage - 1;
    mChangeSlideshowImage(imageToShow);
};

const mShowNextSlideshowImage = () => {
    let currentShownImage = mSlideshow.getShownImage();
    let imageToShow = currentShownImage + 1;
    mChangeSlideshowImage(imageToShow);
};

// slideshow.js => main.js
let arrayOfImages = [
    {src: "./img/banner-0.png", alt: "banner-0"},
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