import { type OptimizelyNextPage as CmsComponent } from "@remkoj/optimizely-cms-nextjs";
import { DetailPageDataFragmentDoc, type DetailPageDataFragment , ReferenceDataFragmentDoc ,LinkDataFragmentDoc} from "@/gql/graphql";
import { getSdk } from "@/gql"
import { CmsContentArea } from "@remkoj/optimizely-cms-react/rsc";
import { CmsEditable } from "@remkoj/optimizely-cms-react";
import Image from "next/image";
import { getFragmentData } from "@gql/fragment-masking";

/**
 * DetailPage
 * 
 */
export const DetailPagePage : CmsComponent<DetailPageDataFragment> = ({ data:{Title, Description,DetailPageContentArea,Image:ImageRef }, ctx }) => {
  const hasImage = Image != null && Image != undefined;
  const ImageTest = getFragmentData(ReferenceDataFragmentDoc, ImageRef);
  const ImageLink = getFragmentData(LinkDataFragmentDoc, ImageTest?.url);
  const ImageSrc = new URL(
    ImageLink?.default ?? "/",
    ImageLink?.base ?? "https://example.com",
  ).href;
    return <div className="mx-auto px-2 container">
    <CmsEditable as="div" className="text-5xl p-4 md:p-8 xl:p-10"  ctx={ ctx } cmsFieldName={Title}>{Title}</CmsEditable>
                {hasImage && (
        <div className="order-first @[40rem]/card:order-last">
            <Image
            className="rounded-[2rem] w-full"
            src={ImageSrc}
            alt="Detail Page Image"
            width={400}
            height={300}
            />
        </div>
        )}
    <CmsEditable as="div" className="text-3xl p-3 md:p-8 xl:p-7"  ctx={ ctx } cmsFieldName={Description}>{Description}</CmsEditable>
    <CmsContentArea fieldName="TopContentArea" items={DetailPageContentArea} className="w-full" ctx={ctx} />
            
    </div>
}
DetailPagePage.displayName = "DetailPage (Page/DetailPage)"
DetailPagePage.getDataFragment = () => ['DetailPageData', DetailPageDataFragmentDoc]
DetailPagePage.getMetaData = async (contentLink, locale, client) => {
    const sdk = getSdk(client);
    return {}
}

export default DetailPagePage