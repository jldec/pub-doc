---- / ----
title: Introduction

# Introduction
**pub-server** is a lightweight tool for writing and publishing on the web.

The goal was to provide something that designers and developers can install and run easily on their own machine, to test new designs or code. The **node.js** runtime is ideal for this, and the **javascript**/**npm** ecosystem is awesome for sharing javascript modules which handle specialized tasks.

**pub-server** also includes the pieces necessary for hosting a self-service editor, so that non-developers can maintain content online.

By using **markdown** text fragments for managing content we are able to simplify the stack (no database to install) as well as provide users with all the benefits of modern tools like **github** for versioning and collaboration.

pub-server **generates** finished HTML by combining markdown fragments with clean and fully-extensible **handlebars** templates. This provides maximal **decoupling** of user content from developer code and designer presentation.

There is no need to compromise on site or page structure just because user content lives in "style-free" markdown -- with a little bit of **plugin** code, any information design and HTML/CSS layout can be supported.

Let's try to make it fun again to build nice clean front-end designs that others can enjoy!
