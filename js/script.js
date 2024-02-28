let tl = gsap.timeline();
const tlMenu = gsap.timeline({ paused: true });
let h1s = document.querySelectorAll(".page2 h1");


for (let i = 1; i <= 27; i++) {
    const rows = [4, 6, 3, 5, 6, 3, 6, 6, 3, 7, 6, 4, 3, 4, 5, 7, 6, 7, 3, 3, 4, 8, 4, 7, 3, 6, 7];
    document.querySelector(`.image-container:nth-child(${i})`).style.gridRow = `span ${rows[i - 1]}`;
}



// Calling Functions
loadingAnimation();
locomotive();
scroll_Trigger();


// Infinite marquee
h1s.forEach(h1 => {
    h1.onmouseenter = () => {
        setTimeout(marqueeAnimation, 100);

        let image = h1.getAttribute("data-image");
        let imgContainer = document.querySelector(".page2 img");
        imgContainer.src = image;


        gsap.to(imgContainer, {
            opacity: 0,
            duration: .1,
            onComplete: () => {
                gsap.to(imgContainer, {
                    opacity: 1
                })
            }
        })

        gsap.to(h1, {
            color: "black",
            duration: .1,
            ease: "none",
        })
    }

    h1.onmouseleave = () => {
        gsap.to(h1, {
            color: "white",
            duration: 1,
            ease: "none",
        })
    }
})






// Improtand functions
function loadingAnimation() {
    tl
        .to(".loader .yellow", {
            top: "-100%",
            delay: .5,
            ease: "expo.out",
            onComplete: () => {
                document.querySelector(".loader .video-hider").style.backgroundColor = "transparent";
            }
        })

        .to(".loader video, .loader h1", {
            opacity: 0,
            duration: .1,
            onComplete: () => {
                document.querySelector(".loader video").setAttribute("autoplay", "false");
            }
        }, "+=1.5")

        .to(".loader", {
            top: "-100%",
            ease: "expo.out",
        }, "anim")

        .to(".page1 h1", {
            color: "black",
        }, "anim")

        .set(".loader", {
            display: "none"
        })
}

function marqueeAnimation() {
    const stripe = document.querySelectorAll('.stripe');
    stripe.forEach(e => {
        const stripeWidth = e.clientWidth;
        const stripeHeight = e.clientHeight;


        let stripeSpan = document.querySelectorAll(".page2 h1 span");
        stripeSpan.forEach(f => {
            f.style.height = stripeHeight + "px";
        });

        gsap.fromTo(e,
            { left: '0%' },
            {
                left: `calc(100vw - ${stripeWidth}px)`,
                duration: 20,
                ease: 'linear',
                repeat: -1,
                yoyo: true,
            }
        );
    })
}

function locomotive() {

    gsap.registerPlugin(ScrollTrigger);

    const scroll = new LocomotiveScroll({
        el: document.querySelector("main"),
        smooth: true,
        mobile: { smooth: true },
        tablet: { smooth: true },
        smartphone: { smooth: true },
    });

    scroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy("main", {
        scrollTop(value) {
            return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => scroll.update());
    ScrollTrigger.refresh();








    const scroll2top = document.querySelector("footer .top-container");
    scroll2top.onclick = () => {
        scroll.scrollTo("top");
    }
    const scroll2page2 = document.querySelector(".page1-bottom img");
    scroll2page2.onclick = () => {
        scroll.scrollTo(".page2");
    }
    const scroll2page3 = document.querySelector(".page2 #scroll-down");
    scroll2page3.onclick = () => {
        scroll.scrollTo(".page3");
    }
}

function scroll_Trigger() {

    tl
        .to("nav .cross", {
            rotate: 225,
            duration: 1.5,
            ease: "back.inOut(2)",
            scrollTrigger: {
                scroller: "main",
                trigger: "main",
                start: "top top",
                end: "top -1px",
                scrub: 5
            }
        }, "01")
        .to("nav ul li:nth-child(3), nav ul li:nth-child(2)", {
            width: 0,
            duration: 1.5,
            opacity: 0,
            stagger: .1,
            ease: "back.inOut(2)",
            scrollTrigger: {
                scroller: "main",
                trigger: "main",
                start: "top top",
                end: "top -1px",
                scrub: 5
            }
        }, "01")
        .to("nav ul", {
            gap: "1vw",
            duration: 1.5,
            ease: "back.inOut(2)",
            scrollTrigger: {
                scroller: "main",
                trigger: "main",
                start: "top top",
                end: "top -1px",
                scrub: 5
            },
        }, "01")
        .to("nav", {
            padding: "10px 25px",
            // duration: 1,
            ease: "power4.out",
            scrollTrigger: {
                scroller: "main",
                trigger: "main",
                start: "top top",
                end: "top -1px",
                scrub: 1,
            }
        }, "-=1")



    let count = 1;
    document.querySelector("nav .cross").onclick = () => {

        if (count) {
            tlMenu.play();
            count--;
        } else {
            tlMenu.reverse();
            count++;
        }


        tlMenu
            .to("nav .cross", {
                rotate: 225,
                duration: 1.5,
                ease: "back.inOut(2)",
            }, "02")
            .to("nav ul li:nth-child(3), nav ul li:nth-child(2)", {
                width: 0,
                duration: 1.5,
                opacity: 0,
                stagger: .1,
                ease: "back.inOut(2)",
            }, "02")
            .to("nav ul", {
                gap: "1vw",
                duration: 1.5,
                ease: "back.inOut(2)",
            }, "02")
            .to("nav", {
                padding: "10px 55px",
                // duration: 1,
                ease: "power4.out",
            }, "-=1")
    }
}