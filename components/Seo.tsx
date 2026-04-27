import Head from "next/head";

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export default function Seo({ title, description, keywords, image, url }: SeoProps) {
  const keywordString = keywords && keywords.length ? keywords.join(", ") : undefined;

  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywordString && <meta name="keywords" content={keywordString} />}

      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}

      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
    </Head>
  );
}
