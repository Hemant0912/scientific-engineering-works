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

/* ================= HERO IMAGE CLICK SLIDER ================= */

const heroImage = document.getElementById("heroImage");

const heroImages = [
    "images/cnc/img1.jpeg",
    "images/cnc/img2.jpeg",
    "images/cnc/img3.jpeg",
    "images/cnc/img4.jpeg",
    "images/cnc/img5.jpeg",
    "images/cnc/img6.jpeg"
];

let heroImageIndex = 0;

if (heroImage) {

    heroImage.addEventListener("click", function () {

        heroImageIndex++;

        if (heroImageIndex >= heroImages.length) {
            heroImageIndex = 0;
        }

        heroImage.src = heroImages[heroImageIndex];

    });

}

/* ================= CHATBOT ================= */

const chatbotButton = document.getElementById("chatbotButton");
const chatbotBox = document.getElementById("chatbotBox");
const closeChatbot = document.getElementById("closeChatbot");
const sendChat = document.getElementById("sendChat");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");


/* OPEN CHATBOT */

chatbotButton.addEventListener("click", function () {

    chatbotBox.classList.toggle("active");

});


/* CLOSE CHATBOT */

closeChatbot.addEventListener("click", function () {

    chatbotBox.classList.remove("active");

});


/* SEND MESSAGE */

function sendMessage() {

    const message = chatInput.value.trim();

    if (message === "") {
        return;
    }

    /* USER MESSAGE */

    const userMessage = document.createElement("div");

    userMessage.className = "user-message";

    userMessage.textContent = message;

    chatMessages.appendChild(userMessage);


    /* BOT RESPONSE */

    let response =
        "Thank you for your message. Please contact us on WhatsApp at +91 98392 64847 for more details.";


    const lowerMessage = message.toLowerCase();


    if (
        lowerMessage.includes("cnc") ||
        lowerMessage.includes("cutting") ||
        lowerMessage.includes("design")
    ) {

        response =
            "We provide custom CNC design and cutting work, including decorative panels, religious artwork, architectural designs and detailed relief work.";

    }


    else if (
        lowerMessage.includes("scientific") ||
        lowerMessage.includes("apparatus")
    ) {

        response =
            "We provide scientific apparatus for schools, colleges and educational institutions.";

    }


    else if (
        lowerMessage.includes("whatsapp") ||
        lowerMessage.includes("contact") ||
        lowerMessage.includes("number")
    ) {

        response =
            "You can contact us on WhatsApp at +91 98392 64847.";

    }


    else if (
        lowerMessage.includes("catalogue") ||
        lowerMessage.includes("catalog")
    ) {

        response =
            "You can view our catalogue using the Catalogue button on the website.";

    }


    else if (
        lowerMessage.includes("website") ||
        lowerMessage.includes("web")
    ) {

        response =
            "This website provides information about our CNC design work and scientific engineering services.";

    }


    const botMessage = document.createElement("div");

    botMessage.className = "bot-message";

    botMessage.textContent = response;

    chatMessages.appendChild(botMessage);


    /* CLEAR INPUT */

    chatInput.value = "";


    /* SCROLL TO BOTTOM */

    chatMessages.scrollTop = chatMessages.scrollHeight;

}


/* SEND BUTTON */

sendChat.addEventListener("click", function () {

    sendMessage();

});


/* ENTER KEY */

chatInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        sendMessage();

    }

});


/* QUICK BUTTON */

function sendQuickMessage(message) {

    chatInput.value = message;

    sendMessage();

}


/* ================= CHATBOT HELP MESSAGE ================= */

/* Create small message near robot */

const chatbotHint = document.createElement("div");

chatbotHint.className = "chatbot-hint";

chatbotHint.textContent = "How can I help or assist you?";

document.querySelector(".chatbot").appendChild(chatbotHint);


/* Show message */

function showChatbotHint() {

    chatbotHint.classList.add("show");

    setTimeout(function () {

        chatbotHint.classList.remove("show");

    }, 4000);

}


/* Show immediately */

showChatbotHint();


/* Show again every 10 seconds */

setInterval(function () {

    showChatbotHint();

}, 10000);