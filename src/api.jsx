import axios from "axios";


const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class AutobloggerApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    
    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${AutobloggerApi.token}` };
    const params = method === "get" ? data : {};
    console.debug("API Call:", endpoint, data, method, headers);

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a single post by postId (post_id). */

  static async getPost(postId) {
    let res = await this.request(`posts/${postId}`);
    return res.post;
  }

  
  // Returns a list of al posts with an array of their comments

  static async getAllPosts() {
    let res = await this.request(`posts/`);
    return res.posts;
  }


  /** Create a new post
   * {postData} => {new post}
   * Only used by admins for manually creating a post
   */

  static async createPost(postData) {
    let res = await this.request('posts/',postData,'post');
    return res.post;
  }


  /** Get comments on a post 
   * {postId, comment} => {new comment}
   * Adding a comment will trigger AI to reply
  */

  static async getComments(postId) {
    let res = await this.request(`posts/${postId}/comments`);
    const comments = res.comments
    const {numComments} = res.numComments || 0
    return {numComments,comments};
  }

  /** Add a comment to a post 
   * {postId, comment} => {new comment}
   * Adding a comment will trigger AI to reply
  */

  static async addComment(postId, commentData) {
    let res = await this.request(`posts/${postId}/comments`,commentData,'post');
    return res.comment;
  }

// Get all authors, for authors list page

  static async getAuthors() {
    let res = await this.request(`users/?authors=true`);
    return res.users;
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
    let res = await this.request(`auth/register`,formData,'post');
    return res.token;
  }

  static async loginUser(formData) {
    let res = await this.request(`auth/login`,formData,'post');
    return res.token;
  }
//   // get a specific user profile
//   static async getProfile(username) {
//     let res = await this.request(`users/${username}`);
//     // setAuthorizationToken(res.token)
//     return res.user;
//   }
}

  export default AutobloggerApi;