"use strict"

// view
const vShowImage = () => {
    
};

const vGetImagesSrc = (imagesHtmlClass) => {
    let imagesSrc = [];
    let images = document.querySelectorAll(imagesHtmlClass);

    images.forEach( (image) => {
        let src = image.getAttribute("src");
        imagesSrc.push(src);
    });

    return imagesSrc;
};

// controller
const cCreateSlideshow = () => {

};

const cShowImage = (imagesObject) => {
    let currentShownImage = slideshowImages.getShownImage();
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

const cGetImagesSrc = (imagesClass) => {
    return vGetImagesSrc(imagesClass);
};

// model
class MImages {
    constructor () {
        this.array = [];
        this.shownImage = null;
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

let slideshowImages = new MImages;
slideshowImages.setImageArray(vGetImagesSrc(".slideshow__img-container .slideshow__img"));

// main
let slideshowLeftButton = document.querySelector(".slideshow__button_left"); 

slideshowLeftButton.addEventListener("click", () => {
    showPreviousImage();
});