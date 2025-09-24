# Photo Album Website

A simple, responsive photo album website built with HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Interactive Gallery**: Click on any photo to view it in a modal
- **Navigation**: Use arrow keys, navigation buttons, or swipe gestures to browse photos
- **Modern UI**: Clean, modern design with smooth animations
- **Touch Support**: Swipe gestures for mobile devices
- **Keyboard Navigation**: Use arrow keys and Escape to navigate

## Files Structure

```
/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── placeholder.html    # Image placeholder (not used in final version)
└── README.md           # This file
```

## How to Use

1. Open `index.html` in your web browser
2. Click on any photo to view it in full size
3. Use the navigation buttons or arrow keys to browse through photos
4. Click outside the modal or press Escape to close

## Customization

### Adding Your Own Photos

To add your own photos, simply replace the `src` values in the `photos` array in `script.js`:

```javascript
const photos = [
    {
        id: 1,
        src: 'path/to/your/image1.jpg',  // Replace with your image path
        title: 'Your Photo Title',
        description: 'Your photo description'
    },
    // ... add more photos
];
```

### Changing Photo Information

You can modify the title and description of each photo by editing the `title` and `description` properties in the `photos` array.

### Styling

The website uses CSS custom properties and modern CSS features. You can customize:

- Colors in the CSS file
- Fonts and typography
- Spacing and layout
- Animation effects

## Browser Support

This website works on all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Mobile Support

The website is fully responsive and includes:
- Touch/swipe gestures for photo navigation
- Optimized layout for mobile devices
- Touch-friendly navigation buttons

## Future Enhancements

The JavaScript includes utility functions for future enhancements:
- `PhotoAlbum.addPhoto()` - Add new photos dynamically
- `PhotoAlbum.removePhoto()` - Remove photos
- `PhotoAlbum.getAllPhotos()` - Get all photos

## Notes

- The current version uses placeholder images with data URLs
- To use real images, replace the `src` values with actual image file paths
- All images should be optimized for web use for better performance
