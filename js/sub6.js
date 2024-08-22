document.addEventListener("DOMContentLoaded", () => {

    fetch("./data/sub2.json")
    .then((data)=> {return data.json()})
    .then((data)=>{
        const isLogin = sessionStorage.getItem('login')

        // *****************[step1]******************* //
        const step1 = document.querySelector(".step1")
        const roomInput = document.querySelector(".date_person .room input")
        const adultInput = document.querySelector(".date_person .adult input")
        const childInput = document.querySelector(".date_person .child input")
        const plusBtn = document.querySelectorAll(".date_person .btn_wrap .plus")
        const minusBtn = document.querySelectorAll(".date_person .btn_wrap .minus")
        const nextBtn = document.querySelector(".next_btn")
        const getDefaultStartDate = document.querySelector(".date.in input")
        const getDefaultEndDate = document.querySelector(".date.out input")
        const quick = localStorage.getItem('mainQuickMove');
        const startDate = localStorage.getItem('defaultQuickStartDate');
        const endDate = localStorage.getItem('defaultQuickendDate');
        const room = localStorage.getItem('defaultQuickRoom');
        const adult = localStorage.getItem('defaultQuickAdult');
        const child = localStorage.getItem('defaultQuickChild');
        const step2RoomInfo = localStorage.getItem('room');
        let roomNum='', adultNum='', childNum='', defaultStartDate='',defaultEndDate='',defaultRoom='',defaultAdult='',defaultChild='',defaultPrice='';
        let setStartDate='', setEndDate='', onlyType='', valueNum='';
        let objStep2RoomInfo = JSON.parse(step2RoomInfo) 

        if(step1){

            if (quick) {
                getDefaultStartDate.value = startDate
                getDefaultEndDate.value = endDate
                roomInput.value = room
                adultInput.value = adult
                childInput.value = child
                roomNum = room;
                childNum = child;
                adultNum = adult;
                defaultStartDate = startDate
                defaultEndDate = endDate
                defaultRoom = room
                defaultAdult = adult
                defaultChild = child
            } else {
                // 디폴트 값
                defaultStartDate = getDefaultStartDate.value
                defaultEndDate = getDefaultEndDate.value
                defaultRoom = roomInput.value
                defaultAdult = adultInput.value
                defaultChild = childInput.value
                roomNum=roomInput.value;
                childNum=childInput.value;
                adultNum=adultInput.value;
                if(step2RoomInfo) {
                    defaultType = objStep2RoomInfo.type
                    defaultNum = objStep2RoomInfo.num
                    onlyType=objStep2RoomInfo.type;
                    valueNum=objStep2RoomInfo.num;
                }
            }

            document.cookie = `defaultStartDate=${defaultStartDate}`
            document.cookie = `defaultEndDate=${defaultEndDate}`
            document.cookie = `defaultRoom=${defaultRoom}`
            document.cookie = `defaultAdult=${defaultAdult}`
            document.cookie = `defaultChild=${defaultChild}`
            if(step2RoomInfo) {
                document.cookie = `defaultType=${defaultType}`
                document.cookie = `defaultNum=${defaultNum}`
            }

            // [↓] step1 객실 수, 성인 수, 어린이 수 증감
            plusBtn.forEach((v,i)=>{
                plusBtn[i].addEventListener("click", (e) => {
                    let targetLi = e.target.parentElement.parentElement.parentElement;
                    if (targetLi.classList.contains("adult")) {
                        if (adultNum < 12){
                            adultNum++;
                            if(adultNum > 12){
                                adultNum = 12;
                                adultInput.value = adultNum;
                            } else if (adultNum > 6){
                                roomNum = 2;
                                roomInput.value = roomNum;
                                let roomMinusBtn = document.querySelector(".date_person .room .minus")
                                roomMinusBtn.style.cssText = "opacity:1;"
                            }
                            if (adultNum < 12){
                                v.style.cssText = 'opacity:1;'
                                minusBtn[i].style.cssText = 'opacity:1;'
                            } else {
                                v.style.cssText = 'opacity:0.3;'
                            }
                        }
                        adultInput.value = adultNum;
                    }
                    if (targetLi.classList.contains("room")) {
                        if(roomNum < 4) {
                            roomNum++;
                            if (roomNum !== 4){
                                v.style.cssText = 'opacity:1;'
                            } else {
                                v.style.cssText = 'opacity:0.3;'
                            }
                            if (roomNum !== 1) {
                                minusBtn[i].style.cssText = 'opacity: 1;'
                            }
                        }
                        roomInput.value = roomNum;
                    }
                    if (targetLi.classList.contains("child")) {
                        if (childNum < 12){
                            childNum++;
                            if(childNum > 12){
                                childNum = 12;
                                childInput.value = childNum;
                            } else if (childNum > 6){
                                roomNum = 2;
                                roomInput.value = roomNum;
                                let roomMinusBtn = document.querySelector(".date_person .room .minus")
                                roomMinusBtn.style.cssText = "opacity:1;"
                            }
                            if (childNum < 12){
                                v.style.cssText = 'opacity:1;'
                                minusBtn[i].style.cssText = 'opacity:1;'
                            } else {
                                v.style.cssText = 'opacity:0.3;'
                            }
                        }
                        childInput.value = childNum;
                    }

                    let reservationInfo = [
                        {key: "adultNum", value: adultNum},
                        {key: "roomNum", value: roomNum},
                        {key: "childNum", value: childNum},
                    ];

                    reservationInfo.forEach((v,i) => {
                        document.cookie = `${v.key}=${v.value};`;
                    })
                    
                })
            })
            minusBtn.forEach((v,i)=>{
                minusBtn[i].addEventListener("click", (e) => {
                    let targetLi = e.target.parentElement.parentElement.parentElement;
                    if (targetLi.classList.contains("adult")) {
                        if(adultNum <= 2) {
                            adultInput.value = 2;
                        } else {
                            adultNum--;
                            adultInput.value = adultNum;
                            if (adultNum < 12){
                                plusBtn[i].style.cssText = 'opacity:1;'
                                v.style.cssText = 'opacity: 1;'
                            }
                            if (adultNum == 2){
                                v.style.cssText = 'opacity: 0.3;'
                            }
                        }
                    } 
                    if (targetLi.classList.contains("room")) {
                        if(roomNum > 1) {
                            roomNum--;
                            if (roomNum !== 4){
                                plusBtn[i].style.cssText = 'opacity:1;'
                            }
                            if (roomNum == 1) {
                                minusBtn[i].style.cssText = 'opacity: 0.3;'
                            }
                        }
                        roomInput.value = roomNum;
                    }
                    if (targetLi.classList.contains("child")) {
                        if(childNum <= 0) {
                            childInput.value = 0;
                        } else {
                            childNum--;
                            childInput.value = childNum;
                            if (childNum < 12){
                                plusBtn[i].style.cssText = 'opacity:1;'
                                v.style.cssText = 'opacity: 1;'
                            }
                            if (childNum == 0){
                                v.style.cssText = 'opacity: 0.3;'
                            }
                        }
                    }
                    
                    let reservationInfo = [
                        {key: "adultNum", value: adultNum},
                        {key: "roomNum", value: roomNum},
                        {key: "childNum", value: childNum},
                    ];

                    reservationInfo.forEach((v,i) => {
                        document.cookie = `${v.key}=${v.value};`;
                    })
                })
            })
            if (roomInput.value == 4) {
                minusBtn[0].style.cssText = 'opacity:1;'
                plusBtn[0].style.cssText = 'opacity:0.3;'
            } else if (roomInput.value > 1) {
                minusBtn[0].style.cssText = 'opacity:1;'
            } else if (roomInput == 1) {
                minusBtn[0].style.cssText = 'opacity:0.3;'
            }
            if (adultInput.value == 12) {
                minusBtn[1].style.cssText = 'opacity:1;'
                plusBtn[1].style.cssText = 'opacity:0.3;'
            } else if (adultInput.value > 2) {
                minusBtn[1].style.cssText = 'opacity:1;'
            } else if (adultInput == 2) {
                minusBtn[1].style.cssText = 'opacity:0.3;'
            }
            if (childInput.value == 12) {
                minusBtn[2].style.cssText = 'opacity:1;'
                plusBtn[2].style.cssText = 'opacity:0.3;'
            } else if (childInput.value > 0) {
                minusBtn[2].style.cssText = 'opacity:1;'
            } else if (childInput == 0) {
                minusBtn[2].style.cssText = 'opacity:0.3;'
            }
 
            // [↓] step1 room list 뿌리기
            const loveRoomList = document.querySelector(".room_list_wrap.love")
            const onlyRoomList = document.querySelector(".room_list_wrap.only")
            
            let listWrite = (page) => {
                let type, listName;
                if (page === data.love) {
                    type = "love";
                    listName = loveRoomList;
                } else if (page === data.only) {
                    type = "only";
                    listName = onlyRoomList;
                }
                page.forEach((v,i)=>{
                    listName.innerHTML += `
                    <li>
                        <div class="room_img">
                            <img src="./img/img_sub2_room_${type + v.room_num+"_01.jpg"}" alt="${type} ${v.room_sqft}평">
                        </div>
                        <div class="room_info">
                            <p class="room_name">
                                <span class="tag ${type}">${type} YOU</span>
                                <span class="room_value_num">${v.room_num}호</span>
                                <span class="room_price">${v.room_price}원</span>
                            </p>
                            <ul>
                                <li>
                                    <p><span>객실크기</span>${v.room_sqft}평 (약 ${v.room_sqft * 3}㎡)</p>
                                </li>
                                <li>
                                    <p><span>객실구성</span>${v.room_personnel}</p>
                                </li>
                                <li>
                                    <p><span>최대인원</span>${v.room_composition}</p>
                                </li>
                                <li>
                                    <p><span>추가요금</span>${v.room_caution}</p>
                                </li>
                            </ul>
                            <div class="room_btn_wrap">
                                <button type="button" class="room_select_btn">선택</button>
                            </div>
                        </div>
                    </li>
                    `
                })
                const getDefaultPrice = document.querySelector(".room_price").textContent;
                defaultPrice = parseInt(getDefaultPrice) * 1000;
                document.cookie = `defaultPrice=${defaultPrice}`
            }
            
            listWrite(data.love)
            listWrite(data.only)
        
            // [↓] step1 객실 선택
            const roomBtn = document.querySelectorAll(".room_select_btn");
            let roomBtnSelected = 0; // 선택된 방의 수를 저장하는 변수
            let selectedRooms = []; // 선택된 방들의 정보를 저장할 배열

            roomBtn.forEach((v) => {
                // 중복 이벤트 핸들러 등록 방지를 위해 이중 등록 여부 확인
                v.removeEventListener("click", handleRoomSelection); // 기존 핸들러 제거
                v.addEventListener("click", handleRoomSelection);    // 새로운 핸들러 등록
            });
            function handleRoomSelection(e) {
                const roomBtnElement = e.target;
                const roomBtnParent = roomBtnElement.closest('.room_info');
                const roomPrice = roomBtnParent.querySelector('.room_price').textContent;
                const roomType = roomBtnParent.querySelector('.room_name .tag').className;
                const roomValueNum = roomBtnParent.querySelector('.room_name .room_value_num').textContent;
        
                // 방 정보 객체 생성
                const roomInfo = {
                    price: roomPrice,
                    type: roomType,
                    valueNum: roomValueNum
                };
        
                
               // 선택 해제 시 배열에서 제거 및 초기화
               if (roomBtnElement.classList.contains("selected")) {
                    roomBtnElement.classList.remove("selected");
                    selectedRooms = selectedRooms.filter(room => room.valueNum !== roomValueNum);
                    roomBtnSelected--; // 선택된 방의 수 감소

                    // 모든 방을 선택 해제하려면 selectedRooms 초기화
                    if (roomBtnSelected === 0) {
                        selectedRooms = []; // 배열 초기화
                    }
                } else {
                    // 선택되지 않은 상태에서 새로 선택하려는 경우
                    if (roomBtnSelected < roomNum) {
                        roomBtnElement.classList.add("selected");
                        selectedRooms.push(roomInfo);
                        roomBtnSelected++; // 선택된 방의 수 증가
                    } else {
                        alert('선택 가능한 객실 수를 초과하였습니다.');
                        return;
                    }
                }
            
                // 배열을 JSON 문자열로 변환하여 쿠키에 저장
                document.cookie = `roomInfo=${JSON.stringify(selectedRooms)}; path=/;`;
        
            }
        

                // localStorage에서 'room' 데이터 가져오기
                const step2RoomData = JSON.parse(localStorage.getItem('room'));

                // 해당 roomType과 roomNum을 추출
                if (step2RoomInfo) {
                    step2RoomType = step2RoomData.type;
                    step2RoomNum = step2RoomData.num;

                    // 모든 li 요소를 순회하면서 조건에 맞는 요소를 찾음
                    document.querySelectorAll('li').forEach(li => {
                        const roomValueNumElement = li.querySelector('.room_value_num');
                        const tagTypeElement = li.querySelector('.tag');
    
                        // roomValueNumElement와 tagTypeElement가 존재하는지 확인
                        if (roomValueNumElement && tagTypeElement) {
                            const roomValueNum = roomValueNumElement.textContent.replace('호', '');
                            const tagType = tagTypeElement.classList.contains(step2RoomType);
    
                            // roomNum과 roomType이 일치하는지 확인
                            if (roomValueNum === step2RoomNum && tagType) {
                                // 일치하는 요소의 room_select_btn에 selected 클래스 추가
                                const roomSelectBtn = li.querySelector('.room_select_btn');
                                if (roomSelectBtn) {
                                    roomSelectBtn.classList.add('selected');
                                    
                                    // 이미 selected 상태일 경우 배열에 추가
                                    const roomPrice = li.querySelector('.room_price').textContent;
                                    const roomInfo = {
                                        price: roomPrice,
                                        type: tagTypeElement.className,
                                        valueNum: roomValueNum
                                    };
                                    selectedRooms.push(roomInfo);
                                    roomBtnSelected = selectedRooms.length; // 선택된 방의 수 업데이트
                                    defaultPrice = parseInt(roomPrice) * 1000;
                                    document.cookie = `defaultPrice=${defaultPrice}`
                                }
                            }
                        }
                    });
                }

            
            // [↓] step1 정보 입력 버튼 (다음페이지로 넘어가는 버튼)
            nextBtn.addEventListener("click", (e) => {
                if (roomBtnSelected < roomNum) {
                    alert(`최소 ${roomNum}개의 객실을 선택해주세요.`);
                } else {
                    window.location.href = './sub6_reservation_step2.html';
                }
            });



        }
    
        // *****************[step2]******************* //
        // [↓] step2 card input
        const step2 = document.querySelector(".step2")
        const card = document.querySelector(".card")
        const cardAllInput = document.querySelectorAll(".input_list li input")
        const cardCvcInput = document.querySelector(".input_list .card_cvc")
        const cardNumInput = document.querySelector(".input_list .card_num")
        const cardNum = document.querySelector(".card_data .num")
        const cardFirstNameInput = document.querySelector(".input_list .card_name.first")
        const cardLastNameInput = document.querySelector(".input_list .card_name.last")
        const cardFirstName = document.querySelector(".card_data .name.first")
        const cardLastName = document.querySelector(".card_data .name.last")
        const cardYearInput = document.querySelector(".input_list .card_date.year")
        const cardMonthInput = document.querySelector(".input_list .card_date.month")
        const cardYear = document.querySelector(".card_data .date.year")
        const cardMonth = document.querySelector(".card_data .date.month")
        const cardCvc = document.querySelector(".card_back .cvc_num")
        const paymentBtn = document.querySelector(".payment_btn.member")
            
        if (step2) {
            if(step2RoomInfo) {
                onlyType=objStep2RoomInfo.type;
                valueNum=objStep2RoomInfo.num;
            }
            cardAllInput.forEach((v,i)=>{
                if(v.classList.contains("card_cvc")){
                    cardCvcInput.addEventListener("focus", ()=>{
                        card.classList.add("on")
                    }) 
                } else {
                    v.addEventListener("focus", ()=>{
                        card.classList.remove("on")
                    })
                    cardMonthInput.addEventListener("click", ()=>{
                        card.classList.remove("on")
                    })
                }
            })
            cardNumInput.addEventListener("input",(e)=>{
                let input = e.target;
                let value = input.value;
                
                // 숫자만 남기고 문자를 제거
                let numericValue = value.replace(/\D/g, '');
            
                let formattedValue = '';
                for (let i = 0; i < numericValue.length; i++) {
                    if (i > 0 && i % 4 === 0) {
                        formattedValue += ' ';
                    }
                    formattedValue += numericValue[i];
                }
            
                input.value = formattedValue;
                cardNum.innerHTML = formattedValue;
            })
            cardFirstNameInput.addEventListener("input", (e)=>{
                let input = e.target;
                let value = input.value;
                
                // 문자만 남기고 숫자 제거
                let stringicValue = value.replace(/[^a-zA-Z]/g, '');
                
                let formattedValue = '';
                for (let i = 0; i < stringicValue.length; i++) {
                    formattedValue += stringicValue[i];
                }
            
                input.value = formattedValue;
                cardFirstName.innerHTML = formattedValue;
            })
            cardLastNameInput.addEventListener("input", (e)=>{
                let input = e.target;
                let value = input.value;
                
                // 문자만 남기고 숫자 제거
                let stringicValue = value.replace(/[^a-zA-Z]/g, '');
                
                let formattedValue = '';
                for (let i = 0; i < stringicValue.length; i++) {
                    formattedValue += stringicValue[i];
                }
            
                input.value = formattedValue;
                cardLastName.innerHTML = formattedValue;
            })
            cardYearInput.addEventListener("input", (e)=>{
                let input = e.target;
                let value = input.value;
                
                // 숫자만 남기고 문자를 제거
                let numericValue = value.replace(/\D/g, '');
                
                let formattedValue = '';
                for (let i = 0; i < numericValue.length; i++) {
                    formattedValue += numericValue[i];
                }
            
                input.value = formattedValue;
                cardYear.innerHTML = formattedValue;
            })
            cardMonthInput.addEventListener("input", (e)=>{
                cardMonth.innerText = e.target.value;
            })
            cardCvcInput.addEventListener("input", (e)=>{
                let input = e.target;
                let value = input.value;
                
                // 숫자만 남기고 문자를 제거
                let numericValue = value.replace(/\D/g, '');
                
                let formattedValue = '';
                for (let i = 0; i < numericValue.length; i++) {
                    formattedValue += numericValue[i];
                }
            
                input.value = formattedValue;
                cardCvc.innerHTML = formattedValue;
            })
            
            const cookie = document.cookie.split(';');
            for(let i=0;i <cookie.length; i++) {
                const getDataName = cookie[i].split('=')[0]
                const getData = cookie[i].split('=')[1]

                // 객실 수
                if (getDataName.includes('roomNum')) {
                    room_data.innerHTML = getData;
                    mb_room_data.innerHTML = getData;
                    roomNum = getData;
                } else if(getDataName.includes('defaultRoom')) {
                    room_data.innerHTML = getData;
                    mb_room_data.innerHTML = getData;
                    roomNum = getData;
                }

                // 성인, 어린이 수
                if (getDataName.includes('adultNum')) {
                    adult_num.innerHTML = getData;
                    mb_adult_num.innerHTML = getData;
                    adultNum = getData;
                } else if (getDataName.includes('defaultAdult')){
                    adult_num.innerHTML = getData;
                    mb_adult_num.innerHTML = getData;
                    adultNum = getData;
                }
                
                if (getDataName.includes('childNum')) {
                    child_num.innerHTML = getData;
                    mb_child_num.innerHTML = getData;
                    childNum = getData;
                } else if (getDataName.includes('defaultChild')){
                    child_num.innerHTML = getData;
                    mb_child_num.innerHTML = getData;
                    childNum = getData;
                }

                // 가격, 타입, 호수
                if (getDataName.includes('defaultPrice')) {
                    primary.innerHTML = getData;
                    sale.innerHTML = getData * 0.8;
                    mb_sale.innerHTML = getData * 0.8;
                } else if (getDataName.includes('roomInfo')) {
                    primary.innerHTML = '';
                    sale.innerHTML = '';
                    mb_sale.innerHTML = '';
                    let roomInfoArray = JSON.parse(getData);
                    if (roomInfoArray.length > 0) {
                        let totalPrimaryPrice = 0; // 누적할 변수를 선언
                        roomInfoArray.forEach((v, i) => {
                            let primaryPrice = parseInt(roomInfoArray[i].price) * 1000;
                            totalPrimaryPrice += primaryPrice;
                        });
                        primary.innerHTML += totalPrimaryPrice;
                        sale.innerHTML += totalPrimaryPrice * 0.8;
                        mb_sale.innerHTML += totalPrimaryPrice * 0.8;
                    }
                }

                let roomTagNum = document.querySelector(".room_tag_num")
                let roomTagNumMb = document.querySelector(".mb_room_tag_num")
                if (getDataName.includes('defaultType')) {
                    roomTagNum.innerHTML += `
                    <span>
                        <span id="mb_tag" class="${onlyType}">${onlyType}</span>
                        <em id="mb_room_num_value">${valueNum}호</em>
                    </span>
                    `
                    roomTagNumMb.innerHTML += `
                    <span>
                        <span id="mb_tag" class="${onlyType}">${onlyType}</span>
                        <em id="mb_room_num_value">${valueNum}</em>
                    </span>
                    `
                } else if (getDataName.includes('roomInfo')) {
                    let roomInfoArray = JSON.parse(getData);
                    let roomTagNum = document.querySelector(".room_tag_num")
                    let roomTagNumMb = document.querySelector(".mb_room_tag_num")
                    if (roomInfoArray.length > 0) {
                        roomTagNum.innerHTML = '';
                        roomTagNumMb.innerHTML = '';
                        roomInfoArray.forEach((v, i) => {
                            onlyType = v.type.substring(v.type.lastIndexOf(',') + 5);
                            valueNum = v.valueNum;
                            roomTagNum.innerHTML += `
                            <span>
                                <span id="mb_tag" class="${onlyType}">${onlyType}</span>
                                <em id="mb_room_num_value">${valueNum}</em>
                            </span>
                            `
                            roomTagNumMb.innerHTML += `
                            <span>
                                <span id="mb_tag" class="${onlyType}">${onlyType}</span>
                                <em id="mb_room_num_value">${valueNum}</em>
                            </span>
                            `
                        });
                    }
                }
                

                // 날짜
                const start_date = document.getElementById('start_date');
                const mb_start_date = document.getElementById('mb_start_date');
                const end_date = document.getElementById('end_date');
                const mb_end_date = document.getElementById('mb_end_date');
                if (quick) {
                    start_date.innerHTML = startDate;
                    mb_start_date.innerHTML = startDate;
                    end_date.innerHTML = endDate;
                    mb_end_date.innerHTML = endDate;

                    setStartDate = startDate;
                    setEndDate = endDate;
                } else {
                    if (getDataName.includes(`startDate`) || getDataName.includes(`endDate`)){
                        let pullDate = (range) => {
                            if (getDataName.includes(`${range}Date`)){
                                const date = new Date(getData);
                                const getYear = date.getFullYear();
                                const getMonth = String(date.getMonth() + 1).padStart(2, '0');
                                const getDay = String(date.getDate()).padStart(2, '0');
                                
                                const elements = {
                                    date: document.getElementById(`${range}_date`),
                                    mb_date: document.getElementById(`mb_${range}_date`)
                                };
        
                                const formattedDate = `${getYear}. ${getMonth}. ${getDay}`;
                                elements.date.innerHTML = formattedDate;
                                elements.mb_date.innerHTML = formattedDate;

                                if (range === 'start') {
                                    setStartDate = formattedDate;
                                } else if (range === 'end') {
                                    setEndDate = formattedDate;
                                }
                            }
                        }
                        pullDate('start');
                        pullDate('end');
                    } else if(getDataName.includes(`defaultStartDate`) || getDataName.includes(`defaultEndDate`)){
                        let today = new Date();
                        let tomorrow = new Date(today);
                        tomorrow.setDate(today.getDate() + 1);
                        const getYear = today.getFullYear();
                        const getMonth = String(today.getMonth() + 1).padStart(2, '0');
                        const getDay = String(today.getDate()).padStart(2, '0');
                        const getTmYear = tomorrow.getFullYear();
                        const getTmMonth = String(tomorrow.getMonth() + 1).padStart(2, '0');
                        const getTmDay = String(tomorrow.getDate()).padStart(2, '0');

                        setStartDate = `${getYear}. ${getMonth}. ${getDay}`;
                        setEndDate = `${getTmYear}. ${getTmMonth}. ${getTmDay}`;

                        start_date.innerHTML = setStartDate;
                        mb_start_date.innerHTML = setStartDate;
                        end_date.innerHTML = setEndDate;
                        mb_end_date.innerHTML = setEndDate;
                    }
                }
            }



            let setRoom = {
                ea: (room_data.textContent),
                adult: adult_num.textContent,
                child: child_num.textContent,
                roomInfo:[
                    {type:onlyType, roomNumber:valueNum},
                ],
                setStartDate: setStartDate, // 할당된 값을 setRoom 객체에 포함
                setEndDate: setEndDate // 할당된 값을 setRoom 객체에 포함
            }
            localStorage.setRoom = JSON.stringify( setRoom )
    
            paymentBtn.addEventListener("click", ()=>{
                let insertInfo = JSON.parse( localStorage.set );
                let saveInfo = JSON.parse( localStorage.res );

                localStorage.res = JSON.stringify( [...b,a] )           
            })
            if(isLogin === 'true') {
                payment_btn.innerText = '회원 예약';
                mb_payment_btn.innerText = '회원 예약';
            } else {
                payment_btn.innerText = '비회원 예약';
                mb_payment_btn.innerText = '비회원 예약';
            }
        }
        


        // *****************[step3]******************* //
        const step3 = document.querySelector(".step3")
        const txtWrap = document.querySelector(".complete_wrap .txt_wrap")
        let nonMemNum = '';
        if (step3) {

            nonMemNum = new Date() * (1);
            if(isLogin === 'true') {
                txtWrap.innerHTML = `
                <p>
                    <span>다온펜션의 다양한 혜택과 서비스를 경험해보세요.<br/>언제든 온라인으로 예약을 확인, 변경 또는 취소하실 수 있습니다.</span>
                </p>
                `
            } else {
                localStorage.setItem("nonMemNum", nonMemNum)
                txtWrap.innerHTML = `
                <p>
                    <strong>
                        비회원 예약이 완료되었습니다.
                        <span>예약코드 : {AA${nonMemNum}}</span>
                    </strong>
                    <span>다온펜션의 다양한 혜택과 서비스를 경험해보세요.<br/>언제든 온라인으로 예약을 확인, 변경 또는 취소하실 수 있습니다.</span>
                </p>
                `
            }
        }

        // *****************[look]******************* //
        const look = document.querySelector(".look")
        const chkInput = document.querySelector(".non_mem_num_chk")
        if(look) {
            if(isLogin === 'true') {
                isMem.addEventListener("click",()=>{
                    window.location.href="./mypage.html"
                })
            } else {
                isMem.addEventListener("click",()=>{
                    window.location.href="./login.html"
                })
            }
            non_member_btn.addEventListener("click", (e)=>{
                let getNonMemNum = localStorage.getItem("nonMemNum")
                if(chkInput.value === 'AA'+getNonMemNum) {
                    window.location.href='./mypage.html'
                } else {
                    alert('번호를 다시 확인해주세요.')
                }
            })
        }
    })
    
})