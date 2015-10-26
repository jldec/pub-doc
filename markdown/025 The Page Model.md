# The Page Model

As mentioned in [](/how-it-works), markdown fragments in source files are parsed into javascript page and fragment objects when the generator is loaded.

The representation in memory is very simple.

`generator.pages` is a flat array of all `page` objects in source order.

Each `page` object has:

    _txt:       the unparsed page body text (usually markdown)
    _hdr:       the unparsed page header
    _fragments: a flat array of page fragments for rendering in order
    _href:      the url path for the page
    _file:      a reference to a source file object for saving edits
    _parent:    the parent page in the page url hierarchy
    _children:  an array of child pages in the page url hierarchy
    _next:      the next sibling page in the url hierarchy
    _prev:      the previous sibling page in the url hierarchy
    #*:         #named fragments for rendering fragments by name
    *:          named values parsed from the page header

This basic structure, which is derived from a very simple text file format, is sufficient to represent complex pages with lots of fragments, as well as complex hierarchical sites with lots of pages.

And, by breaking pages into fragments, standard markdown can be used inside fragments, without requiring additional markdown extensions to represent arbitrary layout elements like columns and sections.

[](/generator-plugins) for themes or custom sites may manipulate page objects, creating additional properties for alternative content hierarchies or to classify various types of pages.

Plugins can also use the page structure to generate menus, sitemaps, and other navigation.
