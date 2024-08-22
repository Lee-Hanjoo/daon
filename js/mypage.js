document.addEventListener("DOMContentLoaded", () => {
    const isLogin = sessionStorage.getItem('login')

    //mypage tab
    const mypage_tab_btn = document.querySelectorAll('.mypage_tap_wrap .tab li');
    const mypage_tab_cont = document.querySelectorAll('.mypage_tap_wrap .tab_cont > div');

    mypage_tab_btn.forEach((btn,key)=>{
        btn.onclick = function(){
            mypage_tab_btn.forEach((v,i)=>{
                mypage_tab_btn[i].classList.remove('on');
                mypage_tab_cont[i].classList.remove('on');
            })
            mypage_tab_btn[key].classList.add('on');
            mypage_tab_cont[key].classList.add('on');
        }
    })

    //mypage info session
    const mypage_email = document.querySelector('.mypage_info_input .email_ul .email_box input');
    const mypage_name = document.querySelector('.mypage_info_input .name_ul .name_box input');
    
    try{
        const session_profile = JSON.parse(sessionStorage.profile);
        mypage_email.value = session_profile.email;
        mypage_name.value = session_profile.name;
    }
    catch{
        mypage_email.placeholder = "이메일";
        mypage_name.placeholder = "이름";
    }

     //mypage reservation session
     const mypage_date = document.querySelector('.mypage_reservation_date');
     const mypage_room = document.querySelector('.mypage_reservation_room');
     const mypage_person = document.querySelector('.mypage_reservation_person');

    try{
        const local_room = JSON.parse(localStorage.setRoom);
        let adult_person = parseInt(local_room.adult, 10);
        let child_person = parseInt(local_room.child, 10);

        mypage_date.innerText = `${local_room.setStartDate} ~ ${local_room.setEndDate}`;
        mypage_room.innerText = `${local_room.roomInfo[0].type} ${local_room.roomInfo[0].roomNumber}`;
        mypage_person.innerText = adult_person + child_person;
    }
    catch{
        mypage_date.innerText = "2024. 08. 17 ~ 2024. 08. 18";
        mypage_room.innerText = "love 102호";
        mypage_person.innerText = "4";
    }

    if(isLogin !== 'true') {
        const firstTab = document.querySelector(".mypage_tap_wrap > .tab > li:first-child")
        const secTab = document.querySelector(".mypage_tap_wrap > .tab > li:last-child")
        const firstCont = document.querySelector(".mypage_tap_wrap > .tab_cont > div:first-child")
        const secCont = document.querySelector(".mypage_tap_wrap > .tab_cont > div:last-child")
        firstTab.style.cssText = 'display:none;'
        firstCont.style.cssText = 'display:none;'
        secTab.style.cssText = 'display:block; margin-left:0;'
        secTab.classList.add("on")
        secCont.classList.add("on")
    }   

})