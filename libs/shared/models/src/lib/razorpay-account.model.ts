export interface IRazorpayAccount {
  id: number;
  uuid: string;
  account_details: IRzpAccountDetails;
  account_id: string;
  bank_details: IBankDetails;
  product_id: string;
  commudle_fee_percentage: number;
  activation_status: EActivationStatus;
}

export interface IBankDetails {
  account_number: number;
  beneficiary_name: string;
  ifsc_code: string;
}

export interface IRzpAccountDetails {
  attributes: {
    email: string;
    status: string;
  };
}

export enum EActivationStatus {
  REQUESTED = 'requested',
  NEEDS_CLARIFICATION = 'needs_clarification',
  UNDER_REVIEW = 'under_review',
  ACTIVATED = 'activated',
  SUSPENDED = 'suspended',
  CREATED = 'created',
  REJECTED = 'rejected',
}

export enum EBusinessType {
  LLP = 'llp',
  NGO = 'ngo',
  INDIVIDUAL = 'individual',
  PARTNERSHIP = 'partnership',
  PROPRIETORSHIP = 'proprietorship',
  PUBLIC_LIMITED = 'public_limited',
  PRIVATE_LIMITED = 'private_limited',
  TRUST_SOCIETY = 'trust_society',
  NOT_YET_REGISTERED = 'not_yet_registered',
  EDUCATIONAL_INSTITUTES = 'educational_institutes',
  OTHER = 'other',
}

export enum EBusinessCategory {
  FINANCIAL_SERVICES = 'financial_services',
  EDUCATION = 'education',
  HEALTHCARE = 'healthcare',
  UTILITIES = 'utilities',
  GOVERNMENT = 'government',
  LOGISTICS = 'logistics',
  TOURS_AND_TRAVEL = 'tours_and_travel',
  TRANSPORT = 'transport',
  ECOMMERCE = 'ecommerce',
  FOOD = 'food',
  IT_AND_SOFTWARE = 'it_and_software',
  GAMING = 'gaming',
  MEDIA_AND_ENTERTAINMENT = 'media_and_entertainment',
  SERVICES = 'services',
  HOUSING = 'housing',
  NOT_FOR_PROFIT = 'not_for_profit',
  SOCIAL = 'social',
  OTHERS = 'others',
}

export enum FinancialServicesSubcategory {
  MUTUAL_FUND = 'mutual_fund',
  LENDING = 'lending',
  CRYPTOCURRENCY = 'cryptocurrency',
  INSURANCE = 'insurance',
  NBFC = 'nbfc',
  COOPERATIVES = 'cooperatives',
  PENSION_FUND = 'pension_fund',
  FOREX = 'forex',
  SECURITIES = 'securities',
  COMMODITIES = 'commodities',
  ACCOUNTING = 'accounting',
  FINANCIAL_ADVISOR = 'financial_advisor',
  CROWDFUNDING = 'crowdfunding',
  TRADING = 'trading',
  BETTING = 'betting',
  GET_RICH_SCHEMES = 'get_rich_schemes',
  MONEYSEND_FUNDING = 'moneysend_funding',
  WIRE_TRANSFERS_AND_MONEY_ORDERS = 'wire_transfers_and_money_orders',
  TAX_PREPARATION_SERVICES = 'tax_preparation_services',
  TAX_PAYMENTS = 'tax_payments',
  DIGITAL_GOODS = 'digital_goods',
  ATMS = 'atms',
}

export enum EducationSubcategory {
  COLLEGE = 'college',
  SCHOOLS = 'schools',
  UNIVERSITY = 'university',
  PROFESSIONAL_COURSES = 'professional_courses',
  DISTANCE_LEARNING = 'distance_learning',
  DAY_CARE = 'day_care',
  COACHING = 'coaching',
  ELEARNING = 'elearning',
  VOCATIONAL_AND_TRADE_SCHOOLS = 'vocational_and_trade_schools',
  SPORTING_CLUBS = 'sporting_clubs',
  DANCE_HALLS_STUDIOS_AND_SCHOOLS = 'dance_halls_studios_and_schools',
  CORRESPONDENCE_SCHOOLS = 'correspondence_schools',
}

export enum HealthcareSubcategory {
  PHARMACY = 'pharmacy',
  CLINIC = 'clinic',
  HOSPITAL = 'hospital',
  LAB = 'lab',
  DIETICIAN = 'dietician',
  FITNESS = 'fitness',
  HEALTH_COACHING = 'health_coaching',
  HEALTH_PRODUCTS = 'health_products',
  DRUG_STORES = 'drug_stores',
  HEALTHCARE_MARKETPLACE = 'healthcare_marketplace',
  OSTEOPATHS = 'osteopaths',
  MEDICAL_EQUIPMENT_AND_SUPPLY_STORES = 'medical_equipment_and_supply_stores',
  PODIATRISTS_AND_CHIROPODISTS = 'podiatrists_and_chiropodists',
  DENTISTS_AND_ORTHODONTISTS = 'dentists_and_orthodontists',
  HARDWARE_STORES = 'hardware_stores',
  OPHTHALMOLOGISTS = 'ophthalmologists',
  ORTHOPEDIC_GOODS_STORES = 'orthopedic_goods_stores',
  TESTING_LABORATORIES = 'testing_laboratories',
  DOCTORS = 'doctors',
  HEALTH_PRACTITIONERS_MEDICAL_SERVICES = 'health_practitioners_medical_services',
}

export enum EcommerceSubcategory {
  ECOMMERCE_MARKETPLACE = 'ecommerce_marketplace',
  AGRICULTURE = 'agriculture',
  BOOKS = 'books',
  ELECTRONICS_AND_FURNITURE = 'electronics_and_furniture',
  COUPONS = 'coupons',
  RENTAL = 'rental',
  FASHION_AND_LIFESTYLE = 'fashion_and_lifestyle',
  GIFTING = 'gifting',
  GROCERY = 'grocery',
  BABY_PRODUCTS = 'baby_products',
  OFFICE_SUPPLIES = 'office_supplies',
  WHOLESALE = 'wholesale',
  RELIGIOUS_PRODUCTS = 'religious_products',
  PET_PRODUCTS = 'pet_products',
  SPORTS_PRODUCTS = 'sports_products',
  ARTS_AND_COLLECTIBLES = 'arts_and_collectibles',
  SEXUAL_WELLNESS_PRODUCTS = 'sexual_wellness_products',
  DROP_SHIPPING = 'drop_shipping',
  CRYPTO_MACHINERY = 'crypto_machinery',
  TOBACCO = 'tobacco',
  WEAPONS_AND_AMMUNITIONS = 'weapons_and_ammunitions',
  STAMPS_AND_COINS_STORES = 'stamps_and_coins_stores',
  OFFICE_EQUIPMENT = 'office_equipment',
  AUTOMOBILE_PARTS_AND_EQUIPMENTS = 'automobile_parts_and_equipements',
  GARDEN_SUPPLY_STORES = 'garden_supply_stores',
  HOUSEHOLD_APPLIANCE_STORES = 'household_appliance_stores',
  NON_DURABLE_GOODS = 'non_durable_goods',
  PAWN_SHOPS = 'pawn_shops',
  ELECTRICAL_PARTS_AND_EQUIPMENT = 'electrical_parts_and_equipment',
  WIG_AND_TOUPEE_SHOPS = 'wig_and_toupee_shops',
  GIFT_NOVELTY_AND_SOUVENIR_SHOPS = 'gift_novelty_and_souvenir_shops',
  DUTY_FREE_STORES = 'duty_free_stores',
  OFFICE_AND_COMMERCIAL_FURNITURE = 'office_and_commercial_furniture',
  DRY_GOODS = 'dry_goods',
  BOOKS_AND_PUBLICATIONS = 'books_and_publications',
  CAMERA_AND_PHOTOGRAPHIC_STORES = 'camera_and_photographic_stores',
  RECORD_SHOPS = 'record_shops',
  MEAT_SUPPLY_STORES = 'meat_supply_stores',
  LEATHER_GOODS_AND_LUGGAGE = 'leather_goods_and_luggage',
  SNOWMOBILE_DEALERS = 'snowmobile_dealers',
  MEN_AND_BOYS_CLOTHING_STORES = 'men_and_boys_clothing_stores',
  PAINT_SUPPLY_STORES = 'paint_supply_stores',
  AUTOMOTIVE_PARTS = 'automotive_parts',
  JEWELLERY_AND_WATCH_STORES = 'jewellery_and_watch_stores',
  AUTO_STORE_HOME_SUPPLY_STORES = 'auto_store_home_supply_stores',
  TENT_STORES = 'tent_stores',
  SHOE_STORES_RETAIL = 'shoe_stores_retail',
  PETROLEUM_AND_PETROLEUM_PRODUCTS = 'petroleum_and_petroleum_products',
  DEPARTMENT_STORES = 'department_stores',
  AUTOMOTIVE_TIRE_STORES = 'automotive_tire_stores',
  SPORT_APPAREL_STORES = 'sport_apparel_stores',
  VARIETY_STORES = 'variety_stores',
  CHEMICALS_AND_ALLIED_PRODUCTS = 'chemicals_and_allied_products',
  COMMERCIAL_EQUIPMENTS = 'commercial_equipments',
  FIREPLACE_PARTS_AND_ACCESSORIES = 'fireplace_parts_and_accessories',
  FAMILY_CLOTHING_STORES = 'family_clothing_stores',
  FABRIC_AND_SEWING_STORES = 'fabric_and_sewing_stores',
  HOME_SUPPLY_WAREHOUSE = 'home_supply_warehouse',
  ART_SUPPLY_STORES = 'art_supply_stores',
  CAMPER_RECREATIONAL_AND_UTILITY_TRAILER_DEALERS = 'camper_recreational_and_utility_trailer_dealers',
  CLOCKS_AND_SILVERWARE_STORES = 'clocks_and_silverware_stores',
  DISCOUNT_STORES = 'discount_stores',
  SCHOOL_SUPPLIES_AND_STATIONERY = 'school_supplies_and_stationery',
  SECOND_HAND_STORES = 'second_hand_stores',
  WATCH_AND_JEWELLERY_REPAIR_STORES = 'watch_and_jewellery_repair_stores',
  LIQUOR_STORES = 'liquor_stores',
  BOAT_DEALERS = 'boat_dealers',
  OPTICIANS_OPTICAL_GOODS_AND_EYEGLASSE_STORES = 'opticians_optical_goods_and_eyeglasse_stores',
  WHOLESALE_FOOTWEAR_STORES = 'wholesale_footwear_stores',
  COSMETIC_STORES = 'cosmetic_stores',
  HOME_FURNISHING_STORES = 'home_furnishing_stores',
  ANTIQUE_STORES = 'antique_stores',
  PLUMBING_AND_HEATING_EQUIPMENT = 'plumbing_and_heating_equipment',
  TELECOMMUNICATION_EQUIPMENT_STORES = 'telecommunication_equipment_stores',
  WOMEN_CLOTHING = 'women_clothing',
  FLORISTS = 'florists',
  COMPUTER_SOFTWARE_STORES = 'computer_software_stores',
  BUILDING_MATRIAL_STORES = 'building_matrial_stores',
  CANDY_NUT_CONFECTIONERY_SHOPS = 'candy_nut_confectionery_shops',
  GLASS_AND_WALLPAPER_STORES = 'glass_and_wallpaper_stores',
  COMMERCIAL_PHOTOGRAPHY_AND_GRAPHIC_DESIGN_SERVICES = 'commercial_photography_and_graphic_design_services',
  VIDEO_GAME_SUPPLY_STORES = 'video_game_supply_stores',
  FUEL_DEALERS = 'fuel_dealers',
  DRAPERY_AND_WINDOW_COVERINGS_STORES = 'drapery_and_window_coverings_stores',
  HEARING_AIDS_STORES = 'hearing_aids_stores',
  AUTOMOTIVE_PAINT_SHOPS = 'automotive_paint_shops',
  DURABLE_GOODS_STORES = 'durable_goods_stores',
  UNIFORMS_AND_COMMERCIAL_CLOTHING_STORES = 'uniforms_and_commercial_clothing_stores',
  FUR_SHOPS = 'fur_shops',
  INDUSTRIAL_SUPPLIES = 'industrial_supplies',
  BICYCLE_STORES = 'bicycle_stores',
  MOTORCYCLE_SHOPS_AND_DEALERS = 'motorcycle_shops_and_dealers',
  CHILDREN_AND_INFANTS_WEAR_STORES = 'children_and_infants_wear_stores',
  WOMEN_ACCESSORY_STORES = 'women_accessory_stores',
  CONSTRUCTION_MATERIALS = 'construction_materials',
  BOOKS_PERIODICALS_AND_NEWSPAPER = 'books_periodicals_and_newspaper',
  FLOOR_COVERING_STORES = 'floor_covering_stores',
  CRYSTAL_AND_GLASSWARE_STORES = 'crystal_and_glassware_stores',
  ACCESSORY_AND_APPAREL_STORES = 'accessory_and_apparel_stores',
  HARDWARE_EQUIPMENT_AND_SUPPLY_STORES = 'hardware_equipment_and_supply_stores',
  COMPUTERS_PERIPHERAL_EQUIPMENT_SOFTWARE = 'computers_peripheral_equipment_software',
  AUTOMOBILE_AND_TRUCK_DEALERS = 'automobile_and_truck_dealers',
  AIRCRAFT_AND_FARM_EQUIPMENT_DEALERS = 'aircraft_and_farm_equipment_dealers',
  ANTIQUE_SHOPS_SALES_AND_REPAIRS = 'antique_shops_sales_and_repairs',
  MUSIC_STORES = 'music_stores',
  FURNITURE_AND_HOME_FURNISHING_STORE = 'furniture_and_home_furnishing_store',
}

export enum ServiceSubcategory {
  REPAIR_AND_CLEANING = 'repair_and_cleaning',
  INTERIOR_DESIGN_AND_ARCHITECT = 'interior_design_and_architect',
  MOVERS_AND_PACKERS = 'movers_and_packers',
  LEGAL = 'legal',
  EVENT_PLANNING = 'event_planning',
  SERVICE_CENTRE = 'service_centre',
  CONSULTING = 'consulting',
  AD_AND_MARKETING = 'ad_and_marketing',
  SERVICES_CLASSIFIEDS = 'services_classifieds',
  MULTI_LEVEL_MARKETING = 'multi_level_marketing',
  CONSTRUCTION_SERVICES = 'construction_services',
  ARCHITECTURAL_SERVICES = 'architectural_services',
  CAR_WASHES = 'car_washes',
  MOTOR_HOME_RENTALS = 'motor_home_rentals',
  STENOGRAPHIC_AND_SECRETARIAL_SUPPORT_SERVICES = 'stenographic_and_secretarial_support_services',
  CHIROPRACTORS = 'chiropractors',
  AUTOMOTIVE_SERVICE_SHOPS = 'automotive_service_shops',
  SHOE_REPAIR_SHOPS = 'shoe_repair_shops',
  TELECOMMUNICATION_SERVICE = 'telecommunication_service',
  FINES = 'fines',
  SECURITY_AGENCIES = 'security_agencies',
  TAILORS = 'tailors',
  TYPE_SETTING_AND_ENGRAVING_SERVICES = 'type_setting_and_engraving_services',
  SMALL_APPLIANCE_REPAIR_SHOPS = 'small_appliance_repair_shops',
  PHOTOGRAPHY_LABS = 'photography_labs',
  DRY_CLEANERS = 'dry_cleaners',
  MASSAGE_PARLORS = 'massage_parlors',
  ELECTRONIC_REPAIR_SHOPS = 'electronic_repair_shops',
  CLEANING_AND_SANITATION_SERVICES = 'cleaning_and_sanitation_services',
  NURSING_CARE_FACILITIES = 'nursing_care_facilities',
  DIRECT_MARKETING = 'direct_marketing',
  LOTTERY = 'lottery',
  VETERINARY_SERVICES = 'veterinary_services',
  AFFILIATED_AUTO_RENTAL = 'affiliated_auto_rental',
  ALIMONY_AND_CHILD_SUPPORT = 'alimony_and_child_support',
  AIRPORT_FLYING_FIELDS = 'airport_flying_fields',
  GOLF_COURSES = 'golf_courses',
  TIRE_RETREADING_AND_REPAIR_SHOPS = 'tire_retreading_and_repair_shops',
  TELEVISION_CABLE_SERVICES = 'television_cable_services',
  RECREATIONAL_AND_SPORTING_CAMPS = 'recreational_and_sporting_camps',
  BARBER_AND_BEAUTY_SHOPS = 'barber_and_beauty_shops',
  AGRICULTURAL_COOPERATIVES = 'agricultural_cooperatives',
  CARPENTRY_CONTRACTORS = 'carpentry_contractors',
  WRECKING_AND_SALVAGING_SERVICES = 'wrecking_and_salvaging_services',
  AUTOMOBILE_TOWING_SERVICES = 'automobile_towing_services',
  VIDEO_TAPE_RENTAL_STORES = 'video_tape_rental_stores',
  MISCELLANEOUS_REPAIR_SHOPS = 'miscellaneous_repair_shops',
  MOTOR_HOMES_AND_PARTS = 'motor_homes_and_parts',
  HORSE_OR_DOG_RACING = 'horse_or_dog_racing',
  LAUNDRY_SERVICES = 'laundry_services',
  ELECTRICAL_CONTRACTORS = 'electrical_contractors',
  DEBT_MARRIAGE_PERSONAL_COUNSELING_SERVICE = 'debt_marriage_personal_counseling_service',
  AIR_CONDITIONING_AND_REFRIGERATION_REPAIR_SHOPS = 'air_conditioning_and_refrigeration_repair_shops',
  CREDIT_REPORTING_AGENCIES = 'credit_reporting_agencies',
  HEATING_AND_PLUMBING_CONTRACTORS = 'heating_and_plumbing_contractors',
  CARPET_AND_UPHOLSTERY_CLEANING_SERVICES = 'carpet_and_upholstery_cleaning_services',
  SWIMMING_POOLS = 'swimming_pools',
  ROOFING_AND_METAL_WORK_CONTRACTORS = 'roofing_and_metal_work_contractors',
  INTERNET_SERVICE_PROVIDERS = 'internet_service_providers',
  RECREATIONAL_CAMPS = 'recreational_camps',
  MASONRY_CONTRACTORS = 'masonry_contractors',
  EXTERMINATING_AND_DISINFECTING_SERVICES = 'exterminating_and_disinfecting_services',
  AMBULANCE_SERVICES = 'ambulance_services',
  FUNERAL_SERVICES_AND_CREMATORIES = 'funeral_services_and_crematories',
  METAL_SERVICE_CENTRES = 'metal_service_centres',
  COPYING_AND_BLUEPRINTING_SERVICES = 'copying_and_blueprinting_services',
  FUEL_DISPENSERS = 'fuel_dispensers',
  WELDING_REPAIR = 'welding_repair',
  MOBILE_HOME_DEALERS = 'mobile_home_dealers',
  CONCRETE_WORK_CONTRACTORS = 'concrete_work_contractors',
  BOAT_RENTALS = 'boat_rentals',
  PERSONAL_SHOPPERS_AND_SHOPPING_CLUBS = 'personal_shoppers_and_shopping_clubs',
  DOOR_TO_DOOR_SALES = 'door_to_door_sales',
  TRAVEL_RELATED_DIRECT_MARKETING = 'travel_related_direct_marketing',
  LOTTERY_AND_BETTING = 'lottery_and_betting',
  BANDS_ORCHESTRAS_AND_MISCELLANEOUS_ENTERTAINERS = 'bands_orchestras_and_miscellaneous_entertainers',
  FURNITURE_REPAIR_AND_REFINISHING = 'furniture_repair_and_refinishing',
  CONTRACTORS = 'contractors',
  DIRECT_MARKETING_AND_SUBSCRIPTION_MERCHANTS = 'direct_marketing_and_subscription_merchants',
  TYPEWRITER_STORES_SALES_SERVICE_AND_RENTALS = 'typewriter_stores_sales_service_and_rentals',
  RECREATION_SERVICES = 'recreation_services',
  DIRECT_MARKETING_INSURANCE_SERVICES = 'direct_marketing_insurance_services',
  BUSINESS_SERVICES = 'business_services',
  INBOUND_TELEMARKETING_MERCHANTS = 'inbound_telemarketing_merchants',
  PUBLIC_WAREHOUSING = 'public_warehousing',
  OUTBOUND_TELEMARKETING_MERCHANTS = 'outbound_telemarketing_merchants',
  CLOTHING_RENTAL_STORES = 'clothing_rental_stores',
  TRANSPORTATION_SERVICES = 'transportation_services',
  ELECTRIC_RAZOR_STORES = 'electric_razor_stores',
  SERVICE_STATIONS = 'service_stations',
  PHOTOGRAPHIC_STUDIO = 'photographic_studio',
  PROFESSIONAL_SERVICES = 'professional_services',
}

export enum HousingSubcategory {
  DEVELOPER = 'developer',
  FACILITY_MANAGEMENT = 'facility_management',
  RWA = 'rwa',
  COWORKING = 'coworking',
  REALESTATE_CLASSIFIEDS = 'realestate_classifieds',
  SPACE_RENTAL = 'space_rental',
}

export enum NotForProfitSubcategory {
  CHARITY = 'charity',
  EDUCATIONAL = 'educational',
  RELIGIOUS = 'religious',
  PERSONAL = 'personal',
}

export enum SocialSubcategory {
  MATCHMAKING = 'matchmaking',
  SOCIAL_NETWORK = 'social_network',
  MESSAGING = 'messaging',
  PROFESSIONAL_NETWORK = 'professional_network',
  NEIGHBOURHOOD_NETWORK = 'neighbourhood_network',
  POLITICAL_ORGANIZATIONS = 'political_organizations',
  AUTOMOBILE_ASSOCIATIONS_AND_CLUBS = 'automobile_associations_and_clubs',
  COUNTRY_AND_ATHLETIC_CLUBS = 'country_and_athletic_clubs',
  ASSOCIATIONS_AND_MEMBERSHIP = 'associations_and_membership',
}

export enum MediaAndEntertainmentSubcategory {
  VIDEO_ON_DEMAND = 'video_on_demand',
  MUSIC_STREAMING = 'music_streaming',
  MULTIPLEX = 'multiplex',
  CONTENT_AND_PUBLISHING = 'content_and_publishing',
  TICKETING = 'ticketing',
  NEWS = 'news',
  VIDEO_GAME_ARCADES = 'video_game_arcades',
  VIDEO_TAPE_PRODUCTION_AND_DISTRIBUTION = 'video_tape_production_and_distribution',
  BOWLING_ALLEYS = 'bowling_alleys',
  BILLIARD_AND_POOL_ESTABLISHMENTS = 'billiard_and_pool_establishments',
  AMUSEMENT_PARKS_AND_CIRCUSES = 'amusement_parks_and_circuses',
  TICKET_AGENCIES = 'ticket_agencies',
}

export enum GamingSubcategory {
  GAME_DEVELOPER = 'game_developer',
  ESPORTS = 'esports',
  ONLINE_CASINO = 'online_casino',
  FANTASY_SPORTS = 'fantasy_sports',
  GAMING_MARKETPLACE = 'gaming_marketplace',
}

export enum ItAndSoftwareSubcategory {
  SAAS = 'saas',
  PAAS = 'paas',
  IAAS = 'iaas',
  CONSULTING_AND_OUTSOURCING = 'consulting_and_outsourcing',
  WEB_DEVELOPMENT = 'web_development',
  TECHNICAL_SUPPORT = 'technical_support',
  DATA_PROCESSING = 'data_processing',
}

export enum FoodSubcategory {
  ONLINE_FOOD_ORDERING = 'online_food_ordering',
  RESTAURANT = 'restaurant',
  FOOD_COURT = 'food_court',
  CATERING = 'catering',
  ALCOHOL = 'alcohol',
  RESTAURANT_SEARCH_AND_BOOKING = 'restaurant_search_and_booking',
  DAIRY_PRODUCTS = 'dairy_products',
  BAKERIES = 'bakeries',
}

export enum UtilitiesSubcategory {
  ELECTRICITY = 'electricity',
  GAS = 'gas',
  TELECOM = 'telecom',
  WATER = 'water',
  CABLE = 'cable',
  BROADBAND = 'broadband',
  DTH = 'dth',
  INTERNET_PROVIDER = 'internet_provider',
  BILL_AND_RECHARGE_AGGREGATORS = 'bill_and_recharge_aggregators',
}

export enum GovernmentSubcategory {
  CENTRAL = 'central',
  STATE = 'state',
  INTRA_GOVERNMENT_PURCHASES = 'intra_government_purchases',
  GOVERMENT_POSTAL_SERVICES = 'goverment_postal_services',
}

export enum LogisticsSubcategory {
  FREIGHT = 'freight',
  COURIER = 'courier',
  WAREHOUSING = 'warehousing',
  DISTRIBUTION = 'distribution',
  END_TO_END_LOGISTICS = 'end_to_end_logistics',
  COURIER_SERVICES = 'courier_services',
}

export enum ToursAndTravelSubcategory {
  // TOURS_AND_TRAVEL
  AVIATION = 'aviation',
  ACCOMMODATION = 'accommodation',
  OTA = 'ota',
  TRAVEL_AGENCY = 'travel_agency',
  TOURIST_ATTRACTIONS_AND_EXHIBITS = 'tourist_attractions_and_exhibits',
  TIMESHARES = 'timeshares',
  AQUARIUMS_DOLPHINARIUMS_AND_SEAQUARIUMS = 'aquariums_dolphinariums_and_seaquariums',
}

export enum TransportSubcategory {
  // TRANSPORT
  CAB_HAILING = 'cab_hailing',
  BUS = 'bus',
  TRAIN_AND_METRO = 'train_and_metro',
  AUTOMOBILE_RENTALS = 'automobile_rentals',
  CRUISE_LINES = 'cruise_lines',
  PARKING_LOTS_AND_GARAGES = 'parking_lots_and_garages',
  TRANSPORTATION = 'transportation',
  BRIDGE_AND_ROAD_TOLLS = 'bridge_and_road_tolls',
  FREIGHT_TRANSPORT = 'freight_transport',
  TRUCK_AND_UTILITY_TRAILER_RENTALS = 'truck_and_utility_trailer_rentals',
}
