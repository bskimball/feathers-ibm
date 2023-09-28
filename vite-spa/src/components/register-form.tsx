import * as z from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/use-auth.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form.tsx";
import { Input } from "@components/ui/input.tsx";
import { cn } from "@lib/utils.ts";
import {
  EyeNoneIcon,
  EyeOpenIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import { Button } from "@components/ui/button.tsx";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

function RegisterForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState<string>("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await register(values);
      navigate("/login", { replace: true });
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      new Error(JSON.stringify(err, null, 4));
    }
  }

  return (
    <div className="register-form">
      {error && (
        <Alert>
          <AlertTitle>Invalid Registration</AlertTitle>
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
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Confirmation</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      type={showPasswordConfirm ? "text" : "password"}
                      className={cn("pr-24")}
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    className="absolute right-2 top-[50%] -mt-[8px]"
                  >
                    {showPasswordConfirm ? <EyeNoneIcon /> : <EyeOpenIcon />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type="submit" className={cn("flex items-center space-x-2")}>
              <PaperPlaneIcon className={"h-3 w-3"} /> <span>Submit</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default RegisterForm;
