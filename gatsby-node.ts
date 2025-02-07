import { CreateSchemaCustomizationArgs } from 'gatsby';

export const createSchemaCustomization = ({
  actions,
  schema,
}: CreateSchemaCustomizationArgs) => {
  const { createTypes } = actions;
  const typeDefs = `
    type RegionsJson implements Node @dontInfer {
      jsonId: String!
      name: String!
      description: String!
    }
  `;
  createTypes([typeDefs]);
};
