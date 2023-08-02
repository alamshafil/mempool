export const mempoolFeeColors = [
  '558d01',
  '5d8d03',
  '638d04',
  '6d8d05',
  '758d08',
  '7d8d07',
  '868d09',
  '8c8d0a',
  '958d0c',
  '9b8d0e',
  'a68d0f',
  'aa8d0f',
  'b28d11',
  'bb8d12',
  'bf8d13',
  'bf8816',
  'bf831a',
  'be7c1f',
  'be7821',
  'bd7126',
  'bd6c29',
  'bc652e',
  'bc5f31',
  'bc5a35',
  'bb533a',
  'bb4d3d',
  'bb473f',
  'ba4244',
  'b93b49',
  'b9354c',
  'b8314e',
  'b72d4f',
  'b62952',
  'b42454',
  'b31e55',
  'b11858',
  'b0125a',
  'ae105c',
];

export const chartColors = [
  "#D81B60",
  "#8E24AA",
  "#5E35B1",
  "#3949AB",
  "#1E88E5",
  "#039BE5",
  "#00ACC1",
  "#00897B",
  "#43A047",
  "#7CB342",
  "#C0CA33",
  "#FDD835",
  "#FFB300",
  "#FB8C00",
  "#F4511E",
  "#6D4C41",
  "#757575",
  "#546E7A",
  "#b71c1c",
  "#880E4F",
  "#4A148C",
  "#311B92",
  "#1A237E",
  "#0D47A1",
  "#01579B",
  "#006064",
  "#004D40",
  "#1B5E20",
  "#33691E",
  "#827717",
  "#F57F17",
  "#FF6F00",
  "#E65100",
  "#BF360C",
  "#3E2723",
  "#212121",
  "#263238",
  "#801313",
];

export const poolsColor = {
  'unknown': '#FDD835',
};

export const feeLevels = [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.08, 0.10, 0.12, 0.15, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.90, 1.00, 1.25, 1.50, 1.75, 2.00,
  2.50, 3.00, 3.50, 4.00, 5.00, 6.00, 7.00, 8.00, 9.00, 10.00, 12.00, 14.00, 16.00, 20.00, 30.00];

export interface Language {
  code: string;
  name: string;
}

export const languages: Language[] = [
   { code: 'ar', name: 'العربية' },         // Arabic
// { code: 'bg', name: 'Български' },       // Bulgarian
// { code: 'bs', name: 'Bosanski' },        // Bosnian
// { code: 'ca', name: 'Català' },          // Catalan
   { code: 'cs', name: 'Čeština' },         // Czech
   { code: 'da', name: 'Dansk' },           // Danish
   { code: 'de', name: 'Deutsch' },         // German
// { code: 'et', name: 'Eesti' },           // Estonian
// { code: 'el', name: 'Ελληνικά' },        // Greek
   { code: 'en', name: 'English' },         // English
   { code: 'es', name: 'Español' },         // Spanish
// { code: 'eo', name: 'Esperanto' },       // Esperanto
// { code: 'eu', name: 'Euskara' },         // Basque
   { code: 'fa', name: 'فارسی' },           // Persian
   { code: 'fr', name: 'Français' },        // French
// { code: 'gl', name: 'Galego' },          // Galician
   { code: 'ko', name: '한국어' },          // Korean
// { code: 'hr', name: 'Hrvatski' },        // Croatian
// { code: 'id', name: 'Bahasa Indonesia' },// Indonesian
   { code: 'hi', name: 'हिन्दी' },             // Hindi
   { code: 'ne', name: 'नेपाली' },            // Nepalese
   { code: 'it', name: 'Italiano' },        // Italian
   { code: 'he', name: 'עברית' },           // Hebrew
   { code: 'ka', name: 'ქართული' },         // Georgian
// { code: 'lv', name: 'Latviešu' },        // Latvian
   { code: 'lt', name: 'Lietuvių' },        // Lithuanian
   { code: 'hu', name: 'Magyar' },          // Hungarian
   { code: 'mk', name: 'Македонски' },      // Macedonian
// { code: 'ms', name: 'Bahasa Melayu' },   // Malay
   { code: 'nl', name: 'Nederlands' },      // Dutch
   { code: 'ja', name: '日本語' },          // Japanese
   { code: 'nb', name: 'Norsk' },           // Norwegian Bokmål
// { code: 'nn', name: 'Norsk Nynorsk' },   // Norwegian Nynorsk
   { code: 'pl', name: 'Polski' },          // Polish
   { code: 'pt', name: 'Português' },       // Portuguese
// { code: 'pt-BR', name: 'Português (Brazil)' }, // Portuguese (Brazil)
   { code: 'ro', name: 'Română' },          // Romanian
   { code: 'ru', name: 'Русский' },         // Russian
// { code: 'sk', name: 'Slovenčina' },      // Slovak
   { code: 'sl', name: 'Slovenščina' },     // Slovenian
// { code: 'sr', name: 'Српски / srpski' }, // Serbian
// { code: 'sh', name: 'Srpskohrvatski / српскохрватски' },// Serbo-Croatian
   { code: 'fi', name: 'Suomi' },           // Finnish
   { code: 'sv', name: 'Svenska' },         // Swedish
   { code: 'th', name: 'ไทย' },             // Thai
   { code: 'tr', name: 'Türkçe' },          // Turkish
   { code: 'uk', name: 'Українська' },      // Ukrainian
   { code: 'vi', name: 'Tiếng Việt' },      // Vietnamese
   { code: 'zh', name: '中文' },            // Chinese
];

export const specialBlocks = {
  '0': {
    labelEvent: 'Genesis',
    labelEventCompleted: 'The Genesis of Bitcoin',
    networks: ['mainnet', 'testnet'],
  },
  '210000': {
    labelEvent: 'Bitcoin\'s 1st Halving',
    labelEventCompleted: 'Block Subsidy has halved to 25 DOGE per block',
    networks: ['mainnet', 'testnet'],
  },
  '420000': {
    labelEvent: 'Bitcoin\'s 2nd Halving',
    labelEventCompleted: 'Block Subsidy has halved to 12.5 DOGE per block',
    networks: ['mainnet', 'testnet'],
  },
  '630000': {
    labelEvent: 'Bitcoin\'s 3rd Halving',
    labelEventCompleted: 'Block Subsidy has halved to 6.25 DOGE per block',
    networks: ['mainnet', 'testnet'],
  },
  '709632': {
    labelEvent: 'Taproot 🌱 activation',
    labelEventCompleted: 'Taproot 🌱 has been activated!',
    networks: ['mainnet'],
  },
  '840000': {
    labelEvent: 'Bitcoin\'s 4th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 3.125 DOGE per block',
    networks: ['mainnet', 'testnet'],
  },
  '1050000': {
    labelEvent: 'Bitcoin\'s 5th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 1.5625 DOGE per block',
    networks: ['mainnet', 'testnet'],
  },
  '1260000': {
    labelEvent: 'Bitcoin\'s 6th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 0.78125 DOGE per block',
    networks: ['mainnet', 'testnet'],
  },
  '1470000': {
    labelEvent: 'Bitcoin\'s 7th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 0.390625 DOGE per block',
    networks: ['mainnet', 'testnet'],
  },
  '1680000': {
    labelEvent: 'Bitcoin\'s 8th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 0.1953125 DOGE per block',
    networks: ['mainnet', 'testnet'],
  },
  '1890000': {
    labelEvent: 'Bitcoin\'s 9th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 0.09765625 DOGE per block',
    networks: ['mainnet', 'testnet'],
  },
  '2100000': {
    labelEvent: 'Bitcoin\'s 10th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 0.04882812 DOGE per block',
    networks: ['mainnet', 'testnet'],
  },
  '2310000': {
    labelEvent: 'Bitcoin\'s 11th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 0.02441406 DOGE per block',
    networks: ['mainnet', 'testnet'],
  },
  '2520000': {
    labelEvent: 'Bitcoin\'s 12th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 0.01220703 DOGE per block',
    networks: ['mainnet', 'testnet'],
  },
  '2730000': {
    labelEvent: 'Bitcoin\'s 13th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 0.00610351 DOGE per block',
    networks: ['mainnet', 'testnet'],
  },
  '2940000': {
    labelEvent: 'Bitcoin\'s 14th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 0.00305175 DOGE per block',
    networks: ['mainnet', 'testnet'],
  },
  '3150000': {
    labelEvent: 'Bitcoin\'s 15th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 0.00152587 DOGE per block',
    networks: ['mainnet', 'testnet'],
  }
};

export const fiatCurrencies = {
  AUD: {
    name: 'Australian Dollar',
    code: 'AUD',
    indexed: true,
  },
  CAD: {
    name: 'Canadian Dollar',
    code: 'CAD',
    indexed: true,
  },
  CHF: {
    name: 'Swiss Franc',
    code: 'CHF',
    indexed: true,
  },
  EUR: {
    name: 'Euro',
    code: 'EUR',
    indexed: true,
  },
  GBP: {
    name: 'Pound Sterling',
    code: 'GBP',
    indexed: true,
  },
  JPY: {
    name: 'Japanese Yen',
    code: 'JPY',
    indexed: true,
  },
  USD: {
    name: 'US Dollar',
    code: 'USD',
    indexed: true,
  },
};