import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkMdx from "remark-mdx"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeSanitize, {
  defaultSchema,
  type Options as RehypeSanitizeOptions,
} from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"

const sanitizeSchema: RehypeSanitizeOptions = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [
      ...(defaultSchema.attributes?.code ?? []),
      ["className", /^language-/],
    ],
    span: [
      ...(defaultSchema.attributes?.span ?? []),
      ["className", /^token/],
    ],
    pre: [
      ...(defaultSchema.attributes?.pre ?? []),
      ["className", /^language-/],
    ],
  },
}

export async function mdxToHtml(value: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeStringify)
    .process(value)

  return String(file).trim()
}
