document.addEventListener("DOMContentLoaded", () => {

    // [↓] swiper
    var swiper = new Swiper(".room_list", {
        slidesPerView: 1.04,
        spaceBetween: 40,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next.room_next",
            prevEl: ".swiper-button-prev.room_prev",
        },
        breakpoints: {
        
          1401: {
            slidesPerView: 1.36,  //브라우저가 1401보다 클 때
            spaceBetween: 40,
          },
          1279: {
            slidesPerView: 1.16,  //브라우저가 1279 클 때
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 1.16,  //브라우저가 767보다 클 때
            spaceBetween: 16,
          },
          480: {
            slidesPerView: 1.04,  //브라우저가 480보다 클 때
            spaceBetween: 16,
          },
        },
    });
    var swiper = new Swiper(".event_list", {
        slidesPerView: "auto",
        spaceBetween: 20,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next.event_next",
            prevEl: ".swiper-button-prev.event_prev",
        },
    });
    

    // [↓] facilities on class 제어
    let facilitiesLi = document.querySelectorAll(".facilities_list li");
    let cnt = 0, timer;
    
    const rolling = () => {
        // cnt를 123가 되도록 +1 해주고, f.l로 나눈 후 나머지 값을 012로 받아서 cnt랑 i값이 같으면 on이 되는거임.
        cnt = (cnt + 1) % facilitiesLi.length;
        facilitiesRolling();
    }
    
    timer = setInterval(rolling, 5000);
    
    const facilitiesRolling = () => {
        facilitiesLi.forEach((li, i) => {
            li.classList.toggle("on", i === cnt);
        });
    }
    
    facilitiesLi.forEach((v,i)=>{
        v.addEventListener("click",(e)=>{
            e.preventDefault();
            clearInterval(timer)
            // 클릭한 요소의 인덱스값으로 cnt 설정
            cnt = i; 
            // 바로 업데이트 해줘서 on 클래스를 넣음.
            facilitiesRolling(); 
            // 그리고 5초 인터벌을 돌림.
            timer = setInterval(rolling, 5000);
        })
    })

    const quickSearchBtn = document.querySelector(".quick_menu .search_btn");
    const quickStartDate = document.querySelector(".quick_menu .date.in input");
    const quickEndDate = document.querySelector(".quick_menu .date.out input");

    quickSearchBtn.addEventListener("click", ()=>{
        // 로드 됐을때 말고, 값 설정 하고나서 페이지 넘어갈 때 set.
        localStorage.setItem('defaultQuickStartDate', quickStartDate.value);
        localStorage.setItem('defaultQuickendDate', quickEndDate.value);
        localStorage.setItem('defaultQuickRoom', room.value);
        localStorage.setItem('defaultQuickAdult', adult.value);
        localStorage.setItem('defaultQuickChild', child.value);
        localStorage.setItem('mainQuickMove', true);
    })

    fetch('./data/sub5_community_event.json')
    .then((data)=> {return data.json()})
    .then((data)=>{
        const eventList = document.querySelector('.event_list .swiper-wrapper')
        data.event_page.forEach((v,i)=>{
            eventList.innerHTML += `
            <div class="swiper-slide">
                <a href="./sub5_community_event.html">
                    <img src="./img/img_event_05_2_contents_0${v.id}.jpg" alt="${v.event_title}">
                    <div class="txt_box">
                        <p class="event_title">${v.event_title}</p>
                        <span class="date">${v.event_startday} ~ ${v.event_lastday}</span>
                    </div>
                </a>
            </div>
            `
        })

    })
    
    fetch('./data/sub5_community_review.json')
    .then((data)=> {return data.json()})
    .then((data)=>{
        const reviewList = document.querySelector('.review_list')
        const reviewListClone = document.querySelector('.review_list.clone')
        const maxReviews = data.community_review.slice(0, 5);
        maxReviews.forEach((v,i)=>{
            reviewList.innerHTML += `
                <li>
                    <a href="./sub5_community_review.html">
                        <img src="./img/img_coumunity_review_0${v.id + 1}.jpg" alt="">
                        <div class="name_box">
                            <p class="name ${v.influencer && true ? 'influencer' : ''}">@${v.review_id}</p>
                            <div class="rating">
                                <img src="./img/icon/icon_star.svg" alt="">
                            </div>
                        </div>
                        <p class="review_desc">${v.review_text}</p>
                    </a>
                </li>
            `
            reviewListClone.innerHTML += `
                <li>
                    <a href="./sub5_community_review.html">
                        <img src="./img/img_coumunity_review_0${v.id + 1}.jpg" alt="">
                        <div class="name_box">
                            <p class="name ${v.influencer && true ? 'influencer' : ''}">@${v.review_id}</p>
                            <div class="rating">
                                <img src="./img/icon/icon_star.svg" alt="">
                            </div>
                        </div>
                        <p class="review_desc">${v.review_text}</p>
                    </a>
                </li>
            `
        })
    })

})