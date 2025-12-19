---
layout: default
title: Research
nav: true
nav_order: 2
permalink: /publications/
---

<style>
  .pub-wrap { max-width: 900px; margin: 0 auto; padding: 1rem; }
  .pub-section { margin: 2rem 0 1.25rem; }
  .pub-section h2 { margin: 0 0 .75rem; }

  .pub-list { list-style: none; padding-left: 0; margin: 0; }
  .pub-item { padding: 1rem 0; border-bottom: 1px solid rgba(0,0,0,.12); }
  .pub-cite { line-height: 1.4; }
  .pub-title { font-weight: 600; }
  .pub-venue { font-style: italic; }

  .pub-links { margin-top: .5rem; display: flex; flex-wrap: wrap; gap: .5rem; }
  .pub-link {
    display: inline-block;
    padding: .25rem .6rem;
    border: 1px solid rgba(0,0,0,.25);
    border-radius: .4rem;
    text-decoration: none;
    font-size: .9rem;
  }
  .pub-link:hover { text-decoration: none; }

  details.pub-abs { margin-top: .6rem; }
  details.pub-abs > summary {
    list-style: none;
    display: inline-block;
    padding: .25rem .6rem;
    border: 1px solid rgba(0,0,0,.25);
    border-radius: .4rem;
    cursor: pointer;
    user-select: none;
    font-size: .9rem;
  }
  details.pub-abs > summary::-webkit-details-marker { display: none; }

  .pub-abs-body {
    margin-top: .6rem;
    padding: .75rem .85rem;
    border-left: 3px solid rgba(0,0,0,.25);
    background: rgba(0,0,0,.03);
    border-radius: .25rem;
  }
</style>

<div class="pub-wrap">
  <h1>{{ page.title }}</h1>

  {% assign pubs = site.data.publications | sort: "year" | reverse %}

  {% assign articles = pubs | where: "type", "article" %}
  {% assign chapters = pubs | where: "type", "chapter" %}

  <div class="pub-section">
    <h2>Journal Articles</h2>
    <ul class="pub-list">
      {% for p in articles %}
        <li class="pub-item">
          <div class="pub-cite">
            <span class="pub-authors">{{ p.authors }}</span> ({{ p.year }}).
            <span class="pub-title">{{ p.title }}</span>.
            <span class="pub-venue">{{ p.venue }}</span>.
          </div>

          <div class="pub-links">
            {% if p.url %}<a class="pub-link" href="{{ p.url }}" target="_blank" rel="noopener">Link</a>{% endif %}
            {% if p.doi %}<a class="pub-link" href="https://doi.org/{{ p.doi }}" target="_blank" rel="noopener">DOI</a>{% endif %}
            {% if p.pdf %}<a class="pub-link" href="{{ p.pdf }}" target="_blank" rel="noopener">PDF</a>{% endif %}
          </div>

          {% if p.abstract %}
            <details class="pub-abs">
              <summary>Abstract</summary>
              <div class="pub-abs-body">
                {{ p.abstract | markdownify }}
              </div>
            </details>
          {% endif %}
        </li>
      {% endfor %}
    </ul>
  </div>

  <div class="pub-section">
    <h2>Book Chapters</h2>
    <ul class="pub-list">
      {% for p in chapters %}
        <li class="pub-item">
          <div class="pub-cite">
            <span class="pub-authors">{{ p.authors }}</span> ({{ p.year }}).
            <span class="pub-title">{{ p.title }}</span>.
            <span class="pub-venue">{{ p.venue }}</span>.
          </div>

          <div class="pub-links">
            {% if p.url %}<a class="pub-link" href="{{ p.url }}" target="_blank" rel="noopener">Link</a>{% endif %}
            {% if p.doi %}<a class="pub-link" href="https://doi.org/{{ p.doi }}" target="_blank" rel="noopener">DOI</a>{% endif %}
            {% if p.pdf %}<a class="pub-link" href="{{ p.pdf }}" target="_blank" rel="noopener">PDF</a>{% endif %}
          </div>

          {% if p.abstract %}
            <details class="pub-abs">
              <summary>Abstract</summary>
              <div class="pub-abs-body">
                {{ p.abstract | markdownify }}
              </div>
            </details>
          {% endif %}
        </li>
      {% endfor %}
    </ul>
  </div>
</div>
