import config from "../config_variable/config";
import { Client, Account, ID } from "appwrite";

// const client = new Client().setEndpoint(config.appwriteUrl).setProject(config.projectId)
// const account = new Account(client);

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(config.appwriteUrl).setProject(config.projectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // call another method for logIn
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const userLogin = await this.account.createEmailSession(email, password);
      return userLogin;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    return null;
  }

  async logOut() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
