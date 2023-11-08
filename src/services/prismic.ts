import Prismic from '@prismicio/client';

export function getPrismicClient(req?: unknown){
  const prismic = Prismic.client('https://site-rota-do-boi.prismic.io/api/v2',{
    req,
  });

  return prismic;
}