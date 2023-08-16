export type Post = {
  id: string,
  imageUrl: string,
  postText: string,
  title: string;
  author: {
    id: string;
    name: string;
    pfp:string;
  };
  }