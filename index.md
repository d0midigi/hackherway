---
layout: default
title: Blog
---

## Latest Posts

<ul class="post-list">
{% for post in site.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  </li>
{% endfor %}
</ul>
