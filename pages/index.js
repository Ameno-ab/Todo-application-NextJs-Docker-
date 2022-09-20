import { useState, UseContext, useContext, useEffect ,useMemo} from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Todo from "../component/todo";
import { UserContext } from "../context";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import { LogoutOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
const Home = () => {
  const [todos, setTodos] = useState("");
  const [todoList, setTodoslist] = useState([]);
  const [LtodoList, setLTodoslist] = useState([{}]);
  const [state, setState] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getTodo();
  }, []);
  useEffect(() => {
    getTodo();
  }, [state.token ]);
  useEffect(() => {
    getTodo();
  }, [todoList ]);

  const addTodo = async () => {
    // e.preventDefault();
    console.log("todos", todos);
    setTodoslist((current) => [...current, todos]);

    try {
      setLoading(true);
      const { data } = await axios.post(
        `/task`,
        {
          description: todos,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      console.log("token", state.token);
      if (!data) {
        toast.error(data);
        setLoading(false);
      } else {
        setLoading(false);
        getTodo();
        console.log(data);
      }
    } catch (err) {
      // toast.error(err.response.data);
      setLoading(false);
    }

    console.log(todoList);
    setTodos("");
  };
  const getTodo = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`/task`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      });
      if (data) {
        setLTodoslist(data.data);
        setLoading(false);
        console.log("fetch", data);
        console.log("token", state.token);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const Delete = async(id) => {
    try{
  console.log("delete clicked",id);
 

  const { data } = await axios.delete(`/task/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.token}`,
    },
       
  });
  getTodo();

    }catch(err){
      console.log(err);
   
    }

  }

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div style={{ marginLeft: "450px" }} onClick={() => logout()}>
          {" "}
          <FontAwesomeIcon
            icon={faDoorOpen}
            className={styles.icon}
            color="#0070f3"
          />
          Logout
        </div>
        <h1 className={styles.title}>
          TODO<a href="#">App</a>
        </h1>

        <div className={styles.grid}>
          {/* <form onSubmit={addTodo}> */}
          <div className={styles.card}>
            <input
              className={styles.input}
              type="text"
              onChange={(e) => setTodos(e.target.value)}
              value={todos}
              placeholder="Add items.."
            />
            <input
              type="submit"
              className={styles.button}
              value="Add Todo"
              onClick={addTodo}
            />
          </div>
          {/* </form> */}
          {loading ? (
            <p>loading...</p>
          ) : (
            <Todo todos={LtodoList} addTodo={addTodo} Delete={Delete}/>
          )}
          {console.log("todo list", LtodoList)}
        </div>
      </main>

      <footer className={styles.footer}>
        Powered by{" "}
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </footer>
    </div>
  );
};

export default Home;
