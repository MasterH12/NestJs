import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { Env } from './config/env.model';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService<Env>,
  ) {}

  @Get()
  getHello(): string {
    const hello = this.appService.getHello();
    const port = this.configService.get('PORT', { infer: true });
    return `${hello}, the server is up on port ${port}`;
  }
}
