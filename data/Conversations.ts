import { InboxScreenConversationProps } from "../types";
import { Users } from "./Users";

const Conversations: InboxScreenConversationProps[] = Users.map(
   (user, index) => ({
      conversationId: index.toString(),
      profile: user,
      lastMessage: {
         content: "Wech a ferda",
         timestamp:
            new Date().getTime() -
            Math.floor(Math.random() * 100 * 310 * 10000),
      },
   })
);

export default Conversations;
