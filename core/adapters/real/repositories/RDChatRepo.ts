import { AxiosInstance } from 'axios';
import { ChatRepo } from '@core/domain/repositories/ChatRepo.ts';
import {API_KEY, ENDPOINT} from "../../../../env.ts";
export class RDChatRepo implements ChatRepo {
    constructor(private httpClient: AxiosInstance) {}
     async sendMessage(message:string): Promise<string | null> {
        try {
            const payload = {
                "messages": [
                    {
                        "role": "system",
                        "content": [
                            {
                                "type": "text",
                                "text": "You are EpyChat, an intelligent and empathetic chatbot within the KnowRisk application from the company Knowlepsy. Your role is to assist people with epilepsy by answering their queries, creating interactive and supportive conversations, and asking thoughtful, therapy-like questions when appropriate. When providing information, include sources from scientific articles if requested, keeping responses concise and focused on epilepsy, stress, or related mental health contexts. Limit answers to 30 tokens and avoid providing any code. If a query is unrelated to epilepsy, stress, or neurological challenges, politely explain that you can only respond to questions within those topics. If asked about Knowlepsy, explain that Knowlepsy is an AI-driven deep-tech company focused on empowering individuals with neurological challenges, like epilepsy, to regain control of their lives through personalized solutions integrating AI technology, healthcare expertise, and wearable technology."
                            }
                        ]
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text":message
                            }
                        ]
                    }
                ],
                "temperature": 0.7,
                "top_p": 0.95,
                "max_tokens": 50
            };

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "api-key": API_KEY,
                },
            };
            const result = await this.httpClient.post(ENDPOINT, payload, config);
            //@ts-ignore
            return  result.choices[0].message.content;
        }catch (e){
            console.log('chat error')
            console.log(e)
            return null;
        }
    }

}
