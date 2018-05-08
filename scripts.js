//Dzięki tej funkcjo kod zacznie się wykonywać po załadowaniu całego drzewa DOM
$(function() {
	//Funkcja generuje niepowtarzalne ID, dzięki temu każda kolumna i karta będzie unikatowa
	function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
	};
	//Tworzę klasę (szablon) dla kolumny
	function Column(name) {
    	var self = this; 

    	this.id = randomString();
    	this.name = name;
    	this.$element = createColumn();
    	//Funkcja odpowiedzialna za stworzenie kolumny
    	function createColumn() {
    		//Tworzę elementy kolumny (nagłowek, lista, buttony)
    	var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete').text('x');
			var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
			//Po kliknięciu na button 'x' kolumna zostanie usunięta
			$columnDelete.click(function() {
        		self.removeColumn();
			});
			//Po kliknięciu na button 'Add a card' pojawi się okno, w którym należy podać nazwę karty
			$columnAddCard.click(function() {
        		self.addCard(new Card(prompt("Enter the name of the card")));
			});
			//Dodaję elementy do diva w odpowiedniej kolejności (tytuł, usuń, dodaj, lista)
    		$column.append($columnTitle)
        			.append($columnDelete)
        			.append($columnAddCard)
        			.append($columnCardList);
			return $column;
    	}
  	}
  	//Dodaję do prototypu dwie metody - dodanie karty i usunięcie kolumny
  	Column.prototype = {
    	addCard: function(card) {
      		this.$element.children('ul').append(card.$element);
    	},
    	removeColumn: function() {
      		this.$element.remove();
    	}
	}
	//Tworzę klasę (szablon) dla karty
	function Card(description) {
		var self = this;

    	this.id = randomString();
    	this.description = description;
    	this.$element = createCard();
    	//Funkcja odpowiedzialna za stworzenie karty
    	function createCard() {
    		//Tworzę elementy karty (karta, opis, button do usuwania karty)
    		var $card = $('<li>').addClass('card');
    		var $cardDescription = $('<p>').addClass('card-description').text(self.description);
    		var $cardDelete = $('<button>').addClass('btn-delete left').text('x');
    		//Po kliknięciu na button karta zostaje usunięta
    		$cardDelete.click(function(){
        		self.removeCard();
			});
    		//Układam elementy karty i teraz są dodane do HTML
			$card.append($cardDelete)
				.append($cardDescription);
			return $card;
    	}
	}
	//Dodaję do prototypu jedną metodę - usuwanie karty
	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	}
	var board = {
    	name: 'Kanban Board',
    	addColumn: function(column) {
      		this.$element.append(column.$element);
      		initSortable();
    	},
    	$element: $('#board .column-container')
	};
	//Funkcja, która pozwala na przenoszenie elementów - drag and drop
	function initSortable() {
   		$('.column-card-list').sortable({
     		connectWith: '.column-card-list',
     		placeholder: 'card-placeholder'
   		}).disableSelection();
 	}
 	//Dodawanie kolumny do tablicy z podaniem nazwy kolumny
 	$('.create-column')
  	.click(function(){
		var name = prompt('Enter a column name');
		var column = new Column(name);
    		board.addColumn(column);
  	});

	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	var card1 = new Card('New task');
	todoColumn.addCard(card1);
})