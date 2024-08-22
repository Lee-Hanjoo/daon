document.addEventListener("DOMContentLoaded", () => {

    let param_num = new URLSearchParams(location.search);

    fetch("./data/sub5_community_notice.json")
    .then(function(res){
        return res.json();
    })
    .then(function(data){

        //notice inner
        const notice_inner_tit = document.querySelector('.notice_inner_1 h2');
        const notice_inner_date = document.querySelector('.notice_inner_1 p');
        const notice_inner_cont = document.querySelector('.notice_inner_2 p');
        
        const notice_inner_prev_btn = document.querySelectorAll('.notice_inner_4 .prev_post td');
        const notice_inner_next_btn = document.querySelectorAll('.notice_inner_4 .next_post td');

        const notice_inner_prev_post = document.querySelector('.notice_inner_4 .prev_post_tit');
        const notice_inner_next_post = document.querySelector('.notice_inner_4 .next_post_tit');

        let find_data = data.community_notice.filter((item)=>{
            return item.board_num == param_num.get('id');
        })    

        let board_currunt = 0;
        board_currunt = find_data[0].board_num;

        notice_inner_tit.innerText = find_data[0].board_title;
        notice_inner_date.innerText = find_data[0].board_date;
        notice_inner_cont.innerText = find_data[0].board_cont;

        const board_img_ele = document.createElement('img');
        const notice_inner_img = document.querySelector('.notice_inner_2 article');
        
        try{
            board_img_ele.src = find_data[0].board_imges[0].src;
            notice_inner_img.appendChild(board_img_ele);
        }catch{}
        
        if(board_currunt > 1){
            notice_inner_prev_post.innerHTML = `<a href="#">[이전글] ${data.community_notice[board_currunt-2].board_title}</a>`;
            notice_inner_prev_btn.forEach((v)=>{
                v.onclick = function(){
                    board_currunt--;
                    location.href = `?id=${board_currunt}`;
                }
            })
        }

        if(board_currunt < data.community_notice.length){
            notice_inner_next_post.innerHTML = `<a href="#">[다음글] ${data.community_notice[board_currunt].board_title}</a>`;
            notice_inner_next_btn.forEach((v)=>{
                v.onclick = function(){
                    board_currunt++;
                    location.href = `?id=${board_currunt}`;
                }
            })
        }

    })
})