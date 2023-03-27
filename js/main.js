'use strict'
// slider

$(document).ready(function(){
  $('.slider').slick({
      dots: true, 
      fade:true,
      arrows:false,
      // autoplay:true
     
  });
});

$(document).ready(function(){
  $('.slider-news').slick({
      dots:true,
      infinite:true,
      slidesToShow: 3,
      arrows:true,
      infinte:true,
      // autoplay:true,
      autoplaySpeed:4000,
      responsive: [
        {
          breakpoint: 1400,
          settings:{
            slidesToShow:2,
          }
        },
        {
          breakpoint: 820,
          settings:{
            slidesToShow:1,
          }
        }
        
      ]
  });
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form'); 
    form.addEventListener('submit', formSend);


    async function formSend(e) {
      e.preventDefault();
  
      let error = formValidate(form);
      return error;

      let formData = new FormData(form);
      formData.append('image', formImage.files[0]);
  
      if (error === 0) {
        form.classList.add('_sending');
        let response = await fetch('sendmail.php', {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          let result = await response.json();
          alert(result.message);
          formPreview.innerHTML = '';
          form.reset();
          form.classList.remove('_sending');
        } else {
          alert("Error-");
          form.classList.remove('_sending');
        }
       
      } else {
          alert('Fill in required fields');
      }
  }

function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index];
        formRemoveError(input);

        if (input.classList.contains('_email')) {
            if (emailTest(input)) {
                formAddError(input);
                error++;
            }
        } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
            formAddError(input);
            error++;
        } else {
            if (input.value === '') {
                formAddError(input);
                error++;
            }
        }
    }
}
    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    const formImage = document.getElementById('formImage');
    const formPreview = document.getElementById('formPreview');

    formImage.addEventListener('change', () => {
      uploadFile(formImage.files[0]);
    });

    function uploadFile(file) {
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        alert('Only images allowed');
        formImage.value = '';
        return;
      }
      if (file.size >5 * 1024 * 1024) {
        alert('The file must not exceed 5 MB');
        return;
      }

      let reader = new FileReader();
      reader.onload = function (e) {
        formPreview.innerHTML = `<img src="${e.target.result}" alt="Photo">`;
      };
      reader.onerror = function (e) {
        alert('Error');
      };
      reader.readAsDataURL(file);
    }
});
// //btns 
// $('.btn').click(function(){
//   $(".text-more").fadeToggle(0);
// });

// $('.btn_1').click(function(){
//   $(".text-more_1").fadeToggle(0);
// });

//scroll 
 function scrollTo(element) {
  window.scroll({
    left:0,
    top:element.offsetTop,
    behavior:"smooth"
  })
 }
let btnScroll = document.querySelector('.svg-scroll');
let main = document.querySelector('.main');

btnScroll.addEventListener('click', () => {
  scrollTo(main);
})

//  menu
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
      x.className += " responsive";
  } else {
      x.className = "topnav";
  }
}






