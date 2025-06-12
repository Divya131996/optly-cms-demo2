import { type CmsComponent } from "@remkoj/optimizely-cms-react"
import { TestRichTextDataFragmentDoc, type TestRichTextDataFragment } from "@/gql/graphql"

/**
 * Test Rich text
 */
export const TestRichTextComponent: CmsComponent<TestRichTextDataFragment> = ({ data, children }) => {
    const componentName = "Test Rich text"
    const testText = data?.TestText ?? ""

    return (
        <div className="w-full border-y border-y-solid border-y-slate-900 py-4 mb-4 px-4">
            <div className="font-bold italic text-lg mb-2">{componentName}</div>
            <div className="prose prose-sm max-w-none mb-4" dangerouslySetInnerHTML={{ __html: testText }} />
            {children && <div className="mt-4 mx-4 flex flex-col">{children}</div>}
        </div>
    )
}

TestRichTextComponent.displayName = "Test Rich text (Component/TestRichText)"
TestRichTextComponent.getDataFragment = () => ['TestRichTextData', TestRichTextDataFragmentDoc]

export default TestRichTextComponent
