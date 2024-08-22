document.addEventListener('DOMContentLoaded', ()=>{
  fetch("./data/sub5_community_event.json")
  .then((res)=> {return res.json()})
  .then((data)=> {
    // sub5_event.html script
  // sub5_event.html script
  const event = document.querySelector(".event")
  const event_box = document.querySelector('.align_box');
  const data_event = data.event_page;
  const now = new Date();
  const page_reverse = data.event_page.reverse();
  if(event){ 
   
    // 페이지네이션 + 데이터 page 푸쉬
    let page = [];
    for(let i=0; i<page_reverse.length; i+=6){
      page.push(page_reverse.slice(i, i+6));
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
      let items = []
      event_box.innerHTML = '';
      page[n].forEach((v,i)=>{
        let end_date = new Date(v.event_lastday);
        let date_compare = end_date > now;
          event_box.innerHTML += `<li data-id="${v.id}"> <a href="${(date_compare) ? "sub5_community_event_inner.html":'#'}"> 
                                    <div class="img_box">
                                        <img src="./img/img_event_05_2_contents_0${v.id}.jpg" alt="${v.event_title} 썸네일"><div class="end_event ${(end_date < now) ? 'active':''}">
                                          <p class="end_event_text">종료된 이벤트</p>
                                          </div>
                                    </div>
                                    
                                    <div class="event_text_box">
                                        <p>${v.event_title}</p>
                                        <span>기간 : ${v.event_startday} ~ ${v.event_lastday}
                                        </span>
                                        </div>
                                        </a>
                                        </li>`;
        })
    }
    event_data(0);
    event_paging();
    
}
else {
  // sub5_event_inner.html script
  const event_innerbox = document.querySelector('.sub5_event_inner_content');
  const event_innerdata = data.event_inner;
  event_innerbox.innerHTML = `<div class="sub5_img_box">
                          <img src="./img/img_sub5_2_event_inner_0${event_innerdata.id + 1}.jpg" alt="">
                      </div>
                      <div class="sub5_text_box">
                          <p>
                              ${event_innerdata.event_inner_text}
                          </p>
                      </div>`
  }

  })
})