Template[getTemplate('scyborgPostContent')].helpers({
  postLink: function(){
    return !!this.url ? getOutgoingUrl(this.url) : "/posts/"+this._id;
  },
  postTarget: function() {
    return !!this.url ? '_blank' : '';
  },
  domain: function(){
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  categoriesArray: function(){
    return _.map(this.categories, function (categoryId) { // note: this.categories maybe be undefined
      return Categories.findOne(categoryId);
    });
  },
  categoryLink: function(){
    return getSiteUrl()+'category/'+(this.slug);
  }
});
