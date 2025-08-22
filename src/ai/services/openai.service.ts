import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

import { Env } from 'src/config/env.model';

@Injectable()
export class OpenaiService {
    private openai: OpenAI;
    constructor (
        private configService: ConfigService<Env>
    ){
        const apiKey = this.configService.get('OPEN_API_KEY', { infer: true });
        if(!apiKey){
            throw new Error("Open API Key not set");
        }
        this.openai = new OpenAI({apiKey});
    }

    async generateSummary(content: string) {
        const response = await this.openai.responses.create({
            model: 'gpt-3.5-turbo',
            instructions: 'You are a helpful assistant that generates summaries for blog posts',
            input: content
        })
        return response.output_text;
    }

    async generateImage(text: string) {
        const prompt = `Generate an image for a blog post about ${text}`;
        const response = await this.openai.images.generate({
            model: 'dall-e-3',
            prompt,
        })
        if(!response.data?.[0].url){
            throw new Error("Failed to generate image");
        }
        return response.data?.[0].url;
    }
}
