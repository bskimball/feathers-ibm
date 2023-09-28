import { useAuth } from "@hooks/use-auth.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { socketClient } from "@lib/utils.ts";
import { Button } from "@components/ui/button.tsx";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Todo } from "feathers-server/lib/client";
import { Input } from "@components/ui/input.tsx";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { cn } from "@lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Checkbox } from "@components/ui/checkbox.tsx";

function TodoItem({ todo }: { todo: Todo }) {
  const [complete, setComplete] = useState<boolean | string>(false);
  const [value, setValue] = useState<string>(todo.text);
  const debouncedValue = useDebounce<string>(value, 600);
  const debouncedComplete = useDebounce<boolean | string>(complete, 600);

  useEffect(() => {
    // if there's no idea yet, we cannot update the database
    if (!todo.id) return;
    // if the debounced value matches the todo text prop then there is nothing to update
    if (debouncedValue === todo.text) return;
    console.log("mutate");
    socketClient
      .service("todos")
      .patch(todo.id, { text: debouncedValue })
      .catch(() => setValue(todo.text));
  }, [debouncedValue, todo.id, todo.text]);

  useEffect(() => {
    if (!todo.id) return;
    console.log("complete", complete);
  }, [complete, debouncedComplete, todo.id]);

  return (
    <div className={"flex items-center space-x-2"}>
      <label htmlFor={`todo-id-${todo.id}`}>
        <Checkbox
          checked={typeof complete !== "string" ? complete : false}
          onCheckedChange={(value) => setComplete(value)}
        />
      </label>
      <Input
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        disabled={!todo.id}
        className={cn(
          "border-none shadow-none bg-transparent",
          complete ? "line-through" : "",
        )}
      />
    </div>
  );
}

function TodoList() {
  const { user } = useAuth();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos", user?.id],
    queryFn: async (): Promise<Todo[]> => {
      const response = await socketClient.service("todos").find({
        query: {
          $sort: {
            createdAt: 1,
          },
        },
      });
      return response.data.sort((a: Todo, b: Todo) =>
        a.createdAt.localeCompare(b.createdAt),
      );
    },
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (todo: Todo) => {
      await queryClient.cancelQueries({ queryKey: ["todos", user?.id] });
      const previousTodos = queryClient.getQueryData(["todos", user?.id]);
      queryClient.setQueryData<Todo[]>(["todos", user?.id], (old) => {
        return old ? old.filter((o: Todo) => o !== todo) : [];
      });
      try {
        if (todo.id) {
          await socketClient.service("todos").remove(todo.id);
        }
        await queryClient.invalidateQueries({ queryKey: ["todos", user?.id] });
      } catch (err) {
        queryClient.setQueryData(
          ["todos", user?.id],
          previousTodos ? previousTodos : [],
        );
        return previousTodos;
      }
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="todo-list">
      <ul className={"space-y-3"}>
        <AnimatePresence>
          {data?.map((todo, index) => (
            <motion.li
              key={todo.text + index}
              className="flex items-center justify-between"
              initial={{ translateY: 50, opacity: 0 }}
              animate={{
                translateY: 0,
                opacity: 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex-1">
                <TodoItem todo={todo} />
              </div>
              <Button
                type="button"
                variant={"ghost"}
                size={"icon"}
                onClick={() => mutation.mutate(todo)}
              >
                <CrossCircledIcon />
              </Button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default TodoList;
