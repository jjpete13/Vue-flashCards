export function useTransformContent(content: { [key: string]: any[] }) {
  const contentKeys = Object.keys(content);
  let transformedContent = [];
  for (const item of contentKeys) {
    transformedContent.push(...content[item]);
  }
  return transformedContent;
}