const BlogPost = require('./blogpost')
const User = require('./user');
const Comment = require('./comment')

User.hasMany(BlogPost, { foreignKey: 'user_id' });
User.hasMany(Comment, { foreignKey: 'user_id' });
BlogPost.hasMany(Comment, { foreignKey: 'blog_post_id' });
BlogPost.belongsTo(User, {foreignKey: 'user_id'});
module.exports = { User, BlogPost, Comment };
