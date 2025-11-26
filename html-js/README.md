# SkinGPT - HTML/JavaScript Integration

A standalone HTML/JavaScript integration example for embedding SkinGPT as a floating chat widget. This example demonstrates lazy loading, real-time event monitoring, and provides a production-ready pattern for integrating SkinGPT's AI skin analysis into your web application.

## Quick Start

1. **Open `index.html`** in a web browser
2. **Click the floating chat button** (bottom-right corner) to open SkinGPT
3. **Click the events toggle** (top-left corner) to monitor SDK events

## How It Works

The integration uses a floating widget pattern with lazy loading:

1. **Floating Button** - Chat icon that opens the SkinGPT popup
2. **Lazy-loaded Iframe** - Only loads when user clicks the button (performance optimization)
3. **PulpoAR SDK** - Handles communication between your app and the widget

```html
<!-- Floating chat button -->
<div class="chat-button" onclick="openChat()">
  <!-- Chat icon SVG -->
</div>

<!-- Chat popup (iframe injected on first open) -->
<div class="chat-popup" id="chat-popup"></div>

<!-- SDK script -->
<script src="https://cdn.jsdelivr.net/npm/@pulpoar/plugin-sdk@latest/dist/index.iife.js"></script>
```

### Lazy Loading Pattern

The iframe is only injected when the user first clicks the chat button:

```javascript
let iframeLoaded = false;

function openChat() {
  if (!iframeLoaded) {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://skingpt.pulpoar.com';
    iframe.allow = 'camera *; clipboard-write; clipboard-read; fullscreen; gyroscope';
    document.getElementById('chat-popup').appendChild(iframe);
    iframeLoaded = true;
  }
  document.getElementById('chat-popup').classList.add('visible');
}
```

## Event Integration

The SkinGPT widget communicates with your application through the PulpoAR SDK. All events are captured and can be processed with custom business logic.

### Supported Events

| Event | Payload | Description |
|-------|---------|-------------|
| `onReady` | - | SDK initialization complete |
| `onClose` | - | Close button triggered |
| `onHide` | - | Hide button triggered |
| `onAddToCart` | `{ id, name, image, url }` | Add to cart button clicked |
| `onGoToProduct` | `{ id, name, url }` | Navigate to product page |
| `onVariantSelect` | Variant object | Product variant selected |
| `onGdprApprove` | - | GDPR consent given |
| `onTakePhotoAgain` | - | Retake photo button clicked |
| `onUsePhoto` | - | Use photo button clicked |
| `onProductRecommendations` | `{ products: [...], profile: {...} }` | AI recommendations received |
| `onError` | Error object | Error occurred |

### Example: Handling Add to Cart

```javascript
window.pulpoar.onAddToCart((payload) => {
  console.log('Product added:', payload);
  // payload: { id: 123, name: "Product Name", image: "url", url: "product-url" }

  // Add your e-commerce cart integration here
});
```

### Example: Handling Product Recommendations

```javascript
window.pulpoar.onProductRecommendations((payload) => {
  console.log('Recommendations:', payload);
  // payload: {
  //   products: [{ id, name, url, image }, ...],
  //   profile: { ageId, language, skinTypeId, skinConcernIds, targetedRoutineId }
  // }
});
```

> **PARTNER INTEGRATION POINT:** Look for the comment in `index.js` at the event handler functions for detailed guidance on where to add your integration logic.

## Development

### Testing Locally

You can simply open `index.html` directly in your browser, or use a local development server:

**Option 1: VS Code Live Server Extension**
- Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- Right-click `index.html` and select "Open with Live Server"

**Option 2: Command Line**
```bash
# Using Python
python -m http.server

# Using Node.js
npx http-server
```

Then navigate to the URL shown in your terminal (typically `http://localhost:PORT`).

## Features of This Demo

- **Floating Chat Widget** - Non-intrusive chat button at bottom-right corner
- **Lazy Loading** - Iframe only loads when user opens the chat (better performance)
- **Events Monitor Panel** - Toggle to view all SDK events in real-time
- **Export to JSON** - Download all captured events for analysis
- **Color-coded Events** - Different event types have distinct visual indicators
- **Responsive Design** - Fullscreen chat on mobile, popup on desktop

## File Structure

```
html-js/
├── index.html   - Main HTML with floating button and chat popup
├── index.js     - SDK initialization, state management, event handlers
├── styles.css   - Floating widget styles, animations, responsive design
└── README.md    - This documentation
```
