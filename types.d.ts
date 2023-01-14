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

export interface DecodedGoogleJWT {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}

export interface GoogleUserInfo {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}
