/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

  $(function () {


    function loadTweets() {
      $.get('/tweets').done((tweetsData) => {
        renderTweets(tweetsData);
      })
    }
    loadTweets();


    $('.new-tweet form').on('submit', (e) => {
      e.preventDefault();
      var data = $('.new-tweet form').serialize();
      var userTweet = $(e.target).find('.userTweet');
      if(!userTweet.val()) {
        $.flash('Yo, enter something if you want to tweet!');
      } else if (userTweet.val().length > 140) {
        $.flash('Keep it short, will ya?');
      } else {
        $.post('/tweets', data).done((/*response*/) => {    
          userTweet.val('');
          loadTweets();
        })
      }
    })


    function renderTweets(tweets) {

      tweets.forEach((oneTweet) => {
        let $newTweet = createTweetElement(oneTweet);
        $('.tweets-container').prepend($newTweet);
      })
    }
      

    function createTweetElement(tweet) {

      let timeConverted = moment(tweet.created_at).fromNow();

      let $tweet = $('<article>').addClass('all-tweets');
      let $header = $('<header>');
      let $avatar = $('<img>').attr('src', tweet.user.avatars.small);
      let $username = $('<h3></h3>').text(tweet.user.name);
      let $handle = $('<h5></h5>').text(tweet.user.handle);
      let $content = $('<content></content>');
      let $tweetText = $('<p></p>').text(tweet.content.text);
      let $footer = $('<footer></footer>');
      let $posttime = $('<span></span>').addClass('timestamp').text(timeConverted);
      let $tweetIcons = $('<span></span>').addClass('tweet-icons');
      let $flagIcon = $('<i></i>').addClass('fas fa-flag');
      let $retweetIcon = $('<i></i>').addClass('fas fa-retweet');
      let $likeIcon = $('<i></i>').addClass('fas fa-heart');

      $tweet.append($header);
      $header.append($avatar);
      $header.append($username);
      $header.append($handle);
      $tweet.append($content);
      $content.append($tweetText);
      $tweet.append($footer);
      $footer.append($posttime);
      $footer.append($tweetIcons);    
      $tweetIcons.append($flagIcon).append($retweetIcon).append($likeIcon);

      return $tweet;
    }

  
    
  });
  

  