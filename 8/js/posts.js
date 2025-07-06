import { minGeneralNumber, maxGeneralNumber, minLikesNumber, maxLikesNumber, descriptions } from './data.js';
import { getRandomInteger, getRandomElement, createNumberGenerator } from './utils.js';
import { generateCommentsArray } from './comments.js';

const id = createNumberGenerator(minGeneralNumber, maxGeneralNumber);
const idPhoto = createNumberGenerator(minGeneralNumber, maxGeneralNumber);

export function createPost() {
  const description = getRandomElement(descriptions);
  const like = getRandomInteger(minLikesNumber, maxLikesNumber);

  return {
    id: id(),
    url: `photos/${idPhoto()}.jpg`,
    description: description,
    likes: like,
    comments: generateCommentsArray()
  };
}

export function generatePostsArray(count) {
  const posts = [];
  for (let i = 0; i < count; i++) {
    posts.push(createPost());
  }
  return posts;
}
