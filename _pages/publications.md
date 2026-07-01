---
layout: page
permalink: /publications/
title: Publications
description:
nav: true
nav_order: 1
---

<div class="publications">

<h2>Journal Articles</h2>

{% bibliography --query @article --group_by none %}

<h2>Book Chapters</h2>

{% bibliography --query @incollection --group_by none %}

<h2>Encyclopedia Entries</h2>

{% bibliography --query @inreference --group_by none %}

</div>
