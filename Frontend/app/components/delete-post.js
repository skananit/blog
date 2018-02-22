import Component from '@ember/component';

export default Component.extend({
  DS: Ember.inject.service('store'),

  modalName: Ember.computed(function () {
    return 'Delete-Post' + this.get('ID');
  }),

  actions: {
    openModal: function () {
      Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
        closable: false,
        detachable: false,
        onDeny: () => {
          return true;
        },
        onApprove: () => {

          this.get('DS').find('post', this.get('ID')).then((post) => {
            post.set('comments', []);
            post.save().then(function () {
              post.destroyRecord();
            });
          });

          // delete the related comments
          this.get('DS').query('comment', {filter: {post: this.get('ID')}}).then((comments) => {
            comments.forEach(function (comment) {
              comment.post = null;
              comment.save().then( () => {
                comment.destroyRecord().then(()=>{
                  return true;
                });
              });
            });
          });

        }
      })
        .modal('show');
    },
  }
});
