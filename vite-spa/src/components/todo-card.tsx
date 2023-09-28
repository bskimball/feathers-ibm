import TodoList from "@components/todo-list.tsx";
import TodoForm from "@components/todo-form.tsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card.tsx";
import { cn } from "@lib/utils.ts";

function TodoCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={cn("font-heading")}>Todos</CardTitle>
      </CardHeader>
      <CardContent>
        <TodoList />
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <TodoForm />
        </div>
      </CardFooter>
    </Card>
  );
}

export default TodoCard;
