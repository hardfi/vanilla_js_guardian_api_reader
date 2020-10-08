# JS Recruitment Task

## Description

We would like you to create an application that will display list of news fetched from The Guardian. You should use their API, which can be found here: [https://open-platform.theguardian.com/](https://open-platform.theguardian.com/)

Goal of this task is to check your JavaScript knowledge so please don't use any additional libraries. There are some exceptions, though. You can use `fetch` for http requests and if you are going to write some tests, you can of course use tools like `testing-library` or `jest`.

**Important**

- Please treat this tasks as something that would be shown to our customer, so focus on quality and best practices (and we don't mean only from the code point of view :) ).
- Also feel free to update or customize starter config. For example you can change `prettier` or `eslint` config or add something else that you are used to use on daily basis.
- We have provided sample html + css styling, so you can focus on writing JS code but you can change default layout if you want.

## Requirements

- Display list of news from last 30 days
- Add pagination: 10 items per page
- Add news filtering based on section selection from dropdown. You can restrict it only to: `sport`, `books`, `business`, `culture`
- Add search functionality for filtering news content based on provided phrase
- Each news list element should have following elements:
  - Title
  - Section name
  - Date of publication
  - Link to full article (open in new window)
  - "Read Later" button
- Clicking "Read later" button should add selected news to the "Read later" section on the right. Those elements should be stored somewhere and displayed even after refresh.
- Each element from "read later" can be removed by clicking "delete" button
- (Bonus) It would be beneficial if you would write some kind of tests, either unit or integration
- (Bonus) If you will find time, please briefly describe your approach to solving this task.

## Tools used

In order to keep things simple we used only really small number of libs for this boilerplate:

- [Parcel](https://en.parceljs.org) as a bundler
- [Milligram](https://milligram.io/) and [Normalize](https://necolas.github.io/normalize.css/) for some simple styling
- [Eslint](https://eslint.org/) and [Prettier](https://prettier.io/) for static code check
- [PostCSS](https://postcss.org/) with [Autoprefixr](https://autoprefixer.github.io/) for css compatibility

### Taks approach

The approach I took when solving the task was a mix of my React and Angular experience. The structure of the
application resembles React/Angular project structure with the division into different functional submodules or so
called services.

In order to
keep the `main.js` file clear, I detached various helpers to other files and folders. The division
could go even further - separate sections of the page could be separated into modules, but I did not go that far as
the app is pretty simple. On the other hand I focused on little things which should be taken care of in order for
the system to work efficiently and be user-friendly. I was not supposed to use any external libraries, so I wrote
a couple of helpers myself - date parsing, debounce, fetch and localStorage wrappers, toast and pagination
. Thanks to
them, the
majority of the most important frontend problems is solved, plus functions/classes used are pretty versatile and
could be
reused further while developing the app.
  
  
I added a couple of nice touches to the app such as spinner (showing ongoing requests, if there are any
), debounce on the user input (so requests don't bomb the API even if user hasn't finished typing), and I
moved the 'Read Later' section to the top bar. I added the number of items counter so user can see how many
items there are in the list. I did add small animations to the top menu and to the toast, so the feel of
the site is a bit smoother.
  
  
When it comes to styling I detached some styles to other partial files but what I would do if I was to work with this
project any further would be configuring SCSS preprocessor and using variables, mixins, imports etc.

I also detached some templates to the separate folder, so they are reusable and don't cramp the html file.

I decided not do any tests in this application, instead I focused on its features and UI.

I tried to follow the KISS and DRY methods as much as I could. Obviously, I could still do some refactoring in some
places - there is almost always a place for this :)
