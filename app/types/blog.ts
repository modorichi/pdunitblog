export interface Blog {
  id: string;
  title: string;
  body: string;
  publishedAt?: string;
  eyecatch?: Image;
  category?: Category;
  author?: Author;
  tags?: Tag[];
}

export interface Image {
  url: string;
  width?: number;
  height?: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface Author {
  id: string;
  name: string;
  profile?: string;
  image?: {
    url: string;
  };
}

export interface Tag {
  id: string;
  name: string;
}
