/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from tweets.json
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  $(function () {

    $('.new-tweet form').on('submit', function(e) {
      e.preventDefault()
      var data = $('.new-tweet form').serialize()
      console.log(data);

      $.post('/tweets', data).done(function (response) {
      })
    })

    function renderTweets(tweets) {
     
      tweets.forEach((oneTweet) => {
        let $newTweet = createTweetElement(oneTweet);
        $('.tweets-container').append($newTweet);
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
      let $tweetText = $('<p></p>').text(tweet.content.text)
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
  

  