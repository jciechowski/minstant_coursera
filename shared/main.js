Meteor.methods({
    addChat: function(args) {
        var chat = Chats.findOne({
            _id: args.chatId
        });
        if (chat) { // ok - we have a chat to use
            var msgs = chat.messages; // pull the messages property
            if (!msgs) { // no messages yet, create a new array
                msgs = [];
            }
            // is a good idea to insert data straight from the form
            // (i.e. the user) into the database?? certainly not. 
            // push adds the message to the end of the array
            var userId = Meteor.userId();
            msgs.push({
                text: args.message,
                user: userId
            });
            // reset the form
            // put the messages array onto the chat object
            chat.messages = msgs;
            // update the chat object in the database.
            Chats.update(chat._id, chat);
        }
    },
    addNewChat: function(ids) {
        Chats.insert({
            user1Id: ids.user1Id,
            user2Id: ids.user2Id
        });
    }
})
