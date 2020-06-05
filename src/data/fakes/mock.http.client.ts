import { HttpPostClient } from '../protocols/http/http.post.client'

export class HttpPostClientFake implements HttpPostClient {
  public url?: string;

  async post(url: string): Promise<any> {
    this.url = url;
    return {}
  }
}