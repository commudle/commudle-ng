// All countries
// length 252
const countries = [
  { name: 'India', code: 'IN', phone: 91, symbol: '₹', currency: 'INR' },
  { name: 'United States', code: 'US', phone: 1, symbol: '$', currency: 'USD' },
  { name: 'Austria', code: 'AT', phone: 43, symbol: '€', currency: 'EUR' },
  { name: 'Afghanistan', code: 'AF', phone: 93, symbol: '؋', currency: 'AFN' },
  { name: 'Aland Islands', code: 'AX', phone: 358, symbol: '€', currency: 'EUR' },
  { name: 'Albania', code: 'AL', phone: 355, symbol: 'Lek', currency: 'ALL' },
  { name: 'Algeria', code: 'DZ', phone: 213, symbol: 'دج', currency: 'DZD' },
  { name: 'American Samoa', code: 'AS', phone: 1684, symbol: '$', currency: 'USD' },
  { name: 'Andorra', code: 'AD', phone: 376, symbol: '€', currency: 'EUR' },
  { name: 'Angola', code: 'AO', phone: 244, symbol: 'Kz', currency: 'AOA' },
  { name: 'Anguilla', code: 'AI', phone: 1264, symbol: '$', currency: 'XCD' },
  { name: 'Antarctica', code: 'AQ', phone: 672, symbol: '$', currency: 'AAD' },
  { name: 'Antigua and Barbuda', code: 'AG', phone: 1268, symbol: '$', currency: 'XCD' },
  { name: 'Argentina', code: 'AR', phone: 54, symbol: '$', currency: 'ARS' },
  { name: 'Armenia', code: 'AM', phone: 374, symbol: '֏', currency: 'AMD' },
  { name: 'Aruba', code: 'AW', phone: 297, symbol: 'ƒ', currency: 'AWG' },
  { name: 'Australia', code: 'AU', phone: 61, symbol: '$', currency: 'AUD' },
  { name: 'Azerbaijan', code: 'AZ', phone: 994, symbol: 'm', currency: 'AZN' },
  { name: 'Bahamas', code: 'BS', phone: 1242, symbol: 'B$', currency: 'BSD' },
  { name: 'Bahrain', code: 'BH', phone: 973, symbol: '.د.ب', currency: 'BHD' },
  { name: 'Bangladesh', code: 'BD', phone: 880, symbol: '৳', currency: 'BDT' },
  { name: 'Barbados', code: 'BB', phone: 1246, symbol: 'Bds$', currency: 'BBD' },
  { name: 'Belarus', code: 'BY', phone: 375, symbol: 'Br', currency: 'BYN' },
  { name: 'Belgium', code: 'BE', phone: 32, symbol: '€', currency: 'EUR' },
  { name: 'Belize', code: 'BZ', phone: 501, symbol: '$', currency: 'BZD' },
  { name: 'Benin', code: 'BJ', phone: 229, symbol: 'CFA', currency: 'XOF' },
  { name: 'Bermuda', code: 'BM', phone: 1441, symbol: '$', currency: 'BMD' },
  { name: 'Bhutan', code: 'BT', phone: 975, symbol: 'Nu.', currency: 'BTN' },
  { name: 'Bolivia', code: 'BO', phone: 591, symbol: 'Bs.', currency: 'BOB' },
  { name: 'Bonaire, Sint Eustatius and Saba', code: 'BQ', phone: 599, symbol: '$', currency: 'USD' },
  { name: 'Bosnia and Herzegovina', code: 'BA', phone: 387, symbol: 'KM', currency: 'BAM' },
  { name: 'Botswana', code: 'BW', phone: 267, symbol: 'P', currency: 'BWP' },
  { name: 'Bouvet Island', code: 'BV', phone: 55, symbol: 'kr', currency: 'NOK' },
  { name: 'Brazil', code: 'BR', phone: 55, symbol: 'R$', currency: 'BRL' },
  { name: 'British Indian Ocean Territory', code: 'IO', phone: 246, symbol: '$', currency: 'USD' },
  { name: 'Brunei Darussalam', code: 'BN', phone: 673, symbol: 'B$', currency: 'BND' },
  { name: 'Bulgaria', code: 'BG', phone: 359, symbol: 'Лв.', currency: 'BGN' },
  { name: 'Burkina Faso', code: 'BF', phone: 226, symbol: 'CFA', currency: 'XOF' },
  { name: 'Burundi', code: 'BI', phone: 257, symbol: 'FBu', currency: 'BIF' },
  { name: 'Cambodia', code: 'KH', phone: 855, symbol: 'KHR', currency: 'KHR' },
  { name: 'Cameroon', code: 'CM', phone: 237, symbol: 'FCFA', currency: 'XAF' },
  { name: 'Canada', code: 'CA', phone: 1, symbol: '$', currency: 'CAD' },
  { name: 'Cape Verde', code: 'CV', phone: 238, symbol: '$', currency: 'CVE' },
  { name: 'Cayman Islands', code: 'KY', phone: 1345, symbol: '$', currency: 'KYD' },
  { name: 'Central African Republic', code: 'CF', phone: 236, symbol: 'FCFA', currency: 'XAF' },
  { name: 'Chad', code: 'TD', phone: 235, symbol: 'FCFA', currency: 'XAF' },
  { name: 'Chile', code: 'CL', phone: 56, symbol: '$', currency: 'CLP' },
  { name: 'China', code: 'CN', phone: 86, symbol: '¥', currency: 'CNY' },
  { name: 'Christmas Island', code: 'CX', phone: 61, symbol: '$', currency: 'AUD' },
  { name: 'Cocos (Keeling) Islands', code: 'CC', phone: 672, symbol: '$', currency: 'AUD' },
  { name: 'Colombia', code: 'CO', phone: 57, symbol: '$', currency: 'COP' },
  { name: 'Comoros', code: 'KM', phone: 269, symbol: 'CF', currency: 'KMF' },
  { name: 'Congo', code: 'CG', phone: 242, symbol: 'FC', currency: 'XAF' },
  { name: 'Congo, Democratic Republic of the Congo', code: 'CD', phone: 242, symbol: 'FC', currency: 'CDF' },
  { name: 'Cook Islands', code: 'CK', phone: 682, symbol: '$', currency: 'NZD' },
  { name: 'Costa Rica', code: 'CR', phone: 506, symbol: '₡', currency: 'CRC' },
  { name: "Cote D'Ivoire", code: 'CI', phone: 225, symbol: 'CFA', currency: 'XOF' },
  { name: 'Croatia', code: 'HR', phone: 385, symbol: 'kn', currency: 'HRK' },
  { name: 'Cuba', code: 'CU', phone: 53, symbol: '$', currency: 'CUP' },
  { name: 'Curacao', code: 'CW', phone: 599, symbol: 'ƒ', currency: 'ANG' },
  { name: 'Cyprus', code: 'CY', phone: 357, symbol: '€', currency: 'EUR' },
  { name: 'Czech Republic', code: 'CZ', phone: 420, symbol: 'Kč', currency: 'CZK' },
  { name: 'Denmark', code: 'DK', phone: 45, symbol: 'Kr.', currency: 'DKK' },
  { name: 'Djibouti', code: 'DJ', phone: 253, symbol: 'Fdj', currency: 'DJF' },
  { name: 'Dominica', code: 'DM', phone: 1767, symbol: '$', currency: 'XCD' },
  { name: 'Dominican Republic', code: 'DO', phone: 1809, symbol: '$', currency: 'DOP' },
  { name: 'Ecuador', code: 'EC', phone: 593, symbol: '$', currency: 'USD' },
  { name: 'Egypt', code: 'EG', phone: 20, symbol: 'ج.م', currency: 'EGP' },
  { name: 'El Salvador', code: 'SV', phone: 503, symbol: '$', currency: 'USD' },
  { name: 'Equatorial Guinea', code: 'GQ', phone: 240, symbol: 'FCFA', currency: 'XAF' },
  { name: 'Eritrea', code: 'ER', phone: 291, symbol: 'Nfk', currency: 'ERN' },
  { name: 'Estonia', code: 'EE', phone: 372, symbol: '€', currency: 'EUR' },
  { name: 'Ethiopia', code: 'ET', phone: 251, symbol: 'Nkf', currency: 'ETB' },
  { name: 'Falkland Islands (Malvinas)', code: 'FK', phone: 500, symbol: '£', currency: 'FKP' },
  { name: 'Faroe Islands', code: 'FO', phone: 298, symbol: 'Kr.', currency: 'DKK' },
  { name: 'Fiji', code: 'FJ', phone: 679, symbol: 'FJ$', currency: 'FJD' },
  { name: 'Finland', code: 'FI', phone: 358, symbol: '€', currency: 'EUR' },
  { name: 'France', code: 'FR', phone: 33, symbol: '€', currency: 'EUR' },
  { name: 'French Guiana', code: 'GF', phone: 594, symbol: '€', currency: 'EUR' },
  { name: 'French Polynesia', code: 'PF', phone: 689, symbol: '₣', currency: 'XPF' },
  { name: 'French Southern Territories', code: 'TF', phone: 262, symbol: '€', currency: 'EUR' },
  { name: 'Gabon', code: 'GA', phone: 241, symbol: 'FCFA', currency: 'XAF' },
  { name: 'Gambia', code: 'GM', phone: 220, symbol: 'D', currency: 'GMD' },
  { name: 'Georgia', code: 'GE', phone: 995, symbol: 'ლ', currency: 'GEL' },
  { name: 'Germany', code: 'DE', phone: 49, symbol: '€', currency: 'EUR' },
  { name: 'Ghana', code: 'GH', phone: 233, symbol: 'GH₵', currency: 'GHS' },
  { name: 'Gibraltar', code: 'GI', phone: 350, symbol: '£', currency: 'GIP' },
  { name: 'Greece', code: 'GR', phone: 30, symbol: '€', currency: 'EUR' },
  { name: 'Greenland', code: 'GL', phone: 299, symbol: 'Kr.', currency: 'DKK' },
  { name: 'Grenada', code: 'GD', phone: 1473, symbol: '$', currency: 'XCD' },
  { name: 'Guadeloupe', code: 'GP', phone: 590, symbol: '€', currency: 'EUR' },
  { name: 'Guam', code: 'GU', phone: 1671, symbol: '$', currency: 'USD' },
  { name: 'Guatemala', code: 'GT', phone: 502, symbol: 'Q', currency: 'GTQ' },
  { name: 'Guernsey', code: 'GG', phone: 44, symbol: '£', currency: 'GBP' },
  { name: 'Guinea', code: 'GN', phone: 224, symbol: 'FG', currency: 'GNF' },
  { name: 'Guinea-Bissau', code: 'GW', phone: 245, symbol: 'CFA', currency: 'XOF' },
  { name: 'Guyana', code: 'GY', phone: 592, symbol: '$', currency: 'GYD' },
  { name: 'Haiti', code: 'HT', phone: 509, symbol: 'G', currency: 'HTG' },
  { name: 'Heard Island and McDonald Islands', code: 'HM', phone: 0, symbol: '$', currency: 'AUD' },
  { name: 'Holy See (Vatican City State)', code: 'VA', phone: 39, symbol: '€', currency: 'EUR' },
  { name: 'Honduras', code: 'HN', phone: 504, symbol: 'L', currency: 'HNL' },
  { name: 'Hong Kong', code: 'HK', phone: 852, symbol: '$', currency: 'HKD' },
  { name: 'Hungary', code: 'HU', phone: 36, symbol: 'Ft', currency: 'HUF' },
  { name: 'Iceland', code: 'IS', phone: 354, symbol: 'kr', currency: 'ISK' },
  { name: 'Indonesia', code: 'ID', phone: 62, symbol: 'Rp', currency: 'IDR' },
  { name: 'Iran, Islamic Republic of', code: 'IR', phone: 98, symbol: '﷼', currency: 'IRR' },
  { name: 'Iraq', code: 'IQ', phone: 964, symbol: 'د.ع', currency: 'IQD' },
  { name: 'Ireland', code: 'IE', phone: 353, symbol: '€', currency: 'EUR' },
  { name: 'Isle of Man', code: 'IM', phone: 44, symbol: '£', currency: 'GBP' },
  { name: 'Israel', code: 'IL', phone: 972, symbol: '₪', currency: 'ILS' },
  { name: 'Italy', code: 'IT', phone: 39, symbol: '€', currency: 'EUR' },
  { name: 'Jamaica', code: 'JM', phone: 1876, symbol: 'J$', currency: 'JMD' },
  { name: 'Japan', code: 'JP', phone: 81, symbol: '¥', currency: 'JPY' },
  { name: 'Jersey', code: 'JE', phone: 44, symbol: '£', currency: 'GBP' },
  { name: 'Jordan', code: 'JO', phone: 962, symbol: 'ا.د', currency: 'JOD' },
  { name: 'Kazakhstan', code: 'KZ', phone: 7, symbol: 'лв', currency: 'KZT' },
  { name: 'Kenya', code: 'KE', phone: 254, symbol: 'KSh', currency: 'KES' },
  { name: 'Kiribati', code: 'KI', phone: 686, symbol: '$', currency: 'AUD' },
  { name: "Korea, Democratic People's Republic of", code: 'KP', phone: 850, symbol: '₩', currency: 'KPW' },
  { name: 'Korea, Republic of', code: 'KR', phone: 82, symbol: '₩', currency: 'KRW' },
  { name: 'Kosovo', code: 'XK', phone: 383, symbol: '€', currency: 'EUR' },
  { name: 'Kuwait', code: 'KW', phone: 965, symbol: 'ك.د', currency: 'KWD' },
  { name: 'Kyrgyzstan', code: 'KG', phone: 996, symbol: 'лв', currency: 'KGS' },
  { name: "Lao People's Democratic Republic", code: 'LA', phone: 856, symbol: '₭', currency: 'LAK' },
  { name: 'Latvia', code: 'LV', phone: 371, symbol: '€', currency: 'EUR' },
  { name: 'Lebanon', code: 'LB', phone: 961, symbol: '£', currency: 'LBP' },
  { name: 'Lesotho', code: 'LS', phone: 266, symbol: 'L', currency: 'LSL' },
  { name: 'Liberia', code: 'LR', phone: 231, symbol: '$', currency: 'LRD' },
  { name: 'Libyan Arab Jamahiriya', code: 'LY', phone: 218, symbol: 'د.ل', currency: 'LYD' },
  { name: 'Liechtenstein', code: 'LI', phone: 423, symbol: 'CHf', currency: 'CHF' },
  { name: 'Lithuania', code: 'LT', phone: 370, symbol: '€', currency: 'EUR' },
  { name: 'Luxembourg', code: 'LU', phone: 352, symbol: '€', currency: 'EUR' },
  { name: 'Macao', code: 'MO', phone: 853, symbol: '$', currency: 'MOP' },
  { name: 'Macedonia, the Former Yugoslav Republic of', code: 'MK', phone: 389, symbol: 'ден', currency: 'MKD' },
  { name: 'Madagascar', code: 'MG', phone: 261, symbol: 'Ar', currency: 'MGA' },
  { name: 'Malawi', code: 'MW', phone: 265, symbol: 'MK', currency: 'MWK' },
  { name: 'Malaysia', code: 'MY', phone: 60, symbol: 'RM', currency: 'MYR' },
  { name: 'Maldives', code: 'MV', phone: 960, symbol: 'Rf', currency: 'MVR' },
  { name: 'Mali', code: 'ML', phone: 223, symbol: 'CFA', currency: 'XOF' },
  { name: 'Malta', code: 'MT', phone: 356, symbol: '€', currency: 'EUR' },
  { name: 'Marshall Islands', code: 'MH', phone: 692, symbol: '$', currency: 'USD' },
  { name: 'Martinique', code: 'MQ', phone: 596, symbol: '€', currency: 'EUR' },
  { name: 'Mauritania', code: 'MR', phone: 222, symbol: 'MRU', currency: 'MRO' },
  { name: 'Mauritius', code: 'MU', phone: 230, symbol: '₨', currency: 'MUR' },
  { name: 'Mayotte', code: 'YT', phone: 262, symbol: '€', currency: 'EUR' },
  { name: 'Mexico', code: 'MX', phone: 52, symbol: '$', currency: 'MXN' },
  { name: 'Micronesia, Federated States of', code: 'FM', phone: 691, symbol: '$', currency: 'USD' },
  { name: 'Moldova, Republic of', code: 'MD', phone: 373, symbol: 'L', currency: 'MDL' },
  { name: 'Monaco', code: 'MC', phone: 377, symbol: '€', currency: 'EUR' },
  { name: 'Mongolia', code: 'MN', phone: 976, symbol: '₮', currency: 'MNT' },
  { name: 'Montenegro', code: 'ME', phone: 382, symbol: '€', currency: 'EUR' },
  { name: 'Montserrat', code: 'MS', phone: 1664, symbol: '$', currency: 'XCD' },
  { name: 'Morocco', code: 'MA', phone: 212, symbol: 'DH', currency: 'MAD' },
  { name: 'Mozambique', code: 'MZ', phone: 258, symbol: 'MT', currency: 'MZN' },
  { name: 'Myanmar', code: 'MM', phone: 95, symbol: 'K', currency: 'MMK' },
  { name: 'Namibia', code: 'NA', phone: 264, symbol: '$', currency: 'NAD' },
  { name: 'Nauru', code: 'NR', phone: 674, symbol: '$', currency: 'AUD' },
  { name: 'Nepal', code: 'NP', phone: 977, symbol: '₨', currency: 'NPR' },
  { name: 'Netherlands', code: 'NL', phone: 31, symbol: '€', currency: 'EUR' },
  { name: 'Netherlands Antilles', code: 'AN', phone: 599, symbol: 'NAf', currency: 'ANG' },
  { name: 'New Caledonia', code: 'NC', phone: 687, symbol: '₣', currency: 'XPF' },
  { name: 'New Zealand', code: 'NZ', phone: 64, symbol: '$', currency: 'NZD' },
  { name: 'Nicaragua', code: 'NI', phone: 505, symbol: 'C$', currency: 'NIO' },
  { name: 'Niger', code: 'NE', phone: 227, symbol: 'CFA', currency: 'XOF' },
  { name: 'Nigeria', code: 'NG', phone: 234, symbol: '₦', currency: 'NGN' },
  { name: 'Niue', code: 'NU', phone: 683, symbol: '$', currency: 'NZD' },
  { name: 'Norfolk Island', code: 'NF', phone: 672, symbol: '$', currency: 'AUD' },
  { name: 'Northern Mariana Islands', code: 'MP', phone: 1670, symbol: '$', currency: 'USD' },
  { name: 'Norway', code: 'NO', phone: 47, symbol: 'kr', currency: 'NOK' },
  { name: 'Oman', code: 'OM', phone: 968, symbol: '.ع.ر', currency: 'OMR' },
  { name: 'Pakistan', code: 'PK', phone: 92, symbol: '₨', currency: 'PKR' },
  { name: 'Palau', code: 'PW', phone: 680, symbol: '$', currency: 'USD' },
  { name: 'Palestinian Territory, Occupied', code: 'PS', phone: 970, symbol: '₪', currency: 'ILS' },
  { name: 'Panama', code: 'PA', phone: 507, symbol: 'B/.', currency: 'PAB' },
  { name: 'Papua New Guinea', code: 'PG', phone: 675, symbol: 'K', currency: 'PGK' },
  { name: 'Paraguay', code: 'PY', phone: 595, symbol: '₲', currency: 'PYG' },
  { name: 'Peru', code: 'PE', phone: 51, symbol: 'S/.', currency: 'PEN' },
  { name: 'Philippines', code: 'PH', phone: 63, symbol: '₱', currency: 'PHP' },
  { name: 'Pitcairn', code: 'PN', phone: 64, symbol: '$', currency: 'NZD' },
  { name: 'Poland', code: 'PL', phone: 48, symbol: 'zł', currency: 'PLN' },
  { name: 'Portugal', code: 'PT', phone: 351, symbol: '€', currency: 'EUR' },
  { name: 'Puerto Rico', code: 'PR', phone: 1787, symbol: '$', currency: 'USD' },
  { name: 'Qatar', code: 'QA', phone: 974, symbol: 'ق.ر', currency: 'QAR' },
  { name: 'Reunion', code: 'RE', phone: 262, symbol: '€', currency: 'EUR' },
  { name: 'Romania', code: 'RO', phone: 40, symbol: 'lei', currency: 'RON' },
  { name: 'Russian Federation', code: 'RU', phone: 7, symbol: '₽', currency: 'RUB' },
  { name: 'Rwanda', code: 'RW', phone: 250, symbol: 'FRw', currency: 'RWF' },
  { name: 'Saint Barthelemy', code: 'BL', phone: 590, symbol: '€', currency: 'EUR' },
  { name: 'Saint Helena', code: 'SH', phone: 290, symbol: '£', currency: 'SHP' },
  { name: 'Saint Kitts and Nevis', code: 'KN', phone: 1869, symbol: '$', currency: 'XCD' },
  { name: 'Saint Lucia', code: 'LC', phone: 1758, symbol: '$', currency: 'XCD' },
  { name: 'Saint Martin', code: 'MF', phone: 590, symbol: '€', currency: 'EUR' },
  { name: 'Saint Pierre and Miquelon', code: 'PM', phone: 508, symbol: '€', currency: 'EUR' },
  { name: 'Saint Vincent and the Grenadines', code: 'VC', phone: 1784, symbol: '$', currency: 'XCD' },
  { name: 'Samoa', code: 'WS', phone: 684, symbol: 'SAT', currency: 'WST' },
  { name: 'San Marino', code: 'SM', phone: 378, symbol: '€', currency: 'EUR' },
  { name: 'Sao Tome and Principe', code: 'ST', phone: 239, symbol: 'Db', currency: 'STD' },
  { name: 'Saudi Arabia', code: 'SA', phone: 966, symbol: '﷼', currency: 'SAR' },
  { name: 'Senegal', code: 'SN', phone: 221, symbol: 'CFA', currency: 'XOF' },
  { name: 'Serbia', code: 'RS', phone: 381, symbol: 'din', currency: 'RSD' },
  { name: 'Serbia and Montenegro', code: 'CS', phone: 381, symbol: 'din', currency: 'RSD' },
  { name: 'Seychelles', code: 'SC', phone: 248, symbol: 'SRe', currency: 'SCR' },
  { name: 'Sierra Leone', code: 'SL', phone: 232, symbol: 'Le', currency: 'SLL' },
  { name: 'Singapore', code: 'SG', phone: 65, symbol: '$', currency: 'SGD' },
  { name: 'St Martin', code: 'SX', phone: 721, symbol: 'ƒ', currency: 'ANG' },
  { name: 'Slovakia', code: 'SK', phone: 421, symbol: '€', currency: 'EUR' },
  { name: 'Slovenia', code: 'SI', phone: 386, symbol: '€', currency: 'EUR' },
  { name: 'Solomon Islands', code: 'SB', phone: 677, symbol: 'Si$', currency: 'SBD' },
  { name: 'Somalia', code: 'SO', phone: 252, symbol: 'Sh.so.', currency: 'SOS' },
  { name: 'South Africa', code: 'ZA', phone: 27, symbol: 'R', currency: 'ZAR' },
  { name: 'South Georgia and the South Sandwich Islands', code: 'GS', phone: 500, symbol: '£', currency: 'GBP' },
  { name: 'South Sudan', code: 'SS', phone: 211, symbol: '£', currency: 'SSP' },
  { name: 'Spain', code: 'ES', phone: 34, symbol: '€', currency: 'EUR' },
  { name: 'Sri Lanka', code: 'LK', phone: 94, symbol: 'Rs', currency: 'LKR' },
  { name: 'Sudan', code: 'SD', phone: 249, symbol: '.س.ج', currency: 'SDG' },
  { name: 'Suriname', code: 'SR', phone: 597, symbol: '$', currency: 'SRD' },
  { name: 'Svalbard and Jan Mayen', code: 'SJ', phone: 47, symbol: 'kr', currency: 'NOK' },
  { name: 'Swaziland', code: 'SZ', phone: 268, symbol: 'E', currency: 'SZL' },
  { name: 'Sweden', code: 'SE', phone: 46, symbol: 'kr', currency: 'SEK' },
  { name: 'Switzerland', code: 'CH', phone: 41, symbol: 'CHf', currency: 'CHF' },
  { name: 'Syrian Arab Republic', code: 'SY', phone: 963, symbol: 'LS', currency: 'SYP' },
  { name: 'Taiwan, Province of China', code: 'TW', phone: 886, symbol: '$', currency: 'TWD' },
  { name: 'Tajikistan', code: 'TJ', phone: 992, symbol: 'SM', currency: 'TJS' },
  { name: 'Tanzania, United Republic of', code: 'TZ', phone: 255, symbol: 'TSh', currency: 'TZS' },
  { name: 'Thailand', code: 'TH', phone: 66, symbol: '฿', currency: 'THB' },
  { name: 'Timor-Leste', code: 'TL', phone: 670, symbol: '$', currency: 'USD' },
  { name: 'Togo', code: 'TG', phone: 228, symbol: 'CFA', currency: 'XOF' },
  { name: 'Tokelau', code: 'TK', phone: 690, symbol: '$', currency: 'NZD' },
  { name: 'Tonga', code: 'TO', phone: 676, symbol: '$', currency: 'TOP' },
  { name: 'Trinidad and Tobago', code: 'TT', phone: 1868, symbol: '$', currency: 'TTD' },
  { name: 'Tunisia', code: 'TN', phone: 216, symbol: 'ت.د', currency: 'TND' },
  { name: 'Turkey', code: 'TR', phone: 90, symbol: '₺', currency: 'TRY' },
  { name: 'Turkmenistan', code: 'TM', phone: 7370, symbol: 'T', currency: 'TMT' },
  { name: 'Turks and Caicos Islands', code: 'TC', phone: 1649, symbol: '$', currency: 'USD' },
  { name: 'Tuvalu', code: 'TV', phone: 688, symbol: '$', currency: 'AUD' },
  { name: 'Uganda', code: 'UG', phone: 256, symbol: 'USh', currency: 'UGX' },
  { name: 'Ukraine', code: 'UA', phone: 380, symbol: '₴', currency: 'UAH' },
  { name: 'United Arab Emirates', code: 'AE', phone: 971, symbol: 'إ.د', currency: 'AED' },
  { name: 'United Kingdom', code: 'GB', phone: 44, symbol: '£', currency: 'GBP' },
  { name: 'United States Minor Outlying Islands', code: 'UM', phone: 1, symbol: '$', currency: 'USD' },
  { name: 'Uruguay', code: 'UY', phone: 598, symbol: '$', currency: 'UYU' },
  { name: 'Uzbekistan', code: 'UZ', phone: 998, symbol: 'лв', currency: 'UZS' },
  { name: 'Vanuatu', code: 'VU', phone: 678, symbol: 'VT', currency: 'VUV' },
  { name: 'Venezuela', code: 'VE', phone: 58, symbol: 'Bs', currency: 'VEF' },
  { name: 'Viet Nam', code: 'VN', phone: 84, symbol: '₫', currency: 'VND' },
  { name: 'Virgin Islands, British', code: 'VG', phone: 1284, symbol: '$', currency: 'USD' },
  { name: 'Virgin Islands, U.s.', code: 'VI', phone: 1340, symbol: '$', currency: 'USD' },
  { name: 'Wallis and Futuna', code: 'WF', phone: 681, symbol: '₣', currency: 'XPF' },
  { name: 'Western Sahara', code: 'EH', phone: 212, symbol: 'MAD', currency: 'MAD' },
  { name: 'Yemen', code: 'YE', phone: 967, symbol: '﷼', currency: 'YER' },
  { name: 'Zambia', code: 'ZM', phone: 260, symbol: 'ZK', currency: 'ZMW' },
  { name: 'Zimbabwe', code: 'ZW', phone: 263, symbol: '$', currency: 'ZWL' },
];

export const countries_details = countries;
