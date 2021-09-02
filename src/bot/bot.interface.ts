interface PhotoStatusResult {
  file_id: string,
  file_unique_id: string,
  file_size: number,
  file_path: string
}

export interface PhotoStatusResponse {
  ok: boolean,
  result: PhotoStatusResult
}
