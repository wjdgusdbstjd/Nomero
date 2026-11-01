// document.addEventListener("DOMContentLoaded", () => {
//         // 애니메이션을 돌릴 타겟들을 순서대로 배열에 저장
//         const sections = [
//             document.querySelector('.bg-1'),
//             document.querySelector('.bg-2'),
//             document.querySelector('.bg-3')
//         ];

//         let currentIndex = 0;
//         const displayTime = 4000; // 각 세트가 머무르는 시간 (4000ms = 4초)

//         function playLoop() {
//             // 1. 모든 세트에서 active 클래스를 제거해서 숨김
//             sections.forEach(section => {
//                 if (section) section.classList.remove('active');
//             });

//             // 2. 현재 순서의 세트에만 active 클래스 추가해서 애니메이션 실행
//             if (sections[currentIndex]) {
//                 sections[currentIndex].classList.add('active');
//             }

//             // 3. 다음 순서로 인덱스 변경 (3번까지 다 돌면 다시 0번으로 리셋)
//             currentIndex = (currentIndex + 1) % sections.length;
//         }

//         // 페이지 로드되자마자 첫 번째 세트 실행
//         playLoop();

//         // 설정한 시간(예: 4초)마다 반복해서 playLoop 함수 실행
//         setInterval(playLoop, displayTime);
// });
    


// ================================================
// #HEADER - 스마트 내비게이션 (스크롤 방향 완전 일치 버전)
// ================================================
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    
    // 메인 페이지 기준 높이 (화면 꽉 찬 첫 페이지 너비만큼)
    const mainPageHeight = window.innerHeight; 

    ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
            const isScrollingDown = self.direction === 1; // 1: 내리는 중, -1: 올리는 중
            const currentScrollY = self.scroll();         // 현재 스크롤 위치(px)

            // 🎯 1. [방향 제어] 스크롤 내리면 '무조건' 사라지고, 올리면 '무조건' 나타나기
            if (isScrollingDown) {
                header.classList.add("hide"); // 위로 숨기기
            } else {
                header.classList.remove("hide"); // 아래로 등장
            }

            // 🎯 2. [색상 제어] 현재 위치가 메인 페이지 아래인지 아닌지만 딱 판별하기
            if (currentScrollY > mainPageHeight - 50) {
                // 메인을 벗어난 아래 콘텐츠 영역일 때는 화이트 모드 적용
                header.classList.add("white-mode");
            } else {
                // 다시 맨 위 메인 페이지 구역으로 올라오면 투명 모드로 리셋
                header.classList.remove("white-mode");
            }
        }
    });
});




// ================================================
// #HEADER - 로고 클릭 시 페이지 맨 상단으로 부드럽게 이동
// ================================================
document.addEventListener("DOMContentLoaded", () => {
    // 로고를 감싸고 있는 .header-logo 박스를 가져옵니다 (기본/화이트 이미지 둘 다 적용됨)
    const headerLogo = document.querySelector(".header-logo");

    if (headerLogo) {
        // 손가락 모양 커서가 뜨도록 스타일을 자바스크립트로 안전하게 쥐어줍니다
        headerLogo.style.cursor = "pointer";

        headerLogo.addEventListener("click", () => {
            // CSS에 html { scroll-behavior: smooth; }를 줬기 때문에 
            // 윈도우 스크롤을 0(맨 위)으로 돌리면 알아서 사르륵 미끄러지며 올라가!
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});




document.addEventListener("DOMContentLoaded", () => {
    const sections = [
        document.querySelector('.bg-1'),
        document.querySelector('.bg-2'),
        document.querySelector('.bg-3'),
        document.querySelector('.bg-4')// ★ 추가
    ];

    let currentIndex = 0;
    // 3500으로 바꾸기
    const displayTime = 3500;
    const delayTime = 1000;

    function showSection(index) {
        sections[index].classList.add('active');

        const ps = sections[index].querySelectorAll('p');
        gsap.fromTo(ps[0],
            { opacity: 0, x: "-5vw" },
            { opacity: 1, x: "0vw", duration: 0.8, ease: "power2.out", delay: 1.5 }
        );
        gsap.fromTo(ps[1],
            { opacity: 0, x: "5vw" },
            { opacity: 1, x: "0vw", duration: 0.8, ease: "power2.out", delay: 1.7 }
        );
    }

    function hideSection(index) {
        const ps = sections[index].querySelectorAll('p');
        const imgs = sections[index].querySelectorAll('.img-area img');

        // ★ CSS transition 잠깐 끄기
        imgs.forEach(img => img.style.transition = 'none');

        gsap.to(ps, { opacity: 0, duration: 0.3 });

        if (index === 0) {
            gsap.to(imgs[0], { opacity: 0, y: "-5vw", duration: 0.6, ease: "power2.in" });
            gsap.to(imgs[1], { opacity: 0, y: "5vw", duration: 0.6, ease: "power2.in" });
        } else if (index === 1) {
            gsap.to(imgs[0], { opacity: 0, x: "10vw", duration: 0.8, ease: "power2.in" });
            gsap.to(imgs[1], { opacity: 0, y: "-5vw", duration: 0.8  , ease: "power2.in" });
        } else if (index === 2) {
            gsap.to(imgs[0], { opacity: 0, y: "-5vw", duration: 0.6, ease: "power2.in" });
            gsap.to(imgs[1], { opacity: 0, y: "5vw", duration: 0.6, ease: "power2.in" });
        } else if (index === 3) {
            gsap.to(imgs[0], { opacity: 0, y: "-5vw", duration: 0.6, ease: "power2.in" });
            gsap.to(imgs[1], { opacity: 0, y: "5vw", duration: 0.6, ease: "power2.in" });
            gsap.to(imgs[2], { opacity: 0, y: "5vw", duration: 0.6, ease: "power2.in" });
}

        setTimeout(() => {
            sections[index].classList.remove('active');
            gsap.set([...ps, ...imgs], { clearProps: "all" });
            // ★ CSS transition 다시 켜기
            imgs.forEach(img => img.style.transition = '');
        }, 2000);
    }

    showSection(currentIndex);

    function playLoop() {
        hideSection(currentIndex);
        currentIndex = (currentIndex + 1) % sections.length;
        setTimeout(() => showSection(currentIndex), delayTime);
    }

    setInterval(playLoop, displayTime + delayTime);
});

document.querySelector(".bg-bottom .arrow").addEventListener("click", () => {
    document.querySelector("#video").scrollIntoView({ 
        behavior: "smooth",
        block: "start"
    });
});


document.querySelector(".bg-bottom .arrow").addEventListener("click", () => {
    // #video 섹션을 찾아서 거기로 부드럽게 스크롤 이동시킴
    document.querySelector("#video").scrollIntoView({ 
        behavior: "smooth", // 부드러운 스크롤 효과
        block: "start"      // 섹션의 최상단을 화면 꼭대기에 맞춤
    });
});



// ================================================
// #SERVICE - 01, 02, 03 탭 메뉴 클릭 인터랙션
// ================================================
document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // SERVICE 탭 전환 인터랙션
    // ========================================

    const serviceSections = [
        document.querySelector("#SERVICE .service-1"),
        document.querySelector("#SERVICE .service-2"),
        document.querySelector("#SERVICE .service-3")
    ];

    let currentIndex = 0;
    let isAnimating = false;

    // ----------------------------------------
    // 숫자 버튼 활성화 상태 변경
    // ----------------------------------------

    function updateServiceButtons(index) {

        serviceSections.forEach((section) => {

            if (!section) return;

            const buttons = section.querySelectorAll(".title ul li");

            buttons.forEach((button, buttonIndex) => {
                button.classList.toggle("page", buttonIndex === index);
            });

        });

    }

    // ----------------------------------------
    // 초기 화면 설정
    // ----------------------------------------

    serviceSections.forEach((section, index) => {

        if (!section) return;

        const isFirst = index === 0;

        section.classList.toggle("active", isFirst);

        gsap.set(section, {
            autoAlpha: isFirst ? 1 : 0
        });

    });

    updateServiceButtons(0);

    // ----------------------------------------
    // 탭 전환 함수
    // ----------------------------------------

    function changeService(targetIndex) {

        if (isAnimating) return;
        if (targetIndex === currentIndex) return;

        const currentSection = serviceSections[currentIndex];
        const nextSection = serviceSections[targetIndex];

        if (!currentSection || !nextSection) return;

        isAnimating = true;

        // 새 화면을 애니메이션 준비 상태로 설정
        nextSection.classList.add("active");

        gsap.set(nextSection, {
            autoAlpha: 0
        });

        const nextTitle = nextSection.querySelector(".title");
        const nextImages = nextSection.querySelector(".service-img");
        const nextText = nextSection.querySelector(".service-left p, .service-txt");
        const nextFeedback = nextSection.querySelector(".service-right");

        const nextContents = [
            nextTitle,
            nextImages,
            nextText,
            nextFeedback
        ].filter(Boolean);

        gsap.set(nextContents, {
            opacity: 0,
            y: 18
        });

        // ------------------------------------
        // 화면 전환 타임라인
        // ------------------------------------

        const tl = gsap.timeline({

            onComplete: () => {

                currentSection.classList.remove("active");

                gsap.set(currentSection, {
                    autoAlpha: 0
                });

                gsap.set(nextSection, {
                    autoAlpha: 1
                });

                currentIndex = targetIndex;
                isAnimating = false;

            }

        });

        // 1. 기존 화면 페이드아웃
        tl.to(currentSection, {
            autoAlpha: 0,
            duration: 0.3,
            ease: "power2.inOut"
        });

        // 2. 새로운 화면 등장
        tl.set(nextSection, {
            autoAlpha: 1
        });

        // 3. 새 화면의 요소들이 자연스럽게 등장
        tl.to(nextContents, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out"
        }, "-=0.05");

        // 숫자 버튼 상태 변경
        updateServiceButtons(targetIndex);

    }

    // ----------------------------------------
    // 숫자 버튼 클릭 이벤트
    // ----------------------------------------

    serviceSections.forEach((section) => {

        if (!section) return;

        const buttons = section.querySelectorAll(".title ul li");

        buttons.forEach((button, index) => {

            button.addEventListener("click", () => {
                changeService(index);
            });

        });

    });

});




// ================================================
// #AI-page - 말풍선 문장 자동 무한 루프 전환
// ================================================
document.addEventListener("DOMContentLoaded", () => {
    const aiPhrases = document.querySelectorAll(".AI-chage p");
    let currentPhraseIndex = 0;
    const phraseDisplayTime = 1500; // 문장이 머무르는 시간 (4초마다 변경)

    // 문장을 순서대로 바꾸는 함수
    function rotatePhrases() {
        if (aiPhrases.length === 0) return;

        // 1. 현재 켜져 있는 문장의 active 클래스를 지움 (사르륵 사라짐)
        aiPhrases[currentPhraseIndex].classList.remove("active");

        // 2. 다음 문장 인덱스로 변경 (마지막 문장 다음에 다시 0번으로 리셋)
        currentPhraseIndex = (currentPhraseIndex + 1) % aiPhrases.length;

        // 3. 다음 문장에 active 클래스를 붙임 (사르륵 나타남)
        aiPhrases[currentPhraseIndex].classList.add("active");
    }

    // 설정한 시간(4초)마다 rotatePhrases 함수를 무한 반복 실행
    if (aiPhrases.length > 0) {
        setInterval(rotatePhrases, phraseDisplayTime);
    }
});



// ================================================
// #TOP BUTTON - 비디오 영역 지나면 나타나는 탑 버튼
// ================================================
// document.addEventListener("DOMContentLoaded", () => {
//     const topBtn = document.querySelector(".to-top-btn");

//     if (topBtn) {
//         // 🎯 1. 스크롤 위치 감지해서 버튼 켜고 끄기
//         ScrollTrigger.create({
//             trigger: "#video",      /* 🌟 비디오 영역을 기준으로 삼아! */
//             start: "bottom 20%",    /* 비디오 영역의 '바닥(bottom)'이 화면 상단 20% 지점을 지나갈 때 */
//             onEnter: () => topBtn.classList.remove("hide"),  /* 아래로 내려가면 버튼 등장! */
//             onLeaveBack: () => topBtn.classList.add("hide"), /* 다시 메인/비디오로 올라오면 버튼 숨김! */
//         });

//         // 🎯 2. 버튼 클릭했을 때 맨 상단으로 부드럽게 스크롤링
//         topBtn.addEventListener("click", () => {
//             window.scrollTo({
//                 top: 0,
//                 behavior: "smooth" /* 아까 심어둔 효과 덕분에 사르륵 미끄러지듯 올라가 */
//             });
//         });
//     }
// });


document.addEventListener("DOMContentLoaded", () => {
    const topBtn = document.querySelector(".to-top-btn");

    if (topBtn) {
        // 🎯 1. 스크롤 위치 감지해서 버튼 켜고 끄기 (기존 유지)
        ScrollTrigger.create({
            trigger: "#video",
            start: "bottom 20%",
            onEnter: () => topBtn.classList.remove("hide"),
            onLeaveBack: () => topBtn.classList.add("hide"),
        });

        // 🎯 2. 버튼 클릭했을 때 맨 상단으로 부드럽게 스크롤링 (기존 유지)
        topBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        // 🎯 3. [완벽 해결] footer 영역에 진입하면 버튼 색상 반전시키기
        ScrollTrigger.create({
            trigger: "footer",         // ★ 전체 문서 대신 HTML 맨 밑에 있는 footer를 타겟팅!
            start: "top 90%",          // footer 상단이 화면 하단 90% 지점(살짝 보이기 시작할 때) 진입하면 바로 실행
            onEnter: () => {
                // 맨 바닥(푸터)에 닿으면 배경 흰색, 글자 딥네이비, 얇은 테두리 추가
                topBtn.style.backgroundColor = "#ffffff";
                topBtn.style.color = "#191938";
                topBtn.style.border = "1px solid #191938";
            },
            onLeaveBack: () => {
                // 다시 위로 올리면 원상복구 (CSS 기존 스타일로 초기화)
                topBtn.style.backgroundColor = "";
                topBtn.style.color = "";
                topBtn.style.border = "";
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    // concept-4-img 안에 있는 모든 이미지 가져오기
    const images = document.querySelectorAll("#CONCEPT-4 .concept-4-img img");
    let currentIndex = 0;

    function changeImage() {
        // 현재 보이고 있는 이미지에서 active 클래스 제거
        images[currentIndex].classList.remove("active");

        // 다음 이미지 인덱스로 이동 (마지막 이미지 다음엔 다시 0으로)
        currentIndex = (currentIndex + 1) % images.length;

        // 다음 이미지에 active 클래스 추가
        images[currentIndex].classList.add("active");
    }

    // 3초(3000밀리초)마다 changeImage 함수 반복 실행
    setInterval(changeImage, 3000);
});


document.addEventListener("DOMContentLoaded", () => {
    // 마이페이지 텍스트 전환 기능
    const textElements = document.querySelectorAll("#My-page .page-left-interaction h3");
    let currentTextIndex = 0;

    function changeText() {
        // 현재 보이고 있는 텍스트 숨기기
        textElements[currentTextIndex].classList.remove("active");

        // 다음 텍스트 인덱스로 이동
        currentTextIndex = (currentTextIndex + 1) % textElements.length;

        // 다음 텍스트 보여주기
        textElements[currentTextIndex].classList.add("active");
    }

    // 2.5초(2500ms)마다 문장 자동 전환
    setInterval(changeText, 2000);
});



document.addEventListener("DOMContentLoaded", () => {
    // 마이페이지 우측 레벨 텍스트 전환 기능
    const levelElements = document.querySelectorAll("#My-page .page-right-interaction h3");
    let currentLevelIndex = 0;

    function changeLevel() {
        // 현재 보이고 있는 레벨 텍스트 숨기기
        levelElements[currentLevelIndex].classList.remove("active");

        // 다음 레벨 인덱스로 이동
        currentLevelIndex = (currentLevelIndex + 1) % levelElements.length;

        // 다음 레벨 텍스트 보여주기
        levelElements[currentLevelIndex].classList.add("active");
    }

    // 2.5초(2500ms)마다 레벨 자동 전환 (좌측 텍스트와 싱크를 맞춤)
    setInterval(changeLevel, 2000);
});
