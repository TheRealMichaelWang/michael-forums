import { GraphQLScalarType, Kind } from 'graphql';

//this is just the example grap
const DateTimeScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date Time scalar time',
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to UNIX integer for JSON
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },

  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value); // Convert UNIX integer to Date
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },

  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

export default DateTimeScalar;