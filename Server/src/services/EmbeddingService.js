let pipeline = null;

class EmbeddingService {
  constructor() {
    this.modelName = 'Xenova/paraphrase-multilingual-MiniLM-L12-v2';
  }

  async init() {
    if (!pipeline) {
      const transformers = await import('@xenova/transformers');
      transformers.env.allowLocalModels = false;
      transformers.env.useBrowserCache = false;
      pipeline = await transformers.pipeline('feature-extraction', this.modelName);
      console.log(`Embedding model '${this.modelName}' loaded.`);
    }
  }

  async generateEmbedding(text) {
    await this.init();
    const output = await pipeline(text, { pooling: 'mean', normalize: true });
    return Array.from(output.data);
  }

  async generateEmbeddings(texts) {
    // Để cho hiệu quả, có thể embed song song
    const embeddings = [];
    for (const text of texts) {
      const emb = await this.generateEmbedding(text);
      embeddings.push(emb);
    }
    return embeddings;
  }
}

module.exports = new EmbeddingService();
