import { HttpServiceContent } from "../HttpServices";

export class FileService extends HttpServiceContent {
  static uploadFile(params: any) {
    return this.postFormData("/v1/files/upload", params);
  }
}
