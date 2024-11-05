export interface ChatRepo {
  sendMessage(message: string): Promise<string | null>;
}
