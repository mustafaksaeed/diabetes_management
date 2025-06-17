import AppConfig from "./App.config.json";

// "LANGUAGES": ["en", "es", "fr"],
// "CURRENT_LANGUAGE": "en",
// "THEMES": ["dark", "light"],
// "CURRENT_THEME": "light",
// "URLS": {},
// "MEASUREMENTS": ["METRIC", "IMPERIAL"],
// "CURRENT_MEASUREMENT": "METRIC"

class Config {
  constructor() {
    this.languages = AppConfig.LANGUAGES || [];
    this.currentLanguage = AppConfig.CURRENT_LANGUAGE || "en";
    this.themes = AppConfig.THEMES || [];
    this.currentTheme = AppConfig.CURRENT_THEME || "light";
    this.urls = AppConfig.URLS || {};
    this.measurements = AppConfig.MEASUREMENTS || [];
    this.currentMeasurement = AppConfig.CURRENT_MEASUREMENT || "METRIC";
  }

  get currentLanguage() {
    return this.currentLanguage;
  }

  get currentTheme() {
    return this.currentTheme;
  }

  get currentMeasurement() {
    return this.currentMeasurement;
  }
}

export default new Config();
