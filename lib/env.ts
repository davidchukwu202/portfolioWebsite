// Environment variable configuration and validation
export interface EnvConfig {
  // Authentication
  adminUsername: string;
  adminPassword: string;
  sessionDurationHours: number;
  sessionKey: string;

  // Security
  maxLoginAttempts: number;
  lockoutDurationMinutes: number;

  // Portfolio
  portfolioName: string;
  portfolioDomain: string;

  // Contact
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;

  // Social Media
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl?: string;

  // Analytics
  googleAnalyticsId?: string;
  hotjarId?: string;

  // Backup
  backupEncryptionKey?: string;

  // Development
  devMode: boolean;
  debugAuth: boolean;
}

class EnvManager {
  private static instance: EnvManager;
  private config: EnvConfig;

  private constructor() {
    this.config = this.loadAndValidateEnv();
  }

  static getInstance(): EnvManager {
    if (!EnvManager.instance) {
      EnvManager.instance = new EnvManager();
    }
    return EnvManager.instance;
  }

  private loadAndValidateEnv(): EnvConfig {
    // Helper function to get environment variable with fallback
    const getEnvVar = (key: string, fallback?: string): string => {
      const value = process.env[key] || fallback;
      if (!value && !fallback) {
        console.warn(`Environment variable ${key} is not set`);
        return '';
      }
      return value || '';
    };

    // Helper function to get boolean environment variable
    const getBoolEnvVar = (key: string, fallback = false): boolean => {
      const value = process.env[key];
      if (!value) return fallback;
      return value.toLowerCase() === 'true';
    };

    // Helper function to get number environment variable
    const getNumberEnvVar = (key: string, fallback: number): number => {
      const value = process.env[key];
      if (!value) return fallback;
      const parsed = Number.parseInt(value, 10);
      return isNaN(parsed) ? fallback : parsed;
    };

    const config: EnvConfig = {
      // Authentication
      adminUsername: getEnvVar('ADMIN_USERNAME'),
      adminPassword: getEnvVar('ADMIN_PASSWORD'),
      sessionDurationHours: getNumberEnvVar(
        'NEXT_PUBLIC_SESSION_DURATION_HOURS',
        24
      ),
      sessionKey: getEnvVar(
        'NEXT_PUBLIC_SESSION_KEY',
        'portfolio-admin-session'
      ),

      // Security
      maxLoginAttempts: getNumberEnvVar('NEXT_PUBLIC_MAX_LOGIN_ATTEMPTS', 5),
      lockoutDurationMinutes: getNumberEnvVar(
        'NEXT_PUBLIC_LOCKOUT_DURATION_MINUTES',
        15
      ),

      // Portfolio
      portfolioName: getEnvVar('NEXT_PUBLIC_PORTFOLIO_NAME', 'Chukwuebuka'),
      portfolioDomain: getEnvVar(
        'NEXT_PUBLIC_PORTFOLIO_DOMAIN',
        'localhost:3000'
      ),

      // Contact
      contactEmail: getEnvVar(
        'NEXT_PUBLIC_CONTACT_EMAIL',
        'contact@example.com'
      ),
      contactPhone: getEnvVar('NEXT_PUBLIC_CONTACT_PHONE', '+1-XXX-XXX-XXXX'),
      whatsappNumber: getEnvVar('NEXT_PUBLIC_WHATSAPP_NUMBER', '1XXXXXXXXXX'),

      // Social Media
      githubUrl: getEnvVar('NEXT_PUBLIC_GITHUB_URL', 'https://github.com'),
      linkedinUrl: getEnvVar(
        'NEXT_PUBLIC_LINKEDIN_URL',
        'https://linkedin.com'
      ),
      twitterUrl: getEnvVar('NEXT_PUBLIC_TWITTER_URL'),

      // Analytics
      googleAnalyticsId: getEnvVar('NEXT_PUBLIC_GOOGLE_ANALYTICS_ID'),
      hotjarId: getEnvVar('NEXT_PUBLIC_HOTJAR_ID'),

      // Backup
      backupEncryptionKey: getEnvVar('NEXT_PUBLIC_BACKUP_ENCRYPTION_KEY'),

      // Development
      devMode: getBoolEnvVar('NEXT_PUBLIC_DEV_MODE', false),
      debugAuth: getBoolEnvVar('NEXT_PUBLIC_DEBUG_AUTH', false),
    };

    // Validate required fields
    this.validateConfig(config);

    return config;
  }

  private validateConfig(config: EnvConfig): void {
    const requiredFields = [
      { key: 'adminUsername', value: config.adminUsername },
      { key: 'adminPassword', value: config.adminPassword },
      { key: 'portfolioName', value: config.portfolioName },
      { key: 'contactEmail', value: config.contactEmail },
    ];

    const missingFields = requiredFields.filter(
      (field) => !field.value || field.value.trim() === ''
    );

    if (missingFields.length > 0) {
      console.error(
        'Missing required environment variables:',
        missingFields.map((f) => f.key)
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (config.contactEmail && !emailRegex.test(config.contactEmail)) {
      console.warn('Invalid email format in NEXT_PUBLIC_CONTACT_EMAIL');
    }

    // Validate URLs
    const urlFields = [
      { key: 'githubUrl', value: config.githubUrl },
      { key: 'linkedinUrl', value: config.linkedinUrl },
      { key: 'twitterUrl', value: config.twitterUrl },
    ];

    urlFields.forEach((field) => {
      if (field.value && !field.value.startsWith('http')) {
        console.warn(
          `Invalid URL format in NEXT_PUBLIC_${field.key.toUpperCase()}`
        );
      }
    });

    // Security validations
    if (config.adminPassword.length < 8) {
      console.warn('Admin password should be at least 8 characters long');
    }

    if (config.sessionDurationHours < 1 || config.sessionDurationHours > 168) {
      console.warn(
        'Session duration should be between 1 and 168 hours (1 week)'
      );
    }
  }

  getConfig(): EnvConfig {
    return { ...this.config };
  }

  // Specific getters for commonly used values
  getAuthConfig() {
    return {
      username: this.config.adminUsername,
      password: this.config.adminPassword,
      sessionDuration: this.config.sessionDurationHours * 60 * 60 * 1000, // Convert to milliseconds
      sessionKey: this.config.sessionKey,
      maxLoginAttempts: this.config.maxLoginAttempts,
      lockoutDuration: this.config.lockoutDurationMinutes * 60 * 1000, // Convert to milliseconds
    };
  }

  getContactInfo() {
    return {
      email: this.config.contactEmail,
      phone: this.config.contactPhone,
      whatsapp: `https://wa.me/${this.config.whatsappNumber}`,
    };
  }

  getSocialLinks() {
    return {
      github: this.config.githubUrl,
      linkedin: this.config.linkedinUrl,
      twitter: this.config.twitterUrl,
    };
  }

  getPortfolioInfo() {
    return {
      name: this.config.portfolioName,
      domain: this.config.portfolioDomain,
    };
  }

  isDevMode(): boolean {
    return this.config.devMode;
  }

  isDebugMode(): boolean {
    return this.config.debugAuth;
  }
}

export const envManager = EnvManager.getInstance();
export const envConfig = envManager.getConfig();
