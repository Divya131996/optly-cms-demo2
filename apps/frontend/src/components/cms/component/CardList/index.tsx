import { type CmsComponent } from "@remkoj/optimizely-cms-react"
import { CardListDataFragmentDoc, type CardListDataFragment } from "@/gql/graphql"

export const CardListComponent: CmsComponent<CardListDataFragment> = ({ data, children }) => {
    const title = data?.Title ?? "Untitled"
    const description = data?.Description ?? ""

    // Access the internal image block (ImageElement)
    const imageBlock = data?.Image?.content?.[0]

    const imageUrl = imageBlock?.imageLink?.url ?? ""
    const imageAlt = imageBlock?.altText ?? "Image"

    return (
        <div className="w-full border-y border-y-solid border-y-slate-900 py-4 mb-4 px-4">
            <div className="bg-white p-4 rounded-md shadow border border-slate-300 flex flex-col sm:flex-row gap-4">
                {imageUrl && (
                    <div className="flex flex-col sm:w-40">
                        <img
                            src={imageUrl}
                            alt={imageAlt}
                            className="w-full h-auto object-cover rounded-md border border-slate-200"
                        />
                    </div>
                )}
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-800">{title}</h3>
                    <p className="text-base text-slate-600">{description}</p>
                </div>
            </div>

            {children && <div className="mt-4 mx-2">{children}</div>}
        </div>
    )
}

CardListComponent.displayName = "CardList (Component/CardList)"
CardListComponent.getDataFragment = () => ['CardListData', CardListDataFragmentDoc]

export default CardListComponent
