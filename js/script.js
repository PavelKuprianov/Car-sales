const headerBurger = document.querySelector('.header__burger');
const headerNavBurger = document.querySelector('.header__nav-burger');
const headerNavList = document.querySelector('.header__nav__list-burger');
const navClose = document.querySelector('.nav__close');

headerBurger.addEventListener('click', ()=> {
    headerNavBurger.classList.add('active');
});
navClose.addEventListener('click', ()=> {
    headerNavBurger.classList.remove('active');
});
headerNavList.addEventListener('click', ()=> {
  headerNavBurger.classList.remove('active');
});



//Таймер
document.addEventListener('DOMContentLoaded', function() {
    const day = document.getElementById('days');
    const hour = document.getElementById('hours');
    const minute = document.getElementById('minutes');
    const second = document.getElementById('seconds');

    // конечная дата, например 1 августа 2023
    const deadline = new Date(2023, 07, 01);
    // id таймера
    let timerId = null;
    // склонение числительных
    function declensionNum(num, words) {
      return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
    function countdownTimer() {

      const diff = deadline - new Date();
      if (diff <= 0) {
        clearInterval(timerId);
      }
      const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
      const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
      const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
      const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
      day.textContent = (days < 10) ? ('0' + days) : days;
      hour.textContent = hours < 10 ? '0' + hours : hours;
      minute.textContent = minutes < 10 ? '0' + minutes : minutes;
      second.textContent = seconds < 10 ? '0' + seconds : seconds;
    }
    countdownTimer();
    // вызываем функцию countdownTimer каждую секунду
    timerId = setInterval(countdownTimer, 1000);

});

//Модальное окно
const btnOpen = document.querySelectorAll('.feedback');
const btnClose = document.querySelector('.close-modal-img');
const modal = document.querySelector('.modal');

const modalViewHandler = () => {
  modal.classList.toggle('modal--open');
}

btnOpen.forEach((item) => {
  item.addEventListener('click', modalViewHandler);
})

btnClose.addEventListener('click', modalViewHandler);

const handleReload = () => {
  location.reload();
}

//Отправка формы
$(document).ready(function() {
  $('.form_sub').click(function(){
    // setTimeout(modalViewHandler(), 5000);
      $.ajax({
          type: "POST", //указываем что метод отправки POST
          url:"../php/form.php", // указываем адрес обработчика
          data:$('.form_modal_window').serialize(), //указываем данные которые будут передаваться обработчику
        /* Мы указываем id формы - $('#callbacks'), и методом serialize() забираем значения всех полей. */
          error:function(){$("#erconts").html("Произошла ошибка!");},
        /* если произойдет ошибка в элементе с id erconts выведется сообщение*/
          beforeSend: function() {
              $("#erconts").html("<p style='color: orangered;'>Отправляем данные...</p>");
          },
          success: function(result){
            
            /* В случае удачной обработки и отправки выполнится следующий код*/
              $('#erconts').html(result);
              
              // checkThis();
            setTimeout(modalViewHandler, 3000);  
            setTimeout(handleReload, 4000);  

          }
      });
      return false;
  });
});

//Модальное окно авто
const btnOpenCar = document.querySelectorAll('.detail');
const btnCloseCar = document.querySelector('.close-modal-img-car');
const modalCar = document.querySelector('.modal-car');


const modalViewHandlerCar = () => {

    modalCar.classList.toggle('modal--open');
}


$(document).on('click', '.detail', function(event) {
       let idCarClick = event.target.id;
        $.ajax({
            type: "post",
            url: "../php/test.php",
            dataType: "json",
            data: {
                'id': idCarClick,
            },
            success: function (data) {
                console.log(data);
                let arrVal = [];
                let i = 0;
                $.each(data, function (index, value) {
                    // console.log(value);
                    // console.log(index);

                    arrVal[i] = value;
                    i++;
                })
                $('.modal-text').text(arrVal[0]);
                $('#modal-info').text(arrVal[1]);
            },
            error: function(){
                console.log('ERROR');
            }
        })

        // console.log(event.target.id)
        modalViewHandlerCar()
    } );


btnCloseCar.addEventListener('click', ()=> {
    modalViewHandlerCar()
} );



