var api = require('./api');
var utils = require('./utils')
var table = require('./table')

module.exports.forum =  {
    rend : ()=>
    {
      $("#contents").html(`
      <div class="tweet">
       <div class="tweet-header">
          <div class="profile-info">
              <img src="https://yaminulhoque.web.app/mypic.png" alt="Profile Picture">
              <div>
                  <h3>Yaminul Hoque</h3> 
                  <span>@yamx02</span>
              </div>
          </div>
          <button class="follow-button"># Featured </button>
      </div>
      <br>
      <p>This is a tweet! 🔥</p>
      <br>
      <div class="tweet-image">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Agriculture_of_Bangladesh_11.jpg/220px-Agriculture_of_Bangladesh_11.jpg" alt="Sample Image" class="tweet-image">
      </div>
      <br>
      <div class="tweet-interactions">
          <i class="fa fa-heart-o" > 12</i>
          <i class="fa fa-comment-o" > 12</i>
          <i class="fa fa-bookmark-o"> 12</i>
          <i class="fa fa-external-link"> 12</i>
      </div>
      </div>
      


      <div class="tweet">
       <div class="tweet-header">
          <div class="profile-info">
              <img src="https://yaminulhoque.web.app/mypic.png" alt="Profile Picture">
              <div>
                  <h3>Yaminul Hoque</h3> 
                  <span>@yamx02</span>
              </div>
          </div>
          <button class="follow-button"># Featured </button>
      </div>
      <br>
      <p>This is a tweet! 🔥</p>
      <br>
      <div class="tweet-image">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Agriculture_of_Bangladesh_11.jpg/220px-Agriculture_of_Bangladesh_11.jpg" alt="Sample Image" class="tweet-image">
      </div>
      <br>
      <div class="tweet-interactions">
          <i class="fa fa-heart-o" > 12</i>
          <i class="fa fa-comment-o" > 12</i>
          <i class="fa fa-bookmark-o"> 12</i>
          <i class="fa fa-external-link"> 12</i>
      </div>
      </div>
      
      `)          
    },
    afterRend : async function(){} ,
    repeatRend : async function () {  },

}