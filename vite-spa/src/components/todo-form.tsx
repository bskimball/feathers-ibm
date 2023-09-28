import * as z from "zod";
import { useAuth } from "@hooks/use-auth.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn, socketClient } from "@lib/utils.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@components/ui/form.tsx";
import { Input } from "@components/ui/input.tsx";
import { Button } from "@components/ui/button.tsx";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Todo } from "feathers-server/lib/client";
import format from "date-fns/format";

const formSchema = z.object({
  text: z.string(),
});

function TodoForm() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (value) => {
      await socketClient.service("todos").create(value);
    },
    onMutate: async (value: z.infer<typeof formSchema>) => {
      await queryClient.cancelQueries({ queryKey: ["todos", user?.id] });
      const previousTodos = queryClient.getQueryData(["todos", user?.id]);
      queryClient.setQueryData(["todos", user?.id], (old) => [
        ...(old as Todo[]),
        { ...value, createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss") },
      ]);
      return { previousTodos };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(
        ["todos", user?.id],
        context ? context.previousTodos : [],
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", user?.id] });
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      mutation.mutate(values);
      form.reset();
    } catch (err: unknown) {
      new Error(JSON.stringify(err, null, 4));
    }
  }

  return (
    <div className="todo-form">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
          <FormField
            name="text"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="type a todo..."
                    {...field}
                    className={cn("rounded-r-none rounded-t-none")}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div>
            <Button
              type="submit"
              className={cn(
                "flex items-center space-x-2 rounded-l-none rounded-t-none",
              )}
            >
              <PlusCircledIcon /> <span>Add</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default TodoForm;
