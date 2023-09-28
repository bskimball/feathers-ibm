import { Button } from "@components/ui/button.tsx";
import { useAuth } from "@hooks/use-auth.ts";
import { cn } from "@lib/utils.ts";
import {
  AvatarIcon,
  ExitIcon,
  EnterIcon,
  DashboardIcon,
  ChatBubbleIcon,
  ListBulletIcon,
} from "@radix-ui/react-icons";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const menuItems = [
  { title: "Dashboard", to: "/dashboard", Icon: DashboardIcon },
  { title: "Message", to: "/message", Icon: ChatBubbleIcon },
  { title: "Todo", to: "/todo", Icon: ListBulletIcon },
];

function Header() {
  const { logout, user } = useAuth();
  const location = useLocation();

  return (
    <header
      className={
        "shadow overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-black"
      }
    >
      <div className="container relative">
        <div
          className={
            "bg-primary w-4 h-[100px] -mt-2 absolute left-12 rotate-12 bg-gradient-to-bl from-primary to-red-900 dark:to-blue-900"
          }
        ></div>
        <div
          className={
            "bg-primary w-4 h-[100px] -mt-2 absolute left-20 rotate-12 bg-gradient-to-bl from-primary to-red-900 dark:to-blue-900"
          }
        ></div>
        <div className="flex relative z-10">
          <div className={"flex flex-col py-2 justify-center items-center"}>
            <Link
              className="font-heading text-3xl font-bold bg-white dark:bg-slate-900 text-stone-900 dark:text-white rounded"
              to={"/"}
            >
              Modern IBMi
            </Link>
          </div>
          <div className="flex-1 px-8 py-4">
            {user ? (
              <div className={"flex items-center space-x-3"}>
                {menuItems.map((item) => (
                  <div className="relative" key={item.to}>
                    <Button
                      type="button"
                      variant={"ghost"}
                      className={cn("space-x-2")}
                      asChild
                    >
                      <Link to={item.to}>
                        <item.Icon />
                        <span>{item.title}</span>
                      </Link>
                    </Button>
                    {item.to === location.pathname ? (
                      <motion.div
                        className={
                          "absolute -bottom-3 h-2 w-2 left-[50%] -ml-1 rounded-full bg-primary"
                        }
                        layoutId="active"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <div className={"flex items-center space-x-3"}>
                <div className="relative">
                  <Button
                    type="button"
                    variant={"ghost"}
                    className={cn("space-x-2")}
                    asChild
                  >
                    <Link to={"/login"}>
                      <EnterIcon />
                      <span>Login</span>
                    </Link>
                  </Button>
                  {"/login" === location.pathname ? (
                    <motion.div
                      className={
                        "absolute -bottom-3 h-2 w-2 left-[50%] -ml-1 rounded-full bg-primary"
                      }
                      layoutId="active"
                    />
                  ) : null}
                </div>
                <div className="relative">
                  <Button
                    type="button"
                    variant={"ghost"}
                    className={cn("space-x-2")}
                    asChild
                  >
                    <Link to={"/register"}>
                      <span>Register</span>
                    </Link>
                  </Button>
                  {"/register" === location.pathname ? (
                    <motion.div
                      className={
                        "absolute -bottom-3 h-2 w-2 left-[50%] -ml-1 rounded-full bg-primary"
                      }
                      layoutId="active"
                    />
                  ) : null}
                </div>
              </div>
            )}
          </div>
          <div className="ml-auto flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <AvatarIcon />
                  <span>{user.email}</span>
                </div>
                <Button
                  type="button"
                  variant={"ghost"}
                  className={cn("space-x-2")}
                  onClick={() => logout()}
                >
                  <ExitIcon />
                  <span>Logout</span>
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
