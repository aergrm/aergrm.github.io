---
layout: archive
title: "Research"
permalink: /publications/
author_profile: true
---

{% assign pubs = site.data.publications | sort: "year" | reverse %}

{% assign articles = pubs | where: "type", "article" %}
{% assign chapters = pubs | where: "type", "chapter" %}

## Journal Articles

{% for p in articles %}
* {{ p.authors }} ({{ p.year }}). "**{{ p.title }}**." *{{ p.venue }}*.
  {% if p.url %}[Link]({{ p.url }}){% endif %} {% if p.pdf %}[PDF]({{ p.pdf }}){% endif %}
{% endfor %}

## Book Chapters

{% for p in chapters %}
* {{ p.authors }} ({{ p.year }}). "**{{ p.title }}**." *{{ p.venue }}*.
  {% if p.url %}[Link]({{ p.url }}){% endif %} {% if p.pdf %}[PDF]({{ p.pdf }}){% endif %}
{% endfor %}
