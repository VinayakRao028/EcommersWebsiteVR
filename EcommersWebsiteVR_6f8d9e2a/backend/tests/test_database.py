# blog.py

class BlogService:
    def __init__(self):
        self.blogs = []
        self.next_id = 1

    def add_blog(self, blog):
        blog['id'] = self.next_id
        self.next_id += 1
        self.blogs.append(blog)
        return blog

    def get_blog(self, id):
        return next((blog for blog in self.blogs if blog['id'] == id), None)

    def get_all_blogs(self):
        return self.blogs

    def update_blog(self, id, title, content, author):
        blog = self.get_blog(id)
        if blog:
            blog['title'] = title or blog['title']
            blog['content'] = content or blog['content']
            blog['author'] = author or blog['author']
        return blog

    def delete_blog(self, id):
        blog = self.get_blog(id)
        if blog:
            self.blogs.remove(blog)
        return blog

# test_blog.py

import unittest
from blog import BlogService

class TestBlogService(unittest.TestCase):
    def setUp(self):
        self.blog_service = BlogService()

    def test_add_and_get_blog(self):
        blog = {
            'title': 'Test Blog',
            'content': 'This is a test blog post',
            'author': 'Test Author'
        }
        added_blog = self.blog_service.add_blog(blog)
        self.assertEqual(added_blog['id'], 1)
        self.assertEqual(added_blog['title'], 'Test Blog')

        retrieved_blog = self.blog_service.get_blog(1)
        self.assertEqual(retrieved_blog, added_blog)

    def test_get_all_blogs(self):
        blog1 = {'title': 'Blog 1', 'content': 'Content 1', 'author': 'Author 1'}
        blog2 = {'title': 'Blog 2', 'content': 'Content 2', 'author': 'Author 2'}
        self.blog_service.add_blog(blog1)
        self.blog_service.add_blog(blog2)

        all_blogs = self.blog_service.get_all_blogs()
        self.assertEqual(len(all_blogs), 2)
        self.assertEqual(all_blogs[0]['title'], 'Blog 1')
        self.assertEqual(all_blogs[1]['title'], 'Blog 2')

    def test_update_blog(self):
        blog = {'title': 'Original Title', 'content': 'Original Content', 'author': 'Original Author'}
        added_blog = self.blog_service.add_blog(blog)

        updated_blog = self.blog_service.update_blog(added_blog['id'], 'Updated Title', 'Updated Content', None)
        self.assertEqual(updated_blog['title'], 'Updated Title')
        self.assertEqual(updated_blog['content'], 'Updated Content')
        self.assertEqual(updated_blog['author'], 'Original Author')

    def test_delete_blog(self):
        blog = {'title': 'Blog to Delete', 'content': 'Content', 'author': 'Author'}
        added_blog = self.blog_service.add_blog(blog)

        deleted_blog = self.blog_service.delete_blog(added_blog['id'])
        self.assertEqual(deleted_blog, added_blog)

        self.assertIsNone(self.blog_service.get_blog(added_blog['id']))

    def test_nonexistent_blog(self):
        self.assertIsNone(self.blog_service.get_blog(999))
        self.assertIsNone(self.blog_service.update_blog(999, 'Title', 'Content', 'Author'))
        self.assertIsNone(self.blog_service.delete_blog(999))

if __name__ == '__main__':
    unittest.main()