import { factory } from 'factory-girl';
import { faker } from '@faker-js/faker';
import { IDeveloper } from '../../src/components/Match';

factory.define<IDeveloper>(
  'Developer',
  {},
  {
    _id: faker.string.uuid,
    name: faker.person.firstName,
    bio: faker.lorem.paragraph,
    avatar: faker.image.url,
  }
);

export default factory;
