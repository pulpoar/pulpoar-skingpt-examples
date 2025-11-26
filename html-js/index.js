// Store all received events
let eventsLog = [];

// Chat state
let isOpen = false;
let iframeLoaded = false;

// Events panel state
let eventsVisible = false;

/**
 * Open the chat popup and lazy load iframe
 */
function openChat() {
  if (isOpen) return;
  isOpen = true;

  // Lazy load iframe on first open
  if (!iframeLoaded) {
    injectIframe();
    iframeLoaded = true;
  }

  document.getElementById('chat-popup').classList.add('visible');
}

/**
 * Inject iframe into chat popup (lazy loading)
 */
function injectIframe() {
  const popup = document.getElementById('chat-popup');
  const iframe = document.createElement('iframe');
  iframe.src = 'https://skingpt.pulpoar.com';
  iframe.allow = 'camera *; clipboard-write; clipboard-read; fullscreen; gyroscope';
  iframe.title = 'SkinGPT';
  popup.appendChild(iframe);
}

/**
 * Close the chat popup
 */
function closeChat() {
  isOpen = false;
  document.getElementById('chat-popup').classList.remove('visible');
}

/**
 * Toggle events panel visibility
 */
function toggleEventsPanel() {
  eventsVisible = !eventsVisible;
  document.getElementById('events-panel').classList.toggle('visible', eventsVisible);
  document.getElementById('events-toggle').classList.toggle('active', eventsVisible);
}

/**
 * Initialize SDK event listeners
 *
 * PARTNER INTEGRATION POINT:
 * This is where you should add your custom business logic to respond to SkinGPT events.
 * Each event handler below can trigger specific actions on your platform, such as:
 * - Tracking analytics (onReady)
 * - Managing shopping cart (onAddToCart)
 * - Navigating to product pages (onGoToProduct)
 * - Storing AI recommendations (onProductRecommendations)
 *
 * Add your API calls, tracking pixels, or other integration logic in the respective
 * event handler functions below.
 */
function initializeSDK() {
  if (!window.pulpoar) {
    console.error('PulpoAR SDK not loaded');
    return;
  }

  // Ready event - SDK is initialized
  window.pulpoar.onReady(() => {
    logEvent('onReady', {});
    handleReady();
  });

  // Close event - User clicked close button
  window.pulpoar.onClose(() => {
    logEvent('onClose', {});
    handleClose();
  });

  // Hide event - User clicked hide button
  window.pulpoar.onHide(() => {
    logEvent('onHide', {});
    handleHide();
  });

  // Add to cart event
  window.pulpoar.onAddToCart((payload) => {
    logEvent('onAddToCart', payload);
    handleAddToCart(payload);
  });

  // Go to product event
  window.pulpoar.onGoToProduct((payload) => {
    logEvent('onGoToProduct', payload);
    handleGoToProduct(payload);
  });

  // Variant select event
  window.pulpoar.onVariantSelect((payload) => {
    logEvent('onVariantSelect', payload);
    handleVariantSelect(payload);
  });

  // GDPR approval event
  window.pulpoar.onGdprApprove(() => {
    logEvent('onGdprApprove', {});
    handleGdprApprove();
  });

  // Take photo again event
  window.pulpoar.onTakePhotoAgain(() => {
    logEvent('onTakePhotoAgain', {});
    handleTakePhotoAgain();
  });

  // Use photo event
  window.pulpoar.onUsePhoto(() => {
    logEvent('onUsePhoto', {});
    handleUsePhoto();
  });

  // Product recommendations event
  window.pulpoar.onProductRecommendations((payload) => {
    logEvent('onProductRecommendations', payload);
    handleProductRecommendations(payload);
  });

  // Error event
  window.pulpoar.onError((error) => {
    logEvent('onError', { error: error.message || error });
    handleError(error);
  });

  console.log('SkinGPT SDK initialized');
  console.log('Listening for events...');
  console.log('---');
}

/**
 * Log event to storage and UI
 */
function logEvent(eventType, payload) {
  const eventData = {
    timestamp: new Date().toISOString(),
    event: eventType,
    data: payload
  };

  eventsLog.push(eventData);

  // Console log for debugging
  console.log('Event received:', eventData);

  // Display in UI
  displayEvent(eventData);

  // Update counter
  updateEventCount();
}

/**
 * Display event in the UI
 */
function displayEvent(eventData) {
  const eventsLogEl = document.getElementById('events-log');

  // Remove empty state if exists
  const emptyState = eventsLogEl.querySelector('.empty-state');
  if (emptyState) {
    emptyState.remove();
  }

  // Create event item
  const eventItem = document.createElement('div');
  eventItem.className = 'event-item';
  eventItem.setAttribute('data-event', eventData.event);

  // Format timestamp
  const timestamp = new Date(eventData.timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  // Check if payload is empty
  const hasPayload = eventData.data && Object.keys(eventData.data).length > 0;

  eventItem.innerHTML = `
    <div class="event-header">
      <span class="event-type">${eventData.event}</span>
      <span class="event-timestamp">${timestamp}</span>
    </div>
    ${hasPayload ? `
    <div class="event-data">
      <pre>${JSON.stringify(eventData.data, null, 2)}</pre>
    </div>
    ` : ''}
  `;

  // Add to top of log
  eventsLogEl.insertBefore(eventItem, eventsLogEl.firstChild);

  // Limit to 50 events in UI
  const items = eventsLogEl.querySelectorAll('.event-item');
  if (items.length > 50) {
    items[items.length - 1].remove();
  }
}

/**
 * Update event counter
 */
function updateEventCount() {
  const countEl = document.getElementById('event-count');
  countEl.textContent = eventsLog.length;
}

/**
 * Event handlers - Add your custom business logic here
 */
function handleReady() {
  console.log('SkinGPT is ready');
  // Example: Track initialization in analytics
}

function handleClose() {
  console.log('Close button triggered');
  closeChat();
}

function handleHide() {
  console.log('Hide button triggered');
  closeChat();
}

function handleAddToCart(payload) {
  console.log('Add to Cart:', payload);
  // Example: Add product to your e-commerce cart
  // payload contains: { id, name, image, url }
}

function handleGoToProduct(payload) {
  console.log('Go to Product:', payload);
  // Example: Navigate to product detail page
  // payload contains: { id, name, url }
}

function handleVariantSelect(payload) {
  console.log('Variant Selected:', payload);
  // Example: Update selected variant in your state
}

function handleGdprApprove() {
  console.log('GDPR Approved');
  // Example: Track consent in your system
}

function handleTakePhotoAgain() {
  console.log('Take Photo Again triggered');
  // Example: Track user interaction
}

function handleUsePhoto() {
  console.log('Use Photo triggered');
  // Example: Track photo submission
}

function handleProductRecommendations(payload) {
  console.log('Product Recommendations:', payload);
  // Example: Store recommendations for analytics
  // payload contains: { products: [...], profile: { ageId, language, skinTypeId, skinConcernIds, targetedRoutineId } }
}

function handleError(error) {
  console.error('SkinGPT Error:', error);
  // Example: Log error to your monitoring system
}

/**
 * Clear all events
 */
function clearEvents() {
  if (confirm('Are you sure you want to clear all events?')) {
    eventsLog = [];
    const eventsLogEl = document.getElementById('events-log');
    eventsLogEl.innerHTML = `
      <div class="empty-state">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
        </svg>
        <h3>No events yet</h3>
        <p>Open the chat and interact to see events</p>
      </div>
    `;
    updateEventCount();
    console.clear();
    console.log('Events cleared');
  }
}

/**
 * Export events to JSON
 */
function exportEvents() {
  if (eventsLog.length === 0) {
    alert('No events to export');
    return;
  }

  const dataStr = JSON.stringify(eventsLog, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `skingpt-events-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();

  URL.revokeObjectURL(url);

  console.log('Events exported:', eventsLog.length, 'events');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeSDK);
