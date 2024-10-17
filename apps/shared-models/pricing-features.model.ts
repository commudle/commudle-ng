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
