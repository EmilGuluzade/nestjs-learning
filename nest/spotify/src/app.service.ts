import { Inject, Injectable } from '@nestjs/common';
import { DevServiceConfig } from './common/providers/DevServiceConfig';

@Injectable()
export class AppService {
  constructor(
    private devServiceConfig: DevServiceConfig,
    @Inject('CONFIG') private config: { port: string },
  ) {}

  getHello(): string {
    return `host ${this.devServiceConfig.getDBHOST()} port ${this.config.port}`;
  }
}
