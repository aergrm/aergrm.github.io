---
layout: page
permalink: /publications/
title: research
description:
nav: true
nav_order: 2
---

<h2 class="category">Peer-Reviewed Publications</h2>
<div class="publications">
{% bibliography -f papers -q @*[keywords=published]* %}
</div>

<hr>

<h2 class="category">Working Papers</h2>
<div class="publications">
{% bibliography -f papers -q @*[keywords=working]* %}
</div>
