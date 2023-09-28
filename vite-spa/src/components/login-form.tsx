import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form.tsx";
import { Input } from "./ui/input.tsx";
import { Button } from "./ui/button";
import {
  EyeNoneIcon,
  EyeOpenIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils.ts";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .required();

function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string>("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await login(values);
      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      new Error(JSON.stringify(err, null, 4));
    }
  }

  return (
    <>
      {error && (
        <Alert>
          <AlertTitle>Invalid Credentials</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john.doe@example.com"
                    {...field}
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className={cn("pr-24")}
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-[50%] -mt-[8px]"
                  >
                    {showPassword ? <EyeNoneIcon /> : <EyeOpenIcon />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type="submit" className={cn("flex items-center space-x-2")}>
              <PaperPlaneIcon className="w-3 h-3" /> <span>Submit</span>
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default LoginForm;
