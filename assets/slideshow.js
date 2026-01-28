let currentSlideIndex = 0;

function initializeSlides() {
    const container = document.getElementById('slideContainer');

    // Pre-create all slides
    slides.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slide';
        slideDiv.id = `slide-${index}`;

        const iframe = document.createElement('iframe');
        iframe.src = encodeURI(slide.file);

        slideDiv.appendChild(iframe);
        container.appendChild(slideDiv);
    });

    // Generate slide list
    generateSlideList();

    // Show first slide
    showSlide(0);
}

function generateSlideList() {
    const slideList = document.getElementById('slideList');
    if (!slideList) return;

    const listTitle = document.createElement('h3');
    listTitle.textContent = 'Slide List';
    slideList.appendChild(listTitle);

    slides.forEach((slide, index) => {
        const item = document.createElement('div');
        item.className = 'slide-list-item';
        item.textContent = `${index + 1}. ${slide.title}`;
        if (slide.part) {
            item.textContent += ` [${slide.part}]`;
        }
        item.onclick = () => {
            currentSlideIndex = index;
            showSlide(currentSlideIndex);
            toggleMenu(); // Close menu after selection
        };
        slideList.appendChild(item);
    });
}

function showSlide(index) {
    // Hide all slides
    const allSlides = document.querySelectorAll('.slide');
    allSlides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Show current slide
    const currentSlide = document.getElementById(`slide-${index}`);
    if (currentSlide) {
        currentSlide.classList.add('active');
    }

    // Update title (with part info)
    const slideInfo = slides[index];
    let titleText = slideInfo.title;
    if (slideInfo.part) {
        titleText = `${slideInfo.title} | Part ${slideInfo.part}`;
    }
    document.getElementById('slideTitle').textContent = titleText;

    // Update counter
    document.getElementById('currentSlide').textContent = index + 1;
    document.getElementById('totalSlides').textContent = slides.length;

    // Update progress bar
    const progress = ((index + 1) / slides.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';

    // Update button states
    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = index === slides.length - 1;

    // Update slide list highlighting
    updateSlideListHighlight(index);
}

function updateSlideListHighlight(index) {
    const slideList = document.getElementById('slideList');
    if (!slideList) return;

    const items = slideList.querySelectorAll('.slide-list-item');
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.add('current');
        } else {
            item.classList.remove('current');
        }
    });
}

function changeSlide(direction) {
    const newIndex = currentSlideIndex + direction;

    if (newIndex >= 0 && newIndex < slides.length) {
        currentSlideIndex = newIndex;
        showSlide(currentSlideIndex);
    }
}

function toggleMenu() {
    const slideList = document.getElementById('slideList');
    if (slideList) {
        slideList.classList.toggle('active');
    }
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Error attempting to enable fullscreen:', err);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Keyboard navigation
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
            changeSlide(-1);
            break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
            event.preventDefault();
            changeSlide(1);
            break;
        case 'Home':
            currentSlideIndex = 0;
            showSlide(currentSlideIndex);
            break;
        case 'End':
            currentSlideIndex = slides.length - 1;
            showSlide(currentSlideIndex);
            break;
        case 'f':
        case 'F':
            toggleFullscreen();
            break;
        case 'm':
        case 'M':
            toggleMenu();
            break;
    }
});

// Initialize slides on page load
window.addEventListener('load', () => {
    initializeSlides();
});

// Prevent spacebar from scrolling
window.addEventListener('keydown', (e) => {
    if(e.key === ' ' && e.target === document.body) {
        e.preventDefault();
    }
});
