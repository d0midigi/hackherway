---
layout: default
title: Home
---

# Welcome to Hackherway!

[See all blog posts here](./blog/)

<ul>
{% for post in site.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a> ({{ post.date | date: "%Y-%m-%d" }})
  </li>
{% endfor %}
</ul>
