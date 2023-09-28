import { motion } from "framer-motion";
import MessageCard from "@components/message-card.tsx";
function Message() {
  return (
    <div className="container">
      <motion.div
        className="view-message"
        initial={{ translateY: 100, opacity: 0, filter: "blur(20px)" }}
        animate={{ translateY: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ translateY: 100, opacity: 0, filter: "blur(20px)" }}
        transition={{ duration: 0.3, ease: "easeIn" }}
      >
        <h1 className="font-heading text-4xl leading-loose font-bold">
          Message
        </h1>
        <div className={"flex items-center space-x-16"}>
          <div className={"w-1/2"}>
            <MessageCard />
          </div>
          <div className={"w-1/2 prose dark:text-slate-100"}>
            <h2 className={"text-3xl font-heading dark:text-slate-100"}>
              Real-time Messaging
            </h2>
            <p>
              This is an example messaging system. The email addresses are
              masked for privacy but these are real users entering messages. The
              messages are saved to the DB2 for i database and sent to the
              browser via websockets. When you type a message here it can be
              seen by all logged in users.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Message;
