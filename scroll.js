// ================================================
// 0. 스크롤 위치 초기화
// ================================================
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

gsap.registerPlugin(ScrollTrigger);


// ================================================
// 1. HEADER — 등장 애니메이션 + 스크롤 시 배경 전환
// ================================================
// gsap.to("header", {
//     y: 0,
//     opacity: 1,
//     duration: 0.8,
//     ease: "power2.out",
//     delay: 0.5
// });

// 스크롤하면 헤더에 반투명 배경 + blur 생기도록
// ScrollTrigger.create({
//     start: "100px top",
//     onEnter: () => {
//         gsap.to("header", {
//             backgroundColor: "rgba(245,245,245,0.85)",
//             backdropFilter: "blur(10px)",
//             boxShadow: "0 1px 20px rgba(25,25,56,0.07)",
//             duration: 0.4
//         });
//     },
//     onLeaveBack: () => {
//         gsap.to("header", {
//             backgroundColor: "transparent",
//             backdropFilter: "blur(0px)",
//             boxShadow: "none",
//             duration: 0.4
//         });
//     }
// });

// 헤더 nav 링크 hover underline 효과 (CSS로 주입)
const headerStyle = document.createElement('style');
headerStyle.textContent = `
    /* [기본 세팅] 모든 페이지 공통 구조 */
    header ul li a {
        position: relative;
        transition: color 0.3s ease;
    }
    header ul li a::after {
        content: '';
        position: absolute;
        bottom: -0.2vw;
        left: 0;
        width: 0%;
        height: 0.1vw;
        background-color: #191938; /* 기본 밑줄 색상 (진한 네이비) */
        transition: width 0.3s ease, background-color 0.3s ease; /* 색상 변할 때도 부드럽게 */
    }

    /* ----------------------------------------------------
       1. [메인 페이지 상태] 투명 배경일 때의 호버 스타일
       ---------------------------------------------------- */
    header:not(.white-mode) ul li a:hover {
        color: #191938 !important; /* 글자색 진한 네이비로 변경 */
    }
    header:not(.white-mode) ul li a:hover::after {
        width: 100%;
        background-color: #191938; /* 밑줄 진한 네이비 */
    }

    /* ----------------------------------------------------
       2. [서브 콘텐츠 페이지 상태] .white-mode (배경 #191938) 일 때의 호버 스타일
       ---------------------------------------------------- */
    /* 🎯 너가 말한 대로 서브 영역에서는 글자색은 화이트로 유지하고, 밑줄만 화이트로 슥 그어지게 세팅! */
    header.white-mode ul li a:hover {
        color: #FFFFFF !important; /* 배경이 네이비니까 글자색은 화이트 유지! */
    }
    header.white-mode ul li a:hover::after {
        width: 100%;
        background-color: #FFFFFF; /* 🎯 [핵심] 밑줄 컬러만 화이트로 변경! */
    }
`;
document.head.appendChild(headerStyle);


// ================================================
// 2. #main — nomero icon 회전 + arrow bounce
// ================================================

// nomero 아이콘 — 천천히 무한 회전
gsap.to(".nomoro-icon", {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: "none"
});

// arrow — 위아래 bounce (페이지 로드 후 0.8초 뒤 시작)
gsap.to(".bg-bottom .arrow", {
    y: "0.8vw",
    duration: 0.9,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    delay: 0.8
});

// main 텍스트 두 개 — 페이지 로드 시 fade-in
// gsap.from(".bg-section p", {
//     opacity: 0,
//     y: "2vw",
//     duration: 1.2,
//     stagger: 0.3,
//     delay: 1,
//     ease: "power2.out",
//     clearProps: "opacity,y,transform" // ★ 애니메이션 끝나면 인라인 스타일 제거
// });
// nomero-main-txt 로고 — 아래에서 등장
gsap.from(".nomero-main-txt", {
    opacity: 0,
    y: "3vw",
    duration: 1.2,
    delay: 0.8,
    ease: "power2.out"
});




// ================================================
// 3. #BACKGROUND — 기존 scroll.js 인터랙션 유지
// ================================================
gsap.from("#BACKGROUND .back-top h2", {
    x: "-10vw",
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power1.out",
    stagger: 0.35,
    scrollTrigger: {
        trigger: "#BACKGROUND",
        start: "top bottom",
        toggleActions: "play reverse play reverse",
        markers: false
    }
});

// 기존 gsap.from을 지우고 이 코드로 변경해봐!
gsap.fromTo("#BACKGROUND .back-top p", 
    {
        // 1. 애니메이션이 '시작할 때'의 상태 (밑에 있고 투명함)
        y: "15vw",
        opacity: 0
    }, 
    {
        // 2. 애니메이션이 '완성되었을 때'의 상태 (제자리에 오고 선명함)
        y: "0vw",
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: "power1.out",
        stagger: 0.35,
        scrollTrigger: {
            trigger: "#BACKGROUND .back-top h2",
            start: "top bottom",
            // ★ 핵심: 위로 올라갈 때는 아래로 기어내려가지 않고, 그 자리에서 투명해지며 리셋(reset)됨!
            toggleActions: "play reset play reset", 
            markers: false
        }
    }
);

gsap.from("#BACKGROUND .back-graph .circle-1", {
    y: "9vw",
    opacity: 0,
    duration: 0.6,
    delay: 0.2,
    ease: "power1.out",
    stagger: 0.35,
    scrollTrigger: {
        trigger: "#BACKGROUND .back-graph .circle-1",
        start: "top bottom",
        toggleActions: "play reverse play reverse",
        markers: false
    }
});

gsap.from("#BACKGROUND .back-graph .circle-2", {
    opacity: 0,
    scale: 0.3,
    duration: 0.8,
    delay: 0.5,
    ease: "power1.out",
    stagger: 0.35,
    scrollTrigger: {
        trigger: "#BACKGROUND .back-graph .circle-2",
        start: "top bottom",
        toggleActions: "play reverse play reverse",
        markers: false
    }
});

gsap.from("#BACKGROUND .back-graph .graph-1-p", {
    opacity: 0,
    duration: 0.8,
    delay: 1.4,
    ease: "power1.out",
    stagger: 0.35,
    scrollTrigger: {
        trigger: "#BACKGROUND .back-graph .graph-1-p",
        start: "top bottom",
        toggleActions: "play reverse play reverse",
        markers: false
    }
});



gsap.from("#BACKGROUND .back-graph .graph-1 .line", {
    x: "-2vw",
    width: "0%",
    opacity: 0,
    scale: 0.3,
    duration: 0.8,
    delay: 0.6,
    ease: "power1.out",
    stagger: 0.35,
    scrollTrigger: {
        trigger: "#BACKGROUND .back-graph .graph-1 .line",
        start: "top bottom",
        toggleActions: "play reverse play reverse",
        markers: false
    }
});

gsap.from("#BACKGROUND .back-graph .graph-1-des", {
    y: "4vw",
    opacity: 0,
    duration: 0.8,
    delay: 1,
    ease: "power1.out",
    stagger: 0.35,
    scrollTrigger: {
        trigger: "#BACKGROUND .back-graph .graph-1-des",
        start: "top bottom",
        toggleActions: "play reverse play reverse",
        markers: false
    }
});

gsap.from("#BACKGROUND .back-graph .graph-2 img", {
    // y: "4vw",
    rotate: -15,
    opacity: 0,
    duration: 0.8,
    delay: 1.1,
    ease: "power1.out",
    stagger: 0.35,
    scrollTrigger: {
        trigger: "#BACKGROUND .back-graph .graph-2 img",
        start: "top bottom",
        toggleActions: "play reverse play reverse",
        markers: false
    }
});


gsap.to("#BACKGROUND .graph-2 .line", {
    clipPath: "inset(0 0% 0 0)", 
    duration: 1.5,              
    delay: 1.3,
    ease: "power2.out",      
    scrollTrigger: {
        trigger: "#BACKGROUND .graph-2",
        start: "top bottom-=10%",       
        toggleActions: "play reverse play reverse", 
        markers: false                  
    }
});

gsap.from("#BACKGROUND .back-graph .graph-2 .dot", {
    // y: "4vw",
    opacity: 0,
    duration: 0.5,
    delay: 1.8,
    ease: "power1.out",
    stagger: 0.35,
    scrollTrigger: {
        trigger: "#BACKGROUND .back-graph .graph-2 .dot",
        start: "top bottom",
        toggleActions: "play reverse play reverse",
        markers: false
    }
});




gsap.from("#BACKGROUND .back-graph .graph-2 p", {
    y: "4vw",
    opacity: 0,
    duration: 0.8,
    delay: 1.5,
    ease: "power1.out",
    stagger: 0.35,
    scrollTrigger: {
        trigger: "#BACKGROUND .back-graph .graph-2 p",
        start: "top bottom",
        toggleActions: "play reverse play reverse",
        markers: false
    }
});




// ================================================
// 4. #research — 섹션 텍스트 fade-up + 바 그래프 width 애니메이션
// ================================================
gsap.from("#research .research-top h2", {
    x: "-5vw",
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#research .research-top",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});

gsap.from("#research .research-top .text-block", {
    x: "5vw",
    opacity: 0,
    duration: 1,
    delay: 0.8,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#research .research-top",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});

// 바 그래프 — 처음엔 width 0에서 원래 크기로 늘어나도록
// CSS로 그래프 바 트랜지션 추가
const researchStyle = document.createElement('style');
researchStyle.textContent = `
    #research .graph-left ul li {
        transition: none;
        transform-origin: left center;
    }
`;
document.head.appendChild(researchStyle);

// graph bar들을 scaleX 0 → 1 로 애니메이션
gsap.from("#research .graph-left ul li", {
    scaleX: 0,
    transformOrigin: "left center",
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#research .research-bottom",
        start: "top 80%",
        toggleActions: "play reverse play reverse"
    }
});

// 오른쪽 원형 그래프 — scale 등장
gsap.from("#research .graph-right .graph", {
    scale: 0.3,
    opacity: 0,
    duration: 0.9,
    delay: 0.3,
    ease: "back.out(1.5)",
    scrollTrigger: {
        trigger: "#research .research-bottom",
        start: "top 80%",
        toggleActions: "play reverse play reverse"
    }
});

// research-bottom 전체 fade-in
gsap.from("#research .research-bottom", {
    y: "5vw",
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#research .research-bottom",
        start: "top 90%",
        toggleActions: "play reverse play reverse"
    }
});


// ================================================
// 5. #speech — 말풍선 좌우 교차 등장
// ================================================
gsap.from("#speech .speech-1", {
    x: "-8vw",
    opacity: 0,
    duration: 0.9,
    delay: 0.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#speech .speech-1",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});

gsap.from("#speech .speech-2", {
    x: "8vw",
    opacity: 0,
    duration: 0.9,
    delay: 0.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#speech .speech-2",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});

gsap.from("#speech .speech-3", {
    x: "-8vw",
    opacity: 0,
    duration: 0.9,
    delay: 0.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#speech .speech-3",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


// ================================================
// 6. #COMPETITOR — 제목 & 이미지 등장
// ================================================
gsap.from("#COMPETITOR h6", {
    y: "3vw",
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#COMPETITOR",
        start: "top 80%",
        toggleActions: "play reverse play reverse"
    }
});

gsap.from("#COMPETITOR h2", {
    y: "3vw",
    opacity: 0,
    duration: 0.8,
    delay: 0.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#COMPETITOR h2",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});

gsap.from("#COMPETITOR img", {
    opacity: 0,
    scale: 1.1,
    duration: 1.2,
    delay: 0.7,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#COMPETITOR img",
        start: "top 90%",
        toggleActions: "play reverse play reverse"
    }
});


// ================================================
// 7. #CONCEPT — 기존 scroll.js 인터랙션 유지 + phone 등장
// ================================================
gsap.from("#CONCEPT .concept-title h6", {
    y: "7vw",
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: "power1.out",
    stagger: 0.35,
    scrollTrigger: {
        trigger: "#CONCEPT .concept-title h6",
        start: "top bottom",
        toggleActions: "play reverse play reverse",
        markers: false
    }
});

gsap.from("#CONCEPT .concept-title h2", {
    x: "10vw",
    opacity: 0,
    duration: 1,
    delay: 1,
    ease: "power1.out",
    stagger: 0.35,
    scrollTrigger: {
        trigger: "#CONCEPT .concept-title h2",
        start: "top bottom",
        toggleActions: "play reverse play reverse",
        markers: false
    }
});


gsap.from("#CONCEPT .AI img", {
    y: "6vw",          // ★ 핵심: 왼쪽(-4vw)에서 시작해서 원래 제자리(0)로 옵니다!
    opacity: 0,         // 투명한 상태에서 선명해지기
    duration: 1,        // 각 li가 등장하는 데 걸리는 시간 (1초)
    stagger: 0.25,      // ★ 핵심: li끼리 0.25초씩 시차(시간차)를 두고 순서대로 등장!
    delay: 0.4,         // 트리거 발동 후 살짝 숨 고르고 시작할 대기 시간
    ease: "power2.out", // 부드럽게 속도가 감속되는 고급스러운 느낌
    scrollTrigger: {
        trigger: "#CONCEPT .AI img", // value-list 구역이 보이기 시작하면 발동!
        start: "top 80%",              // 구역 상단이 화면 위에서 80% 지점에 도달했을 때
        
        // 이전에 알려줬던 꿀팁 기억하지? 
        // 텍스트는 내려갈 때 사라지면 지저분하니까 올라올 때만 리셋되게 잡아두는 게 정석이야!
        toggleActions: "play none none reverse", 
        markers: false
    }
});

// // phone 이미지 — 아래에서 등장 + 살짝 float
// gsap.from("#CONCEPT .phone", {
//     y: "6vw",
//     opacity: 0,
//     duration: 1.2,
//     ease: "power2.out",
//     scrollTrigger: {
//         trigger: "#CONCEPT .concept-main",
//         start: "top 80%",
//         toggleActions: "play reverse play reverse"
//     }
// });

// // phone 이미지 — 등장 후 살짝 float 반복
// ScrollTrigger.create({
//     trigger: "#CONCEPT .concept-main",
//     start: "top 80%",
//     once: true,
//     onEnter: () => {
//         gsap.to("#CONCEPT .phone", {
//             y: "-1.2vw",
//             duration: 2.5,
//             repeat: -1,
//             yoyo: true,
//             ease: "sine.inOut",
//             delay: 1.2
//         });
//     }
// });

// concept description — 오른쪽에서 등장
gsap.from("#CONCEPT .concept-description", {
    x: "5vw",
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#CONCEPT .concept-main",
        start: "top 75%",
        toggleActions: "play reverse play reverse"
    }
});

// concept ul 항목들 — 왼쪽에서 순차 등장
gsap.from("#CONCEPT ul li", {
    x: "-5vw",
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#CONCEPT ul",
        start: "top 80%",
        toggleActions: "play reverse play reverse"
    }
});



// ================================================
// 8. #CONCEPT-2, #CONCEPT-3, #CONCEPT-4 — 제목 fade-up
// ================================================
["#CONCEPT-2", "#CONCEPT-3", "#CONCEPT-4"].forEach((id) => {
    gsap.from(`${id} .title h2`, {
        y: "4vw",
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
            trigger: `${id} .title`,
            start: "top 80%",
            end: "bottom top",
            toggleActions: "play reverse play reverse"
        }
    });

    gsap.from(`${id} .title p`, {
        y: "3vw",
        opacity: 0,
        duration: 0.9,
        delay: 0.6,
        ease: "power2.out",
        scrollTrigger: {
            trigger: `${id} .title`,
            start: "top 80%",
            end: "bottom top",
            toggleActions: "play reverse play reverse"
        }
    });
});

// CONCEPT-3 레벨 카드 — 순차 등장
gsap.from("#CONCEPT-3 .level-1, #CONCEPT-3 .level-2, #CONCEPT-3 .level-3, #CONCEPT-3 .level-4", {
    y: "5vw",
    opacity: 0,
    duration: 0.8,
    delay: 0.6,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#CONCEPT-3 .level",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});

// CONCEPT-3 레벨 카드 hover 효과 (CSS 주입)
// const levelStyle = document.createElement('style');
// levelStyle.textContent = `
//     #CONCEPT-3 .level-1,
//     #CONCEPT-3 .level-2,
//     #CONCEPT-3 .level-3,
//     #CONCEPT-3 .level-4 {
//         transition: transform 0.35s ease, box-shadow 0.35s ease;
//         cursor: pointer;
//     }
//     #CONCEPT-3 .level-1:hover,
//     #CONCEPT-3 .level-2:hover,
//     #CONCEPT-3 .level-3:hover,
//     #CONCEPT-3 .level-4:hover {
//         transform: translateY(-0.8vw) !important;
//         box-shadow: 0 1.5vw 3vw rgba(25,25,56,0.12);
//     }
// `;
// document.head.appendChild(levelStyle);



gsap.from("#CONCEPT-4 .nomero-icon", {
    y: "-8vw",
    rotate: -25,
    opacity: 0,
    duration: 0.7,
    delay: 0.7,
    ease: "power1.out",
    stagger: 0.35,
    scrollTrigger: {
        trigger: "#CONCEPT-4 .nomero-icon",
        start: "top bottom",
        toggleActions: "play reverse play reverse",
        markers: false
    }
});


gsap.from("#CONCEPT-4 .concept-4-main h1", {
    y: "6vw",
    opacity: 0,
    duration: 0.7,
    delay: 0.3,
    ease: "power1.out",
    stagger: 0.35,
    scrollTrigger: {
        trigger: "#CONCEPT-4 .concept-4-main h1",
        start: "top bottom",
        toggleActions: "play reverse play reverse",
        markers: false
    }
});


gsap.from("#CONCEPT-4 .concept-4-img", {
    x: "6vw",
    opacity: 0,
    duration: 0.7,
    delay: 0.4,
    ease: "power1.out",
    stagger: 0.35,
    scrollTrigger: {
        trigger: "#CONCEPT-4 .concept-4-img",
        start: "top bottom",
        toggleActions: "play reverse play reverse",
        markers: false
    }
});



gsap.to(".nomero-icon", {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: "none"
});


// ================================================
// 9. #GOAL — 큰 h1 텍스트 순차 등장
// ================================================
gsap.from("#GOAL ul li", {
    y: "4vw",
    opacity: 0,
    duration: 0.9,
    stagger: 0.25,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#GOAL ul",
        start: "top 80%",
        toggleActions: "play reverse play reverse"
    }
});

gsap.from("#GOAL p", {
    y: "3vw",
    opacity: 0,
    duration: 0.9,
    delay: 0.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#GOAL p",
        start: "top 90%",
        toggleActions: "play reverse play reverse"
    }
});


// ================================================
// 10. #PERSONA — 카드 순차 등장 + hover lift 효과
// ================================================
gsap.from("#PERSONA h2", {
    y: "4vw",
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#PERSONA h2",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});

gsap.from("#PERSONA ul li", {
    y: "6vw",
    opacity: 0,
    duration: 0.8,
    stagger: 0.18,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#PERSONA ul",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});

// persona 카드 hover 효과 (CSS 주입)
const personaStyle = document.createElement('style');
personaStyle.textContent = `
    #PERSONA ul li {
        // transition: transform 0.35s ease, box-shadow 0.35s ease, background-color 0.35s ease;
        cursor: pointer;
    }
    #PERSONA ul li:hover {
        // transform: translateY(-4.2vw);
        box-shadow: 0 2vw 4vw rgba(25,25,56,0.10);
        background-color: #191938;
        transition: background-color 0.7s ease;
    }

    #PERSONA ul li:hover h5,
    #PERSONA ul li:hover p {
        color: #ffff;
        transition: color 0.3s ease;
    }

    #PERSONA ul li:hover .tag-1,
    #PERSONA ul li:hover .tag-2 {
        background-color: #C8E35F;
        color: #191938;
        transition: background-color 0.5s ease, color 0.5s ease;
    }
`;
document.head.appendChild(personaStyle);




gsap.from("#value .value-txt h2", {
    x: "-6vw",
    opacity: 0,
    duration: 0.8,
    stagger: 0.18,
    delay: 0.2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#value .value-txt h2",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#value .value-txt p", {
    y: "6vw",
    opacity: 0,
    duration: 0.8,
    stagger: 0.18,
    delay: 0.35,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#value .value-txt p",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


// value-list li들을 순서대로 왼쪽에서 등장시키는 애니메이션이야!
gsap.from("#value .value-list ul li", {
    x: "-4vw",          // ★ 핵심: 왼쪽(-4vw)에서 시작해서 원래 제자리(0)로 옵니다!
    opacity: 0,         // 투명한 상태에서 선명해지기
    duration: 1,        // 각 li가 등장하는 데 걸리는 시간 (1초)
    stagger: 0.25,      // ★ 핵심: li끼리 0.25초씩 시차(시간차)를 두고 순서대로 등장!
    delay: 0.5,         // 트리거 발동 후 살짝 숨 고르고 시작할 대기 시간
    ease: "power2.out", // 부드럽게 속도가 감속되는 고급스러운 느낌
    scrollTrigger: {
        trigger: "#value .value-list", // value-list 구역이 보이기 시작하면 발동!
        start: "top 80%",              // 구역 상단이 화면 위에서 80% 지점에 도달했을 때
        
        // 이전에 알려줬던 꿀팁 기억하지? 
        // 텍스트는 내려갈 때 사라지면 지저분하니까 올라올 때만 리셋되게 잡아두는 게 정석이야!
        toggleActions: "play none none reverse", 
        markers: false
    }
});


gsap.to("#DESIGN .color img", {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: "none"
});


gsap.from("#DESIGN .color", {
    x: "-6vw",
    opacity: 0,
    duration: 0.9,
    stagger: 0.18,
    delay: 0.3,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#DESIGN .color",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#PRODUCT .title h2:nth-child(1)", {
    x: "-6vw",
    opacity: 0,
    duration: 0.8,
    stagger: 0.18,
    delay: 0.3,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#PRODUCT .title h2:nth-child(1)",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});

gsap.from("#PRODUCT .title h2:nth-child(2)", {
    y: "4vw",
    opacity: 0,
    duration: 0.8,
    stagger: 0.18,
    delay: 0.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#PRODUCT .title h2:nth-child(2)",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#PRODUCT .img-slide", {
    opacity: 0,
    scale: 1.1,
    duration: 1.2,
    delay: 0.3,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#PRODUCT .img-slide",
        start: "top 90%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#food .h2-txt", {
    y: "4vw",
    opacity: 0,
    duration: 0.9,
    stagger: 0.18,
    delay: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#food .h2-txt",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#food .meal h3", {
    y: "3vw",
    opacity: 0,
    duration: 0.6,
    stagger: 0.18,
    delay: 0.3,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#food .meal h3",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#food .meal p", {
    y: "3vw",
    opacity: 0,
    duration: 0.6,
    stagger: 0.18,
    delay: 0.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#food .meal p",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#food .digestible h3", {
    y: "3vw",
    opacity: 0,
    duration: 0.6,
    stagger: 0.18,
    delay: 0.3,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#food .digestible h3",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#food .digestible p", {
    y: "3vw",
    opacity: 0,
    duration: 0.6,
    stagger: 0.18,
    delay: 0.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#food .digestible p",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});

gsap.from("#food .snack h3", {
    y: "3vw",
    opacity: 0,
    duration: 0.6,
    stagger: 0.18,
    delay: 0.3,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#food .snack h3",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#food .snack p", {
    y: "3vw",
    opacity: 0,
    duration: 0.6,
    stagger: 0.18,
    delay: 0.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#food .snack p",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});

gsap.from("#food .body h3", {
    y: "3vw",
    opacity: 0,
    duration: 0.6,
    stagger: 0.18,
    delay: 0.3,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#food .body h3",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#food .body p", {
    y: "3vw",
    opacity: 0,
    duration: 0.6,
    stagger: 0.18,
    delay: 0.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#food .body p",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});





// ================================================
// #DESIGN - 첫 번째 ul (왼쪽 -> 오른쪽으로 쪼르륵)
// ================================================
gsap.from("#DESIGN .color-palette ul:first-of-type li", {
    x: "-3vw",          // 왼쪽에서 시작
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,      // 0.15초 간격으로 시간차 등장
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#DESIGN .color-palette", // 컬러 팔레트 영역이 보이면 발동
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});

// ================================================
// #DESIGN - 두 번째 ul (아래 -> 위로 쪼르륵)
// ================================================
gsap.from("#DESIGN .color-palette ul:nth-of-type(2) li", {
    y: "3vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,      // 여기도 0.15초 간격으로 시간차 등장
    delay: 0.3,         // 첫 번째 ul이 어느 정도 나오고 나서 뒤따라 나오도록 미세한 딜레이 추가!
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#DESIGN .color-palette",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#DESIGN .typo .dot", {
    x: "5vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,      // 여기도 0.15초 간격으로 시간차 등장
    delay: 0.3,         // 첫 번째 ul이 어느 정도 나오고 나서 뒤따라 나오도록 미세한 딜레이 추가!
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#DESIGN .typo .dot",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#DESIGN .typo h1", {
    y: "5vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,      // 여기도 0.15초 간격으로 시간차 등장
    delay: 0.3,         // 첫 번째 ul이 어느 정도 나오고 나서 뒤따라 나오도록 미세한 딜레이 추가!
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#DESIGN .typo h1",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


document.addEventListener("DOMContentLoaded", () => {
    
    // 1. 순차적 실행을 위한 GSAP 타임라인 생성
    const typoTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#DESIGN .typo-list",      /* 전체 리스트 감싸는 부모 박스가 보이면 시작 */
            start: "top 80%",           /* 화면 밑바닥에서 80% 지점에 도달했을 때 발동 */
            toggleActions: "play none none reverse" /* 올릴 땐 다시 리셋 */
        }
    });

    // 2. [스텝 1] 리스트 1의 자식들(h3, h2, p)을 오른쪽에서 왼쪽으로 순차 등장
    typoTimeline.from("#DESIGN .typo-list-1 > *", {
        x: 100,            /* 오른쪽 100px 지점에서 시작 */
        opacity: 0,        /* 투명한 상태에서 */
        duration: 0.6,     /* 각각 0.6초 동안 이동 */
        ease: "power2.out",
        stagger: 0.15      /* 🎯 0.15초 간격으로 h3 -> h2 -> p 순서대로 쪼르륵 등장! */
    });

    // 3. [스텝 2] 리스트 1이 '완전히 끝난 후' 리스트 2의 자식들이 이어서 등장
    typoTimeline.from("#DESIGN .typo-list-2 > *", {
        x: 100,            /* 똑같이 오른쪽에서 */
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.15      /* 🎯 얘네도 0.15초 간격으로 쪼르륵 등장! */
    });

});




gsap.from("#phone-page .phone-txt-1 > *", {
    y: "5vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,      // 🎯 HTML에 적힌 순서대로 h3 -> h5 -> p 가 0.15초 간격을 두고 순차 등장!
    delay: 0.25,        // 시작할 때 주는 미세한 기본 딜레이
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#phone-page .phone-txt-1", // 🎯 개별 태그가 아니라 전체 부모 박스가 보이면 발동!
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});



gsap.from("#phone-page .app-mockup", {
    x: "5vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,      // 여기도 0.15초 간격으로 시간차 등장
    delay: 0.9,         // 첫 번째 ul이 어느 정도 나오고 나서 뒤따라 나오도록 미세한 딜레이 추가!
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#phone-page .app-mockup",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#phone-page .phone-txt-2", {
    y: "5vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,      // 여기도 0.15초 간격으로 시간차 등장
    delay: 0.6,         // 첫 번째 ul이 어느 정도 나오고 나서 뒤따라 나오도록 미세한 딜레이 추가!
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#phone-page .phone-txt-2",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});





gsap.from("#phone-AI .AI-txt > *", {
    y: "5vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,      // 🎯 HTML에 적힌 순서대로 h3 -> h5 -> p 가 0.15초 간격을 두고 순차 등장!
    delay: 0.25,        // 시작할 때 주는 미세한 기본 딜레이
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#phone-AI .AI-txt", // 🎯 개별 태그가 아니라 전체 부모 박스가 보이면 발동!
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});



gsap.from("#phone-page-2 .app-mockup-1", {
    y: "5vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,      // 여기도 0.15초 간격으로 시간차 등장
    delay: 0.4,         // 첫 번째 ul이 어느 정도 나오고 나서 뒤따라 나오도록 미세한 딜레이 추가!
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#phone-page-2 .app-mockup-1",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#phone-page-2 .phone-2-txt > *", {
    y: "5vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,      // 🎯 HTML에 적힌 순서대로 h3 -> h5 -> p 가 0.15초 간격을 두고 순차 등장!
    delay: 0.25,        // 시작할 때 주는 미세한 기본 딜레이
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#phone-page-2 .phone-2-txt", // 🎯 개별 태그가 아니라 전체 부모 박스가 보이면 발동!
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#phone-page-2 .app-mockup", {
    x: "5vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,      // 여기도 0.15초 간격으로 시간차 등장
    delay: 0.4,         // 첫 번째 ul이 어느 정도 나오고 나서 뒤따라 나오도록 미세한 딜레이 추가!
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#phone-page-2 .app-mockup",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#phone-page-2 .report-txt", {
    y: "5vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,      // 여기도 0.15초 간격으로 시간차 등장
    delay: 0.4,         // 첫 번째 ul이 어느 정도 나오고 나서 뒤따라 나오도록 미세한 딜레이 추가!
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#phone-page-2 .report-txt",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#phone-page-2 .pre-img", {
    y: "6vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,      // 여기도 0.15초 간격으로 시간차 등장
    delay: 0.3,         // 첫 번째 ul이 어느 정도 나오고 나서 뒤따라 나오도록 미세한 딜레이 추가!
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#phone-page-2 .pre-img",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});





gsap.from("#COMMERCE .COMMERCE-txt > *", {
    y: "5vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,      // 🎯 HTML에 적힌 순서대로 h3 -> h5 -> p 가 0.15초 간격을 두고 순차 등장!
    delay: 0.25,        // 시작할 때 주는 미세한 기본 딜레이
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#COMMERCE .COMMERCE-txt", // 🎯 개별 태그가 아니라 전체 부모 박스가 보이면 발동!
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#COMMERCE .app-mockup", {
    x: "-5vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,      // 여기도 0.15초 간격으로 시간차 등장
    delay: 0.4,         // 첫 번째 ul이 어느 정도 나오고 나서 뒤따라 나오도록 미세한 딜레이 추가!
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#COMMERCE .app-mockup",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});



gsap.from("#My-page .page-txt > *", {
    y: "5vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,      // 🎯 HTML에 적힌 순서대로 h3 -> h5 -> p 가 0.15초 간격을 두고 순차 등장!
    delay: 0.25,        // 시작할 때 주는 미세한 기본 딜레이
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#My-page .page-txt", // 🎯 개별 태그가 아니라 전체 부모 박스가 보이면 발동!
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#My-page .page-left", {
    x: "-5vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,      // 여기도 0.15초 간격으로 시간차 등장
    delay: 0.4,         // 첫 번째 ul이 어느 정도 나오고 나서 뒤따라 나오도록 미세한 딜레이 추가!
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#My-page .page-left",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#My-page .page-right .page-right-interaction", {
    x: "5vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,      // 여기도 0.15초 간격으로 시간차 등장
    delay: 0.5,         // 첫 번째 ul이 어느 정도 나오고 나서 뒤따라 나오도록 미세한 딜레이 추가!
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#My-page .page-right .page-right-interaction",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#My-page .page-right p", {
    x: "5vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,      // 여기도 0.15초 간격으로 시간차 등장
    delay: 0.4,         // 첫 번째 ul이 어느 정도 나오고 나서 뒤따라 나오도록 미세한 딜레이 추가!
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#My-page .page-right p",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#My-page .page-left .page-left-interaction", {
    x: "-5vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,      // 여기도 0.15초 간격으로 시간차 등장
    delay: 0.5,         // 첫 번째 ul이 어느 정도 나오고 나서 뒤따라 나오도록 미세한 딜레이 추가!
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#My-page .page-left .page-left-interaction",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});






gsap.from("#web .web-txt h2", {
    x: "-5vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,      // 여기도 0.15초 간격으로 시간차 등장
    delay: 0.3,         // 첫 번째 ul이 어느 정도 나오고 나서 뒤따라 나오도록 미세한 딜레이 추가!
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#web .web-txt h2",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});

gsap.from("#web .web-txt h3", {
    y: "5vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,      // 여기도 0.15초 간격으로 시간차 등장
    delay: 0.39,         // 첫 번째 ul이 어느 정도 나오고 나서 뒤따라 나오도록 미세한 딜레이 추가!
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#web .web-txt h3",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#web .web-txt p", {
    x: "5vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,      // 여기도 0.15초 간격으로 시간차 등장
    delay: 0.47,         // 첫 번째 ul이 어느 정도 나오고 나서 뒤따라 나오도록 미세한 딜레이 추가!
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#web .web-txt p",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


gsap.from("#web .web-main-txt", {
    y: "5vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,      // 여기도 0.15초 간격으로 시간차 등장
    delay: 0.3,         // 첫 번째 ul이 어느 정도 나오고 나서 뒤따라 나오도록 미세한 딜레이 추가!
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#web .web-main-txt",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});


document.addEventListener("DOMContentLoaded", () => {
    
    // 🎯 1. 첫 번째 이미지 (왼쪽에서 오른쪽으로 들어옴)
    gsap.from("#web .web-two img:nth-child(1)", {
        x: "-5vw",         /* 화면 왼쪽 바깥(-50vw) 덤불 속에 숨어있다가 */
        opacity: 0,
        duration: 1.2,
        delay: 0.3,  
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#web .web-two", /* 🌟 두 이미지의 부모 박스가 보이면 */
            start: "top 80%",    /* 화면 밑바닥에서 80% 지점에 도달했을 때 */
            toggleActions: "play none none reverse"
        }
    });

    // 🎯 2. 두 번째 이미지 (오른쪽에서 왼쪽으로 들어옴)
    gsap.from("#web .web-two img:nth-child(2)", {
        x: "5vw",          /* 화면 오른쪽 바깥(50vw) 덤불 속에 숨어있다가 */
        opacity: 0,
        duration: 1.2,
        delay: 0.3,  
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#web .web-two", /* 🌟 정확히 '똑같은 부모'를 감시하니까 */
            start: "top 80%",    /* 완전 똑같은 타이밍에 동시에 스타트! */
            toggleActions: "play none none reverse"
        }
    });

});



gsap.from("#mockup", {
    y: "8vw",           // 아래쪽에서 시작
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,      // 여기도 0.15초 간격으로 시간차 등장
    delay: 0.32,         // 첫 번째 ul이 어느 정도 나오고 나서 뒤따라 나오도록 미세한 딜레이 추가!
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#mockup",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    }
});
// ================================================
// #food h2 - 한 글자씩 그 자리에서 드러나는 애니메이션
// ================================================
const splitTarget = document.querySelector("#food h2 .split-txt");

if (splitTarget) {
    // 1. "상황에 따라 골라 먹는" 텍스트를 글자 한 줄씩 쪼개서 배열로 만듦
    const textContent = splitTarget.innerText;
    const splitText = textContent.split("").map(char => {
        // 띄어쓰기 공백일 때는 깨지지 않게 특수 공백(&nbsp;) 처리, 글자일 때는 span으로 감싸기
        return char === " " ? `<span>&nbsp;</span>` : `<span>${char}</span>`;
    }).join("");
    
    // 2. 쪼갠 span 태그들을 원래 HTML 자리에 쏙 집어넣기
    splitTarget.innerHTML = splitText;

    // 3. GSAP으로 한 글자씩 순서대로 드러나게 만들기
    gsap.from("#food h2 .split-txt span", {
        opacity: 0,         // 투명한 상태에서
        duration: 0.4,      // 각 글자가 선명해지는 시간 (0.4초)
        stagger: 0.08,      // ★ 핵심: 0.08초 간격으로 한 글자씩 톡! 톡! 톡! 드러남
        ease: "power1.out",
        scrollTrigger: {
            trigger: "#food",      // food 섹션이 보이면 발동
            start: "top 80%",      // 화면의 80% 지점에 도달했을 때
            toggleActions: "play none none reverse" // 내려갈 때 재생, 올라올 때 리셋
        }
    });
}



// ================================================
// 11. 공통 — section h4 레이블 등장
// ================================================
gsap.utils.toArray("section h4").forEach((el) => {
    gsap.from(el, {
        opacity: 0,
        x: "-2vw",
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play reverse play reverse"
        }
    });
});


// 안전하게 페이지가 다 로드된 후(DOMContentLoaded) 실행되도록 감싸줍니다
document.addEventListener("DOMContentLoaded", () => {
    
    // 원이 화면에 한 80%쯤 보이기 시작할 때 스르륵 그려지게 만드는 정석 스크립트야!
    gsap.to(".incomplete-circle", {
        // ★ 초핵심: strokeDashoffset (D와 O를 대문자로 정확하게!)
        strokeDashoffset: 115, 
        duration: 1.8,          /* 조금 더 우아하게 1.8초 동안 그려지도록 조정 */
        ease: "power2.out",
        delay: 0.5, 
        // 스크롤Trigger를 같이 달아줘야 원하는 위치에서 애니메이션이 켜져!
        scrollTrigger: {
            trigger: ".circle-container", // 원을 감싸고 있는 부모 박스가
            start: "top 85%",             // 화면 밑바닥에서 85% 지점 위로 올라올 때 발동!
            toggleActions: "play none none reverse", // 올릴 땐 다시 리셋되게 
            markers: false                // 위치 가이드라인(디버깅용) 끄기
        }
    });
    
});


document.addEventListener("DOMContentLoaded", () => {
    
    gsap.to(".incomplete-circle-2", {
        // 🎯 [초핵심] HTML/CSS를 바꾸지 않는 버전의 완벽한 싱크로율 수치야!
        // 네가 설정한 둘레 410 비율에 맞춰 딱 '84'만 남기고 그리라고 명령하는 거지.
        strokeDashoffset: 84, 
        
        duration: 1.8,          
        ease: "power2.out",
        delay: 0.5, 
        scrollTrigger: {
            trigger: "#phone-page-2 .circle-container-2", 
            start: "top 85%",             
            toggleActions: "play none none reverse", 
            markers: false                
        }
    });
    
});
