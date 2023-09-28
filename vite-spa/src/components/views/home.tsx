import { motion } from "framer-motion";
import ContactForm from "@components/contact-form.tsx";
import { Link } from "react-router-dom";
import { useAuth } from "@hooks/use-auth.ts";

function Home() {
  const { user } = useAuth();

  return (
    <>
      {" "}
      <div
        className={"bg-cover bg-center bg-[url('/indy-car.jpg')] p-16 pb-32"}
      >
        <div className="container">
          <motion.div
            className=""
            initial={{ translateY: 50, opacity: 0, filter: "blur(20px)" }}
            animate={{ translateY: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ translateY: 50, opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 0.3, ease: "easeIn" }}
          >
            <h2 className="font-heading text-4xl text-slate-50 mb-4">
              This is a demo of
              <br />a Modern <b className={"font-bold"}>NodeJS</b> Application
              on the <b className={"font-bold"}>IBMi</b>
            </h2>
            <p className={"prose text-white dark:text-stone-50 mb-8"}>
              This app is a real-time application, meaning when values are
              updated in the database, the client is updated as well. It uses
              feathers.js to serve an api for both websockets and rest requests.
              For the frontend we are using vite to build a React SPA. Database
              transactions are done using knex and the{" "}
              <a
                href="https://www.npmjs.com/package/@bdkinc/knex-ibmi"
                className={"text-slate-50 hover:text-white"}
                target="_blank"
              >
                knex-ibmi
              </a>{" "}
              adapter. This all runs on an IBMi in the Cloud, built and hosted
              by{" "}
              <a
                href="https://www.bdkinc.com"
                className={"font-bold text-slate-50 hover:text-white"}
                target="_blank"
              >
                BDK
              </a>
            </p>
            {!user ? (
              <div className={"flex items-center"}>
                <div
                  className={
                    "rounded-full bg-slate-900/80 py-4 px-8 text-white space-x-4"
                  }
                >
                  <Link
                    className={"no-underline font-semibold"}
                    to={"/register"}
                  >
                    Register
                  </Link>
                  <span> or </span>
                  <Link className={"no-underline font-semibold"} to={"/login"}>
                    Log in
                  </Link>
                </div>
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
      <hr />
      <div className="py-16">
        <div className="container">
          <div className="flex space-x-16">
            <div className="w-1/2 prose dark:text-slate-100">
              <h4 className={"text-3xl font-heading dark:text-slate-100"}>
                Why this demo?
              </h4>
              <p>
                We at BDK love the IBM i hardware and operating system. We
                understand it's reliability and performance. Unfortunately many
                people see the IBM i and refer to it as it's old name AS400.
                They associate the "green screen" as "old" and "archaic". The
                fact of the matter is, the system is not old. In fact it's all
                new and performs better and is more reliable than most other
                options.
              </p>
              <p>
                We put together this demo so we can show that there are many
                modern uses and applications for the IBM i. We run IBM i in the
                cloud and so can you. We can also modernize existing "green
                screen" or RPG applications. Give us a call at{" "}
                <a
                  className={"dark:text-slate-50 dark:hover:text-white"}
                  href="tel:1-800-309-0004"
                >
                  1-800-309-0004
                </a>{" "}
                , or send an email to{" "}
                <a
                  className={"dark:text-slate-50 dark:hover:text-white"}
                  href="mailto:info@bdkinc.com"
                >
                  info@bdkinc.com
                </a>
                , or fill out the contact form and someone will get back to you.
              </p>
            </div>
            <div className="w-1/2">
              <h6 className="text-3xl font-bold font-heading mb-4">
                Contact us
              </h6>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
