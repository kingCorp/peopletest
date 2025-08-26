
export interface ProfileDetailsType {
  _id: string;
  comment_count: number;
  created_at: string;
  deleted_at: string | null;
  email: string;
  follower_count: number;
  following_count: number;
  is_active: boolean;
  is_set_for_deletion: boolean;
  is_suspended: boolean;
  is_verified: boolean;
  like_count: number;
  picture: string | null;
  post_count: number;
  roles: [];
  sports: [];
  type: string;
  updated_at: string;
  view_count: number;
  name: string;
  username: string;
  is_blocked_by_me: boolean;
  is_followed_by_me: boolean;
  is_following_me: boolean;
  is_blocking_me: boolean;
}

export interface ProfileType {
  profile: ProfileDetailsType;
}
