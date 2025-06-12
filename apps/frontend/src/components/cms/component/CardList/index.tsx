import { type CmsComponent } from "@remkoj/optimizely-cms-react"
import { CardListDataFragmentDoc, type CardListDataFragment } from "@/gql/graphql"

/**
 * CardList
 */
export const CardListComponent: CmsComponent<CardListDataFragment> = ({ data, children }) => {
    const componentName = "CardList"
    const title = data?.Title ?? "Untitled"
    const description = data?.Description ?? ""

    return (
        <div className="w-full border-y border-y-solid border-y-slate-900 py-4 mb-4 px-4">
            

            <div className="bg-white p-4 rounded-md shadow border border-slate-300">
                <h3 className="text-xl font-semibold mb-2 text-slate-800">{title}</h3>
                <p className="text-base text-slate-600">{description}</p>
            </div>

            {children && <div className="mt-4 mx-2">{children}</div>}
        </div>
    )
}

CardListComponent.displayName = "CardList (Component/CardList)"
CardListComponent.getDataFragment = () => ['CardListData', CardListDataFragmentDoc]

export default CardListComponent
