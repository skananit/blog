/**
 * Created by Abdelkader on 2017-02-17.
 */
var express = require('express');
var router = express.Router();
var Comments = require('../models/comments');

router.route('/')
    .post(function (request, response) {
        var comment = new Comments.Model(request.body.comment);
        comment.save(function (error) {
            if (error) response.send(error);
            response.json({comment: comment});
        });
    })
    .get(function (request, response) {
        var Post = request.query.filter;
        if (!Post) {
            Comments.Model.find(function (error, comments) {
                if (error) response.send(error);
                response.json({comment: comments});
            });
        } else {
            Comments.Model.find({"post": Post.post}, function (error, comments) {
                if (error) response.send(error);
                response.json({comment: comments});
            });
        }
    });

router.route('/:comment_id')
    .get(function (request, response) {
        Comments.Model.findById(request.params.comment_id, function (error, comment) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({comment: comment});
            }
        });
    })
    .put(function (request, response) {
        Comments.Model.findById(request.params.comment_id, function (error, comment) {
            if (error) {
                response.send(error);
            }
            else {
                // update the comment info
                comment.statement = request.body.comment.statement;
                // save comment
                comment.save(function (error) {
                    if (error) {
                        response.send(error);
                    } else {
                        response.status(201).json({comment: comment});
                    }
                });
            }

        });
    })
    .delete(function (request, response) {
        Comments.Model.findByIdAndRemove(request.params.comment_id,
            function (error, deleted) {
                if (!error) {
                    response.json({comment: deleted});
                }
            }
        );
    });

module.exports = router;

