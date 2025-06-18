import 'server-only';
import { CmsContentArea, type CmsComponent, CmsEditable } from "@remkoj/optimizely-cms-react/rsc";
import { MegaMenuGroupBlockDataFragmentDoc, type MegaMenuGroupBlockDataFragment } from "@/gql/graphql";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

/**
 * Mega menu group
 * 
 */
export const MegaMenuGroupBlockComponent : CmsComponent<MegaMenuGroupBlockDataFragment> = ({ data, ctx }) => {
    const menuName = data.MenuMenuHeading ?? data._metadata?.displayName ?? "Unnamed menu entry"
    return <Popover>
        <CmsEditable as={PopoverButton} cmsFieldName="MenuMenuHeading" data-menu-label={menuName} className="px-2 xl:px-4 h-full align-bottom hover:text-azure focus:text-azure font-semibold dark:text-white dark:focus:text-verdansk dark:hover:text-verdansk" ctx={ctx}>
            { menuName }
        </CmsEditable>
        <PopoverPanel anchor="bottom start" className="[--anchor-gap:1rem] z-[5000] w-full shadow-[0_14px_4px_6px_rgba(0,0,0,0.1)] bg-ghost-white dark:bg-vulcan-85 dark:text-white !left-0 !max-w-none" data-menu-item={menuName}>
        
        </PopoverPanel>
    </Popover>
}
MegaMenuGroupBlockComponent.displayName = "Mega menu group (Component/MegaMenuGroupBlock)"
MegaMenuGroupBlockComponent.getDataFragment = () => ['MegaMenuGroupBlockData', MegaMenuGroupBlockDataFragmentDoc]

export default MegaMenuGroupBlockComponent
