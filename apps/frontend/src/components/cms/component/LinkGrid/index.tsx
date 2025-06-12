import { type CmsComponent } from "@remkoj/optimizely-cms-react"
import { LinkGridDataFragmentDoc, type LinkGridDataFragment } from "@/gql/graphql"

/**
 * LinkGrid
 */
export const LinkGridComponent: CmsComponent<LinkGridDataFragment> = ({ data, children }) => {
    const componentName = "LinkGrid"
    const items = data?.items ?? [] // Adjust if your GraphQL structure differs

    return (
        <section className="w-full border-y border-y-solid border-y-slate-900 py-6 mb-6 px-4">
            <h2 className="font-bold italic text-lg mb-4">{componentName}</h2>

            {items.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {items.map((item, idx) => (
                        <li key={idx} className="bg-slate-100 p-4 rounded-md shadow-sm border border-slate-300">
                            {item.url?.default ? (
                                <a
                                    href={item.url.default}
                                    className="text-blue-600 hover:underline font-medium"
                                    target={item.url.target ?? "_self"}
                                    rel={item.url.target === "_blank" ? "noopener noreferrer" : undefined}
                                >
                                    {item.title ?? item.url.default}
                                </a>
                            ) : (
                                <span>{item.title ?? "Untitled Link"}</span>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-600">No links available.</p>
            )}

            {children && <div className="mt-6 mx-2">{children}</div>}
        </section>
    )
}

LinkGridComponent.displayName = "LinkGrid (Component/LinkGrid)"
LinkGridComponent.getDataFragment = () => ['LinkGridData', LinkGridDataFragmentDoc]

export default LinkGridComponent
