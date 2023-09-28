import RegisterForm from "@components/register-form.tsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Register() {
  return (
    <div className="container">
      <motion.div
        id={"view-register"}
        className="view-register space-y-8"
        initial={{ translateX: 240, opacity: 0, filter: "blur(20px)" }}
        animate={{ translateX: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ translateX: 240, opacity: 0, filter: "blur(20px)" }}
        transition={{ ease: "easeIn" }}
      >
        <h1 className="font-heading text-3xl leading-loose">Register</h1>
        <div>
          <RegisterForm />
        </div>
        <div>
          Already registered? Log in{" "}
          <Link
            to={"/login"}
            className="text-blue-500 underline hover:text-blue-600 visited:text-purple-500 hover:visited:text-purple-600"
          >
            here
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
