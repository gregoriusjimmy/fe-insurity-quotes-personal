export type TArticle = {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  updateAt: string;
  authorName: string;
  tags: string[];
};

export type TCommonAPIRes<T> = {
  status: number;
  message?: string;
  data: T;
};

export type TGetLatestArticlesRes = TCommonAPIRes<TArticle[]>;
