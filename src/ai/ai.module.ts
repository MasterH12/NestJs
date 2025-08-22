import { Module } from '@nestjs/common';
import { AiController } from './controllers/ai.controller';
import { OpenaiService } from './services/openai.service';

@Module({
  providers: [OpenaiService],
  controllers: [AiController],
  exports: [OpenaiService]
})
export class AiModule {}
