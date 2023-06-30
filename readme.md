# runninghill_front_end
Make a web application that allows you to dynamically build a sentence by selecting words based on their word types.

# # Running instruction
Refer to wiki page

# # Work instructions
Write a full stack (frontend and backend) project for the following:
Make a web application that allows you to dynamically build a sentence by selecting words
based on their word types.
The types are Noun, Verb, Adjective, Adverb, Pronoun, Preposition, Conjunction, Determiner,
Exclamation.

The user must be able to choose a type; then, based on the selection, choose a word from a
populated list of words of that type. Once chosen, the user must be able to add the word to the
sentence. Once the user is happy with the completed sentence, he must be able submit the
sentence to the backend. The backend provides all the words that can be selected in the lists.

A restful GET call to retrieve the lists of words needs to be made to populate the lists on the
frontend. A restful POST call needs to be made to submit a new sentence.

The submitted sentences need to be persisted on the backend by a db of your choosing, and
the frontend must have a display of all the previously submitted sentences (you will need to
make another restful GET call for this operation to retrieve all the sentences).