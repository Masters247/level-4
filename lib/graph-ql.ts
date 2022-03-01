import { GraphQLClient } from "graphql-request";

const graphcms = new GraphQLClient(`${process.env.GRAPHCMS_URL}`, {
  headers: {
    authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
});

export default graphcms;
