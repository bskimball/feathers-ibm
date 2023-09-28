import MessageList from "@components/message-list.tsx";
import MessageForm from "@components/message-form.tsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card.tsx";
import { cn } from "@lib/utils.ts";

function MessageCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={cn("font-heading")}>Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <MessageList />
      </CardContent>
      <CardFooter>
        <div className={"w-full"}>
          <MessageForm />
        </div>
      </CardFooter>
    </Card>
  );
}

export default MessageCard;
