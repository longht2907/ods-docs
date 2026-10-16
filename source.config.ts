import { defineConfig } from 'fumadocs-mdx/config';

export default defineConfig({
  mdxOptions: {
    remarkStructureOptions: {
      stringify: {
        stringify(node, _parent, state, info) {
          if (
            (node.type !== 'mdxJsxFlowElement' && node.type !== 'mdxJsxTextElement') ||
            node.name !== 'Card'
          ) {
            return undefined;
          }

          const attributes = new Map(
            node.attributes.flatMap((attribute) =>
              attribute.type === 'mdxJsxAttribute' && typeof attribute.value === 'string'
                ? [[attribute.name, attribute.value] as const]
                : [],
            ),
          );
          const title = attributes.get('title')?.trim();
          const description = attributes.get('description')?.trim();
          const body =
            node.type === 'mdxJsxTextElement'
              ? state.containerPhrasing(node, info).trim()
              : state.containerFlow(node, info).trim();

          return [title, description, body].filter(Boolean).join(' — ');
        },
      },
    },
  },
});
