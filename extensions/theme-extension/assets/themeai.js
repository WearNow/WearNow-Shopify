var modelContainer = document.querySelector(".model_container");
var customiseTryOnBtn = document.querySelector(".customise_try_on_btn");
var mainModelWna = document.querySelector(".main_model_wna");
var closeBtn = document.querySelector(".close_btn_model_content");
var themeAiModel = document.querySelector(".theme_ai_model");

var model_btn = document.querySelectorAll(".model_btn");
closeBtn.addEventListener("click", function(){
    modelContainer.style.display = "none";
});

themeAiModel.addEventListener("click", function(){
    modelContainer.style.display = "block";
});

customiseTryOnBtn.addEventListener("click", function(){
    modelContainer.style.display = "none";
    mainModelWna.style.display = "flex";
});

/* Customization Try-on JavaScript Code */
var nextButton = document.getElementById('nextBtn');
var models = document.querySelectorAll('.main_model_wna .model');
var counterModel = document.querySelector('.main_model_wna .counter_model');
var backButton = document.getElementById('backBtn');
var addtocart_btn = document.querySelectorAll(".addtocart_btn");
var model_btn = document.querySelectorAll("#nextBtn");
var currentModelIndex = 0;

function updateCounter() {
    counterModel.innerHTML = `${currentModelIndex + 1}/${models.length}`;
    if (currentModelIndex === 1) {
        addtocart_btn.forEach(function (btn) {
            btn.style.display = "flex";
        });
        model_btn.forEach(function (btn) {
            btn.style.display = "none";
        });
    }else{
        addtocart_btn.forEach(function (btn) {
            btn.style.display = "none";
        });
        model_btn.forEach(function (btn) {
            btn.style.display = "flex";
        });
    }
}

updateCounter(); // Initialize counter

for (var i = 1; i < models.length; i++) {
    models[i].style.display = 'none';
}

nextButton.addEventListener('click', function () {
    models[currentModelIndex].style.display = 'none';
    currentModelIndex++;
    if (currentModelIndex >= models.length) {
        currentModelIndex = 0;
    }
    updateCounter();
    backButton.style.opacity = '1';
    models[currentModelIndex].style.display = 'block';
});


backButton.addEventListener('click', function () {
    models[currentModelIndex].style.display = 'none';
    currentModelIndex--;
    if (currentModelIndex < 0) {
        currentModelIndex = models.length - 1;
    }
    updateCounter();
    if (currentModelIndex === 0) {
        backButton.style.opacity = '0';
    }
    models[currentModelIndex].style.display = 'block';
});

/* Close button functionality */

var closeBtns = document.querySelectorAll(".close_btn");
var mainModelWnas = document.querySelectorAll(".main_model_wna");

closeBtns.forEach(function (btn, index) {
    btn.addEventListener("click", function () {
        mainModelWnas.forEach(function (element) {
            element.style.display = "none";
        });
    });
});
