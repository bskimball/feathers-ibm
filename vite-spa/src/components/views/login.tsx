import LoginForm from "@components/login-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  return (
    <div className="container">
      <motion.div
        id={"view-login"}
        className="view-login space-y-8"
        initial={{ translateX: -240, opacity: 0, filter: "blur(20px)" }}
        animate={{ translateX: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ translateX: -240, opacity: 0, filter: "blur(20px)" }}
        transition={{ ease: "easeIn" }}
      >
        <h1 className="font-heading text-3xl leading-loose">Login</h1>
        <div>
          <LoginForm />
        </div>
        <div>
          Not Registered? Register{" "}
          <Link
            to={"/register"}
            className="text-blue-500 underline hover:text-blue-600 visited:text-purple-500 hover:visited:text-purple-600"
          >
            here
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
