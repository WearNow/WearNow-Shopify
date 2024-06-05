var closeBtn = document.querySelector(".close_btn_model_content");
var model_container = document.querySelector(".model_container");
closeBtn.addEventListener("click", function(){
    model_container.style.display="none";
});

var theme_ai_model = document.querySelector(".theme_ai_model");
theme_ai_model.addEventListener("click", function(){
    model_container.style.display="block";
});


