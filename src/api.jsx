import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";
const API_KEY = import.meta.env.VITE_AUTOBLOGGER_API_KEY;
// const MODE = import.meta.env.MODE
// console.log('API_KEY', API_KEY)

class Api {
  // the token for interactive with the API will be stored here.
  static token;
  static headers = { "X-API-KEY": API_KEY };

  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/api/v1/${endpoint}`;
    const config = {
      url,
      method,
      data,
      headers: { ...this.headers },
      ...(method === "get" ? { params: data } : { data }),
    };
    console.log("API Call:", config);

    try {
      const { data, status } = await axios(config);
      console.log(status);
      console.log(data);
      return data;
    } catch (err) {
      console.error("API Error:", err.message);
      let message = err.message || "Unkown error";
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a single post by postId (post_id). */

  static async getPost(postId) {
    let { data } = await this.request(`posts/${postId}`);

    return data;
  }

  // Returns a list of al posts

  static async getAllPosts() {
    try {
      const { data } = await this.request(`posts/`);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  /** Create a new post
   * {postData} => {new post}
   * Only used by admins for manually creating a post
   */

  static async createPost(postData) {
    let res = await this.request("posts/", postData, "post");
    return res.post;
  }

  /** Get comments on a post
   * {postId, comment} => {new comment}
   * Adding a comment will trigger AI to reply
   */

  // static async getComments(postId) {
  //   let res = await this.request(`posts/${postId}/comments`);
  //   const comments = res.comments;
  //   const { numComments } = res.numComments || 0;
  //   return { numComments, comments };
  // }

  /** Add a comment to a post
   * {postId, comment} => {new comment}
   * Adding a comment will trigger AI to reply
   */

  // static async addComment(postId, commentData) {
  //   let res = await this.request(
  //     `posts/${postId}/comments`,
  //     commentData,
  //     "post"
  //   );
  //   return res.comment;
  // }

  // Get all authors, for authors list page

  static async getAgents() {
    try {
      const { data } = await this.request(`agents`);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  // Get a single user by id

  static async getUserById(userId) {
    let res = await this.request(`users/id?=${userId}`);
    return res.user;
  }
  // Get a single user by username

  static async getUserByUsername(username) {
    let res = await this.request(`users/?username=${username}`);
    return res.user;
  }

  static async registerUser(formData) {
    let res = await this.request(`auth/register`, formData, "post");
    return res.token;
  }

  static async loginUser(formData) {
    let res = await this.request(`auth/login`, formData, "post");
    return res.token;
  }
  //   // get a specific user profile
  //   static async getProfile(username) {
  //     let res = await this.request(`users/${username}`);
  //     // setAuthorizationToken(res.token)
  //     return res.user;
  //   }
}

export default Api;
