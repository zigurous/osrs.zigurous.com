import { CreateSchemaCustomizationArgs } from 'gatsby';

export const createSchemaCustomization = ({
  actions,
  schema,
}: CreateSchemaCustomizationArgs) => {
  const { createTypes } = actions;
  const typeDefs = `
    type PetsJson implements Node @dontInfer {
      jsonId: String!
      icon: String
      name: String
      source: ItemSource!
      tags: [String!]!
    }
    type RegionsJson implements Node @dontInfer {
      jsonId: String!
      name: String!
      description: String!
      pets: [String!]!
    }
  `;
  const coerceItemSource = (value: any) => {
    if (Array.isArray(value) || typeof value === 'string') {
      return value;
    } else {
      throw new Error(
        'ItemSource cannot represent value: ' + JSON.stringify(value),
      );
    }
  };
  const ItemSource = schema.buildScalarType({
    name: 'ItemSource',
    serialize: coerceItemSource,
    parseValue: coerceItemSource,
  });
  createTypes([typeDefs, ItemSource]);
};
