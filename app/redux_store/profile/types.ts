export interface DetailsType {
  id: string;
  first_name: string;
  avatar: string;
  email: string;
}

export interface ProfileType {
  profile: DetailsType;
  users: DetailsType[];
  mode: string;
}
