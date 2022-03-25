# The Temelpa Take-Home Assignment

Please create a private version of this repo, complete the objectives, and once you
are finished, send a link to your repo to us.

# The Assignment

In this repo, you're given an incomplete version of
[TodoMVC](https://todomvc.com/). The assignment is to first finish
it, and then add a few extensions on top of the TodoMVC. What
exists in the repository was taken from a boilerplate implementation,
if you want to radically refactor the code go right ahead.

The following are the objectives you'll need to complete to finish the
take-home.

### Objective 1: Finish The Implementation

The repo starts you off with implmentations of the individual components without
implementing global state management. Additionally, there may or may not be
small bugs in the components' implementation. So don't assume that you don't
need to modify the components. Your goal is to finish the TodoMVC implementation,
you may look at existing implementations (of course excluding their source code)
to see what you'll need to do.

As part of the implementations you'll need to retrieve and set the state of the
todo list from the backend api. Take a look at `src/pages/api/index.ts` to see how
the API is constructed.

Once you're done, the implementation should behave exactly the same way as the other
TodoMVC implementations you've seen with the addition that state is persisted through
the backend.

### Objective 2: Search

Remove the downward chevron '⌄' with and replace it with a button that toggles
search mode. In search mode, rather the main input field is used to filter
through each todo by title (instead of creating new todos).

The specific matching algorithm is up to you, whether you use prefix matching,
substring matching, or some other way of identifying if a todo and search
term matches.

You should change the visual elements accordingly so that a user who has never
used this app can intuitively understand how to use it. For starters, the input
field shouldn't say "What Needs To Be Done" when empty in search mode.

### Objective 3: Undo/Redo

Add two buttons at the footer to allow the user to undo or redo any change the user has made. 

### Hints

- You shouldn't have to change anything about `src/pages/api/index.ts` to make this work. 
- You should be able to complete this assignment without importing any additional dependencies.

## Assumptions

We expect you to work as if this task was a normal project at work. So please write
your code in a way that fits your intuitive notion of operating within best practices.
ydditionally, you should at the very least have a different commmit for each individual objective,
Ideally, more as you go through process of completing the take-home. Also we like
to see your thought process and fixes as you make changes. So don't be afraid of
committing code that you later edit. No need to squash those commits.

Many parts of the assignment is intentionally ambiguious. If you have a question, definitely
reach out. But for many of these ambiguiuties, we want to see how you independently make
software design decisions.
