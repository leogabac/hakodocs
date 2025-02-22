
var jsondata=[
  
  ,
  
   {
     
     
        "title"    : "404.html",
        "category" : "",
        "tags"     : "",
        "url"      : "/404.html",
        "date"     : "",
        "content"  : "<!--- this file is needed for automatic creation of non existent pages --->\n"
     
   } ,
  
   {
     
     
        "title"    : "index.html",
        "category" : "",
        "tags"     : "",
        "url"      : "/assets/blog/",
        "date"     : "",
        "content"  : "<!--- this file is needed for automatic creation of blog page --->"
     
   } ,
  
   {
     
     
        "title"    : "Home",
        "category" : "",
        "tags"     : "",
        "url"      : "/main_page",
        "date"     : "",
        "content"  : "<h1 id=\"welcome-to-hakodocs\">Welcome to HakoDocs!</h1>\n<p>HakoDocs is a public compilation of tech-related notes that address specific problems I’ve encountered throughout my life.\nYou can expect to find <em>How to do \\(X\\)</em> guides for a variety of topics, primarily related to Linux, programming languages, servers, and more.\nI started this project as a personal collection of notes, and as I began sharing them with my colleagues, it grew into something more.\nThe same colleagues these notes once helped started contributing to them. I hope you, like them, find something useful within this <em>hako</em>.</p>\n"
     
   } ,
  
   {
     
     
        "title"    : "redirect.html",
        "category" : "",
        "tags"     : "",
        "url"      : "/",
        "date"     : "",
        "content"  : ""
     
   } 
  
];

var sjs = SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: jsondata,
    searchResultTemplate: '<li><a href="{url}" title="{desc}">{title}</a></li>',
    noResultsText: 'No results found',
    limit: 10,
    fuzzy: false,
    exclude: []
  })


