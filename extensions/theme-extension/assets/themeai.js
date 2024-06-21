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
let url = location.href;
const parts = url.split('/');
  
  // The hostname is the third part (index 2) of the URL parts
  const shopName = parts[2];
// Fetch the current_id attribute
const currentId = themeAiModel.getAttribute('current_id');

// Log the current_id to the console
async function fetchProduct(){
        const queryfor = "checkVirtualTryOn";
        const formdata = new FormData();
        formdata.append("queryfor", queryfor);
        formdata.append("shop", shopName);
        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

const response=await fetch("https://wearnow-shopify-7c945fcdc96d.herokuapp.com/api/fetchDbData", requestOptions);
const nn= await response.json();
return nn;
}
// Call the async function and handle the result 
(async () => {
    try {
      const result = await fetchProduct();
      console.log(result); // Handle the result here
      var exists=result.response.filter((res)=> res.variant_id==`gid://shopify/ProductVariant/${currentId}`);
      console.log(exists);
      if(exists.length >0) {
      themeAiModel.style.display = "flex";
    } 
    } catch (error) {
      console.error('Error:', error); // Handle any errors here
    }
  })();
  async function extpopup(){
            const formdata = new FormData();
            formdata.append("queryfor", "extpopup");
            formdata.append("shop", shopName);
            const requestOptions = {
                method: "POST",
                body: formdata,
                redirect: "follow"
            };
    
    const response=await fetch("https://wearnow-shopify-7c945fcdc96d.herokuapp.com/api/fetchDbData", requestOptions);
    const nn= await response.json();
    return nn;
    }
    // Call the async function and handle the result 
    (async () => {
        try {
          await extpopup();
        } catch (error) {
          console.error('Error:', error); // Handle any errors here
        }
      })();
  
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