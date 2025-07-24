import { minCommentNumber, maxCommentNumber, minAvatarPhoto, maxAvatarPhoto, messages, names } from './data.js';
import { getRandomInteger, getRandomElement, generateUniqueRandomId, getRandomOneOrTwo } from './utils.js';

export const generateCommentsArray = () => {
  const commentsCount = getRandomInteger(minCommentNumber, maxCommentNumber);
  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    const idComment = generateUniqueRandomId();
    const messageComment = getRandomOneOrTwo(messages);
    const nameComment = getRandomElement(names);
    const avatarPhoto = getRandomInteger(minAvatarPhoto, maxAvatarPhoto);
    comments.push({
      id: idComment,
      avatar: `img/avatar-${avatarPhoto}.svg`,
      message: messageComment,
      name: nameComment
    });
  }

  return comments;
};
