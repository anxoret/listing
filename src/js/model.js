"use strict"

class MImages {
    constructor (array, shownImageNumber) {
        this.array = array;
        this.shownImage = array[shownImageNumber];
        this.shownImageNumber = shownImageNumber - 1;
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

export const mCreateSlideshow = (arrayOfImages, shownImage) => {
    mSlideshow = new MImages(arrayOfImages, shownImage);
};

export const mGetSlideshow = () => {
    return mSlideshow.getImagesArray();
};

export const mGetSlideshowShownImageNumber = () => {
    return mSlideshow.getShownImageNumber();
};

export const mGetSlideshowShownImage = () => {
    return mSlideshow.getShownImage();
};

const mChangeSlideshowImage = (imageToShowNumber) => {
    mSlideshow.setShownImage(imageToShowNumber);
};

export const mShowPreviousSlideshowImage = () => {
    let currentShownImage = mSlideshow.getShownImageNumber();
    let imageToShowNumber = currentShownImage - 1;
    mChangeSlideshowImage(imageToShowNumber);
};

export const mShowNextSlideshowImage = () => {
    let currentShownImage = mSlideshow.getShownImageNumber();
    let imageToShowNumber = currentShownImage + 1;
    mChangeSlideshowImage(imageToShowNumber);
};