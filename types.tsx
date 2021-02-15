export type UserProfile = {
   id: string;
   name: string;
   birthday: number; // timestamp
   images: ImagesType;
   description: string;
   profession?: string;
};

export type ImagesType = string[];
