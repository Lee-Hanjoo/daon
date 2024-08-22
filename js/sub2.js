document.addEventListener("DOMContentLoaded", () => {

  fetch("./data/sub2.json")
  .then((res)=> {return res.json()})
  .then((data)=>{
      const room_content = document.querySelector('.room_content');
      let data_love = data.love;
      let data_only = data.only;
      let room_img = "";
      const loveYou = document.querySelector(".sub.love_you")
      const onlyYou = document.querySelector(".sub.only_you")
      // love_you_html 페이지 스크립트 실행
      let page, type ;
      if (loveYou) {
          page = data_love;
          type = "love";
          // only_you_html 페이지 스크립트 실행
        } else if(onlyYou) {
            page = data_only;
            type = "only";
            
        }
        page.forEach((value)=>{
            room_img = '';
            for(let i = 0; i < 4 ; i++){
                room_img += `<div class="swiper-slide"><img src="./img/img_sub2_room_${type + value.room_num+"_0"}${i+1}.jpg" alt="${type} ${value.room_sqft}"></div>`;
            }
            let math_ceil = Math.ceil(value.room_sqft*3.3) 
            
            room_content.innerHTML += `<li class="main_box2">
            <div class="swiper room_list">
            <div class="swiper-wrapper">
                                    ${room_img}
                                </div>
                                <div class="swiper_btn_wrap">
                                    <div class="swiper-button-next room_img_next"></div>
                                    <div class="swiper-button-prev room_img_prev"></div>
                                </div>
                            </div>
                            <ul class="all_text">
                                <li><h3>${type} YOU ${value.room_num}호</h3></li>
                                <li>
                                    <p>객실크기</p>
                                    <p>${value.room_sqft}평(약${math_ceil}㎡)</p>
                                </li>
                                <li>
                                    <p>객실구성</p>
                                    <p>${value.room_composition}</p>
                                </li>
                                <li>
                                    <p>최대인원</p>
                                    <p>${value.room_personnel}</p>
                                </li>
                                <li>
                                    <p>추가요금</p>
                                    <p>${value.room_caution}</p>
                                </li>
                                <li>
                                    <button 
                                    data-type = '${type}'
                                    data-num = '${value.room_num}'
                                     class="main_btn";>예약하기</button>
                                </li>
                            </ul>
                        </li>`
  })
  let btn = document.querySelectorAll('.main_btn');

   btn.forEach((v)=>{
    v.onclick = function(){
      let {type,num} = this.dataset;
      localStorage.room = JSON.stringify({type,num})
      location.href='./sub6_reservation_step1.html'
    }
   })
    var swiper = new Swiper(".room_list", {
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true,
        loop: true,
        autoplay: false,
        navigation: {
            nextEl: ".swiper-button-next.room_img_next",
            prevEl: ".swiper-button-prev.room_img_prev",
        },
      });

    
  })
})

