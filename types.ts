export type UserProfile = {
   id: string;
   name: string;
   birthday: number; // timestamp
   images: ImagesType;
   description: string;
   profession?: string;
};

export type InboxScreenConversationProps = {
   conversationId: string;
   profile: UserProfile;
   lastMessage: ConversationMessage;
};

export type ConversationMessage = {
   id: string;
   content: string;
   timestamp: number;
   senderId: string;
};

export type ImagesType = string[];
