export interface UseCase<Variables, Response> {
  execute(request?: Variables): Promise<Response> | Response;
}
