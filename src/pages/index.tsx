import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

import { Icon } from "../components/Icons";
import { useRef, useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getPrismicClient } from "../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

type Produto = {
  uid: string | any;
  name: string;
  categoria: string;
  whatsapp: string;
  mensagem_whatsapp: string;
  descricao: string;
  preco: string;
  img: string;
};

interface produtosProps {
  cortes: Array<Produto>;
  kits: Array<Produto>;
  acessorios: Array<Produto>;
  temperos: Array<Produto>;
  allCortesPage: number;
  allKitsPage: number;
  allAcessoriosPage: number;
  allTemperosPage: number;
}

type Responsive = {
  breakpoint: number;
  settings: {
    slidesToShow: number;
    slidesToScroll: number;
  };
};

interface configReference {
  dots: boolean;
  slidesToShow: number;
  slidesToScroll: number;
  infinite: boolean;
  arrows: boolean;
  easing: string;
  swipeToSlide: boolean;
  variableWidth: boolean;
  centerMode?: boolean;
  centerPadding?: string;
  beforeChange?: (current: any, next: any) => void;
  afterChange: (current: any) => void;

  responsive: Responsive[];
}

export default function Home({
  cortes,
  kits,
  acessorios,
  temperos,
  allCortesPage,
  allKitsPage,
  allAcessoriosPage,
  allTemperosPage,
}: produtosProps) {
  const [todosCortes, setTodosCortes] = useState<Produto[]>(cortes);
  const [pageCortes, setPageCortes] = useState(1);
  const [totalPageCortes, setTotalPageCortes] = useState(allCortesPage);

  const [todosKits, setTodosKits] = useState<Produto[]>(kits);
  const [pageKits, setPageKits] = useState(1);
  const [totalPageKits, setTotalPageKits] = useState(allKitsPage);

  const [todosAcessorios, setTodosAcessorios] = useState<Produto[]>(acessorios);
  const [pageAcessorios, setPageAcessorios] = useState(1);
  const [totalPageAcessorios, setTotalPageAcessorios] =
    useState(allAcessoriosPage);

  const [todosTemperos, setTodosTemperos] = useState<Produto[]>(temperos);
  const [pageTemperos, setPageTemperos] = useState(1);
  const [totalPageTemperos, setTotalPageTemperos] = useState(allTemperosPage);

  const [chooseProduct, setChooseProduct] =
    useState<string>("YxdI3xYAAI6Jil1-");
  const [isLoading, setIsLoading] = useState(false);

  const [readMore, setReadMore] = useState(false);

  const sliderProducts = useRef<Slider>(null);
  const sliderDepoimentos = useRef<Slider>(null);

  // console.log(todosProdutos[chooseProduct].map(item => item.img));

  function handleCallSlides(itemPos: number, tipoProd: string) {
    switch (tipoProd) {
      case "YxdI3xYAAI6Jil1-":
        if (
          itemPos + 7 >= todosCortes.length &&
          todosCortes.length > 1 &&
          pageCortes < totalPageCortes
        ) {
          getPosts(pageCortes);
          console.log("get new itens...");
        }
        break;
      case "YxdJhxYAACpPimCu":
        if (
          itemPos + 7 >= todosKits.length &&
          todosKits.length > 1 &&
          pageKits < totalPageKits
        ) {
          getPosts(pageKits);
          console.log("get new itens...");
        }
        break;
      case "YxdJ_xYAACpPimL3":
        if (
          itemPos + 7 >= todosAcessorios.length &&
          todosAcessorios.length > 1 &&
          pageAcessorios < totalPageAcessorios
        ) {
          getPosts(pageAcessorios);
          console.log("get new itens...");
        }
        break;
      case "YxdKNBYAACgAimQA":
        if (
          itemPos + 7 >= todosTemperos.length &&
          todosTemperos.length > 1 &&
          pageTemperos < totalPageTemperos
        ) {
          getPosts(pageTemperos);
          console.log("get new itens...");
        }
        break;
    }
  }

  async function getPosts(page: number) {
    if (isLoading) return;

    setIsLoading(true);

    const prismic = getPrismicClient();

    const response = await prismic.query(
      [
        Prismic.Predicates.at("document.type", "cortes"),
        Prismic.Predicates.at("my.cortes.prod_categoria", chooseProduct),
      ],
      {
        orderings: "[document.last_publication_date desc]",
        pageSize: 20,
        page: String(page + 1),
      }
    );

    const responseReduce = response.results
      .map((produto) => {
        return {
          uid: produto.uid,
          name: RichText.asText(produto.data.prod_name) || "null",
          categoria: produto.data.prod_categoria.tags[0] || "null",
          whatsapp: produto.data.numero_de_whatsapp.uid || "null",
          descricao: RichText.asText(produto.data.prod_descricao) || "null",
          preco: RichText.asText(produto.data.prod_preco) || "null",
          mensagem_whatsapp: RichText.asText(produto.data.prod_message) || "",
          img: produto.data.prod_img.url || "null",
        };
      })
      .filter((item) => {
        let a = false;
        Object.keys(item).forEach((key) => {
          //@ts-ignore
          if (item[key] == "null") {
            a = true;
          }
        });

        // console.log(item);

        if (a == false) return item;
      });

    if (chooseProduct == "YxdI3xYAAI6Jil1-") {
      setTodosCortes(todosCortes.concat(responseReduce));
      setPageCortes(page + 1);
    } else if (chooseProduct == "YxdJhxYAACpPimCu") {
      setTodosKits(todosKits.concat(responseReduce));
      setPageKits(page + 1);
    } else if (chooseProduct == "YxdJ_xYAACpPimL3") {
      setTodosAcessorios(todosAcessorios.concat(responseReduce));
      setPageAcessorios(page + 1);
    } else if (chooseProduct == "YxdKNBYAACgAimQA") {
      setTodosTemperos(todosTemperos.concat(responseReduce));
      setPageTemperos(page + 1);
    }

    setIsLoading(false);

    // return response.results;
  }

  const quemSomosReference = {
    dots: false,
    arrows: true,
    autoplay: true,
    Infinite: true,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
        },
      },
    ],
  };

  const productsReference: configReference = {
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
    easing: "ease",
    variableWidth: true,
    swipeToSlide: true,
    // lazyLoad: true,
    // centerMode: true,
    // centerPadding: "24px",
    // className: "center",
    // beforeChange: (current, next) => console.log('before change oldslide: '+ current + ' active slide next: '+ next),
    // afterChange: (current) => setCurrentSlideProd(current),
    afterChange: (current) => handleCallSlides(current, chooseProduct),
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 930,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 715,
        settings: {
          // infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 540,
        settings: {
          // infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // {
      //   breakpoint: 380,
      //   settings: {
      //     // infinite: true,
      //     slidesToShow: 1,
      //     slidesToScroll: 1,
      //   },
      // },
    ],
  };

  const depoimentosReference = {
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    autoplay: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    autoplaySpeed: 7500,
    easing: "ease",
    // centerMode: true,
    // centerPadding: "30px",
    // className: "center",
    responsive: [
      {
        breakpoint: 924,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const depoimentos = [
    {
      img: "/images/depoimentos/dep8.webp",
      name: "Milene",
      text: "As carnes são ótimas, atendimento diferenciado e o local muito bem organizado, super indico!!",
    },
    {
      img: "/images/depoimentos/dep1.webp",
      name: "Dudu Heluany",
      text: "Churrasco com as carnes da Rota é um sucesso. Além da qualidade o atendimento é top, bom demaiss!",
    },
    {
      img: "/images/depoimentos/dep2.webp",
      name: "Maria Aparecida Batista de Jesus",
      text: "Rota do boi um açougue de ótima procedência. Produtos de ótimas qualidades, um atendimento aos clientes excelente sempre dando a devida atenção. Parabéns a todos os funcionários",
    },
    {
      img: "/images/depoimentos/dep3.webp",
      name: "Fábio Osti Bisca",
      text: "Melhor casa de carnes da região, já até peguei uma picanha no programa fidelidade kkkk 👏🏼👏🏼",
    },
    {
      img: "/images/depoimentos/dep4.webp",
      name: "Simony Marinho",
      text: "Comi alguns espetinhos em um evento, estavam deliciosos e o de picanha então sem palavras. Já quero mais! ❤",
    },
    {
      img: "/images/depoimentos/dep5.webp",
      name: "Fabio Xavier",
      text: "Contratei para fornecer espetinhos em uma festa da empresa, todos elogiaram! Com certeza faremos outras vezes.",
    },
    {
      img: "/images/depoimentos/dep6.webp",
      name: "Elpidio Fagundes",
      text: "Ótimo atendimento, preço, variedade e qualidade. Vale a pena conhecer.",
    },
    {
      img: "/images/depoimentos/dep7.webp",
      name: "Pedro Henrique de Brito",
      text: "Excelente, tem tudo o que eu queria e o atendimento é nota 10.",
    },
  ];

  const quemSomos = [
    "/images/quemsomos/img01.webp",
    "/images/quemsomos/img02.webp",
    "/images/quemsomos/img03.webp",
    "/images/quemsomos/img04.webp",
    "/images/quemsomos/img05.webp",
    "/images/quemsomos/img06.webp",
    "/images/quemsomos/img07.webp",
    "/images/quemsomos/img08.webp",
    "/images/quemsomos/img09.webp",
    "/images/quemsomos/img10.webp",
    "/images/quemsomos/img11.webp",
  ];

  function trimString(string: string, limit: number) {
    var trimmedString =
      string.length > limit ? string.substring(0, limit - 3) + "..." : string;

    return trimmedString;
  }

  return (
    <>
      <Head>
        <title>Rota do Boi | As melhores carnes para o seu churras!</title>
      </Head>

      <main>
        <section className={`${styles.home__section} section`} id="home">
          <div className={`${styles.home__container} container`}>
            <div className={styles.home__wrapper}>
              <h1>As melhores carnes para o seu churras!</h1>
              <div className={styles.home__buttons}>
                <Link href="/#products">
                  <a className={`${styles.button__item} ${styles.primary}`}>
                    SAIBA MAIS
                  </a>
                </Link>
                <Link href="https://api.whatsapp.com/send?phone=5535992303771">
                  <a className={`${styles.button__item} ${styles.secondary}`}>
                    <Image
                      width={21}
                      height={21}
                      src="/images/whatsapp.svg"
                      alt="Logo whatsapp"
                      priority
                    />
                    ENTRE EM CONTATO
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`${styles.products__section} section`}
          id="products"
        >
          <div className={`${styles.products__container} container`}>
            <h2>Nossos produtos</h2>
            <div className={styles.button__wrapper}>
              <button
                className={`${styles.button__item} ${
                  chooseProduct === "YxdI3xYAAI6Jil1-" && styles.btn__active
                }`}
                onClick={() => {
                  sliderProducts.current?.slickGoTo(0);
                  setChooseProduct("YxdI3xYAAI6Jil1-");
                }}
              >
                <Icon type="meat" />
                <span>Cortes</span>
              </button>
              <button
                className={`${styles.button__item} ${
                  chooseProduct === "YxdJhxYAACpPimCu" && styles.btn__active
                }`}
                onClick={() => {
                  sliderProducts.current?.slickGoTo(0);
                  setChooseProduct("YxdJhxYAACpPimCu");
                }}
              >
                <Icon type="kits" />
                <span>Kits</span>
              </button>
              <button
                className={`${styles.button__item} ${
                  chooseProduct === "YxdJ_xYAACpPimL3" && styles.btn__active
                }`}
                onClick={() => {
                  sliderProducts.current?.slickGoTo(0);
                  setChooseProduct("YxdJ_xYAACpPimL3");
                }}
              >
                <Icon type="accessories" />
                <span>Acessórios</span>
              </button>
              <button
                className={`${styles.button__item} ${
                  chooseProduct === "YxdKNBYAACgAimQA" && styles.btn__active
                }`}
                onClick={() => {
                  sliderProducts.current?.slickGoTo(0);
                  setChooseProduct("YxdKNBYAACgAimQA");
                }}
              >
                {/* <Icon type="condiment" /> */}
                <Icon type="other" />
                <span>Outros</span>
              </button>
            </div>

            <div className={styles.arrow__content}>
              <button
                onClick={() => {
                  sliderProducts.current?.slickPrev();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="17"
                  fill="none"
                  viewBox="0 0 19 17"
                >
                  <path
                    stroke="#F10505"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.35 1 1 8.35l7.35 7.35M1 8.35h16.8H1Z"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  sliderProducts.current?.slickNext();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="17"
                  fill="none"
                  viewBox="0 0 19 17"
                >
                  <path
                    stroke="#F10505"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.65 15.7 18 8.35 10.65 1M18 8.35H1.2 18Z"
                  />
                </svg>
              </button>
            </div>

            <div className={styles.products__grid}>
              {chooseProduct == "YxdI3xYAAI6Jil1-" && (
                <>
                  <p className={styles.grid__title}>Cortes</p>
                  <div className={styles.products__grid__wrapper}>
                    {todosCortes.length === 0 && (
                      <div className={styles.products__empty__state}>
                        <p>Ainda não há itens nesta seção.</p>
                      </div>
                    )}
                    <Slider {...productsReference} ref={sliderProducts}>
                      {todosCortes.map((item: Produto) => (
                        <div className={styles.product__item} key={item.img}>
                          <div className={styles.item__image}>
                            <Image
                              src={item.img}
                              // width={200}
                              // height={200}
                              layout="fill"
                              objectFit="cover"
                              alt={item.name}
                              className="prod__img"
                              loading="lazy"
                            />
                            <style jsx global>{`
                              .prod__img {
                                border-radius: 8px;
                                transition: all 0.4s;
                              }

                              .prod__img:hover {
                                transform: scale(1.1);
                              }
                            `}</style>
                          </div>
                          <div className={styles.item__data}>
                            <div className={styles.item__text}>
                              <p>{trimString(item.name, 60)}</p>
                              <span>{trimString(item.descricao, 80)}</span>
                              <h2>{`R$ ` + item.preco}</h2>
                            </div>
                            <Link
                              href={`https://api.whatsapp.com/send?phone=${
                                item.whatsapp
                              }&text=${item.mensagem_whatsapp || ""}`}
                            >
                              <a target="_blank">Eu quero</a>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </>
              )}
              {chooseProduct == "YxdJhxYAACpPimCu" && (
                <>
                  <p className={styles.grid__title}>Kits</p>
                  <div className={styles.products__grid__wrapper}>
                    {todosKits.length === 0 && (
                      <div className={styles.products__empty__state}>
                        <p>Ainda não há itens nesta seção.</p>
                      </div>
                    )}
                    <Slider {...productsReference} ref={sliderProducts}>
                      {todosKits.map((item: Produto) => (
                        <div className={styles.product__item} key={item.img}>
                          <div className={styles.item__image}>
                            <Image
                              src={item.img}
                              layout="fill"
                              objectFit="cover"
                              alt={item.name}
                              className="prod__img"
                              loading="lazy"
                            />
                            <style jsx global>{`
                              .prod__img {
                                border-radius: 8px;
                                transition: all 0.4s;
                              }

                              .prod__img:hover {
                                transform: scale(1.1);
                              }
                            `}</style>
                          </div>
                          <div className={styles.item__data}>
                            <div className={styles.item__text}>
                              <p>{trimString(item.name, 60)}</p>
                              <span>{trimString(item.descricao, 80)}</span>
                              <h2>{`R$ ` + item.preco}</h2>
                            </div>
                            <Link
                              href={`https://api.whatsapp.com/send?phone=${
                                item.whatsapp
                              }&text=${item.mensagem_whatsapp || ""}`}
                            >
                              <a target="_blank">Eu quero</a>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </>
              )}
              {chooseProduct == "YxdJ_xYAACpPimL3" && (
                <>
                  <p className={styles.grid__title}>Acessórios</p>
                  <div className={styles.products__grid__wrapper}>
                    {todosAcessorios.length === 0 && (
                      <div className={styles.products__empty__state}>
                        <p>Ainda não há itens nesta seção.</p>
                      </div>
                    )}
                    <Slider {...productsReference} ref={sliderProducts}>
                      {todosAcessorios.map((item: Produto) => (
                        <div className={styles.product__item} key={item.img}>
                          <div className={styles.item__image}>
                            <Image
                              src={item.img}
                              layout="fill"
                              objectFit="cover"
                              alt={item.name}
                              className="prod__img"
                              loading="lazy"
                            />
                            <style jsx global>{`
                              .prod__img {
                                border-radius: 8px;
                                transition: all 0.4s;
                              }

                              .prod__img:hover {
                                transform: scale(1.1);
                              }
                            `}</style>
                          </div>
                          <div className={styles.item__data}>
                            <div className={styles.item__text}>
                              <p>{trimString(item.name, 60)}</p>
                              <span>{trimString(item.descricao, 80)}</span>
                              <h2>{`R$ ` + item.preco}</h2>
                            </div>
                            <Link
                              href={`https://api.whatsapp.com/send?phone=${
                                item.whatsapp
                              }&text=${item.mensagem_whatsapp || ""}`}
                            >
                              <a target="_blank">Eu quero</a>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </>
              )}
              {chooseProduct == "YxdKNBYAACgAimQA" && (
                <>
                  <p className={styles.grid__title}>Outros</p>
                  <div className={styles.products__grid__wrapper}>
                    {todosTemperos.length === 0 && (
                      <div className={styles.products__empty__state}>
                        <p>Ainda não há itens nesta seção.</p>
                      </div>
                    )}
                    <Slider {...productsReference} ref={sliderProducts}>
                      {todosTemperos.map((item: Produto) => (
                        <div className={styles.product__item} key={item.img}>
                          <div className={styles.item__image}>
                            <Image
                              src={item.img}
                              layout="fill"
                              objectFit="cover"
                              alt={item.name}
                              className="prod__img"
                              loading="lazy"
                            />
                            <style jsx global>{`
                              .prod__img {
                                border-radius: 8px;
                                transition: all 0.4s;
                              }

                              .prod__img:hover {
                                transform: scale(1.1);
                              }
                            `}</style>
                          </div>
                          <div className={styles.item__data}>
                            <div className={styles.item__text}>
                              <p>{trimString(item.name, 60)}</p>
                              <span>{trimString(item.descricao, 80)}</span>
                              <h2>{`R$ ` + item.preco}</h2>
                            </div>
                            <Link
                              href={`https://api.whatsapp.com/send?phone=${
                                item.whatsapp
                              }&text=${item.mensagem_whatsapp || ""}`}
                            >
                              <a target="_blank">Eu quero</a>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <section
          className={`${styles.quem__somos__section} section`}
          id="quemsomos"
        >
          <div className={`${styles.quem__somos__container} container`}>
            <h2>Quem somos</h2>
            <div className={styles.quem__somos__wrapper}>
              <div className={`${styles.quem__somos__text} ${styles.mobile}`}>
                <p>
                  Com mais de 15 anos de experiência no mercado de carnes, os
                  fundadores da Casa de Carnes Rota do Boi perceberam que o
                  mercado necessitava de um lugar onde as pessoas poderiam
                  comprar suas carnes sem receio em relação à higiene e à
                  qualidade dos cortes. Ali enxergaram uma oportunidade de
                  transformar o mercado de carnes da região. Depois de muito
                  estudo e análise, foi inaugurada a Rota do Boi, uma casa de
                  carnes que tem como missão atender o público de forma
                  transparente e segura desde a seleção da carne ao atendimento
                  personalizado.
                </p>
                <div
                  className={`${styles.quem__somos__more} ${
                    readMore && styles.activeText
                  }`}
                >
                  <p>
                    Nosso foco são cortes premium para churrasco, para que
                    nossos clientes possam fazer com maestria uma das refeições
                    mais amadas pelos brasileiros: o churrasco. Trabalhamos
                    também com linguiças artesanais recheadas, cortes suínos,
                    aves e assados aos finais de semana. Também temos
                    disponíveis uma gama de acessórios para churrasco, como
                    tábuas, facas e churrasqueiras. Buscamos oferecer produtos
                    de extrema qualidade para atender suas expectativas. Hoje
                    contamos com uma equipe treinada e dedicada à limpeza do
                    local, inspeção da qualidade, procedência dos cortes e muito
                    zelo pela satisfação de nossos clientes. Nossa equipe é
                    preparada para sanar todas suas dúvidas em relação ao
                    preparo, como cortar sua carne e até mesmo a quantidade
                    necessária para seu encontro.{" "}
                  </p>
                  <p>
                    Temos também o Programa Fidelidade da Rota, uma forma de
                    retribuir os clientes que sempre escolhem nossos produtos
                    para fazer parte desse momento de diversão que é o
                    churrasco. Através da nossa do nosso site você pode conferir
                    todas as informações sobre como funciona a pontuação e os
                    prêmios disponíveis para resgate.
                  </p>
                  <p>
                    Você pode conhecer mais sobre o nosso trabalho através do
                    instagram{" "}
                    <Link href="https://instagram.com/rotadoboi">
                      <a target="_blank">@rotadoboi</a>
                    </Link>
                    . Por lá sempre publicamos novidades, bastidores e
                    feedbacks. Entre em contato e revolucione seu churrasco,
                    porque quando o boi é de primeira, não existe carne de
                    segunda!{" "}
                  </p>
                </div>
                <button
                  className={styles.ver__mais__btn}
                  onClick={() => {
                    setReadMore(!readMore);
                  }}
                >
                  {!readMore ? "Ler mais" : "Ver menos"}
                </button>
              </div>
              <div className={`${styles.quem__somos__text} ${styles.desktop}`}>
                <p>
                  Com mais de 15 anos de experiência no mercado de carnes, os
                  fundadores da Casa de Carnes Rota do Boi perceberam que o
                  mercado necessitava de um lugar onde as pessoas poderiam
                  comprar suas carnes sem receio em relação à higiene e à
                  qualidade dos cortes. Ali enxergaram uma oportunidade de
                  transformar o mercado de carnes da região.
                </p>
                <p>
                  Depois de muito estudo e análise, foi inaugurada a Rota do
                  Boi, uma casa de carnes que tem como missão atender o público
                  de forma transparente e segura desde a seleção da carne ao
                  atendimento personalizado.
                </p>
                <p>
                  Nosso foco são cortes premium para churrasco, para que nossos
                  clientes possam fazer com maestria uma das refeições mais
                  amadas pelos brasileiros: o churrasco. Trabalhamos também com
                  linguiças artesanais recheadas, cortes suínos, aves e assados
                  aos finais de semana. Também temos disponíveis uma gama de
                  acessórios para churrasco, como tábuas, facas e
                  churrasqueiras. Buscamos oferecer produtos de extrema
                  qualidade para atender suas expectativas.{" "}
                </p>
                <p>
                  Hoje contamos com uma equipe treinada e dedicada à limpeza do
                  local, inspeção da qualidade, procedência dos cortes e muito
                  zelo pela satisfação de nossos clientes. Nossa equipe é
                  preparada para sanar todas suas dúvidas em relação ao preparo,
                  como cortar sua carne e até mesmo a quantidade necessária para
                  seu encontro.
                </p>
                <p>
                  E para quem deseja levar alegria para encontros corporativos
                  ou confraternizações, oferecemos também a opção de irmos até
                  você com nossas carnes nobres, equipamentos próprios, equipe
                  treinada e atendimento diferenciado.{" "}
                </p>
                <p>
                  Contamos ainda com o Programa Fidelidade da Rota, uma forma de
                  retribuir os clientes que sempre escolhem nossos produtos para
                  fazer parte desse momento de diversão que é o churrasco.
                  Através da nossa do nosso site você pode conferir todas as
                  informações sobre como funciona a pontuação e os prêmios
                  disponíveis para resgate.
                </p>
                <p>
                  Você pode conhecer mais sobre o nosso trabalho através do
                  instagram{" "}
                  <Link href="https://instagram.com/rotadoboi">
                    <a target="_blank">@rotadoboi</a>
                  </Link>
                  . Por lá sempre publicamos novidades, bastidores e feedbacks.
                  Entre em contato e revolucione seu churrasco, porque quando o
                  boi é de primeira, não existe carne de segunda!
                </p>
              </div>
              <div className={styles.quem__somos__img__wrapper}>
                <Slider {...quemSomosReference}>
                  {quemSomos.map((item) => (
                    <div className={styles.quem__somos__img} key="item">
                      <Image
                        src={item}
                        alt={"Equipe e local Rota do Boi"}
                        width={600}
                        height={400}
                        className="event__img"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.eventos__section} section`} id="events">
          <div className={`${styles.eventos__container} container`}>
            <div className={styles.eventos__header}>
              <div className={styles.header__data}>
                <h2>
                  Os melhores <br />
                  espetinhos da região <br />
                  estão aqui!
                </h2>
                <Link href={`https://g.page/rotadoboicarnes?share`}>
                  <a>Veja no mapa</a>
                </Link>
              </div>

              <div className={styles.header__img}>
                <Image
                  src={"/images/evento.webp"}
                  layout="fill"
                  objectFit="cover"
                  alt={"Churrasco Rota do Boi"}
                  className="event__img"
                />
                <style jsx global>{`
                  .event__img {
                    border-radius: 8px;
                  }
                `}</style>
              </div>
            </div>
            <div className={styles.eventos__topics}>
              <p className={styles.topics__text}>
                Oferecemos cortes nobres e suculentos acompanhados do chopp mais
                gelado da cidade. Estamos prontos para proporcionar uma
                experiência gastronômica inesquecível, em um ambiente
                aconchegante e descontraído.
              </p>

              <div className={styles.topics__grid}>
                <div className={styles.grid__item}>
                  <div className={styles.item__img}>
                    <Image
                      src={"/images/chef_events.svg"}
                      width={36}
                      height={36}
                      alt="Churrasqueiro profissional"
                    />
                  </div>
                  <p>Churrasqueiro profissional</p>
                </div>
                <div className={styles.grid__item}>
                  <div className={styles.item__img}>
                    <Image
                      src={"/images/fork_events.svg"}
                      width={36}
                      height={36}
                      alt="Cortes nobres"
                    />
                  </div>
                  <p>Cortes nobres</p>
                </div>
              </div>

              <div className={styles.topics__grid}>
                <div className={styles.grid__item}>
                  <div className={styles.item__img}>
                    <Image
                      src={"/images/apron_events.svg"}
                      width={36}
                      height={36}
                      alt="ícone Avental"
                    />
                  </div>
                  <p>Atendimento personalizado</p>
                </div>
                <div className={styles.grid__item}>
                  <div className={styles.item__img}>
                    <Image
                      src={"/images/barbecue_events.svg"}
                      width={36}
                      height={36}
                      alt="Ícone churrasqueira"
                    />
                  </div>
                  <p>Feito na brasa</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`${styles.depoimentos__section} section`}
          id="depositions"
        >
          <div className={`${styles.depoimentos__container} container`}>
            <div className={styles.depoimentos__header}>
              <div className={styles.header__title}>
                <h2>Depoimentos</h2>
                <div className={styles.arrow__content}>
                  <button
                    onClick={() => {
                      sliderDepoimentos.current?.slickPrev();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="17"
                      fill="none"
                      viewBox="0 0 19 17"
                    >
                      <path
                        stroke="#0D0D0DA6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.35 1 1 8.35l7.35 7.35M1 8.35h16.8H1Z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      sliderDepoimentos.current?.slickNext();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="17"
                      fill="none"
                      viewBox="0 0 19 17"
                    >
                      <path
                        stroke="#0D0D0DA6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.65 15.7 18 8.35 10.65 1M18 8.35H1.2 18Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <p>O que nossos clientes falam:</p>
            </div>

            <div className={styles.depoimentos__slider}>
              <Slider {...depoimentosReference} ref={sliderDepoimentos}>
                {depoimentos.map((item) => (
                  <div className={styles.slider__item} key={item.name}>
                    <div className={styles.slider__item__wrapper}>
                      <div className={styles.item__img}>
                        <Image
                          src={item.img}
                          width={50}
                          height={50}
                          alt={`Foto depoimento ${item.name}`}
                          className="depoimento__img"
                        />
                        <style jsx global>{`
                          .depoimento__img {
                            border-radius: 50%;
                          }
                        `}</style>
                        <p>{item.name}</p>
                      </div>
                      <p className={styles.item__text}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>

        <section
          className={`${styles.fidelidade__section} section`}
          id="fidelity"
        >
          <div className={`${styles.fidelidade__container} container`}>
            <div className={styles.fidelidade__data}>
              <span>Acumulou, ganhou!</span>
              <h2>
                Conheça o nosso
                <br />
                programa fidelidade
              </h2>

              <Link href={`https://rotadoboi.fidelimax.com.br/`}>
                <a>
                  <span>Quero conhecer</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="none"
                    viewBox="0 0 25 25"
                  >
                    <path
                      stroke="#F10505"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="m13.002 19.004 7.002-6.998-6.998-7.002m6.998 7.002-16-.005 16 .005Z"
                    />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
          <div className={styles.fidelidade__bg}></div>
        </section>

        <section className={`${styles.map__section} section`} id="location">
          <div className={`${styles.map__container} container`}>
            <div className={styles.map__data}>
              <h2>Onde estamos?</h2>

              <Link href={`https://g.page/rotadoboicarnes?share`}>
                <a target="_blank">
                  <span>Ver no mapa</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="none"
                    viewBox="0 0 25 25"
                  >
                    <path
                      stroke="#F10505"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="m13.002 19.004 7.002-6.998-6.998-7.002m6.998 7.002-16-.005 16 .005Z"
                    />
                  </svg>
                </a>
              </Link>
            </div>

            <div className={styles.map__endereco}>
              <h2>
                Av Sebastião Reginaldo Da Cunha - Jardim dos Estados, Santa Rita
                do Sapucaí - MG, 37540-000
              </h2>
            </div>
          </div>
        </section>

        <footer className={`${styles.footer__section} section`}>
          <div className={`${styles.footer__container} container`}>
            <div className={`${styles.footer__grid__item} ${styles.logo}`}>
              <Image
                src={"/images/logo_completa_preta.svg"}
                width={230.82}
                height={64}
                alt="Logo Rota do Boi"
              />
            </div>
            <div className={`${styles.footer__grid__item} ${styles.map}`}>
              <p className={styles.item__title}>Onde estamos?</p>
              <Link href={`https://g.page/rotadoboicarnes?share`}>
                <a target="_blank">
                  Av Sebastião Reginaldo Da Cunha - Jardim dos Estados, Santa
                  Rita do Sapucaí - MG, 37540-000
                </a>
              </Link>
            </div>
            <div className={`${styles.footer__grid__item} ${styles.navegue}`}>
              <p className={styles.item__title}>Navegue</p>
              <nav>
                <Link href={`/#home`}>
                  <a target="_self">Início</a>
                </Link>
                <Link href={`/#products`}>
                  <a target="_self">Produtos</a>
                </Link>
                <Link href={`/#events`}>
                  <a target="_self">Eventos</a>
                </Link>
                <Link href={`/#depositions`}>
                  <a target="_self">Depoimentos</a>
                </Link>
                <Link href={`https://rotadoboi.fidelimax.com.br/`}>
                  <a target="_blank">Fidelidade</a>
                </Link>
              </nav>
            </div>
            <div
              className={`${styles.footer__grid__item} ${styles.grid__buttons}`}
            >
              <Link href="https://api.whatsapp.com/send?phone=5535992303771">
                <a className={`${styles.button__item} ${styles.primary}`}>
                  <Image
                    width={21}
                    height={21}
                    src="/images/whatsapp_white.svg"
                    alt="Logo whatsapp"
                    priority
                  />
                  ENTRE EM CONTATO
                </a>
              </Link>

              <Link href={"https://www.instagram.com/rotadoboi/"}>
                <a
                  target="_blank"
                  className={`${styles.button__item} ${styles.secondary}`}
                >
                  <Image
                    width={21}
                    height={21}
                    src="/images/instagram.svg"
                    alt="Logo instagram"
                    priority
                  />
                  <span>INSTAGRAM</span>
                </a>
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const responseCortes = await prismic.query(
    [
      Prismic.Predicates.at("document.type", "cortes"),
      Prismic.Predicates.at("my.cortes.prod_categoria", "YxdI3xYAAI6Jil1-"),
    ],
    {
      orderings: "[document.last_publication_date desc]",
      pageSize: 20,
    }
  );

  const cortes = responseCortes.results
    .map((produto) => {
      return {
        uid: produto.uid || undefined,
        name: RichText.asText(produto.data.prod_name) || undefined,
        categoria: produto.data.prod_categoria.tags[0] || undefined,
        whatsapp: produto.data.numero_de_whatsapp.uid || undefined,
        descricao: RichText.asText(produto.data.prod_descricao) || undefined,
        preco: RichText.asText(produto.data.prod_preco) || undefined,
        mensagem_whatsapp: RichText.asText(produto.data.prod_message) || "",
        img: produto.data.prod_img.url || undefined,
      };
    })
    .filter((item) => {
      let a = false;
      Object.keys(item).forEach((key) => {
        //@ts-ignore
        if (item[key] == undefined) {
          a = true;
        }
      });

      // console.log(item);

      if (a == false) return item;
    });

  const responseKits = await prismic.query(
    [
      Prismic.Predicates.at("document.type", "cortes"),
      Prismic.Predicates.at("my.cortes.prod_categoria", "YxdJhxYAACpPimCu"),
    ],
    {
      orderings: "[document.last_publication_date desc]",
      pageSize: 20,
    }
  );

  const kits = responseKits.results
    .map((produto) => {
      return {
        uid: produto.uid || undefined,
        name: RichText.asText(produto.data.prod_name) || undefined,
        categoria: produto.data.prod_categoria.tags[0] || undefined,
        whatsapp: produto.data.numero_de_whatsapp.uid || undefined,
        descricao: RichText.asText(produto.data.prod_descricao) || undefined,
        preco: RichText.asText(produto.data.prod_preco) || undefined,
        mensagem_whatsapp: RichText.asText(produto.data.prod_message) || "",
        img: produto.data.prod_img.url || undefined,
      };
    })
    .filter((item) => {
      let a = false;
      Object.keys(item).forEach((key) => {
        //@ts-ignore
        if (item[key] == undefined) {
          a = true;
        }
      });

      if (a == false) return item;
    });

  const responseAcessorios = await prismic.query(
    [
      Prismic.Predicates.at("document.type", "cortes"),
      Prismic.Predicates.at("my.cortes.prod_categoria", "YxdJ_xYAACpPimL3"),
    ],
    {
      orderings: "[document.last_publication_date desc]",
      pageSize: 20,
    }
  );

  const acessorios = responseAcessorios.results
    .map((produto) => {
      return {
        uid: produto.uid || undefined,
        name: RichText.asText(produto.data.prod_name) || undefined,
        categoria: produto.data.prod_categoria.tags[0] || undefined,
        whatsapp: produto.data.numero_de_whatsapp.uid || undefined,
        descricao: RichText.asText(produto.data.prod_descricao) || undefined,
        preco: RichText.asText(produto.data.prod_preco) || undefined,
        mensagem_whatsapp: RichText.asText(produto.data.prod_message) || "",
        img: produto.data.prod_img.url || undefined,
      };
    })
    .filter((item) => {
      let a = false;
      Object.keys(item).forEach((key) => {
        //@ts-ignore
        if (item[key] == undefined) {
          a = true;
        }
      });

      if (a == false) return item;
    });

  const responseTemperos = await prismic.query(
    [
      Prismic.Predicates.at("document.type", "cortes"),
      Prismic.Predicates.at("my.cortes.prod_categoria", "YxdKNBYAACgAimQA"),
    ],
    {
      orderings: "[document.last_publication_date desc]",
      pageSize: 20,
    }
  );

  const temperos = responseTemperos.results
    .map((produto) => {
      return {
        uid: produto.uid || undefined,
        name: RichText.asText(produto.data.prod_name) || undefined,
        categoria: produto.data.prod_categoria.tags[0] || undefined,
        whatsapp: produto.data.numero_de_whatsapp.uid || undefined,
        descricao: RichText.asText(produto.data.prod_descricao) || undefined,
        preco: RichText.asText(produto.data.prod_preco) || undefined,
        mensagem_whatsapp: RichText.asText(produto.data.prod_message) || "",
        img: produto.data.prod_img.url || undefined,
      };
    })
    .filter((item) => {
      let a = false;
      Object.keys(item).forEach((key) => {
        //@ts-ignore
        if (item[key] == undefined) {
          a = true;
        }
      });

      if (a == false) return item;
    });

  return {
    props: {
      cortes,
      kits,
      acessorios,
      temperos,
      allCortesPage: responseCortes.total_pages,
      allKitsPage: responseKits.total_pages,
      allAcessoriosPage: responseAcessorios.total_pages,
      allTemperosPage: responseTemperos.total_pages,
    },
    revalidate: 60 * 1, // 5min.
  };
};
