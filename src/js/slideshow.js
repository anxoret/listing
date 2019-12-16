"use strict"
import {cCreateSlideshow} from "./controller.js";

let arrayOfImages = [
    {src: "./img/banner-4.png", alt: "banner-4"},
    {src: "./img/banner-2.png", alt: "banner-2"},
];

let slideshowImages = cCreateSlideshow(arrayOfImages, 1);