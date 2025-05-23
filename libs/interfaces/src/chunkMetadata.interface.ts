export interface ChunkMetadata {
  fileId: string;
  chunkIndex: number;
  totalChunks: number;
  originalName: string;
  mimetype: string;
}
