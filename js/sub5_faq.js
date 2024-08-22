document.addEventListener("DOMContentLoaded", () => {
  fetch("./data/sub5_faq.json")
    .then((res) => res.json())
    .then((res) => {
      const data = res.black;
      const a = document.querySelector(".faq_wrap ul");
      const col = ["blue", "green", "purple", "yell"];
      const cate = document.querySelectorAll(".categories ul li a");
      const abc = document.querySelector(".abc");

      console.log(abc);

      let tem = function (type) {
        a.innerHTML = "";

        data.forEach((item) => {
          let t;

          switch (item.t) {
            case "예약":
              t = col[0];
              break;
            case "시설":
              t = col[1];
              break;
            case "오시는길":
              t = col[2];
              break;
            case "기타":
              t = col[3];
              break;
            
          }
          if (item.t == type || type == "all") {
            a.innerHTML += `
      
            <div class="faq_wrap">
            <ul class="faq">
              <li>
              <div class="question reservation">
              <span class="${t}">${item.t}</span>
                  <p>${item.q}</p>
                  <button><img src="./img/icon/icon_comunity_faq_arrow-bottom.svg" /></button>
                  </div>
                  <div class="answer">
                  ${item.a}
                  </div>
                  </li>`;
          }
        });

        const b = a.querySelectorAll(".question");
        const answer = document.querySelectorAll(".answer");

        b.forEach((v, i) => {
          v.onclick = function () {
            answer.forEach((b, q) => {
              answer[q].classList.remove("active");
            });
            answer[i].classList.add("active");
          };
        });

        document.querySelectorAll('.question').forEach(button => {
          button.addEventListener('click', () => {
              button.querySelector('img').classList.toggle('rotate');
          });
      });
      };

      tem("all");



      cate.forEach((v, i) => {
        cate[i].onclick = function (e) {
          e.preventDefault();
          let categories = this.getAttribute("href");

          if (categories === "전체") {
            abc.innerHTML = `
              <p class="abc">
              ${categories}을(를) 선택하셨네요! 모든 관련 리스트를 보여드릴게요!
              </p>`;
            tem("all");
          } else {
            abc.innerHTML = `
              <p class="abc">
                ${categories}을(를) 선택하셨네요! 관련 리스트를 보여드릴게요!
              </p>`;
            tem(categories);
          }
        };
      });

      
    });
});