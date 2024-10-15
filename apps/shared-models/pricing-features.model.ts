export interface IPricingFeatures {
  name: string;
  features: IPricingFeature[];
}

export interface IPricingFeature {
  name: string;
  enterprise: boolean | string;
  startup: boolean | string;
  agency: boolean | string;
}
