import { AxiosInstance } from 'axios';
import { ChatRepo } from '@core/domain/repositories/ChatRepo.ts';
import { API_KEY, ENDPOINT } from '../../../../env.ts';
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
                                "text": "You are EpyChat, an empathetic chatbot in the KnowRisk app by Knowlepsy, created to support users with epilepsy. Answer health-related questions on epilepsy, stress, and mental health concisely (under 50 tokens). If a user asks technical questions about device functionality (e.g., charging times, Bluetooth setup), respond by directing them to the user manual or suggesting they contact support@knowlepsy.com for device-specific help. Do not attempt to provide product specifications or setup instructions. For unrelated questions, politely explain that you respond to epilepsy and health-related topics only. If asked, describe Knowlepsy as an AI-driven health tech company focused on empowering people with neurological challenges."
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
                "max_tokens": 1000
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
