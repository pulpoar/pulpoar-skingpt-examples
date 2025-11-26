declare global {
  interface Window {
    pulpoar: PulpoarSDK;
  }
}

interface PulpoarSDK {
  onReady: (callback: () => void) => void;
  onClose: (callback: () => void) => void;
  onHide: (callback: () => void) => void;
  onAddToCart: (callback: (payload: AddToCartPayload) => void) => void;
  onGoToProduct: (callback: (payload: GoToProductPayload) => void) => void;
  onVariantSelect: (callback: (payload: VariantSelectPayload) => void) => void;
  onGdprApprove: (callback: () => void) => void;
  onTakePhotoAgain: (callback: () => void) => void;
  onUsePhoto: (callback: () => void) => void;
  onProductRecommendations: (
    callback: (payload: ProductRecommendationsPayload) => void,
  ) => void;
  onError: (callback: (error: Error) => void) => void;
}

export interface AddToCartPayload {
  id: string;
  name: string;
  image: string;
  url: string;
}

export interface GoToProductPayload {
  id: string;
  name: string;
  url: string;
}

export interface VariantSelectPayload {
  id: string;
  name: string;
  [key: string]: unknown;
}

export interface ProductRecommendationsPayload {
  products: Array<{
    id: string;
    name: string;
    url: string;
    image: string;
  }>;
  profile: {
    ageId: string;
    language: string;
    skinTypeId: string;
    skinConcernIds: string[];
    targetedRoutineId: string;
  };
}
