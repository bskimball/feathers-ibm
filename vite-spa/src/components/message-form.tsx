import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert.tsx";
import * as z from "zod";
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
import { cn, socketClient } from "@lib/utils.ts";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

const formSchema = z
  .object({
    text: z.string().min(1),
  })
  .required();

function MessageForm() {
  const [error, setError] = useState<string>("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await socketClient.service("messages").create(values);
      form.reset();
    } catch (err: unknown) {
      new Error(JSON.stringify(err, null, 4));
      if (err instanceof Error) setError(err.message);
    }
  }

  return (
    <div className="message-form">
      {error && (
        <Alert className={cn("mb-4")} variant={"destructive"}>
          <AlertTitle>Invalid Message</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
          <FormField
            name="text"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="type a message..."
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
              <PaperPlaneIcon className="h-3 w-3" /> <span>Send</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default MessageForm;
