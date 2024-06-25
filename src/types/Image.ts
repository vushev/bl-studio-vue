export interface Image {
  id: string;
  version: number;
  comments: string;
  status: "approved" | "rejected" | "needs_work" | "need_review";
  name: string;
  path: string;
  album_id: string;
}
