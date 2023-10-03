import config from "../config_variable/config";
import { Client, Databases, Storage, ID, Query } from "appwrite";

// DOCUMENT_ID -> slug

export class DatabaseService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(config.appwriteUrl).setProject(config.projectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.databaseId,
        config.collectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.databaseId,
        config.collectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.createDocument(
        config.databaseId,
        config.collectionId,
        slug
      );
      return true;
    } catch (error) {
      throw error;
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.databaseId,
        config.collectionId,
        slug
      );
    } catch (error) {
      throw error;
      return false;
    }
  }

  // get all post which is active using queries
  // to use queries we need to make indexes in appwrite database

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.databaseId,
        config.collectionId,
        queries
      );
    } catch (error) {
      throw error;
      return false;
    }
  }

  // file upload services
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(config.bucketId, ID.unique(), file);
    } catch (error) {
      throw error;
      return false;
    }
  }

  // Delete file services
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(config.bucketId, fileId);
      return true;
    } catch (error) {
      throw error;
      return false;
    }
  }

  // File Preview services
  async previewFile(fileId) {
    try {
      return await this.bucket.getFilePreview(config.bucketId, fileId);
    } catch (error) {
      throw error;
      return false;
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
