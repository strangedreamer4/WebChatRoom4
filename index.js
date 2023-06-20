// We enclose this in window.onload.
// So we don't have ridiculous errors.
window.onload = function() {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBCBUGoKQecD5R-uWc9CLs3TNa5ll9jA4M",
    authDomain: "vip-95a43.firebaseapp.com",
    databaseURL: "https://vip-95a43-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vip-95a43",
    storageBucket: "vip-95a43.appspot.com",
    messagingSenderId: "787111306016",
    appId: "1:787111306016:web:c54ab830474afb9a06ad45",
    measurementId: "G-PZJVC849Y4"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // This is very IMPORTANT!! We're going to use "db" a lot.
  var db = firebase.database()

  // We're going to use oBjEcT OrIeNtEd PrOgRaMmInG. Lol
  class MEME_CHAT {
    // Home() is used to create the home page
    home() {
      // First clear the body before adding in
      // a title and the join form
      document.body.innerHTML = ''
      this.create_title()
      this.create_join_form()
    }

    // chat() is used to create the chat page
    chat() {
      this.create_title()
      this.create_chat()
    }

    // create_title() is used to create the title
    create_title() {
      // This is the title creator. 🎉
      var title_container = document.createElement('div')
      title_container.setAttribute('id', 'title_container')
      var title_inner_container = document.createElement('div')
      title_inner_container.setAttribute('id', 'title_inner_container')

      var title = document.createElement('h1')
      title.setAttribute('id', 'title')
      title.textContent = 'ChatWebRoom'

      title_inner_container.append(title)
      title_container.append(title_inner_container)
      document.body.append(title_container)
    }

    // create_join_form() creates the join form
    create_join_form() {
      // YOU MUST HAVE (PARENT = THIS). OR NOT. I'M NOT YOUR BOSS!😂
      var parent = this

      var join_container = document.createElement('div')
      join_container.setAttribute('id', 'join_container')
      var join_inner_container = document.createElement('div')
      join_inner_container.setAttribute('id', 'join_inner_container')

      var join_button_container = document.createElement('div')
      join_button_container.setAttribute('id', 'join_button_container')

      var join_button = document.createElement('button')
      join_button.setAttribute('id', 'join_button')
      join_button.innerHTML = 'Join <i class="fas fa-sign-in-alt"></i>'

      var join_input_container = document.createElement('div')
      join_input_container.setAttribute('id', 'join_input_container')

      var join_input = document.createElement('input')
      join_input.setAttribute('id', 'join_input')
      join_input.setAttribute('maxlength', 15)
      join_input.placeholder = 'Enter your username'

      // Every time we type into the join_input
      join_input.onkeyup = function () {
        // If the input we have is longer than 0 letters
        if (join_input.value.length > 0) {
          // Enable the join button
          join_button.removeAttribute('disabled')
          join_button.classList.add('enabled')
          // If the Enter key is pressed
          if (event.keyCode === 13) {
            // Press the join button
            join_button.click()
          }
        } else {
          // If not, disable the join button
          join_button.classList.remove('enabled')
        }
      }

      // When the join button is clicked
      join_button.onclick = function () {
        // The join_button will be disabled and can't
        // be used until it's enabled again
        join_button.disabled = true

        // The join_input will be disabled and can't
        // be used until it's enabled again
        join_input.disabled = true

        // If the username has already been taken
        if (document.getElementById('username_taken')) {
          // Remove the username_taken div
          document.getElementById('username_taken').remove()
        }

        // Create a ref to all the users who have already joined
        var ref = db.ref('users')
        // This will listen to when a user is added to the database
        ref.on('child_added', function (snapshot) {
          // If the username we entered is the same as one in the database
          if (snapshot.val().username === join_input.value) {
            // Let the user know the username has already been taken
            var username_taken = document.createElement('p')
            username_taken.setAttribute('id', 'username_taken')
            username_taken.innerHTML = 'Username already taken. 😥'
            join_inner_container.append(username_taken)
            // Enable the join button
            join_button.removeAttribute('disabled')
            join_button.classList.add('enabled')
            // Enable the join input
            join_input.disabled = false
          }
        })

        // If the join_input is disabled
        if (join_input.disabled) {
          // Add the user to the database
          ref.push({
            username: join_input.value
          })

          // Call the chat method. Also known as the chat page
          parent.chat()
        }
      }

      // Appending all the elements
      join_input_container.append(join_input)
      join_inner_container.append(join_input_container)
      join_inner_container.append(join_button_container)
      join_button_container.append(join_button)
      join_container.append(join_inner_container)
      document.body.append(join_container)
    }

    // create_chat() creates the chat
    create_chat() {
      // This is going to allow us to not type "parent = this" in front of everything
      var parent = this

      var chat_container = document.createElement('div')
      chat_container.setAttribute('id', 'chat_container')
      var chat_inner_container = document.createElement('div')
      chat_inner_container.setAttribute('id', 'chat_inner_container')

      // This is the user that has joined
      var user = firebase.auth().currentUser;

      // This is going to create the input field
      var chat_input = document.createElement('input')
      chat_input.setAttribute('id', 'chat_input')
      chat_input.setAttribute('maxlength', 200)
      chat_input.placeholder = 'Enter a message'

      // This is going to create the button next to the input field
      var chat_input_send = document.createElement('button')
      chat_input_send.setAttribute('id', 'chat_input_send')
      chat_input_send.innerHTML = 'Send <i class="fas fa-paper-plane"></i>'
      chat_input_send.classList.add('enabled')
      chat_input_send.disabled = true

      // chat_input onkeyup event listener
      chat_input.onkeyup = function (event) {
        if (chat_input.value.length > 0) {
          chat_input_send.removeAttribute('disabled');
          chat_input_send.classList.add('enabled');
          if (event.keyCode === 13) {
            chat_input_send.click();
          }
        } else {
          chat_input_send.setAttribute('disabled', 'disabled');
          chat_input_send.classList.remove('enabled');
        }
      }

      // chat_input_send onclick event listener
      chat_input_send.onclick = function () {
        // Create a reference to the chat
        var chatRef = db.ref('chat');

        // Push the new message to the chat
        chatRef.push({
          username: user.displayName,
          message: chat_input.value
        });

        // Clear the chat input field
        chat_input.value = '';
      }

      // This is going to create the chat log
      var chat_log = document.createElement('div')
      chat_log.setAttribute('id', 'chat_log')

      // This is going to listen for new messages in the chat
      var chatRef = db.ref('chat');
      chatRef.on('child_added', function (snapshot) {
        var message = snapshot.val();
        var chat_message = document.createElement('p');
        chat_message.innerHTML = '<span class="username">' + message.username + ':</span> ' + message.message;
        chat_log.append(chat_message);
      });

      // This is going to append the input field and send button to the inner container
      chat_inner_container.append(chat_input);
      chat_inner_container.append(chat_input_send);

      // This is going to append the chat log to the inner container
      chat_inner_container.append(chat_log);

      // This is going to append the inner container to the chat container
      chat_container.append(chat_inner_container);

      // This is going to append the chat container to the document body
      document.body.append(chat_container);
    }
  }

  // We initialize the app here.
  // So we can use app.home()
  var app = new MEME_CHAT();
  app.home();
};
