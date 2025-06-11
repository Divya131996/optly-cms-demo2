import { type CmsComponent } from "@remkoj/optimizely-cms-react/rsc";
import {
  type LinkGridDataFragment,
  LinkGridDataFragmentDoc,
} from "@/gql/graphql";

export const LinkGridElement: CmsComponent<LinkGridDataFragment> = ({
  data,
}) => {
  return (
    <section className="py-8 px-4" data-component="LinkGrid">
      {data.Title && <h2 className="text-2xl font-bold mb-4">{data.Title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.Links?.map((linkItem, index) => (
          <a
            key={index}
            href={linkItem?.Url?.href || "#"}
            className="block p-4 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            target={linkItem?.Url?.target || "_self"}
          >
            <span className="text-blue-600 font-medium">
              {linkItem?.Title}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

LinkGridElement.displayName = "Link Grid (Block/LinkGrid)";
LinkGridElement.getDataFragment = () => [
  "LinkGridData",
  LinkGridDataFragmentDoc,
];

export default LinkGridElement;
