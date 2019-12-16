"use strict"
import {cCreateSlideshow} from "./controller.js";

let arrayOfImages = [
    {src: "./img/banner-1.png", alt: "banner-1"},
    {src: "./img/banner-2.png", alt: "banner-2"},
];

let slideshowImages = cCreateSlideshow(arrayOfImages, 1);