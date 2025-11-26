import { useEffect, useRef } from 'react';
import type {
  AddToCartPayload,
  GoToProductPayload,
  VariantSelectPayload,
  ProductRecommendationsPayload,
} from '../global';

export interface PulpoarCallbacks {
  onReady?: () => void;
  onClose?: () => void;
  onHide?: () => void;
  onAddToCart?: (payload: AddToCartPayload) => void;
  onGoToProduct?: (payload: GoToProductPayload) => void;
  onVariantSelect?: (payload: VariantSelectPayload) => void;
  onGdprApprove?: () => void;
  onTakePhotoAgain?: () => void;
  onUsePhoto?: () => void;
  onProductRecommendations?: (payload: ProductRecommendationsPayload) => void;
  onError?: (error: Error) => void;
}

const SDK_URL =
  'https://cdn.jsdelivr.net/npm/@pulpoar/plugin-sdk@latest/dist/index.iife.js';

export function usePulpoarSDK(callbacks: PulpoarCallbacks) {
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const callbacksRef = useRef(callbacks);

  // Keep callbacks ref updated
  callbacksRef.current = callbacks;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = SDK_URL;
    script.async = true;

    script.onload = () => {
      if (!window.pulpoar) return;

      const { pulpoar } = window;
      const cb = callbacksRef.current;

      if (cb.onReady) pulpoar.onReady(cb.onReady);
      if (cb.onClose) pulpoar.onClose(cb.onClose);
      if (cb.onHide) pulpoar.onHide(cb.onHide);
      if (cb.onAddToCart) pulpoar.onAddToCart(cb.onAddToCart);
      if (cb.onGoToProduct) pulpoar.onGoToProduct(cb.onGoToProduct);
      if (cb.onVariantSelect) pulpoar.onVariantSelect(cb.onVariantSelect);
      if (cb.onGdprApprove) pulpoar.onGdprApprove(cb.onGdprApprove);
      if (cb.onTakePhotoAgain) pulpoar.onTakePhotoAgain(cb.onTakePhotoAgain);
      if (cb.onUsePhoto) pulpoar.onUsePhoto(cb.onUsePhoto);
      if (cb.onProductRecommendations)
        pulpoar.onProductRecommendations(cb.onProductRecommendations);
      if (cb.onError) pulpoar.onError(cb.onError);
    };

    document.body.appendChild(script);
    scriptRef.current = script;

    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, []);
}
