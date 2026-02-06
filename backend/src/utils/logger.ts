export class Logger {
  private level: string;

  constructor(level: string = 'info') {
    this.level = level;
  }

  info(message: string, data?: any) {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data || '');
  }

  error(message: string, error?: any) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error || '');
  }

  warn(message: string, data?: any) {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, data || '');
  }

  debug(message: string, data?: any) {
    if (this.level === 'debug') {
      console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`, data || '');
    }
  }
}

export const logger = new Logger();
