import { type OptimizelyNextPage as CmsComponent } from "@remkoj/optimizely-cms-nextjs"
import { DetailPageDataFragmentDoc, type DetailPageDataFragment } from "@/gql/graphql"
import { getSdk } from "@/gql"
import Image from "next/image"
import Link from "next/link"

/**
 * DetailPage
 */
export const DetailPagePage: CmsComponent<DetailPageDataFragment> = ({ data, children }) => {
    const componentName = "DetailPage"
    const heroBlock = data?.Header?.[0]
    const richText = data?.RichText?.text?.html
    const articleList = data?.ArticleList

    return (
        <div className="mx-auto px-2 container">
            <div className="font-bold italic text-lg mb-4">{componentName}</div>

            {heroBlock && (
                <section className={`bg-${heroBlock.heroColor ?? "gray"}-100 p-6 mb-6 rounded`}>
                    {heroBlock.heroImage?.url?.default && (
                        <div className="mb-4">
                            <Image
                                src={heroBlock.heroImage.url.default}
                                alt="Hero Image"
                                width={1200}
                                height={400}
                                className="rounded object-cover w-full h-auto"
                            />
                        </div>
                    )}
                    <div dangerouslySetInnerHTML={{ __html: heroBlock.heroDescription?.html ?? "" }} />

                    {heroBlock.heroButton?.url?.default && (
                        <div className="mt-4">
                            <Link
                                href={heroBlock.heroButton.url.default}
                                className="inline-block bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
                            >
                                {heroBlock.heroButton.children ?? "Learn More"}
                            </Link>
                        </div>
                    )}
                </section>
            )}

            {richText && (
                <section className="mb-6 prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: richText }} />
                </section>
            )}

            {articleList?.topics?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Topics</h2>
                    <ul className="list-disc list-inside space-y-1">
                        {articleList.topics.map((topic, index) => (
                            <li key={index}>{topic}</li>
                        ))}
                    </ul>
                </section>
            )}

            {children && (
                <div className="flex flex-col mt-4 mx-4">
                    {children}
                </div>
            )}
        </div>
    )
}

DetailPagePage.displayName = "DetailPage (Page/DetailPage)"
DetailPagePage.getDataFragment = () => ["DetailPageData", DetailPageDataFragmentDoc]
DetailPagePage.getMetaData = async (contentLink, locale, client) => {
    const sdk = getSdk(client)
    // Add your metadata logic here
    return {}
}

export default DetailPagePage
