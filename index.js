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
    // 각각의 서비스 화면 박스들을 순서대로 배열에 저장
    const serviceSections = [
        document.querySelector(".service-1"),
        document.querySelector(".service-2"),
        document.querySelector(".service-3")
    ];

    // 페이지가 처음 열렸을 때는 무조건 1번 화면(.service-1)을 활성화해 둠
    if (serviceSections[0]) {
        serviceSections[0].classList.add("active");
    }

    // 화면 안에 존재하는 모든 01, 02, 03 숫자 버튼들(li)을 전부 다 긁어모으기
    const allTabButtons = document.querySelectorAll("#SERVICE .title ul li");

    allTabButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            // 클릭한 숫자가 무엇인지 글자(텍스트)를 파악함 ("01", "02", "03")
            const clickedText = btn.innerText.trim();
            
            // 텍스트에 따라 바꿀 타겟 인덱스 번호 매칭하기
            let targetIndex = 0;
            if (clickedText === "02") targetIndex = 1;
            if (clickedText === "03") targetIndex = 2;

            // 1. 모든 서비스 박스에서 active 클래스를 빼서 싹 다 숨김
            serviceSections.forEach(section => {
                if (section) section.classList.remove("active");
            });

            // 2. 클릭한 번호에 맞는 서비스 박스만 active를 붙여서 화면에 노출
            if (serviceSections[targetIndex]) {
                serviceSections[targetIndex].classList.add("active");
            }

            // 3. [디테일 동기화] 모든 화면 속 01, 02, 03 버튼들의 검은 동그라미(.page)를 다 지우고,
            // 새로 켜진 화면의 해당 번호에만 동그라미가 쳐지도록 전체 리셋 후 재부착!
            allTabButtons.forEach(li => li.classList.remove("page"));
            
            // 각 서비스 박스 내부를 돌면서 현재 활성화된 번호에 .page를 다시 입혀줌
            serviceSections.forEach(section => {
                if (section && section.classList.contains("active")) {
                    const currentLis = section.querySelectorAll(".title ul li");
                    if (currentLis[targetIndex]) {
                        currentLis[targetIndex].classList.add("page");
                    }
                }
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
    const phraseDisplayTime = 3000; // 문장이 머무르는 시간 (4초마다 변경)

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
document.addEventListener("DOMContentLoaded", () => {
    const topBtn = document.querySelector(".to-top-btn");

    if (topBtn) {
        // 🎯 1. 스크롤 위치 감지해서 버튼 켜고 끄기
        ScrollTrigger.create({
            trigger: "#video",      /* 🌟 비디오 영역을 기준으로 삼아! */
            start: "bottom 20%",    /* 비디오 영역의 '바닥(bottom)'이 화면 상단 20% 지점을 지나갈 때 */
            onEnter: () => topBtn.classList.remove("hide"),  /* 아래로 내려가면 버튼 등장! */
            onLeaveBack: () => topBtn.classList.add("hide"), /* 다시 메인/비디오로 올라오면 버튼 숨김! */
        });

        // 🎯 2. 버튼 클릭했을 때 맨 상단으로 부드럽게 스크롤링
        topBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth" /* 아까 심어둔 효과 덕분에 사르륵 미끄러지듯 올라가 */
            });
        });
    }
});