document.addEventListener('DOMContentLoaded', () => {
  fetch("./data/sub5_community_review.json")
    .then((res) => { return res.json() })
    .then((data) => {
      const data_review = data.community_review;
      const page_reverse = data.community_review.reverse();
      review_thm = document.querySelector('.images > ul')
      popup_wrap = document.querySelector('.review_wrap');


       // 페이지네이션 + 데이터 page 푸쉬
    let page = [];
    for(let i=0; i<page_reverse.length; i+=9){
      page.push(page_reverse.slice(i, i+9));
    }

    let event_paging = ()=>{
      const page_list = document.querySelector('.pagination_num');
    
      page.forEach((v,i)=>{
        page_list.innerHTML += `<a href='#'>${i+1}</a>`;
      })
    
      const page_prev_btn = document.querySelector('.pagination .prev');
      const page_next_btn = document.querySelector('.pagination .next');
      const page_double_prev_btn = document.querySelector('.pagination .double_prev');
      const page_double_next_btn = document.querySelector('.pagination .double_next');
      let page_current = 0;

      const page_btn = document.querySelectorAll('.pagination_num a');
    
      page_list.firstElementChild.classList.add('on');

      page_btn.forEach((btn, page_num)=>{
      btn.addEventListener('click',(e)=>{
        e.preventDefault();
        page_btn.forEach((v)=>{
          event_data(page_num);
          v.classList.remove('on');
          page_current = page_num;
        })
        btn.classList.add('on');
      })

      //prev btn
      page_prev_btn.onclick = function(e){
        e.preventDefault();
        if(page_current > 0){
          page_current--;
          event_data(page_current);
        }
        page_btn.forEach((v)=>{
          v.classList.remove('on');
        })
        page_btn[page_current].classList.add('on');
      }

      //next btn
      page_next_btn.onclick = function(e){
        e.preventDefault();
        if(page_current < page.length-1){
          page_current++;
          event_data(page_current);
        }
        page_btn.forEach((v)=>{
          v.classList.remove('on');
        })
        page_btn[page_current].classList.add('on');
      }
      
      //double prev btn
      page_double_prev_btn.onclick = function(e){
        e.preventDefault();
        page_current = 0;
        event_data(page_current);
        page_btn.forEach((v)=>{
          v.classList.remove('on');
        })
        page_btn[page_current].classList.add('on');
      }

      //double next btn
      page_double_next_btn.onclick = function(e){
        e.preventDefault();
        page_current = page.length-1;
        event_data(page_current);
        page_btn.forEach((v)=>{
          v.classList.remove('on');
        })
        page_btn[page_current].classList.add('on');
      }
      })
    }

    // 데이터 추가
    let event_data = (n) =>{
      review_thm.innerHTML = '';
      page[n].forEach((v, i) => {
    let imgNum = "0".repeat(1) + (v.id + 1) 
      if(imgNum>9){
      review_thm.innerHTML += `<li><a name="pop_btn" data-id = ${v.id}><img src="./img/img_coumunity_review_${v.id + 1}.jpg"> </a></li>`
    }
    else if (v.id <= 9){
      review_thm.innerHTML += `<li><a name="pop_btn" data-id = ${v.id}><img src="./img/img_coumunity_review_${imgNum}.jpg"> </a></li>`
    }
          
  
      })
      repeatPopup();
    }
      event_data(0);
      event_paging();

      //common 비동기 처리 때문에 다시 넣어줌
    function repeatPopup () {
      const btn = document.querySelectorAll('[name="pop_btn"]');
      popup = document.querySelector('.popup'),
        popupClose = document.querySelector('.popup_close_btn'),
        body = document.body;

      btn.forEach((v,i) => {
        v.addEventListener('click', function (){
          let idx = Number(v.dataset.id);
        let data_find = data_review.find((item)=>item.id==idx)
          popup.classList.add("active");
          body.classList.add("prevent_scroll");
        function popup_addhtml(n){ popup_wrap.innerHTML =`<div>
          <img src="./img/img_coumunity_review_${n}.jpg" alt="pension_review">
          </div>
          <div class="review_cont">
            <p class="user_id" data-influencer = ${data_find.influencer}>
            @${data_find.review_id}
            </p>
            <div class="rating_img" data-rating = ${data_find.rating}>
                <img src="./img/icon/icon_sub5_review_5star.svg" >
            </div>
            <p class="review_desc">
              ${data_find.review_text}
              </p>
          </div>`
        }
        let popup_img = "0".repeat(1) + (data_find.id + 1);
          if(data_find.id >= 9){
           popup_addhtml(data_find.id + 1);
          }
          else if(data_find.id<9){
            popup_addhtml(popup_img)
          }
        
          const user_id = document.querySelector('.user_id');
                  
          if(user_id.dataset.influencer === "true"){
            user_id.classList.add('influencer')
          }
          const data_rating = document.querySelector(".rating_img"),
                data_rating_img = document.querySelector(".rating_img > img");
          let rating_num = data_rating.dataset.rating;     
          for (let i = 1; i < 6; i++) {
           let calcNum =  (100% - (rating_num * 20))
            data_rating_img.style.transform = `translateX(-${calcNum}%)`
          }
        })
      })

      popupClose.onclick = function () {
        popup.classList.remove("active");
        body.classList.remove("prevent_scroll");
      }
      popup.addEventListener('click', function (e) {
        if (e.target == popup) {
          popup.classList.remove("active");
          body.classList.remove("prevent_scroll");
        }
       })
      }
    })
})