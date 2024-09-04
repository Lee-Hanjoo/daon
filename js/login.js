var profile;
// [↓] 다온 로그인
document.addEventListener("DOMContentLoaded", () => { 
// 로그인+회원가입 공통------------------
    const inputBoxs = document.querySelectorAll('.input_box input');
    const emailBox = document.querySelector('.email_box input');
    const pwBoxs = document.querySelectorAll('.pw_box input'),
          pwBox = document.querySelector('.pw_box #password'),
          pwCheckBox = document.querySelector('.pw_box #pw_check');
    const nameBox = document.querySelector('.name_box input'),
          phoneBox = document.querySelector('.phone_box input'),
          verifyBox = document.querySelector('.verify_box input');
    const resetBtn = document.querySelectorAll('.input_box .input_reset_btn'),
          eyeBtn = document.querySelectorAll('.pw_box .input_eye_btn'),
          errorMsgs = document.querySelectorAll('.input_box .error_msg');
    const submitBtn = document.querySelector('.join_join_btn button');
    const form = document.querySelector('form');
/*[↓] 공통 함수, 공통 기능 ------------------------------------------------------------------------------------- */        
    // 이메일 유효성 검사 함수(값이 유효하면 profile에 저장까지)
    const emailChecker = (email) => {
        //이메일 조건 (ex. my_Account-01@naver.com): 
        // 아이디 부분(my_Account-01): 영문 대소문자, 숫자, ._-%+- 의 특문 입력 가능
        // @: 필수, @로 구분됨
        // 도메인 앞(naver): 영문 대소문자, 숫자, .-의 특문 입력 가능
        // 도메인 뒤(.com): 2~6자, 영문 대소문자 입력 가능
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        let errorMsg = '';
        let isValid = false;
        if(!emailRegex.test(email)){
            errorMsg = '유효하지 않은 이메일 주소입니다.';
        }else{
            isValid = true;
            profile.email = email;
            return {isValid: isValid, errorMsg: errorMsg};
        }
        return {isValid: isValid, errorMsg: errorMsg};
    }
    // 비밀번호 유효성 검사 함수
    const pwChecker = (pw) => { 
        //조건: 영문/숫자/특문 각각 1개 이상의 조합으로 8~15자
        const pwRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,15}$/;
        let errorMsg = '';
        let isValid = false;
        //길이 검증
        if(!pwRegex.test(pw)){
            errorMsg ='영문, 숫자, 특수문자를 조합해 8~15자 입력해 주세요.';
        }else{
            isValid = true;
            return {isValid: isValid, errorMsg: errorMsg};
        }
        return {isValid: isValid, errorMsg: errorMsg};
    }
    //이름 유효성 검사 함수
    const nameChecker = (name) => {
        //조건 : 한글만 입력 가능, 2~20자, 띄어쓰기 불가능
        const nameRegex = /^[가-힣]{2,20}$/;
        let errorMsg = '';
        let isValid = false;
        // 한글만 남기기
        let stringicValue = name.replace(/[^가-힣]/g, '');
        // 조건 검증
        if(!nameRegex.test(name)){
            errorMsg = '유효하지 않은 이름입니다.'
        }else{
            isValid = true;
            profile.name = stringicValue;
        }
        return {isValid: isValid, errorMsg: errorMsg};
    }
    //휴대폰 번호 유효성 검사 함수
    const phoneChecker = (phone) => {
        //조건: 숫자만 입력 가능, (010,011,016,017,018,019)으로 시작, 10자 이상 11자 미만
        const phoneRegex = /^01[016789][0-9]{3,4}[0-9]{4}$/;
        let errorMsg = '';
        let isValid = false;
        if(phoneRegex.test(phone)){
            isValid = true;
            profile.mobile = phone;
        }else{
            errorMsg = '유효하지 않은 번호입니다.';
        }
        return {isValid: isValid, errorMsg: errorMsg};
    }
    //값 일치 확인 함수(비밀번호확인, 인증번호 일치 함수에 사용)
    const isEqual = function(inputValue, targetValue){
        if(inputValue === targetValue){
            return true;
        }else{
            return false;
        }
    }
    //비밀번호확인 일치 검사 함수
    const pwEqual = ((pwCheck, pw) => {
        let isValid = false;
        let errorMsg = '';
        if(isEqual(pwCheck, pw)){
            isValid = true;
            errorMsg = '';
        }else{
            errorMsg = '비밀번호가 일치하지 않습니다.'
        }
        return {isValid: isValid, errorMsg: errorMsg};
    })
    // 인증번호 일치 검사 함수
    const verifyNumEqual = ((input, verifyNum) => {
        let isValid = false;
        let errorMsg = '';        
        if(isEqual(parseInt(input), verifyNum)){
            isValid = true;
            errorMsg = '';
        }else{
            errorMsg = '인증번호가 일치하지 않습니다.'
        }
        return {isValid: isValid, errorMsg: errorMsg};
    })
    //인증번호(6자리)생성 함수
    const verifyNumGenerator = (() => {
        //앞3자리: 100~999사이의 랜덤숫자
        let ranNum1 = (Math.floor((Math.random()*900)) + 100);
        //뒤3자리: 밀리초
        let today = new Date();
        let milliSec = today.getMilliseconds();
        let ranNum2 = milliSec.toString().padStart(3, '0');
        //합치기
        let verifyNum = parseInt(ranNum1.toString() + ranNum2.toString());
        return verifyNum;
    })
    //인풋박스 내부 : 우측 [x, 눈] 버튼 input시 활성화, blur 시 비활성화
    inputBoxs.forEach((inputbox) => {
        //focus시
        inputbox.addEventListener('focus', function(){
            if(inputbox.value === ''){   //값이 없으면 버튼 안보이게
                inputbox.classList.remove('hasValue')
            }else{  //값이 있으면 버튼 보이게
                inputbox.classList.add('hasValue')  
            }
        })
        // input시
        inputbox.addEventListener('input', function(){
            if(inputbox.value === ''){   //값이 없으면 버튼 안보이게
                inputbox.classList.remove('hasValue')
            }else{  //값이 있으면 버튼 보이게
                inputbox.classList.add('hasValue')
            }
        })
        //blur시: blur적용하면 x, eye버튼 클릭 시점에 blur적용해서 버튼이 사라지고 기능을 못합니다..****************
        // inputbox.addEventListener('blur', function(){
        //     inputbox.classList.remove('hasValue')   //버튼 안보이게
        // })
    })
    //인풋박스 내부: x버튼 기능
    resetBtn.forEach((reset, idx) => {
        reset.addEventListener('click', function(){
            inputBoxs[idx].value = '';
        })
    })
    //인풋박스 내부: 비밀번호 eye버튼 기능
    eyeBtn.forEach((eye, idx) => {
        eye.addEventListener('click', function(){
            if(pwBoxs[idx].type === 'password'){
                pwBoxs[idx].type = 'text';  //타입을 password -> text로
                eye.classList.add('hide');
            }else{
                pwBoxs[idx].type = 'password';
                eye.classList.remove('hide');
            }
        })
    })
    
    //에러메시지 온오프 함수
    const showErrorMsg = function(result, inputBox, idx){
        if(inputBox.value == ''){   //인풋값이 없으면 에러메시지 없음
            errorMsgs[idx].classList.remove('active');
            errorMsgs[idx].innerText = '';
            inputBox.classList.remove('active');    //테두리색 변경
        }else{  //인풋값이 있으면
            if(result.isValid === true){ //유효값이면 에러메시지 없음
                errorMsgs[idx].classList.remove('active');
                errorMsgs[idx].innerText = '';
                inputBox.classList.remove('active');
            }else{  //유효값 아닐 시 에러메시지 출력
                errorMsgs[idx].innerText = result.errorMsg;
                errorMsgs[idx].classList.add('active');
                inputBox.classList.add('active');
            }
        }
    }
/*[↓] 공통 유효성검사, 에러메시지 blur이벤트------------------------------------------------------------------------------------- */
    const verifyBtn = document.querySelector('.verify_btn button'); //인증번호 버튼
    let inputsChecking = () => {
        emailBox.addEventListener('blur', function(){
            let idx = 0;
            let result = emailChecker(emailBox.value);
            showErrorMsg(result, emailBox, idx);
        })
        pwBox.addEventListener('blur', function(){
            let idx = 1;
            let result = pwChecker(pwBox.value);
            showErrorMsg(result, pwBox, idx);
        })
        pwCheckBox.addEventListener('blur', function(){
            let idx = 2;
            console.log(pwCheckBox.value, pwBox.value);
            
            let result = pwEqual(pwCheckBox.value, pwBox.value);
            showErrorMsg(result, pwCheckBox, idx);
        })
        nameBox.addEventListener('blur', function(){
            let idx = 3;
            let result = nameChecker(nameBox.value);
            showErrorMsg(result, nameBox, idx);
        })
        phoneBox.addEventListener('blur', function(){
            let idx = 4;
            let hasValue = phoneBox.value;
            let result = phoneChecker(phoneBox.value);
            showErrorMsg(result, phoneBox, idx);
            
            console.log(`값유무: ${hasValue !== ''}, 유효: ${result.isValid}`);
            //휴대폰 번호 유효성 검사 통과 시 인증번호 버튼 활성화
            if(result.isValid === true){
                verifyBtn.disabled = false;
            }else{
                verifyBtn.disabled = true;
            }
        })
        verifyBtn.addEventListener('click', function(){
            let idx = 5;
            //인증번호 생성
            let verifyNum = verifyNumGenerator();
            //팝업으로 띄우기
            alert(`인증번호: ${verifyNum}`);
            //인풋박스 활성화 시키기
            verifyBox.removeAttribute('readonly');
            //인증번호 일치하는지 검사
            verifyBox.addEventListener('blur', function(){
                let result = verifyNumEqual(verifyBox.value, verifyNum);
                showErrorMsg(result, verifyBox, idx);
                console.log(verifyNum);
            })
        })
    }
    inputsChecking();
/*[↓] 페이지 별 개별 코드------------------------------------------------------------------------------------- */
    //페이지 이름(login, join, join_complete)가져오기 (페이지마다 실행하는 코드가 다르게)
    const url = location.pathname;
    let pageName = url.substring(url.lastIndexOf('/')+1,url.lastIndexOf('.'));
    switch(pageName){
        case 'login':
            break;
        case 'join':
            //팝업의 계속진행/중단하기 버튼 함수
            const popupBtnFunc = function(){
                const popup = document.querySelector('.popup.join');
                const progressBtn = document.querySelector('.popup .join_popup_btn_progress');
                const cancelBtn = document.querySelector('.popup .join_popup_btn_cancel');
                progressBtn.addEventListener('click', function() {
                    popup.classList.remove("active");
                    body.classList.remove("prevent_scroll");
                });
                cancelBtn.addEventListener('click', function(){
                    history.back();
                })
            }
            popupBtnFunc();
            //휴대폰 번호 인풋박스 내부의 x버튼 클릭 시 인증번호 버튼 비활성화
            resetBtn[4].addEventListener('click', function(){
                resetBtn[4].value = '';
                verifyBtn.disabled = true;
            });
            //엑세스 토큰 생성 함수(30자)
            const accessTokenGenerator = function(){
                let length = 30;
                const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-_-..-_-0123456789abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-_-..-_-abcdefghijklmnopqrstuvwxyz0123456789';
                let accessToken = '';
                for (let i = 0; i < length; i++) {
                    const randomIndex = Math.floor(Math.random() * characters.length);
                    accessToken += characters[randomIndex];
                }
                return accessToken;
            }
            //가입완료 버튼 비활성화/활성화 검사 함수
            const submitChecker = () => {
                let submitCondition = form.checkValidity();
                    if(submitCondition === true){
                        submitBtn.disabled = false;
                    }else{
                        submitBtn.disabled = true;
                    }
            }
            //가입 조건 활성화 체크
            window.addEventListener('click', submitChecker)
            window.addEventListener('keydown', submitChecker)
            window.addEventListener('scroll', submitChecker)
            //가입완료 버튼 클릭 시 엑세스 토큰 발급, 유저정보 로컬에 저장
            submitBtn.addEventListener('click', function(){
                let accessToken = accessTokenGenerator();
                setUserInfo(accessToken);
            })            
            break;
        case 'join_complete':   //이름 표시
            const name = document.querySelector('.greeting .name');
            let userName = JSON.parse(sessionStorage.profile); 
            name.innerText = userName.name;
            break;
    }
})  //DOMloaded 괄호

// [↓] sns 로그인(dom제어 필요없는 부분이라 밖으로 뺐습니다.)
// 로그인 여부 판별: 쿠키에 access_token값 있는지? (값이 있으면-> 세션의 login: true)
// 쿠키에 엑세스 토큰값이 있으면 로그인 페이지 진입불가, 메인으로 이동

// 소셜 로그인 중 네이버가 가장 많은 유저 정보를 가져올 수 있습니다.
// 네이버, 구글 로그인은 테스트 아이디 등록이 필요합니다. 필요하시면 말씀해 주세요.

let cookie = document.cookie.split(';');    //쿠키에서
let accessToken= cookie.filter((v)=>v.match('access_token')); //엑세스 토큰 추출
var login = false; //로그인상태:true / 로그아웃상태: false

// if 조건문이 true, false를 boolean이 아닌 문자열로 받기때문에 false가 나와도 true로 간주한다. (false라는 문자가 있으니까 트루.) 그래서 === 'true'를 넣어줘서 문자열 true 일때를 한번 더 넣어주면 정상작동함.
if(accessToken.length && accessToken[0].split('=')[1] === 'true'){ // 엑세스 토큰 값이 있으면 메인으로 이동
    login = true;
    location.href="/";
} else{                         //엑세스 토큰 값이 없으면 로그인 진행

/* sns 로그인 공통 변수, 함수 ---------------------------------*/
//(1) 서비스 주소(로그인 버튼 있는 페이지)
const SERVICE_URI = "https://qodql.github.io/daon/login.html";
//(2) 콜백할 주소(리디렉트)
const REDIRECT_URI = "https://qodql.github.io/daon/login.html";
//(3) 콜백 후 이동할 주소(메인)
const AFTER_REDIRECT_URI = "https://qodql.github.io/daon/index.html";    //로그인 성공 후 메인페이지 이동
//(4) 유저 정보 구조
profile =  {
    email: '',
    name:'',
    age: '',
    b_day: '',
    gender: '',
    mobile: ''
};

//(5) 쿠키와 세션에 유저 정보를 저장하는 함수
var setUserInfo = function(accessToken) {
    //1. 유효기간 설정
    let endDate = new Date();
    endDate.setSeconds(endDate.getSeconds() + 86400);   //24시간 (단위:초)
    //2-1. 유저 정보를 쿠키에 저장
    Object.entries(profile).forEach(([key, value]) => {
        document.cookie = `${key}=${value}; expires=${endDate.toGMTString()};`;
    })
    //2-2. 엑세스 토큰을 쿠키에 저장
    document.cookie = `access_token=${accessToken}; expires=${endDate.toGMTString()};`
    //3. 정보를 세션에 저장(로그인 페이지 외 다른 페이지에서도 사용할 수 있게)
        //1) 프로필 정보 세션에 저장
    sessionStorage.profile = JSON.stringify(profile);
        //2) 로그인 여부 세션에 저장
    login = true;
    sessionStorage.login = JSON.stringify(login);
        /* <참고> 세션에 저장한 정보 꺼내쓸 때 : 
            let checkLogin = JSON.parse(sessionStorage.login); 
            console.log(checkLogin);  //true면 로그인, false면 로그아웃 상태
            이런 방법으로 사용하시면 됩니다.
        */
    //4. 메인 페이지로 이동
    location.href = AFTER_REDIRECT_URI;
}

/* 카카오 ---------------------------------*/
const kakaoLogin = function(){
    const REST_API_KEY = "b87b0bf5c70402fe02aec9e63d71cf0a";
    let AUTHORIZE_CODE_KAKAO = new URLSearchParams(location.search),  //인가코드는 매번 랜덤하게 바뀜
        ACCESS_TOKEN_KAKAO = "";
    const kakao = document.querySelector('.kakao'); //로그인 버튼

    // 1. 인가코드 받기(주소창에 파라미터(?code=형태)로 들어옴) //login.js
    function loginWithKakao() {
        Kakao.Auth.authorize({
            redirectUri: REDIRECT_URI
        });
    }
    kakao.addEventListener('click',loginWithKakao);


    // 2. 액세스 토큰 발급(인가코드 있어야 발급 가능), 주소창의 ?code= 부분
    function displayToken() {
        if(AUTHORIZE_CODE_KAKAO.get('code')){
            fetch("https://kauth.kakao.com/oauth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE_KAKAO.get('code')}`
            })
            .then(res => res.json())
            .then(res => {
                ACCESS_TOKEN_KAKAO = res.access_token;  //엑세스 토큰값 저장
                Kakao.Auth.setAccessToken(ACCESS_TOKEN_KAKAO);
                userInfoFunc(); //3. 사용자 정보 받기 함수 실행
            })
        }
    }
    displayToken();

    //3. 사용자 정보 받기
    function userInfoFunc(){
        fetch("https://kapi.kakao.com/v2/user/me", {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN_KAKAO}`
            }
        })
        .then(res => res.json())
        .then(res => {
            //유저 정보 저장
            profile.name = res.properties.nickname; //원래는 닉네임(nickname)인데 name에 넣음
            //쿠키, 세션에 저장
            setUserInfo(ACCESS_TOKEN_KAKAO);
        })
    }
    

    //4. 로그아웃
    function kakaoLogout() {
        Kakao.Auth.logout() //카카오 로그아웃 함수 호출
        .then(function() {
            alert('logout ok\naccess token -> ' + Kakao.Auth.getAccessToken());
            // deleteCookie();
            document.cookie = `access_token=;expires=;`;
            alert('로그아웃 성공');
        })
        .catch(function() {
            alert('로그인하지 않았습니다.');
        });
    }
}
kakaoLogin()

/* 네이버 : 네이버는 함수안에 넣으면 스코프 이슈 발생, 못넣음 ---------------------------------*/
// 네이버는 콜백주소 url에 엑세스 토큰값을 보내기 때문에, 로그인 성공 시 바로 메인페이지로 이동하지 않습니다.
// 일단 다시 로그인 페이지로 다시 돌아온 후 받아온 토큰값과 회원정보를 저장하고, 이후에 메인으로 이동합니다.
const NAVER_CLIENT_ID = "cEjPiQLxtraGtftdtKot",
      CALLBACK_URI = SERVICE_URI;
var naver_id_login = new naver_id_login(NAVER_CLIENT_ID, CALLBACK_URI);
var state = naver_id_login.getUniqState();
let ACCESS_TOKEN_NAVER = naver_id_login.getAccessToken();

const naver = document.querySelector('.naver'); //로그인버튼

/* 네이버 로그인 초기화 Script */
// 1. 인가코드 받기: 네이버는 인가코드 필요 없나..?
// 2. 액세스 토큰 발급 (주소창에 access_token=형태로 들어옴)
const loginWithNaver = function() {
    location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=token&client_id=${NAVER_CLIENT_ID}&redirect_uri=${CALLBACK_URI}&state=`;
}
/* 네이버 로그인 Callback페이지 처리 Script */
naver_id_login.get_naver_userprofile("naverSignInCallback()");
// 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function
function naverSignInCallback() {
    //유저 정보 저장
    Object.keys(profile).forEach(key => {
        profile[key] = naver_id_login.getProfileData(key);
    })
    //쿠키,세션에 저장
    setUserInfo(ACCESS_TOKEN_NAVER);
}

naver.addEventListener('click', function(){
    loginWithNaver();
})

/* 구글 ---------------------------------*/
const googleLogin = function(){
    const GOOGLE_CLIENT_ID = '507623855565-u1kp5fvsfg2e263jpq2vmtage1rmmkcf.apps.googleusercontent.com';
    const google = document.querySelector('.google');
    
    function signInGoogle(){
        //엔드포인트주소, 엑세스 토큰을 주고 유저정보를 받아오는 곳
        var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
        //엑세스 토큰값을 서버에 주기 위해서 form생성
        var form = document.createElement('form');
        form.setAttribute('method', 'GET'); // Send as a GET request.
        form.setAttribute('action', oauth2Endpoint);
    
        var params = {'client_id': GOOGLE_CLIENT_ID,
                    'redirect_uri': REDIRECT_URI,
                    'response_type': 'token',
                    'scope': 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
                    'include_granted_scopes': 'true',
                    'state': 'pass-through-value'};
    
        //form제출(submit)
        for (var p in params) {
            var input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', p);  //client_id, redirect_uri. response_type, scope, include_granted_scopes, state
            input.setAttribute('value', params[p]); //위의 name에 해당하는 각각의 값들
            form.appendChild(input);
        }
        //dom에 엘리멘트 추가
        document.body.appendChild(form);
        //form자동제출(submit)
        form.submit();
    }
    google.addEventListener('click', signInGoogle);
    
    
    //주소창에 들어온 access_token 뽑아서 저장하기
    let ACCESS_TOKEN_GOOGLE;
    var fragmentString = location.hash.substring(1);
    var params = {};
    var regex = /([^&=]+)=([^&]*)/g, m;
    while (m = regex.exec(fragmentString)) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    if (Object.keys(params).length > 0 && params['state']) {
        var authInfo = JSON.parse(JSON.stringify(params)); //주소창에서 엑세스 토큰 뽑기
        ACCESS_TOKEN_GOOGLE = authInfo['access_token']; //엑세스 토큰값만 저장
        fetch("https://www.googleapis.com/oauth2/v3/userinfo",{
            headers:{
                "Authorization": `Bearer ${ACCESS_TOKEN_GOOGLE}`
            }
        })
        .then((data) => data.json())    //데이터 받아서 json형태로 만들기
        .then((info) => {
            profile.name = info.name;
            profile.email = info.email;
            setUserInfo(ACCESS_TOKEN_GOOGLE);   //쿠키와 세션에 유저 정보 저장
        })
    }
}
googleLogin();

}