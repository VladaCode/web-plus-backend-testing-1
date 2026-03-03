import { PostsService, Post } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
    // Добавляем один пост перед каждым тестом
    postsService.create({ text: 'Some pre-existing post' });
  });

  it('should add a new post', () => {
    // Arrange
    const newPostData = { text: 'New post' };
    
    // Act
    const createdPost = postsService.create(newPostData);
    
    // Assert
    expect(createdPost).toBeDefined();
    expect(createdPost.id).toBeDefined();
    expect(createdPost.date).toBeDefined();
    expect(createdPost.text).toBe('New post');
  });

  it('should find a post', () => {
    // Arrange - создаем новый пост
    const newPost = postsService.create({ text: 'Post to find' });
    
    // Act
    const found = postsService.find(newPost.id);
    
    // Assert
    expect(found).toBeDefined();
    expect(found?.text).toBe('Post to find');
  });
});