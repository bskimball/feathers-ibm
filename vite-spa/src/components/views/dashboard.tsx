import UserList from "@components/user-list.tsx";
import { motion } from "framer-motion";
import TodoCard from "@components/todo-card.tsx";
import MessageCard from "@components/message-card.tsx";

function Dashboard() {
  return (
    <div className={"view-dashboard"}>
      <div className="container">
        <h1 className="font-heading font-bold text-3xl leading-loose">
          Dashboard
        </h1>
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h2 className="leading-loose text-xl font-semibold">Users</h2>
            <motion.div
              initial={{ translateX: -50, opacity: 0, filter: "blur(20px)" }}
              animate={{ translateX: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ translateX: -50, opacity: 0, filter: "blur(20px)" }}
              transition={{ duration: 0.3, ease: "easeIn" }}
            >
              <UserList />
            </motion.div>
          </div>
          <div>
            <motion.div
              initial={{ translateY: 50, opacity: 0, filter: "blur(20px)" }}
              animate={{ translateY: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ translateY: 50, opacity: 0, filter: "blur(20px)" }}
              transition={{ duration: 0.3, ease: "easeIn" }}
            >
              <MessageCard />
            </motion.div>
          </div>
          <div>
            <motion.div
              initial={{ translateY: 50, opacity: 0, filter: "blur(20px)" }}
              animate={{ translateY: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ translateY: 50, opacity: 0, filter: "blur(20px)" }}
              transition={{ duration: 0.3, ease: "easeIn" }}
            >
              <TodoCard />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
