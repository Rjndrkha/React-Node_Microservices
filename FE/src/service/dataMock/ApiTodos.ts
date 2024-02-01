import { Service } from "..";

export default class TodosClient {
  static async GetAllTodos() {
    const { response, error, errorMessage } = await Service.get(
      // `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_TODOS_URL}`
      // Using Server Side Node
      `http://localhost:4000/todos`
    );

    return { response, error, errorMessage };
  }

  static async GetAllPost() {
    const { response, error, errorMessage } = await Service.get(
      `http://localhost:4000/posts`
    );

    return { response, error, errorMessage };
  }

  static async UpPost(body = {}) {
    const { response, error, errorMessage } = await Service.post(
      `http://localhost:4000/posts`,
      body
    );

    return { response, error, errorMessage };
  }
}
