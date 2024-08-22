document.addEventListener("DOMContentLoaded", () => {

    fetch('./component/common.html')
    .then((data)=>{ return data.text()})
    .then((data)=>{ 
        
        const login = document.querySelector(".login_common")
        const footer = document.querySelector(".footer")
        if (!login) {
            // chatbot
            (function(){var w=window;if(w.ChannelIO){return w.console.error("ChannelIO script included twice.");}var ch=function(){ch.c(arguments);};ch.q=[];ch.c=function(args){ch.q.push(args);};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return;}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x);}}if(document.readyState==="complete"){l();}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l);}})();
            ChannelIO('boot', {
                "pluginKey": "dbf51d87-0b32-4469-b099-572fefb331ca"
            });
            
            // [↓] header, footer 제어
            let createHeader = document.createElement('header')
            let createFooter = document.createElement('footer')
            createHeader.className = 'header'
            createFooter.className = 'footer'
            createHeader.innerHTML = data.split('/nn')[0];
            createFooter.innerHTML = data.split('/nn')[1];
            document.body.prepend(createHeader)
            document.body.append(createFooter)
            
            const footerVideo = document.querySelector(".footer .video_wrap")
            const main = document.querySelector(".main")
            const footer = document.querySelector(".footer")
            
            if (main) {
                footer.classList.add("main")
            } else {
                footerVideo.remove();
            }
            
            // [↓] gnb
            const body = document.querySelector("body")
            const header = document.querySelector(".header")
            const navBg = document.querySelector(".nav_bg")
            const navLi = document.querySelectorAll(".nav .sub > li")
            const depth1 = document.querySelectorAll(".nav .sub > li > a:not(.solo)")
            const mbBtn = document.querySelector(".mb_menu")
            const facilitiesDepth2 = document.querySelectorAll(".nav .sub li:nth-child(3) .depth_2 li a")
            
            // [↓] header에 facilities 메뉴 클릭시 pageType값을 설정해주기 위해 localstorage에 data-num을 심어줍니다. 
            facilitiesDepth2.forEach((v,i)=>{
                v.addEventListener("click", (e)=>{
                    let depthDataNum = e.target.dataset.num;
                    localStorage.depthNum = JSON.parse( depthDataNum );
                })
            })

            const handleMbBtnClick = () => {
                header.classList.toggle("on");
                body.classList.toggle("prevent_scroll");
            };
            
            const handleHeaderMouseOver = () => {
                header.classList.add("on");
            };
            
            const handleNavBgMouseOver = () => {
                header.classList.add("on");
            };
            
            const handleNavBgMouseLeave = () => {
                header.classList.remove("on");
            };
            
            const handleGnb = () => {
                if (header) {
                    header.removeEventListener("mouseover", handleHeaderMouseOver);
                }
                if (navBg) {
                    navBg.removeEventListener("mouseover", handleNavBgMouseOver);
                    navBg.removeEventListener("mouseleave", handleNavBgMouseLeave);
                }
                if (mbBtn) {
                    mbBtn.removeEventListener("click", handleMbBtnClick);
                }
                if (body.offsetWidth > 1280) {
                    // pc
                    if (header) {
                        header.addEventListener("mouseover", handleHeaderMouseOver);
                    }
                    if (navBg) {
                        navBg.addEventListener("mouseover", handleNavBgMouseOver);
                        navBg.addEventListener("mouseleave", handleNavBgMouseLeave);
                    }
                } else {
                    // mb
                    depth1.forEach((depth) => {
                        depth.addEventListener("click", (e) => {
                            navLi.forEach((v) => v.classList.remove("on"));
                            e.preventDefault();
                            e.target.parentNode.classList.toggle("on");
                        });
                    });
                    if (mbBtn) {
                        mbBtn.addEventListener("click", handleMbBtnClick);
                    }
                }
            }
            
            handleGnb();
            window.addEventListener("resize", handleGnb);

            // [↓] weather
            const weather_key = 'f34bf64dd3e6f2cc24032a347aefb6e3';
            const weather_latitude = '37.83117086809958';
            const weather_longitude = '127.46889840605908';
            
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${weather_latitude}&lon=${weather_longitude}&appid=${weather_key}&units=metric&lang=kr`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {

                const weather_btn = document.querySelector('.weather_btn a');
                const weather_icon = data.weather[0].icon;
                const weather_temp = data.main.temp.toFixed(1);
                weather_btn.addEventListener("click", (e)=>{
                    e.preventDefault();
                })
                weather_btn.innerHTML = `<img src='http://openweathermap.org/img/wn/${weather_icon}@2x.png'; alt='weather'>
                                         <span>${weather_temp}°</sapn>`
            })

            // [↓] top_btn
            const topBtn = document.querySelector(".top_btn a");
            topBtn.addEventListener("click", (e)=>{
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            })
    

            
        } else if (login) {
            footer.classList.add("login")
        }

        // 로그인 nav_menu 체인지.
        const isLogin = sessionStorage.getItem('login')
        const navMenu = document.querySelector('.nav_menu')
        const mypageBtn = document.querySelector('.mypage_btn')
        const cookie = document.cookie.split(';');
        for(let i=0;i <cookie.length; i++) {
            const getUserName = cookie[i].split('=')[0]
            const userName = cookie[i].split('=')[1]
            if(isLogin === 'true') {
                if (getUserName.includes('name')) {
                    navMenu.classList.add("on");
                    mypageBtn.innerText = userName + ' 님';
                }
            }
        }
        const logoutBtn = document.querySelector(".logout_btn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", ()=>{
                navMenu.classList.remove("on")
                sessionStorage.clear()
                var profile =  {
                    email: '',
                    name:'',
                    age: '',
                    b_day: '',
                    gender: '',
                    mobile: ''
                };

                Object.entries(profile).forEach(([key, value]) => {
                    document.cookie = `access_token=""; ${key}=undefined;`;
                })
                window.location.href='./index.html'
            })
        }

    })

    // [↓] popup
    const popupBtn = document.querySelectorAll("[name='pop_btn']"),
    popup = document.querySelector('.popup'),
    popupClose = document.querySelector('.popup_close_btn'),
    body = document.body;

    if (popup) {
        popupBtn.forEach((v)=>{  
            v.addEventListener('click', function(e){
                e.preventDefault();
                popup.classList.add("active");
                body.classList.add("prevent_scroll");
            })
        })
        popupClose.onclick = function(){
            popup.classList.remove("active");
            body.classList.remove("prevent_scroll");
        }
        popup.addEventListener('click', function(e){
            if(e.target == popup){
                popup.classList.remove("active");
                body.classList.remove("prevent_scroll");
            }
        })
    }

    // [↓] chekcbox
    const chkWrap = document.querySelector(".checkbox_wrap")
    const chkAll = document.querySelector(".checkbox_wrap #all_chk")
    const chk = document.querySelectorAll(".checkbox_wrap input[name='chk']")
    const chkBtn = document.querySelector(".checkbox_wrap .toggle_btn")
    if (chk) {
        chk.forEach((v,i)=>{
            if (chkAll) {
                chkAll.addEventListener("click", ()=>{
                    if (chkAll.checked) {
                        chk[i].checked = true;
                    } else {
                        chk[i].checked = false;
                    }
                })
            }
            chk[i].addEventListener("change", ()=>{
                const chkLength = chk.length;
                const chkCheckedLength = document.querySelectorAll(".checkbox_wrap input[name='chk']:checked").length
                if (chkCheckedLength === chkLength) {
                    chkAll.checked = true;
                } else {
                    chkAll.checked = false;
                }
            })
            if (chkBtn) {
                chkBtn.addEventListener("click", ()=>{
                    chkWrap.classList.toggle("fold")
                })
            }
        })
    }

    // [↓] tab
    const tabCont = document.querySelector(".tab_cont")
    const tabContDiv = document.querySelectorAll(".tab_cont > *")
    const tabLi = document.querySelectorAll(".tab li")
    tabLi.forEach((v,i)=>{
        v.addEventListener("click", (e)=>{
            e.preventDefault();
            for(let i=0;i<tabLi.length;i++){
                tabLi[i].classList.remove("on")
                if(tabCont) {
                    tabContDiv[i].classList.remove("on")
                }
            }
            v.classList.add("on")
            if(tabCont) {
                tabContDiv[i].classList.add("on")
            }
        })
    })
    
    // [↓] select
    const select = document.querySelectorAll("select")
    const option = document.querySelectorAll("select option")
    const main = document.querySelector(".main")
    select.forEach((v,i)=>{
        const defaultOption = document.querySelector("select option.default")
        for(let i=0;i<option.length;i++){
            if(option[i].classList.contains('default')){
                defaultOption.style.cssText = 'display:none;'
                v.style.cssText = 'color:#afafaf;'
            }
        }
        if(!main){
            v.addEventListener("input", ()=>{
                v.style.cssText = 'color:#2f2f2f;'
            })
        }
    })

    const resize = () => {
        var minWidth = 480;
        var body = document.getElementsByTagName('body')[0];
        if (window.innerWidth < minWidth) { body.style.zoom = (window.innerWidth / minWidth); }
        else body.style.zoom = 1;
    }
    window.addEventListener('resize', resize);

})