import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@components/ui/form.tsx";
import { Input } from "@components/ui/input.tsx";
import { Button } from "@components/ui/button.tsx";
import { Textarea } from "@components/ui/textarea.tsx";
import { cn } from "@lib/utils.ts";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  company: z.string(),
  phone: z.string(),
  message: z.string(),
});

function ContactForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      company: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="contact-form">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder={"john.doe@example.com"}
                    {...field}
                    autoComplete={"email"}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder={"John Doe"}
                    {...field}
                    autoComplete={"name"}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={"your message..."}
                    {...field}
                    autoComplete={"message"}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className={"py-1 flex justify-end"}>
            <Button type="submit" className={cn("flex items-center space-x-2")}>
              <PaperPlaneIcon className={"h-3 w-3"} /> <span>Submit</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ContactForm;
