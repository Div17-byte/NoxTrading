export interface User
{
  _id:string;
  firstname:string;
  email:string;
  steamLink:string;
  password:string;
  proPic:string;
  userImgPath:string;
  joinDate:Date;
  hash:string;
  auth:string;
  isBanned:boolean;
}
