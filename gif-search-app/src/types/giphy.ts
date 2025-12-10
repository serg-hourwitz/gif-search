// strict types for Giphy 
export interface GiphyImage {
  url: string;
  width?: string;
  height?: string;
  size?: string;
  mp4?: string;
  webp?: string;
}

export interface GiphyImages {
  original: GiphyImage;
  fixed_height: GiphyImage;
  fixed_height_small?: GiphyImage;
  fixed_width?: GiphyImage;
  [key: string]: GiphyImage | undefined;
}

export interface GiphyUser {
  avatar_url?: string;
  banner_image?: string;
  display_name?: string;
  username?: string;
}

export interface GiphyGif {
  id: string;
  title: string;
  url: string;
  import_datetime?: string;
  trending_datetime?: string;
  username?: string;
  user?: GiphyUser;
  images: GiphyImages;
}

export interface GiphyPagination {
  total_count: number;
  count: number;
  offset: number;
}

export interface GiphyMeta {
  status: number;
  msg: string;
  response_id?: string;
}

export interface GiphySearchResponse {
  data: GiphyGif[];
  pagination: GiphyPagination;
  meta: GiphyMeta;
}
