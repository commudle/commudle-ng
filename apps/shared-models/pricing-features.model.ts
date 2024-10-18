export interface IPricingFeatures {
  name: string;
  features: IPricingFeature[];
}

export interface IPricingFeature {
  name: string;
  enterprise: boolean;
  startup: boolean;
  agency: boolean;
  custom_text_for_agency: string;
  custom_text_for_enterprise: string;
  custom_text_for_startup: string;
}

export interface IPricing {
  name: string;
  description: string;
  priceDetails: IPricingPlan[];
  key_features: string[];
  button_text: string;
}

export interface IPricingPlan {
  price_after_discount?: string;
  price: string;
  discount_percentage?: string;
  url: string;
}
