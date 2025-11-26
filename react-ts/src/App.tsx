import './App.css';
import { useState } from 'react';
import { ChatIcon } from './ChatIcon';
import { EventsPanel } from './components/EventsPanel';
import { useEventsLog } from './hooks/useEventsLog';
import { usePulpoarSDK } from './hooks/usePulpoarSDK';
import { useViewportHeight } from './hooks/useViewportHeight';

const MOBILE_BREAKPOINT = 768;

export function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [shouldShowEvents, setShouldShowEvents] = useState(false);
  const { events, logEvent, clearEvents, exportEvents } = useEventsLog();

  usePulpoarSDK({
    onReady: () => logEvent('onReady'),
    onClose: () => {
      logEvent('onClose');
      setIsOpen(false);
    },
    onHide: () => {
      logEvent('onHide');
      setIsHidden(true);
    },
    onAddToCart: (payload) => logEvent('onAddToCart', payload),
    onGoToProduct: (payload) => logEvent('onGoToProduct', payload),
    onVariantSelect: (payload) => logEvent('onVariantSelect', payload),
    onGdprApprove: () => logEvent('onGdprApprove'),
    onTakePhotoAgain: () => logEvent('onTakePhotoAgain'),
    onUsePhoto: () => logEvent('onUsePhoto'),
    onProductRecommendations: (payload) =>
      logEvent('onProductRecommendations', payload),
    onError: (error) => logEvent('onError', { message: error.message }),
  });

  useViewportHeight();

  const openChat = () => {
    setIsHidden(false);
    setIsOpen(true);
  };

  const isMobileViewport = window.innerWidth <= MOBILE_BREAKPOINT;

  return (
    <div>
      <div className="demo-title">PulpoAR SkinAI Assistant Demo</div>

      <div
        className={`events-toggle ${shouldShowEvents ? 'active' : ''}`}
        onClick={() => setShouldShowEvents(!shouldShowEvents)}
      >
        <span>📊</span>
      </div>

      <div
        className="chat-button"
        onClick={openChat}
        style={{ cursor: isOpen ? 'default' : 'pointer' }}
      >
        <ChatIcon />
      </div>

      {isOpen && (
        <div
          className={`chat-popup ${isHidden ? 'hidden' : ''} ${isMobileViewport ? 'mobile' : ''}`}
        >
          <iframe
            src="https://skingpt.pulpoar.com"
            title="SkinGPT"
            allow="camera *; clipboard-write; clipboard-read; fullscreen; gyroscope"
          />
        </div>
      )}

      {shouldShowEvents && (
        <EventsPanel
          events={events}
          onClear={clearEvents}
          onExport={exportEvents}
        />
      )}
    </div>
  );
}
