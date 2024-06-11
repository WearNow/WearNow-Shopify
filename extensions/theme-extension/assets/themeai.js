var modelContainer = document.querySelector(".model_container");
var customiseTryOnBtn = document.querySelector(".customise_try_on_btn");
var mainModelWna = document.querySelector(".main_model_wna");
var closeBtn = document.querySelector(".close_btn_model_content");
var themeAiModel = document.querySelector(".theme_ai_model");

var model_btn = document.querySelectorAll(".model_btn");
closeBtn.addEventListener("click", function(){
    modelContainer.style.display = "none";
    var section = document.querySelector(".shopify-section");
    if (section) {
      section.style.zIndex = "3";
    }
});

themeAiModel.addEventListener("click", function(){
    modelContainer.style.display = "block";
    var section = document.querySelector(".shopify-section");
    if (section) {
      section.style.zIndex = "0";
    }
});

customiseTryOnBtn.addEventListener("click", function(){
    modelContainer.style.display = "none";
    mainModelWna.style.display = "flex";
});

var nextButton = document.getElementById('nextBtn');
var models = document.querySelectorAll('.main_model_wna .model');
var backButton = document.getElementById('backBtn');
var addtocart_btn = document.querySelectorAll(".addtocart_btn");
var model_btn = document.querySelectorAll("#nextBtn");
var currentModelIndex = 0;

function updateCounter() {
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

// nextButton.addEventListener('click', function () {
//     models[currentModelIndex].style.display = 'none';
//     currentModelIndex++;
//     if (currentModelIndex >= models.length) {
//         currentModelIndex = 0;
//     }
//     updateCounter();
//     backButton.style.opacity = '1';
//     models[currentModelIndex].style.display = 'block';
// });


// backButton.addEventListener('click', function () {
//     models[currentModelIndex].style.display = 'none';
//     currentModelIndex--;
//     if (currentModelIndex < 0) {
//         currentModelIndex = models.length - 1;
//     }
//     updateCounter();
//     if (currentModelIndex === 0) {
//         backButton.style.opacity = '0';
//     }
//     models[currentModelIndex].style.display = 'block';
// });

/* Close button functionality */


var wna_close_model_out_side = document.querySelectorAll(".wna_close_model_out_side");
var model_container = document.querySelectorAll(".model_container");
var main_model_wna = document.querySelectorAll(".main_model_wna");
wna_close_model_out_side.forEach(function (btn, index) {
    btn.addEventListener("click", function () {
        var section = document.querySelector(".shopify-section");
        if (section) {
          section.style.zIndex = "3";
        }
        model_container.forEach(function (element) {
            element.style.display = "none";
        });
        main_model_wna.forEach(function (element) {
            element.style.display = "none";
        });
    });
});

var select_skin_comosition_img_item_color = document.querySelectorAll(".select_skin_color .select_skin_comosition_img_item");
   select_skin_comosition_img_item_color.forEach(function(element) {
  element.addEventListener("click", function() {
    var color_title = element.getAttribute("color_title"); 
    document.querySelector(".wna_selected_color").innerHTML=color_title;
    select_skin_comosition_img_item_color.forEach(function(item) {
      item.classList.remove("active");
    });
    element.classList.add("active");
  });
});


var select_skin_comosition_img_item_size = document.querySelectorAll(".select_skin_size .select_skin_comosition_img_item");
   select_skin_comosition_img_item_size.forEach(function(element) {
  element.addEventListener("click", function() {
    var size_title = element.getAttribute("size_title"); 
    document.querySelector(".wna_selected_size").innerHTML=size_title;
    select_skin_comosition_img_item_size.forEach(function(item) {
      item.classList.remove("active");
    });
    element.classList.add("active");
  });
});

var gender_btn = document.querySelectorAll(".gender_btn button");
gender_btn.forEach(function(button) {
    button.addEventListener("click", function(event) {
        gender_btn.forEach(function(btn) {
            btn.classList.remove("active");
        });
        event.target.classList.add("active");
    });
});

(function(){
var closeBtns = document.querySelectorAll(".wna_close_btn");
var mainModelWnas = document.querySelectorAll(".main_model_wna");

closeBtns.forEach(function (btn, index) {
    btn.addEventListener("click", function () {
        mainModelWnas.forEach(function (element) {
            element.style.display = "none";
        });
    });
});
})();