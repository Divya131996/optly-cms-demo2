import 'server-only';
import { CmsContentArea, type CmsComponent, CmsEditable } from "@remkoj/optimizely-cms-react/rsc";
import { MegaMenuGroupBlockDataFragmentDoc, type MegaMenuGroupBlockDataFragment } from "@/gql/graphql";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { getFragmentData } from "@/gql/fragment-masking";
import { LinkDataFragmentDoc } from "@/gql/graphql";
/**
 * Mega menu group
 * 
 */
export const MegaMenuGroupBlockComponent : CmsComponent<MegaMenuGroupBlockDataFragment> = ({ data, ctx }) => {
    const menuName = data.MenuMenuHeading ?? data._metadata?.displayName ?? "Unnamed menu entry"
    const linkData = getFragmentData(LinkDataFragmentDoc, data.MegaMenuUrl);
    const menuLink = linkData?.default ?? "#";
    return <Popover>
        <CmsEditable as="a" href={menuLink} cmsFieldName="MenuMenuHeading"
            className="px-2 xl:px-4 h-full align-bottom hover:text-azure focus:text-azure font-semibold dark:text-white dark:focus:text-verdansk dark:hover:text-verdansk"
            ctx={ctx}
        >
            {menuName}
        </CmsEditable>
    </Popover>
}
MegaMenuGroupBlockComponent.displayName = "Mega menu group (Component/MegaMenuGroupBlock)"
MegaMenuGroupBlockComponent.getDataFragment = () => ['MegaMenuGroupBlockData', MegaMenuGroupBlockDataFragmentDoc]

export default MegaMenuGroupBlockComponent
