export interface FileChunks {
  [fileId: string]: {
    chunks: Map<number, string>; // Armazena chunks por índice
    totalChunks: number; // Total esperado
    originalName: string; // Nome original do arquivo
  };
}
