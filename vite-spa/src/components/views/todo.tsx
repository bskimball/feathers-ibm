import { motion } from "framer-motion";
import TodoCard from "@components/todo-card.tsx";

function Todo() {
  return (
    <div className="container">
      <motion.div
        className="view-todo"
        initial={{ translateY: 100, opacity: 0, filter: "blur(20px)" }}
        animate={{ translateY: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ translateY: 100, opacity: 0, filter: "blur(20px)" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <h1 className="font-heading text-4xl leading-loose font-bold">Todo</h1>
        <div className="flex items-center space-x-16">
          <div className="w-1/2 prose dark:text-slate-100">
            <h2 className="text-3xl font-heading dark:text-slate-100">
              Todo List
            </h2>
            <p>
              This is just a simple "todo" list. The items added to this list
              are private to your profile. These items are stored in the DB2
              database for persistence. Go ahead and add/remove items.
            </p>
          </div>
          <div className="w-1/2">
            <TodoCard />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Todo;
