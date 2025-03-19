from flask import Flask, request, jsonify
from flask_restx import Api, Resource, fields
from werkzeug.middleware.proxy_fix import ProxyFix

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app)
api = Api(app, version='1.0', title='Blog API',
          description='A simple Blog API')

ns = api.namespace('api/blog', description='Blog operations')

blog_model = api.model('Blog', {
    'id': fields.Integer(readonly=True, description='The blog unique identifier'),
    'title': fields.String(required=True, description='The blog title'),
    'content': fields.String(required=True, description='The blog content'),
    'author': fields.String(required=True, description='The blog author')
})

class BlogService:
    def __init__(self):
        self.blogs = []
        self.counter = 1

    def get_all_blogs(self):
        return self.blogs

    def get_blog(self, blog_id):
        return next((blog for blog in self.blogs if blog['id'] == blog_id), None)

    def add_blog(self, blog):
        new_blog = blog.copy()
        new_blog['id'] = self.counter
        self.counter += 1
        self.blogs.append(new_blog)
        return new_blog

    def update_blog(self, blog_id, title, content, author):
        blog = self.get_blog(blog_id)
        if blog:
            blog['title'] = title or blog['title']
            blog['content'] = content or blog['content']
            blog['author'] = author or blog['author']
            return blog
        return None

    def delete_blog(self, blog_id):
        blog = self.get_blog(blog_id)
        if blog:
            self.blogs.remove(blog)
            return blog
        return None

blog_service = BlogService()

@ns.route('/')
class BlogList(Resource):
    @ns.doc('list_blogs')
    @ns.marshal_list_with(blog_model)
    def get(self):
        """List all blogs"""
        return blog_service.get_all_blogs()

    @ns.doc('create_blog')
    @ns.expect(blog_model)
    @ns.marshal_with(blog_model, code=201)
    def post(self):
        """Create a new blog"""
        return blog_service.add_blog(api.payload), 201

@ns.route('/<int:id>')
@ns.response(404, 'Blog not found')
@ns.param('id', 'The blog identifier')
class Blog(Resource):
    @ns.doc('get_blog')
    @ns.marshal_with(blog_model)
    def get(self, id):
        """Fetch a blog given its identifier"""
        blog = blog_service.get_blog(id)
        return blog if blog else api.abort(404, "Blog {} doesn't exist".format(id))

    @ns.doc('delete_blog')
    @ns.response(204, 'Blog deleted')
    def delete(self, id):
        """Delete a blog given its identifier"""
        blog = blog_service.delete_blog(id)
        return '', 204 if blog else api.abort(404, "Blog {} doesn't exist".format(id))

    @ns.expect(blog_model)
    @ns.marshal_with(blog_model)
    def put(self, id):
        """Update a blog given its identifier"""
        blog = blog_service.update_blog(id, 
                                        api.payload.get('title'),
                                        api.payload.get('content'),
                                        api.payload.get('author'))
        return blog if blog else api.abort(404, "Blog {} doesn't exist".format(id))

if __name__ == '__main__':
    app.run(debug=True)