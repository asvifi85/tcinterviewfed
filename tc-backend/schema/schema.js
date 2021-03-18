const graphql = require('graphql');
const _ = require('lodash');
const Genre = require("../models/genre");
const Book = require("../models/book");
const Author = require("../models/author");
const Subgenre = require("../models/subgenre");

const { GraphQLObjectType,GraphQLInt, GraphQLString,GraphQLID, GraphQLSchema ,GraphQLList} = graphql;


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
		author: {
			type:AuthorType,
			resolve(parent,args){
				//return _.find(authors,{id:parent.authorId});
				return Author.findById(parent.authorId);
			}
		}
    })
});
const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
			id: { type: GraphQLID },
			name: { type: GraphQLString },
			age: { type: GraphQLString },
			books: {
				type:new GraphQLList(BookType),
				resolve(parent,args){
				//return _.filter(books,{authorId:parent.id});
				return Book.find({
					authorId:parent.id
				})
				}
				
			}
		})
});

const SubgenreType = new GraphQLObjectType({
	name: 'Subgenre',
	fields: () => ({
			id: { type: GraphQLID },
			name: { type: GraphQLString },
			genreId: { type: GraphQLString },
			Genre: {
				type:GenreType,
				resolve(parent,args){
				//return _.filter(books,{authorId:parent.id});
					return Genre.findById(parent.genreId);
				}
		
			} 
		})
});
const GenreType = new GraphQLObjectType({
	name: 'Genre',
	fields: () => ({
			id: { type: GraphQLID },
			name: { type: GraphQLString },
			subgenres: {
				type:new GraphQLList(SubgenreType),
				resolve(parent,args){
				//return _.filter(books,{authorId:parent.id});
				return Subgenre.find({
					genreId:parent.id
				})
				}
				
			} 
		})
});
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
               // return _.find(books, { id: args.id });
			   return Book.findById(args.id);
            }
        },
		author:{
			type:AuthorType,
			args: {id:{type:GraphQLID}},
			resolve(parent, args){
                // code to get data from db / other source
              //  return _.find(authors, { id: args.id });
				return Author.findById(args.id);
			}
		},
		subgenre:{
			type:SubgenreType,
			args: {id:{type:GraphQLID}},
			resolve(parent, args){
                // code to get data from db / other source
              //  return _.find(authors, { id: args.id });
				return Subgenre.findById(args.id);
			}
		},
		subgenres: {
            type: new GraphQLList(SubgenreType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
				// return authors;
				return Subgenre.find({});
            }
        },
		genre:{
			type:GenreType,
			args: {id:{type:GraphQLID}},
			resolve(parent, args){
                // code to get data from db / other source
              //  return _.find(authors, { id: args.id });
				return Genre.findById(args.id);
			}
		},
		
		genres: {
            type: new GraphQLList(GenreType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
				// return authors;
				return Genre.find({});
            }
        },
		books: {
            type: new GraphQLList(BookType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
              //  return books;
				return Book.find({});
		   }
        },
		authors: {
            type: new GraphQLList(AuthorType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
				// return authors;
				return Author.find({});
            }
        },
    }
});
const Mutation = new GraphQLObjectType({
	name:'Mutation',
	fields:{
		
		addGenre:{
			type:GenreType,
			args:{
				name: {type:GraphQLString}
			},
			resolve(parent, args){
                // code to get data from db / other source
				console.log("schema args");
				console.log(args);
				let genre = new Genre({
					name:args.name,
					
				});
				console.log(genre);
				return genre.save().then(result => {
					  console.log('genre saved!')
					  return result;
					})
            }
		},
		addAuthor:{
			type:AuthorType,
			args:{
				name: {type:GraphQLString},
				age:{type:GraphQLInt}
			},
			resolve(parent, args){
                // code to get data from db / other source
				console.log("schema args");
				console.log(args);
				let author = new Author({
					name:args.name,
					age:args.age
				});
				console.log(author);
				return author.save().then(result => {
  console.log('author saved!')
  return result;
})
            }
		},
		addBook:{
			type:BookType,
			args:{
				name: {type:GraphQLString},
				genre:{type:GraphQLString},
				authorId:{type:GraphQLID}
			},
			resolve(parent, args){
                // code to get data from db / other source
				console.log("schema args");
				console.log(args);
				let book = new Book({
					name:args.name,
					genre:args.genre,
					authorId:args.authorId
				});
			
				return book.save().then(result => {
					  console.log('book saved!')
					  return result;
					})
            }
		},
		addSubgenre:{
			type:SubgenreType,
			args:{
				name: {type:GraphQLString},
				genreId:{type:GraphQLID}
			},
			resolve(parent, args){
                // code to get data from db / other source
				console.log("schema args");
				console.log(args);
				let subgenre = new Subgenre({
					name:args.name,
					genreId:args.genreId
				});
				console.log(subgenre);
				return subgenre.save().then(result => {
					  console.log('subgenre saved!')
					  return result;
					})
            }
		}
	}
})
module.exports = new GraphQLSchema({
    query: RootQuery,
	mutation:Mutation,
});