import "server-only"
import { type Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { type DetailPageDataFragment, DetailPageDataFragmentDoc, type Locales } from "@/gql/graphql"
import { getSdk } from "@/gql"

import { type OptimizelyNextPage } from "@remkoj/optimizely-cms-nextjs"
import { localeToGraphLocale } from "@remkoj/optimizely-graph-client"

import { getLinkData, linkDataToUrl } from "@/lib/urls"
import { toValidOpenGraphType } from "@/lib/opengraph"

export const DetailPagePage: OptimizelyNextPage<DetailPageDataFragment> = ({ data, ctx }) => {
  const hero = data?.Header?.[0]
  const richText = data?.RichText
  const articleList = data?.ArticleList

  return (
    <div className="detail-page container mx-auto px-4 py-6">
      {/* Hero Block */}
      {hero && (
        <section className={`p-6 mb-8 rounded bg-${hero.heroColor ?? "gray"}-100`}>
          {hero.heroImage?.url?.default && (
            <div className="mb-4">
              <Image
                src={hero.heroImage.url.default}
                alt="Hero Image"
                width={1200}
                height={400}
                className="rounded object-cover w-full h-auto"
              />
            </div>
          )}
          {hero.eyebrow && <p className="text-sm uppercase text-gray-600">{hero.eyebrow}</p>}
          {hero.heroHeading && <h1 className="text-3xl font-bold mb-2">{hero.heroHeading}</h1>}
          {hero.heroSubheading && <h2 className="text-xl font-medium mb-2">{hero.heroSubheading}</h2>}
          {hero.heroDescription?.html && (
            <div className="prose max-w-none mb-4" dangerouslySetInnerHTML={{ __html: hero.heroDescription.html }} />
          )}
          {hero.heroButton?.url?.default && (
            <Link
              href={hero.heroButton.url.default}
              className="inline-block bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
            >
              {hero.heroButton.children ?? "Click here"}
            </Link>
          )}
        </section>
      )}

      {/* Rich Text */}
      {richText?.text?.html && (
        <section className="mb-8 prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: richText.text.html }} />
        </section>
      )}

      {/* Article List */}
      {articleList?.topics?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Topics</h2>
          <ul className="list-disc list-inside space-y-1">
            {articleList.topics.map((topic, i) => (
              <li key={i}>{topic}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

DetailPagePage.getDataFragment = () => ["DetailPageData", DetailPageDataFragmentDoc]

DetailPagePage.getMetaData = async (contentLink, locale, client) => {
  const sdk = getSdk(client)
  const result = await sdk.getDetailPageMetaData({
    ...contentLink,
    locale: locale ? (localeToGraphLocale(locale) as Locales) : null,
  })

  const page = (result.DetailPage?.pages || []).filter(isNotNullOrUndefined)[0]
  if (!page) return {}

  const meta: WithPropertySet<Metadata, "openGraph"> = {
    title: page.SeoSettings?.MetaTitle ?? page._metadata?.displayName,
    description: page.SeoSettings?.MetaDescription,
    metadataBase: tryToUrl(page._metadata?.url?.base),
    openGraph: {
      title: page.SeoSettings?.MetaTitle ?? page._metadata?.displayName,
      description: page.SeoSettings?.MetaDescription,
    },
    other: {
      "idio:content-type": "Detail Page",
    },
  }

  const pageImage = linkDataToUrl(getLinkData(page.SeoSettings?.SharingImage))
  if (pageImage) {
    meta.openGraph.images = [{ url: pageImage }]
  }

  const openGraphType = toValidOpenGraphType(page.SeoSettings?.GraphType)
  if (openGraphType) {
    //@ts-expect-error Next Metadata type constraint
    meta.openGraph.type = openGraphType
  }

  return meta
}

function isNotNullOrUndefined<T>(val?: T | null): val is T {
  return val !== null && val !== undefined
}

function tryToUrl(toConvert: string | null | undefined) {
  if (!toConvert) return undefined
  try {
    return new URL(toConvert)
  } catch {
    return undefined
  }
}

type WithPropertySet<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<Required<T>[P]> }

DetailPagePage.displayName = "DetailPage (Page/DetailPage)"
export default DetailPagePage
