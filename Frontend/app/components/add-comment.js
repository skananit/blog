import Component from '@ember/component';

export default Component.extend({
  DS: Ember.inject.service('store'),

  actions: {
    saveComment () {
      let myStore = this.get('DS');
      let post = myStore.peekRecord('post', this.get('ID'));
      let newComment = myStore.createRecord('comment', {
        statement: this.get('statement'),
        timeStamp: new Date(),
        post: post
      });

      newComment.save().then(()=> {
        this.set('statement', null);
      });
    },

    deleteComment(id) {
      this.get('DS').findRecord('comment', id).then((comment) => {
        // remove its link to the post before delete
        comment.set('post', null);
        comment.save().then(function () {
          comment.destroyRecord();
        });
      })
    }
  }
});
