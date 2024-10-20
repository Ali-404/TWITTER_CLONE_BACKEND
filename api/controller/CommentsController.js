import comment from '../models/comment.js';
import db, { errMsg } from '../models/index.js';
import user from '../models/user.js';

export default class CommentsController {
  
  // Fetch all comments
  static async index(request, response) {
    try {
      const sequelize = (await db).sequelize;
      const comments = await comment(sequelize).findAll();

      return response.json({ comments });
    } catch (e) {
      return errMsg(response, e);
    }
  }

  // Add a new comment
  static async addComment(req, res) {
    try {
      const { postId, content } = req.body;
      const _user = req.user;
      const sequelize = (await db).sequelize;

      let newComment = await comment(sequelize).create({
        writerId: _user.id,
        postId,
        content
      });

      // Convert Sequelize instance to plain object and attach user info
      newComment = { ...newComment.get(), user: _user };

      return res.json({
        message: 'Comment added successfully',
        comment: newComment
      });
    } catch (e) {
      return errMsg(res, e);
    }
  }

  // Fetch comments of a specific post
  static async getCommentsOfPost(req, res) {
    try {
      const { post_id } = req.params;
      const sequelize = (await db).sequelize;
      const comments = await comment(sequelize).findAll({ where: { postId: post_id } });

      // Map through the comments and resolve user info
      const newCommentsTable = await Promise.all(comments.map(async (com) => {
        const commentUser = await user(sequelize).findOne({ where: { id: com.writerId } });
        if (commentUser) {
          return { ...com.get(), user: commentUser.get() }; // Convert instances to plain objects
        } else {
          return com.get();
        }
      }));

      return res.json(newCommentsTable);
    } catch (e) {
      return errMsg(res, e);
    }
  }


  static async deleteComment(request, response){
    try {

        const {id} = request.params
        const sequelize = (await db).sequelize;
        const theComment = await comment(sequelize).findOne({where: {id: id}})

        if (!theComment){
            return response.json({
                "error": "Invalid or unaccesable comment"
            }).status(409) 
            // 409 = cant edit 
        }

        theComment.destroy()
        return response.json({
            "message":`Post #${theComment.id} deleted successfully.`
        })
    }catch(e){
        return errMsg(response, e)
    }
    
}

}
