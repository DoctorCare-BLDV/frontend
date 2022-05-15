export interface User {
  address?: string;
  avatar?: Avatar;
  email?: string;
  fullName: string;
  introCode: string;
  myIntroCode: string;
  phone?: string;
  userInfoId: number;
  userName: string;
  token: string;
  bankAccount?: string;
  bankName?: string;
}

export interface Avatar {
  businessCode: string;
  fileName: string;
  url: string;
}
