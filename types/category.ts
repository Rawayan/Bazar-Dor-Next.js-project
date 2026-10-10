/** Raw wire shape from `GET /categories`. */
export interface RawCategory {
  id: number | string;
  slug: string;
  nameBn?: string;
  name?: string;
  icon?: string;
  description?: string;
}

export interface Category {
  id: number | string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  /** Raw Bengali name from the API, kept for debugging/fallback. */
  nameBn?: string;
}
