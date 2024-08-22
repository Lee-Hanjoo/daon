document.addEventListener("DOMContentLoaded", () => {

    //Intro Grid Image Scroll Event
    const intro_grid = document.querySelectorAll('.intro_grid_wrapper p');

    const grid_animate = new IntersectionObserver(function(entry){
        entry.forEach((v,i)=>{
            if(v.isIntersecting){
                setTimeout(()=>{
                    v.target.classList.add('intro_fadein');
                },50*i)
            }
        })
    });

    intro_grid.forEach((v)=>{
        grid_animate.observe(v);
    })

    //Intro Full Background Scroll Event
    const intro_full = document.querySelectorAll('.intro_full_bg');

    const expand_animate = new IntersectionObserver(function(entry){
        entry.forEach((v)=>{
            if(v.isIntersecting){
                v.target.classList.add('intro_expand');
            }
        })
    })

    intro_full.forEach((v)=>{
        expand_animate.observe(v);
    })

})