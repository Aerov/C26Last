/* 
Robert Vets
Feb28, 2015
Code Fellows C26, Final Assignment
this is JavaScript for the Data Visualization Exercise */

var deck;

$('#kittens')
.mouseenter(function(){
  $(this).find('span').text('kittens, OK probably not')
})
.mouseleave(function(){
  $(this).find('span').text('kittens');
});
      
$('#start').on('click', function(){
  deck = new Deck(); 
  $('#start')
  .attr({id:'other'})
  .addClass('newst')
  .off('click');
  $('div#introstep').remove();
  $('div#shufflestep').css('visibility','visible');
});

$('#shffl').on('click', function(){
  console.log('ive been clicked dang it');
  shuffleMove($('.card').length);
  $('div#shufflestep').remove();
  $('div#game1').css('visibility','visible');
});

$('#deal').on('click', function(){
  /*console.log('dealin with the shizzle');*/
  dealCards($('.card').length);
  $('div#game1').remove();
  $('div#play').css('visibility','visible');
  $('#lplayer').replaceWith("<th id='lplayer'>Grammie</th>");
  $('#rplayer').replaceWith("<th id='rplayer'>You</th>");
});

$('#playCard').on('click', function(){
  /*console.log('take that');*/
  playHand();
});

function Card(r, s) {
  this.rank = r; 
  this.suit = s;
  this.toHTML = function() {
    return "<li class='card " + this.suit + " '>" + this.rank +  "</li>";
  } 
}

function Deck() {
  var thisDeck = this;
  this.suits = ['H', 'C', 'D', 'S'];
  this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  $.each(thisDeck.suits, function() {
    var suit = this;
    $.each(thisDeck.ranks, function() {
      var rank = this;
      var card = new Card(rank, suit);
      $('#deck').append(card.toHTML());
    });
  });
  /*console.log('newdeck');*/
}

var shuffleMove = function(m) {
  var rand, $rand;
  rand = Math.floor(Math.random() * m--);
  /*console.log($('li.:eq('+ rand +')'));*/
  $rand = $('li.card:eq('+ rand +')')
  .remove()
  .prependTo($('ul.handR'));
  /*console.log(rand)*/
  if(m) {
    setTimeout(shuffleMove, 1, m);
  }
}

var dealCards = function(){
  var $dealto, m;
  m = ($('.card').length) - 1;
  /* console.log('ive been called ' + m); */
  for (var i = m ; i >= 0; i -= 2){
    /* console.log(i); */
    $dealto = $('.handR li:eq('+ i +')')
    .remove()
    .prependTo($('ul.handL'));
    /* console.log($('li #deck:eq('+ i +')')); */
  };
}

var playHand = function(){
  /* console.log('cmon granny play'); */
  var $lhCsuit, $rhCsuit;
  $lhCsuit = $('ul.handL li:eq(0)').text();
  $rhCsuit = $('ul.handR li:eq(0)').text();
  console.log($lhCsuit,$rhCsuit);
  throwCard();
  checkHand($lhCsuit, $rhCsuit);
}

var throwCard = function(){
  var $rhCard, $lhCard;
  $lhCard = $('ul.handL li:eq(0)')
  .remove()
  .addClass('inplay')
  .prependTo($('#table'));
  $rhCard = $('ul.handR li:eq(0)')
  .remove()
  .addClass('inplay')
  .prependTo($('#table'));
  console.log('take that!');
}

var values = [
{ rank: 'A', value: 14 },
{ rank: 'K', value: 13 },
{ rank: 'Q', value: 12 },
{ rank: 'J', value: 11 },
{ rank: '10', value: 10 },
{ rank: '9', value: 9 },
{ rank: '8', value: 8 },
{ rank: '7', value: 7 },
{ rank: '6', value: 6 },
{ rank: '5', value: 5 },
{ rank: '4', value: 4 },
{ rank: '3', value: 3 },
{ rank: '2', value: 2 },
{ rank: '1', value: 1 },
]

var checkHand = function(lhCard,rhCard){
  console.log(lhCard, rhCard);
  var lhVal, rhVal;
  var m = values.length;  
  for (var i = 0; i<m; i++){
    var check = values[i].rank;
    if(lhCard == values[i].rank){
      lhVal = values[i].value;
      console.log(lhVal);
    }
    if(rhCard == values[i].rank){
      rhVal = values[i].value;
      console.log(rhVal);
    }
  };
  if (lhVal - rhVal > 0){
    console.log('granny took it');
    $('#takeBtnR')
    .replaceWith("<button id='takeBtn' class='btnBasics' align>Take Cards </button>");
    takeCardsL();
    setTimeout(function(){whoWon(1)}, 500);
  }
  if (lhVal - rhVal < 0){
    console.log('you took it');
    $('#takeBtn')
    .replaceWith("<button id='takeBtnR' class='btnBasics' align>Take Cards </button>");
    takeCardsR();
    setTimeout(function(){whoWon(2)}, 500); 
  }
  if (lhVal - rhVal == 0){
    console.log('WAR');
    WAR();
    setTimeout(function(){whoWon(3)}, 500);
  }
}

var takeCardsL = function(){
  $('#takeBtn').on('click', function(){
    $('#table .inplay')
    .remove()
    .appendTo($('#deck'));
    whoWon(4);
  });
}

var takeCardsR = function(){
  $('#takeBtnR').on('click', function(){
    $('#table .inplay')
    .remove()
    .appendTo($('#deckR'));
    whoWon(4);
  });
}

var WAR = function (){
    throwCard();
    throwCard();
    throwCard();
    playHand();
}

var whoWon = function(n){
  switch(n){
    case 1:
      $('#message').replaceWith("<p id='message'>GRANNY</p>")
      break;
    case 2:
      $('#message').replaceWith("<p id='message'>you got her</p>")
      break;
    case 3:
      $('#message').replaceWith("<p id='message'>WAR!!</p>")
       break;
    case 4: 
      $('#message').replaceWith("<p id='message'>next</p>")
      break;
    default:
      $('#message').replaceWith("<p id='message'>oops</p>")
      break;
  };
}

