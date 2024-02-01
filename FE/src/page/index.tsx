import { useEffect, useState } from "react";
import { Todo, useTodoStore } from "../store/todo/store";
import TodosClient from "../service/dataMock/ApiTodos";
import TextInput from "../component/input/textInput";
import ButtonDefault from "../component/button/button";
import SwitchComponent from "../component/switch/switch";

function Home() {
  const { todos, getTodos, errorMessage } = useTodoStore();
  const [title, setTitle] = useState("");
  const [post, setPost] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      await getTodos();
    };

    fetchData();
  }, [getTodos]);

  const handleUnchecked = (data: Todo) => {
    console.log(data);

    if (data.completed === false) {
      console.log("checked");
    }

    if (data.completed === true) {
      console.log("unchecked");
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const { error, errorMessage, response } = await TodosClient.GetAllPost();
    if (error) {
      console.log(errorMessage);
    }
    if (response) {
      setPost(response);
    }
  };

  const submitPost = async () => {
    const { error, errorMessage, response } = await TodosClient.UpPost({
      title: title,
    });

    if (error) {
      console.log(errorMessage);
    }

    if (response) {
      console.log(response);
    }
  };

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <li>
            <span className="text-red-500">ID:</span> {todo.id}
            <h1 className="text-red-500 text-justify">{todo.title}</h1>
          </li>
          {/* <SwitchComponent
            checked={todo.completed}
            onChange={() => handleUnchecked(todo)}
          /> */}
        </div>
      ))}

      <div>
        <label htmlFor="title">Title</label>
        <TextInput
          value={title}
          onChange={(e) => {
            setTitle(e);
          }}
          placeholder="Title"
        />
        <ButtonDefault text="Submit" onClick={submitPost} />
      </div>

      {post.map((data: any) => (
        <div key={data.id}>
          <h1>Title : {data.title}</h1>
        </div>
      ))}
    </div>
  );
}

export default Home;
