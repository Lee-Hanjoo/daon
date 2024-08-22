document.addEventListener("DOMContentLoaded", () => {

    // [↓] datepicker
    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const day = document.querySelectorAll("ul li .date span")
    const weekDay = ['일', '월', '화', '수', '목', '금', '토'];
    const todayWeekDay = weekDay[today.getDay()];
    const tomorrowWeekDay = weekDay[tomorrow.getDay()];
    day.forEach((v,i)=>{
        day[0].innerText = `(${todayWeekDay})`;
        day[1].innerText = `(${tomorrowWeekDay})`;
    })
    let picker = tui.DatePicker.createRangePicker({
        language: 'ko',
        startpicker: {
            date: today,
            input: '#startpicker-input',
            container: '#startpicker-container'
        },
        endpicker: {
            date: tomorrow,
            input: '#endpicker-input',
            container: '#endpicker-container'
        },
        selectableRanges: [
            [today, new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())]
        ],
        format: 'YYYY. MM. dd',
    });

    function getDayOfWeek(date) {
        if (!date) { return '날짜를 선택해주세요.'; }
        var dayOfWeek = date.getDay();
        var daysOfWeek = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
        return daysOfWeek[dayOfWeek];
    }
    
    picker.getStartpicker().on('change', function() {
        var selectedDate = picker.getStartpicker().getDate();
        day[0].innerHTML = `${getDayOfWeek(selectedDate)}`;
        document.cookie = `startDate=${selectedDate}`
    });
    
    picker.getEndpicker().on('change', function() {
        var selectedDate = picker.getEndpicker().getDate();
        day[1].innerHTML = `${getDayOfWeek(selectedDate)}`;
        document.cookie = `endDate=${selectedDate}`
        if(day[1].innerText !== '날짜를 선택해주세요.') { 
            day[1].style.cssText = 'margin-left:0px;'
        } else {
            day[1].style.cssText = 'margin-left:-140px; font-weight: 700;'
        }
    });
})