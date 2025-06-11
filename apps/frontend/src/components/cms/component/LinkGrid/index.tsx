import { type CmsComponent } from "@remkoj/optimizely-cms-react/rsc";
import {
  type LinkGridDataFragment,
  LinkGridDataFragmentDoc,
} from "@/gql/graphql";

/**
 * Link Grid
 * Displays a set of links in a grid layout
 */
export const LinkGridElement: CmsComponent<LinkGridDataFragment> = ({
  data,
}) => {
  return (
    <section className="py-8 px-4" data-component="LinkGrid">
      {data.title && <h2 className="text-2xl font-bold mb-4">{data.title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.links?.map((link, index) => (
          <a
            key={index}
            href={link?.url?.href || "#"}
            className="block p-4 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <span className="text-blue-600 font-medium">{link?.title}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

LinkGridElement.displayName = "Link Grid (Element/LinkGrid)";
LinkGridElement.getDataFragment = () => [
  "LinkGridData",
  LinkGridDataFragmentDoc,
];

export default LinkGridElement;
