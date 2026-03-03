import { PostsService, Post } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;
  const testPostData = { text: 'Test post content' };

  beforeEach(() => {
    service = new PostsService();
  });

  it('should create a new post', () => {
    const createdPost = service.create(testPostData);

    expect(createdPost).toBeDefined();
    expect(createdPost.id).toBeDefined();
    expect(createdPost.date).toBeDefined();
    expect(createdPost.text).toBe(testPostData.text);
  });

  it('should find a post by id', () => {
    const firstPost = service.create(testPostData);
    const secondPost = service.create({ text: 'Another post' });

    const found = service.find(firstPost.id);

    expect(found).toEqual(firstPost);
    expect(found).not.toEqual(secondPost);
  });

  it('should return undefined if post not found', () => {
    service.create(testPostData);
    
    const found = service.find('non-existent-id');
    
    expect(found).toBeUndefined();
  });

  it('should increment id for each new post', () => {
    const firstPost = service.create(testPostData);
    const secondPost = service.create(testPostData);

    expect(parseInt(secondPost.id)).toBe(parseInt(firstPost.id) + 1);
  });

  it('should find the correct post among multiple posts', () => {
    const posts = [
      service.create({ text: 'Post 1' }),
      service.create({ text: 'Post 2' }),
      service.create({ text: 'Post 3' })
    ];

    const found = service.find(posts[1].id);

    expect(found).toEqual(posts[1]);
  });
});