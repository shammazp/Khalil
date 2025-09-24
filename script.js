// Photo data - you can modify this array to add more photos
const photos = [
    {
        id: 1,
        src: 'image1.jpeg'
    },
    {
        id: 2,
        src: 'image2.jpeg'
    },
    {
        id: 3,
        src: 'image3.jpeg'
    },
    {
        id: 4,
        src: 'image4.jpeg'
    },
    {
        id: 5,
        src: 'image5.jpeg'
    },
    {
        id: 6,
        src: 'image6.jpeg'
    }
];

// Global variables
let currentPhotoIndex = 0;
let isModalOpen = false;

// DOM elements
const photoGrid = document.getElementById('photoGrid');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeModal = document.getElementById('closeModal');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Initialize the photo album
function initPhotoAlbum() {
    displayPhotos();
    setupEventListeners();
}

// Display photos in the grid
function displayPhotos() {
    photoGrid.innerHTML = '';
    
    photos.forEach((photo, index) => {
        const photoCard = createPhotoCard(photo, index);
        photoGrid.appendChild(photoCard);
    });
}

// Create a photo card element
function createPhotoCard(photo, index) {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.onclick = () => openModal(index);
    
    card.innerHTML = `
        <img src="${photo.src}" alt="Photo ${photo.id}" loading="lazy">
    `;
    
    return card;
}

// Open modal with selected photo
function openModal(index) {
    currentPhotoIndex = index;
    isModalOpen = true;
    
    const photo = photos[currentPhotoIndex];
    modalImage.src = photo.src;
    modalImage.alt = `Photo ${photo.id}`;
    modalCaption.textContent = `Photo ${photo.id}`;
    
    modal.classList.add('show');
    modal.style.display = 'flex';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModalHandler() {
    isModalOpen = false;
    modal.classList.remove('show');
    modal.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Navigate to previous photo
function showPreviousPhoto() {
    if (currentPhotoIndex > 0) {
        currentPhotoIndex--;
    } else {
        currentPhotoIndex = photos.length - 1;
    }
    updateModalPhoto();
}

// Navigate to next photo
function showNextPhoto() {
    if (currentPhotoIndex < photos.length - 1) {
        currentPhotoIndex++;
    } else {
        currentPhotoIndex = 0;
    }
    updateModalPhoto();
}

// Update modal with current photo
function updateModalPhoto() {
    const photo = photos[currentPhotoIndex];
    modalImage.src = photo.src;
    modalImage.alt = `Photo ${photo.id}`;
    modalCaption.textContent = `Photo ${photo.id}`;
}

// Setup event listeners
function setupEventListeners() {
    // Close modal events
    closeModal.addEventListener('click', closeModalHandler);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalHandler();
        }
    });
    
    // Navigation buttons
    prevBtn.addEventListener('click', showPreviousPhoto);
    nextBtn.addEventListener('click', showNextPhoto);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!isModalOpen) return;
        
        switch(e.key) {
            case 'Escape':
                closeModalHandler();
                break;
            case 'ArrowLeft':
                showPreviousPhoto();
                break;
            case 'ArrowRight':
                showNextPhoto();
                break;
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    modal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next photo
                showNextPhoto();
            } else {
                // Swipe right - previous photo
                showPreviousPhoto();
            }
        }
    }
}

// Image loading error handler
function handleImageError(img) {
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
    img.alt = 'Image not found';
}

// Add error handling to all images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', () => handleImageError(img));
    });
});

// Initialize the photo album when DOM is loaded
document.addEventListener('DOMContentLoaded', initPhotoAlbum);

// Add some utility functions for future enhancements
const PhotoAlbum = {
    // Add a new photo to the album
    addPhoto: function(photoData) {
        photos.push({
            id: photos.length + 1,
            ...photoData
        });
        displayPhotos();
    },
    
    // Remove a photo from the album
    removePhoto: function(photoId) {
        const index = photos.findIndex(photo => photo.id === photoId);
        if (index > -1) {
            photos.splice(index, 1);
            displayPhotos();
        }
    },
    
    // Get all photos
    getAllPhotos: function() {
        return photos;
    }
};

// Make PhotoAlbum available globally for future use
window.PhotoAlbum = PhotoAlbum;
