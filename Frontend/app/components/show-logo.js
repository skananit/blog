import Component from '@ember/component';
export default Component.extend({
  logoIsShowing: false,
  mychecked: false,
  prechecked: true,
  myrating: 1,
  afterCheck: Ember.computed('mychecked', function(){
    if (this.get('mychecked' ))
    return "I am checked"
    else
      return null;
  }),

  actions: {
    showLogo (){
      this.set('logoIsShowing', true);
    },
    hideLogo (){
      this.set('logoIsShowing', false);
    }
  }
});
