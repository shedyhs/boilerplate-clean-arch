import chalk from 'chalk';
import { ILoggerProvider } from './logger.provider.interface';

export class LoggerProvider implements ILoggerProvider {
  private dateAndPid = `${chalk.gray(
    chalk.bold(new Date().toLocaleString()),
  )} (${chalk.dim(process.pid)})`;

  error(message: string): void {
    process.stdout.write(
      `${this.dateAndPid} [${chalk.red('ERROR')}] ${message}\n`,
    );
  }

  warn(message: string): void {
    process.stdout.write(
      `${this.dateAndPid} [${chalk.yellow('WARN')}] ${message}\n`,
    );
  }

  info(message: string): void {
    process.stdout.write(
      `${this.dateAndPid} [${chalk.cyan('INFO')}] ${message}\n`,
    );
  }

  debug(message: string): void {
    if (process.env.NODE_ENV !== 'production') {
      process.stdout.write(
        `${this.dateAndPid} [${chalk.magenta('DEBUG')}] ${message}\n`,
      );
    }
  }
}
