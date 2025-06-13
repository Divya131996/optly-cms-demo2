import { type CmsComponent, ContentArea } from "@remkoj/optimizely-cms-react"
import { CardsDataFragmentDoc, type CardsDataFragment } from "@/gql/graphql"

/**
 * Cards
 */
export const CardsComponent: CmsComponent<CardsDataFragment> = ({ data }) => {
    const title = data?.Title ?? "Untitled"
    const cardListItems = data?.CardListItem ?? []

    return (
        <div className="w-full py-6 mb-6 px-4 bg-slate-50 border border-slate-200 rounded-md shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">{title}</h2>

            {/* Render CardListItem blocks inside this grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <ContentArea value={cardListItems} />
            </div>
        </div>
    )
}

CardsComponent.displayName = "Cards (Component/Cards)"
CardsComponent.getDataFragment = () => ['CardsData', CardsDataFragmentDoc]

export default CardsComponent
