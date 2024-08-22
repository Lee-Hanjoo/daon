document.addEventListener("DOMContentLoaded", () => {
    fetch("./data/sub4.json")
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        //1. 컨텐츠 뿌리기
        const elContents = document.querySelector('.around_spot .contents');
        data.sub4_cards.forEach((card) => {
            //tlong의 엔터(\n) -> <br> 태그로 바꾸기
            let tlongHTML = card.tlong.replace('\n', '<br>');
            //html 넣기(유지보수(ex데이터추가)를 위해서 innerHTML로 넣는게 더 효율적)
            elContents.innerHTML += `<article class="sub4_card">
                                        <div class="card_name">
                                            <strong>
                                                ${card.name}
                                            </strong>
                                            <div class="card_name_eng">
                                                <p>
                                                ${card.eng}
                                                </p>
                                                <a href="${card.link}"  target="_blank"><img src="./img/icon/icon_link.svg" alt="링크 아이콘"></a>
                                            </div>
                                        </div>
                                        <div class="card_img">
                                            <div class="imgbox">
                                                <img src="${card.img[0].src}" alt="${card.img[0].alt}">
                                            </div>
                                            <div class="imgbox">
                                                <img src="${card.img[1].src}" alt="${card.img[1].alt}">
                                            </div>
                                        </div>
                                        <div class="card_txt">
                                            <ul class="txt_short">
                                                <li>
                                                    ${card.tshort[0]}
                                                </li>
                                                <li>
                                                    ${card.tshort[1]}
                                                </li>
                                                <li>
                                                    ${card.tshort[2]}
                                                </li>
                                            </ul>
                                            <div class="txt_long">
                                                <p>
                                                    ${tlongHTML}
                                                </p>
                                            </div>
                                        </div>
                                    </article>`;
        })
        //2. 스크롤 인터렉션(IntersectionObserver)
        const elCard = document.querySelectorAll('.sub4_card');
        const interactive = function(entries){
            entries.forEach((article) => {
                if(article.isIntersecting == true){
                    article.target.classList.add('active');
                    intersection.unobserve(article.target);
                }
            })
        }
        const option = {threshold: 0.05};
        const intersection = new IntersectionObserver(interactive, option);
        for(let i=0; i<elCard.length; i++){
            intersection.observe(elCard[i]);
        }
    })
})