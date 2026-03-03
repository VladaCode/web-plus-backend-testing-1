import { PostsService, Post } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;
  
  // Тестовые данные (без id и date, их добавит сервис)
  const testPostData = {
    text: 'Test post content'
  };

  beforeEach(() => {
    service = new PostsService();
  });

  it('should create a new post', () => {
    // Act
    const createdPost = service.create(testPostData);

    // Assert
    expect(createdPost).toBeDefined();
    expect(createdPost.id).toBeDefined();
    expect(createdPost.date).toBeDefined();
    expect(createdPost.text).toBe(testPostData.text);
  });

  it('should find a post by id', () => {
    // Arrange - сначала создаем пост
    const createdPost = service.create(testPostData);

    // Act
    const found = service.find(createdPost.id);

    // Assert
    expect(found).toEqual(createdPost);
  });

  it('should return undefined if post not found', () => {
    // Act
    const found = service.find('non-existent-id');

    // Assert
    expect(found).toBeUndefined();
  });

  it('should increment id for each new post', () => {
    // Act
    const firstPost = service.create(testPostData);
    const secondPost = service.create(testPostData);

    // Assert
    expect(secondPost.id).toBe((parseInt(firstPost.id) + 1).toString());
  });
});