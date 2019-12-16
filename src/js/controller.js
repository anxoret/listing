"use strict"
import {mCreateSlideshow} from "./model.js";
import {vCreateSlideshow} from "./view.js";
import {mGetSlideshow} from "./model.js";
import {mGetSlideshowShownImageNumber} from "./model.js";
import {mGetSlideshowShownImage} from "./model.js";
import {mShowPreviousSlideshowImage} from "./model.js";
import {vShowSlideshowImage} from "./view.js";
import {mShowNextSlideshowImage} from "./model.js";

export const cCreateSlideshow = (arrayOfImages, shownImageNumber) => {
    if (Object.prototype.toString.call(arrayOfImages) !== "[object Array]") {
        throw new Error("Array of images must have a data type Array.");
    }

    if ( !(arrayOfImages.length) ) {
        throw new Error("Array of images can not be empty.");
    }

    if (Object.prototype.toString.call(shownImageNumber) !== "[object Number]") {
        throw new Error("The second parameter of the function 'cCreateSlideshow' must be a number.");
    }

    if ( (shownImageNumber > arrayOfImages.length) || (shownImageNumber < 1) ) {
        throw new Error("Shown image number can not be more or less then array of images.");
    }

    mCreateSlideshow(arrayOfImages, shownImageNumber);
    vCreateSlideshow(
        mGetSlideshow(), mGetSlideshowShownImageNumber()
    );
};

export const cGetSlideshowShownImage = () => {
    return mGetSlideshowShownImage();
};

export const cShowPreviousSlideshowImage = () => {
    mShowPreviousSlideshowImage();
    let newShownImage = mGetSlideshowShownImageNumber();
    vShowSlideshowImage(newShownImage);                                     
};

export const cShowNextSlideshowImage = () => {
    mShowNextSlideshowImage();
    let newShownImage = mGetSlideshowShownImageNumber();
    vShowSlideshowImage(newShownImage);      
};