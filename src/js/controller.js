"use strict"

// view => slideshow.js
const vShowImage = () => {
    
};

const vCreateSlideshow = (arrayOfImages, shownImageNumber) => {
    let mainContent = document.querySelector(".main-content");

    let slideshow = document.createElement("section");
    slideshow.className = "slideshow slideshow_theme_original";
    mainContent.append(slideshow);

    let slideshowContainer = document.createElement("div");
    slideshowContainer.className = "slideshow__container slideshow__container_theme_original";
    slideshow.append(slideshowContainer);

    let slideshowImgContainer = document.createElement("div");
    slideshowImgContainer.className = "slideshow__img-container slideshow__img-container_theme_original";
    slideshowContainer.append(slideshowImgContainer);

    arrayOfImages.forEach( (image, imageNumber) => {
        let slideshowImg = document.createElement("img");

        if (imageNumber == shownImageNumber) {
            slideshowImg.className = "slideshow__img-container slideshow__img-container_theme_original slideshow__img-container_show"
        } else {
            slideshowImg.className = "slideshow__img slideshow__img_theme_original";
        }
        
        for (attributeName in image) {
            slideshowImg.setAttribute(attributeName, image[attributeName]);
        }
        
        slideshowImgContainer.append(slideshowImg); 
    });

    let slideshowButtonLeft = document.createElement("button");
    slideshowButtonLeft.className = "slideshow__button slideshow__button_theme_original slideshow__button_left";
    slideshowContainer.append(slideshowButtonLeft);
};

// controller => slideshow.js
const cCreateSlideshow = (arrayOfImages, shownImage) => {
    mCreateSlideshow(arrayOfImages, shownImage);
    vCreateSlideshow(
        mGetSlideshow(), mGetSlideshowShownImage()
    );
};

const cShowImage = (imagesObject) => {
    let currentShownImage = imagesObject.getShownImage();
    vShowImage(currentShownImage);     
};

const cShowPreviousImage = () => {
    mChangeShownImage(slideshowImages, -1);
    vShowImage(slideshowImages);                                     
};

const cShowNextImage = () => {
    mChangeShownImage(slideshowImages, 1);
    vShowImage(slideshowImages);     
};

// model => slideshow.js 
class MImages {
    constructor (array, shownImage) {
        this.array = array || [];
        this.shownImage = shownImage || null;
    }

    setImageArray(array) {
        this.array = array;
    }

    setShownImage(imageNumberInArray) {
        if (this.shownImage == imageNumberInArray) break;

        this.shownImage = this.array[imageNumberInArray];
    }

    getImagesArray() {
        return this.array;
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

const mGetSlideshowShownImage = () => {
    return mSlideshow.getShownImage();
};

const mChangeShownImage = (imagesObject, number) => {
    let currentShownImage = imagesObject.getShownImage();

    if ( ((imagesObject.length - 1) == currentShownImage) && (number == 1) ) {
        currentShownImage = 0;
        // telling controller to change view
        break;
    }
    if ( (currentShownImage == 0) && (number == -1) ) {
        currentShownImage = imagesObject.length - 1;
        // telling controller to change view
        break;
    } 
};

// slideshow.js => main.js
let arrayOfImages = [
    {src: "./img/banner-0.png", alt: "banner-0"},
    {src: "./img/banner-1.png", alt: "banner-1"},
    {src: "./img/banner-2.png", alt: "banner-2"},
    {src: "./img/banner-3.png", alt: "banner-3"},
    {src: "./img/banner-0.png", alt: "banner-0"},
    {src: "./img/banner-1.png", alt: "banner-1"},
    {src: "./img/banner-2.png", alt: "banner-2"},
    {src: "./img/banner-3.png", alt: "banner-3"},
    {src: "./img/banner-0.png", alt: "banner-0"},
    {src: "./img/banner-1.png", alt: "banner-1"},
    {src: "./img/banner-0.png", alt: "banner-0"},
    {src: "./img/banner-1.png", alt: "banner-1"},
    {src: "./img/banner-2.png", alt: "banner-2"},
    {src: "./img/banner-3.png", alt: "banner-3"},
    {src: "./img/banner-0.png", alt: "banner-0"},
    {src: "./img/banner-1.png", alt: "banner-1"},
    {src: "./img/banner-2.png", alt: "banner-2"},
    {src: "./img/banner-3.png", alt: "banner-3"},
    {src: "./img/banner-0.png", alt: "banner-0"},
    {src: "./img/banner-1.png", alt: "banner-1"},
]

let slideshowImages = cCreateSlideshow(arrayOfImages, 1);










// let slideshowLeftButton = document.querySelector(".slideshow__button_left"); 

// slideshowLeftButton.addEventListener("click", () => {
//     showPreviousImage();
// });