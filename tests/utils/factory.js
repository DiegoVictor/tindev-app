import { factory } from 'factory-girl';
import faker from 'faker';

factory.define(
  'Developer',
  {},
  {
    _id: faker.datatype.uuid,
    name: faker.name.firstName,
    bio: faker.lorem.paragraph,
    avatar: faker.image.imageUrl,
  }
);

export default factory;
