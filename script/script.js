import openModal from "./modal.js";


const btnPrev = document.querySelector('.btn__prev'),
btnNext = document.querySelector('.btn__next'),
slider = document.querySelector('.slider'),
sliderItem = document.querySelectorAll('.slider__item');


let count = 0;

btnPrev.addEventListener('click',(e)=>{
    e.preventDefault();
    count--;
    if (count<0) {
        count = 0;
        return;
    }
    slider.prepend(sliderItem[count]);
    
});

btnNext.addEventListener('click',(e)=>{
    e.preventDefault();
    if (count == 12) count = 0;
    slider.append(sliderItem[count]);
    count++;
})

/*модалка*/

const lk = document.querySelector('.header__tel'),
formModal = document.querySelector('form.modal__form'),
modal = document.getElementById('modal');


lk.addEventListener('click',()=> openModal(lk,formModal,modal));


//отправка формы авторизации

const error = document.getElementById('error'); 

formModal.addEventListener('submit',(e)=>{
    e.preventDefault();
    const body = {};
    const formData = new FormData(formModal); //получаем данные с формы
    formData.forEach((val, key) => {
        body[key] = val;
    });

   postData(body)
                    .then((response) =>{
                        if (response.status!== 200) throw new Error ('Ошибка'); //если запрос от сервера не 200
                        else {
                            if (response.redirected) {
                                window.location.href = response.url; //переходим в соответствии с заголовком в php
                                zeroForm(); //очищаем поля формы
                            }
                            else response.text() //если пароль или логин введен неверно
                            .then((data)=>error.textContent=data)
                            
                        }
                    }
)   
});

//отправка данных на сервер
const postData = (body) => fetch('./login.php', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(body)
}) ;

//очистка полей формы
const zeroForm = ()=>{
    error.textContent='';
    formModal.querySelectorAll('input').forEach((item) => {
        item.value='';
    });
};


