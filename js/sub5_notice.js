document.addEventListener("DOMContentLoaded", () => {
  
  //sub5_community_notice json
 fetch("./data/sub5_community_notice.json")
 .then(function(res){
   return res.json();
 })
 .then(function(data){
   //notice page
   const page_reverse = data.community_notice.reverse();
   let page = [];
   for(let i=0; i<page_reverse.length; i+=10){
     page.push(page_reverse.slice(i, i+10));
   }

    let notice_paging = ()=>{
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
            notice_data(page_num);
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
            notice_data(page_current);
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
            notice_data(page_current);
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
          notice_data(page_current);
          page_btn.forEach((v)=>{
            v.classList.remove('on');
          })
          page_btn[page_current].classList.add('on');
        }

        //double next btn
        page_double_next_btn.onclick = function(e){
          e.preventDefault();
          page_current = page.length-1;
          notice_data(page_current);
          page_btn.forEach((v)=>{
            v.classList.remove('on');
          })
          page_btn[page_current].classList.add('on');
        }
      })
    }

    //notice data insert
    const notice_table = document.querySelector('.notice-1 tbody');
    
    let notice_data = (n) =>{
      notice_table.innerHTML = '';

      page[n].forEach((v,i)=>{
        notice_table.innerHTML += `<td>${v.board_num}</td>
                                  <td>
                                    <a href='./sub5_community_notice_inner.html?id=${v.board_num}'>${v.board_title}</a>
                                  </td>
                                  <td>${v.board_date}</td>`;
      })
    }

    notice_data(0);
    notice_paging();

  })


})













     