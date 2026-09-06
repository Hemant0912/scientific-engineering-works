/* ================= DARK MODE ================= */

const themeButton =
    document.getElementById("themeButton");


themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    themeButton.textContent =
        isDark ? "☀️" : "🌙";

    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );

});


/* LOAD DARK MODE */

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    themeButton.textContent = "☀️";

}


/* ================= LANGUAGE ================= */

const englishButton =
    document.getElementById("englishButton");

const hindiButton =
    document.getElementById("hindiButton");


const translatedElements =
    document.querySelectorAll(
        "[data-en][data-hi]"
    );


function changeLanguage(language) {

    translatedElements.forEach(function (element) {

        element.textContent =
            element.getAttribute(
                "data-" + language
            );

    });


    if (language === "en") {

        englishButton.classList.add("active");

        hindiButton.classList.remove("active");

        document.documentElement.lang = "en";

    } else {

        hindiButton.classList.add("active");

        englishButton.classList.remove("active");

        document.documentElement.lang = "hi";

    }


    localStorage.setItem(
        "language",
        language
    );

}


/* ENGLISH */

englishButton.addEventListener(
    "click",
    function () {

        changeLanguage("en");

    }
);


/* HINDI */

hindiButton.addEventListener(
    "click",
    function () {

        changeLanguage("hi");

    }
);


/* LOAD LANGUAGE */

const savedLanguage =
    localStorage.getItem("language") || "en";

changeLanguage(savedLanguage);

/* ================= CATALOGUE QR CODE ================= */

const catalogueQR = document.getElementById("catalogueQR");

if (catalogueQR) {

    const catalogueURL =
        new URL("catalogue/catalogue.pdf", window.location.href).href;

    new QRCode(catalogueQR, {
        text: catalogueURL,
        width: 130,
        height: 130,
        correctLevel: QRCode.CorrectLevel.M
    });

}

/* ================= SELECTED WORK SLIDER ================= */

const slidesContainer = document.getElementById("slides");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

let currentSlide = 0;

if (slidesContainer && previousButton && nextButton) {

    const slides = slidesContainer.querySelectorAll(".slide");

    function showSlide(index) {

        slidesContainer.style.transform =
            `translateX(-${index * 100}%)`;

    }

    nextButton.addEventListener("click", function () {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);

    });


    previousButton.addEventListener("click", function () {

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);

    });

}
/* ================= IMAGE LIGHTBOX ================= */

const galleryImages =
    document.querySelectorAll(".gallery-image");

const imageLightbox =
    document.getElementById("imageLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const closeLightbox =
    document.getElementById("closeLightbox");

const lightboxPrev =
    document.getElementById("lightboxPrev");

const lightboxNext =
    document.getElementById("lightboxNext");

let currentImage = 0;


/* OPEN IMAGE */

galleryImages.forEach(function (image, index) {

    image.addEventListener("click", function () {

        currentImage = index;

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        imageLightbox.classList.add("active");

    });

});


/* CLOSE */

closeLightbox.addEventListener("click", function () {

    imageLightbox.classList.remove("active");

});


/* NEXT IMAGE */

lightboxNext.addEventListener("click", function () {

    currentImage++;

    if (currentImage >= galleryImages.length) {
        currentImage = 0;
    }

    lightboxImage.src =
        galleryImages[currentImage].src;

    lightboxImage.alt =
        galleryImages[currentImage].alt;

});


/* PREVIOUS IMAGE */

lightboxPrev.addEventListener("click", function () {

    currentImage--;

    if (currentImage < 0) {
        currentImage = galleryImages.length - 1;
    }

    lightboxImage.src =
        galleryImages[currentImage].src;

    lightboxImage.alt =
        galleryImages[currentImage].alt;

});


/* CLICK OUTSIDE IMAGE TO CLOSE */

imageLightbox.addEventListener("click", function (event) {

    if (event.target === imageLightbox) {

        imageLightbox.classList.remove("active");

    }

});


/* ESCAPE KEY TO CLOSE */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        imageLightbox.classList.remove("active");

    }

});