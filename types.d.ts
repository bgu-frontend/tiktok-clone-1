export interface VideoPost {
  _id: string;
  caption: string;
  comments: Comment[];
  likes: Like[];
  postedBy: PostedBy;
  userId: string;
  video: Video;
}

export interface Comment {
  _key: string;
  comment: string;
  postedBy: PostedBy;
}

export interface PostedBy {
  _id: string;
  image: string;
  userName: string;
}

export interface Like {
  _key: string;
  _ref: string;
  _type: string;
}

export interface Video {
  asset: Asset;
}

export interface Asset {
  _id: string;
  url: string;
}
