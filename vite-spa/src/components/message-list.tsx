import { useAuth } from "@/hooks/use-auth";
import { socketClient } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Message } from "feathers-server/lib/client";
import { useEffect, useRef, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { Avatar, AvatarFallback } from "@components/ui/avatar.tsx";
import { PersonIcon } from "@radix-ui/react-icons";

function MessageList() {
  const listContainer = useRef<HTMLDivElement | null>(null);
  const endRow = useRef<HTMLDivElement | null>(null);
  const [firstRun, setFirstRun] = useState<boolean>(true);
  const { user } = useAuth();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["messages", user?.id],
    queryFn: async (): Promise<Message[]> => {
      const response = await socketClient
        .service("messages")
        .find({ paginate: false, query: { $sort: { id: -1 } } });
      return response.data.reverse();
    },
  });
  const queryClient = useQueryClient();

  const isScrolledToBottom =
    listContainer.current !== null
      ? listContainer.current.scrollHeight -
          listContainer.current.clientHeight <=
        listContainer.current.scrollTop + 1
      : true;

  const isInViewport = () => {
    if (listContainer.current === null) return;
    const rect = listContainer.current?.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  useEffect(() => {
    if (data && data?.length > 0) {
      console.log({ isScrolledToBottom, firstRun });

      if (isInViewport() && (isScrolledToBottom || firstRun)) {
        endRow.current?.scrollIntoView({ behavior: "smooth" });
      }
      setFirstRun(false);
    }
  }, [data, firstRun, isScrolledToBottom]);

  useEffect(() => {
    const updateMessages = (message: Message) => {
      console.log({ message });
      queryClient.setQueryData<Message[]>(["messages", user?.id], (old) => {
        console.log({ old });
        if (old) {
          const found = old.find((m: Message) => m.id === message.id);
          console.log({ found });
          return !found ? [...old, message] : old;
        }
        return [message];
      });
    };
    socketClient.service("messages").on("created", updateMessages);

    return () =>
      socketClient
        .service("messages")
        .removeListener("created", updateMessages);
  }, [queryClient, user]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <pre>Error...</pre>;

  return (
    <div
      ref={listContainer}
      className="messages-list p-8 border rounded-t w-full max-h-[400px] overflow-y-auto bg-slate-50 dark:bg-slate-900"
    >
      <ul className="space-y-12">
        {data.length > 0 ? (
          data.map((message) => (
            <li key={message.id} className="w-full space-y-2">
              <div
                className={`w-full flex space-x-2 ${
                  user && message.userId === user.id
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <Avatar>
                  {/*<AvatarImage src={user?.avatar} />*/}
                  <AvatarFallback>
                    <PersonIcon />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div
                    className={`rounded-t-xl py-2 px-4 ${
                      user && message.userId === user.id
                        ? "bg-green-100 text-green-900 rounded-l-xl border border-green-200"
                        : "bg-blue-100 text-blue-900 rounded-r-xl border border-blue-200"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
              <div>
                <div
                  className={`text-sm px-2 ${
                    user && message.userId === user.id
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {user && message.userId === user.id
                    ? message.user.email
                    : message.user.emailMask}
                </div>
                <div
                  className={`text-stone-600 text-xs px-2 ${
                    user && message.userId === user.id
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {formatDistanceToNowStrict(new Date(message.createdAt))} ago
                </div>
              </div>
            </li>
          ))
        ) : (
          <li>There are no messages</li>
        )}
      </ul>
      <div ref={endRow}></div>
    </div>
  );
}

export default MessageList;
