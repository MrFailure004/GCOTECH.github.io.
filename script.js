/* ===========================
   MOBILE MENU
=========================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");

if(menuBtn && navLinks){

    menuBtn.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("show");

        menuBtn.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });

    navItems.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}

/* ===========================
   ACTIVE NAVIGATION
=========================== */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if(window.scrollY >= sectionTop){
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === `#${current}`){
            link.classList.add("active");
        }

    });

});

/* ===========================
   IN-CHARGE AUTO SLIDER
=========================== */

const teamSlider = document.querySelector(".grid-2");

let sliderTimer;

function startAutoScroll(){

    if(!teamSlider) return;

    sliderTimer = setInterval(()=>{

        const cardWidth = 420;

        if(
            teamSlider.scrollLeft +
            teamSlider.clientWidth >=
            teamSlider.scrollWidth - 10
        ){

            // Return to beginning
            teamSlider.scrollTo({
                left:0,
                behavior:"smooth"
            });

        }
        else{

            // Move next card
            teamSlider.scrollBy({
                left:cardWidth,
                behavior:"smooth"
            });

        }

    },3000);

}

function stopAutoScroll(){
    clearInterval(sliderTimer);
}

// Start slider
startAutoScroll();

// Pause when mouse enters / touch
if(teamSlider){

    teamSlider.addEventListener(
        "mouseenter",
        stopAutoScroll
    );

    teamSlider.addEventListener(
        "mouseleave",
        startAutoScroll
    );

    // Mobile touch support
    teamSlider.addEventListener(
        "touchstart",
        stopAutoScroll
    );

    teamSlider.addEventListener(
        "touchend",
        startAutoScroll
    );

}

/* ===========================
   SMOOTH REVEAL ANIMATION
=========================== */

const revealItems = document.querySelectorAll(
    ".info-card, .profile-card, .glass-box, .event-box"
);

const observer = new IntersectionObserver(
(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";
            entry.target.style.transform="translateY(0)";

        }

    });

},
{
    threshold:0.15
});

revealItems.forEach(item=>{

    item.style.opacity="0";
    item.style.transform="translateY(30px)";
    item.style.transition=
    "all .6s ease";

    observer.observe(item);

});
