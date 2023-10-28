const Blog = require('../src/models/Blog');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/app');
chai.should();

chai.use(chaiHttp);

describe('Blogs', () => {
    beforeEach((done) => {
        Blog.deleteMany({})
            .then(() => {
                done();
            })
            .catch((err) => {
                done();
            });
    });

    describe('/GET blog', () => {
        it('it should GET all the blogs', (done) => {
            chai.request(app)
                .get('/api/blogs')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.data.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST blog', () => {
        it('it should new POST a blog', (done) => {
            let blog = {
                title: 'This is the first blog',
                body: 'This is a blog post',
                image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            };
            chai.request(app)
                .post('/api/blogs')
                .send(blog)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('object');
                    res.body.status.should.be.eql('success');
                    done();
                });
        });
    });

    describe('/GET/:id blog', () => {
        it('it should GET a blog by the id', async () => {
            let blog = new Blog({
                title: 'This is the first blog',
                body: 'This is a blog post',
                image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            });
            // Lưu bài đăng blog mới và đợi hoàn thành
            try {
                const savedBlog = await blog.save();
                const blogId = savedBlog.id;

                // Thực hiện yêu cầu GET để lấy bài đăng theo ID
                const response = await chai.request(app).get('/api/blogs/' + blogId);

                // Kiểm tra kết quả
                response.should.have.status(200);
                response.body.data.should.be.a('object');
                response.body.status.should.be.eql('success');
            } catch (error) {
                throw error;
            }
        });
    });

    describe('/PUT/:id blog', () => {
        it('it should UPDATE a blog given the id', async () => {
            let blog = new Blog({
                title: 'This is the first blog',
                body: 'This is a blog post',
                image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            });

            try {
                // Lưu bài đăng blog mới và đợi hoàn thành
                const savedBlog = await blog.save();

                // Thực hiện yêu cầu PUT để cập nhật bài đăng
                const response = await chai
                    .request(app)
                    .put('/api/blogs/' + savedBlog.id)
                    .send({
                        title: 'The first blog was updated',
                        body: 'This is a blog post',
                        image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    });

                // Kiểm tra kết quả
                response.should.have.status(200);
                response.body.data.should.be.a('object');
                response.body.status.should.be.eql('success');
            } catch (error) {
                throw error;
            }
        });
    });

    describe('/DELETE/:id blog', () => {
        it('it should DELETE a blog given the id', async () => {
            let blog = new Blog({
                title: 'This is the first blog',
                body: 'This is a blog post',
                image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            });

            try {
                // Lưu bài đăng blog mới và đợi hoàn thành
                const savedBlog = await blog.save();

                // Thực hiện yêu cầu DELETE để xóa bài đăng
                const response = await chai.request(app).delete('/api/blogs/' + savedBlog.id);

                // Kiểm tra kết quả
                response.should.have.status(200);
                response.body.data.should.be.a('object');
                response.body.status.should.be.eql('success');
            } catch (error) {
                throw error;
            }
        });
    });
});
