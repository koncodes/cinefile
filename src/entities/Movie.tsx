export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  credits?: { cast?: Array<any>; crew?: Array<any> };
  genres: Genre[];
  homepage: string;
  id: number;
  images?: { backdrops?: Array<any>; logos?: Array<any>; posters?: Array<any> };
  imdb_id: string;
  keywords?: { keywords?: Array<any> };
  origin_country?: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object[];
  production_countries: object[];
  recommendations?: {
    page?: number;
    results?: Array<Movie>;
    total_pages?: number;
    total_results?: number;
  };
  release_date: string;
  release_dates?: {
    results?: Array<{
      iso_3166_1: string;
      release_dates: Array<{
        certification: string;
        iso_639_1: string;
        note: string;
        release_date: string;
      }>;
    }>;
  };
  revenue: number;
  runtime: number;
  spoken_languages: object[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos?: {
    results?: Array<{
      iso_639_1: string;
      iso_3166_1: string;
      name: string;
      key: string;
      site: string;
      size: number;
      type: string;
      official: boolean;
      published_at: string;
      id: string;
    }>;
  };
  vote_average: number;
  vote_count: number;
  "watch/providers"?: {
    results?: {
      [countryCode: string]: {
        link: string;
        flatrate?: Array<{
          logo_path: string;
          provider_id: number;
          provider_name: string;
          display_priority: number;
        }>;
      };
    };
  };
}

export interface MovieReference {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}
