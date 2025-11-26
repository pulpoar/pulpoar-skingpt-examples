# Pulpoar SkinGPT Integration Example

This example demonstrates how to integrate SkinGPT into your application using our plugin SDKs.

## Getting Started

### Prerequisites
- Node.js (v20 or higher recommended)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## Using iframe
Using an iframe creates an isolated widget above the app. Adding the widget's starting button, handling its state, and managing alignment should be handled on the user's side.

```js
<iframe
    src="https://skingpt.pulpoar.com"
    style={{
        width: '100%',
        height: '100%',
        border: 'none',
    }}
    title="SkinGPT"
    allow="camera *; clipboard-write; clipboard-read; fullscreen; gyroscope"
/>
```
### Mobile Alignment
Mobile alignment can be achieved by checking the screen width and updating the CSS properties of the iframe's parent container dynamically. Below is a complete example of how to implement it:
```js
const [isOpen, setIsOpen] = useState(false);
const [isHidden, setIsHidden] = useState(false);
const isMobile = window.innerWidth <= 768; // Check if the device is mobile

const openChat = () => {
    setIsHidden(false)
    setIsOpen(true);
};

return (
    <div>
        <div
            onClick={openChat}
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#5E7300',
                color: 'white',
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                zIndex: 1000,
                alignContent: 'center',
            }}
        >
            <ChatIcon/>
        </div>
        
        {/* Chat Popup */}
        {isOpen && (
            <div
                style={{
                    display: isHidden ? 'none' : 'block',
                    position: 'fixed',
                    bottom: isMobile ? 0 : '80px',
                    right: isMobile ? 0 : '20px',
                    width: isMobile ? '100%' : '400px',
                    height: isMobile ? '100%' : '600px',
                    boxShadow: isMobile ? 'none' : '0 4px 6px rgba(0, 0, 0, 0.1)',
                    borderRadius: isMobile ? '0' : '10px',
                    overflow: 'hidden',
                    zIndex: 1000,
                }}
            >
                <iframe
                    src="https://skingpt.pulpoar.com"
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                    }}
                    title="SkinGPT"
                    allow="camera *; clipboard-write; clipboard-read; fullscreen; gyroscope"
                />
        
            </div>
    </div>
)}
```
### Working With SDK
The SDK is a JavaScript library that allows you to communicate with PulpoAR plugins running in an iframe.

```js

import pulpoar from 'https://cdn.jsdelivr.net/npm/@pulpoar/plugin-sdk@latest';

pulpoar.onReady(() => {
    console.log('PulpoAR ready');
});

pulpoar.onAddToCart((payload) => {
    console.log(payload);
});

pulpoar.onClose(() => {
    console.log("Close Button Triggered")
});

pulpoar.onHide(() => {
    console.log("Hide Button Triggered")
});


```



### Component Events


| Event              | Payload                                                                                           | Description                                                         |
|--------------------|---------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| `onError`          | Error                                                                                             | Callback function triggered when an error occurs.                   |
| `onReady`          | undefined	                                                                                     | Callback function triggered when the PulpoAR plugin is ready.       |
| `onClose`          | undefined	                                                                                    | Callback function triggered when the close button is triggered.     |
| `onHide`           | undefined	                                                                                    | Callback function triggered when the hide button is clicked.        |
| `onAddToCart`      | { id: number, name: string, image: string, url: string }	                                            | Callback function triggered when the Add to Cart button is clicked. |
| `onGoToProduct`    | { id: number, name: string, url: string }	                                                            | Callback function triggered when navigating to a product page.      |
| `onVariantSelect`  | Variant                                                                                           | Callback function triggered when a variant is selected.             |
| `onGdprApprove`    | undefined                                                                               | Callback function triggered when the GDPR checkbox is selected and consent given.      |
| `onTakePhotoAgain` | undefined                                                                                         | Callback function triggered when the Take Again button is clicked.  |
| `onUsePhoto`       | undefined                                                                                         | Callback function triggered when the Use Photo button is clicked.   |
| `onProductRecommendations` | { products: [{ id: number, name: string, url: string, image: string }], profile: { ageId: number, language: string, skinTypeId: number, skinConcernIds: number[], targetedRoutineId: number } } | Callback function triggered when AI-generated product recommendations are received and displayed to the user. |
