---
layout: page
permalink: /teaching/
title: Teaching
description:
nav: true
nav_order: 7
---

I teach courses in comparative politics and have supported instruction across international relations, comparative politics, global studies, and American politics at the University of Wisconsin–Milwaukee. My teaching emphasizes analytical clarity, evidence-based argument, and the connection between political science theories and contemporary policy problems.

### <span><strong style="color:darkred">Instructor of Record</strong></span>

---

<details open>
<summary><strong>Comparative Political Systems</strong> <i>(Spring 2026)</i></summary>
<br>
University of Wisconsin–Milwaukee. This course introduces students to the comparative study of political systems, institutions, regime types, and political behavior across countries.

<br><br>
<div class="portfolio-actions">
  <a class="portfolio-button" href="https://polsci335.vercel.app/" target="_blank" rel="noopener">Course Website</a>
  <a class="portfolio-button" id="polsci335-syllabus-pdf" href="#" target="_blank" rel="noopener">Syllabus (PDF)</a>
</div>

<script>
(async function () {
  const button = document.getElementById('polsci335-syllabus-pdf');
  if (!button) return;

  try {
    const response = await fetch('{{ "/assets/pdf/polsci335_chunks/part01.txt" | relative_url }}');
    if (!response.ok) throw new Error('Unable to load syllabus');

    const encoded = (await response.text()).replace(/\s+/g, '');
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    button.href = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
  } catch (error) {
    button.removeAttribute('target');
    button.addEventListener('click', function (event) {
      event.preventDefault();
      alert('The syllabus PDF is temporarily unavailable.');
    });
  }
})();
</script>
</details>

---

### Student Evaluations

Student comments from **POL SCI 335: Comparative Political Systems**, taught as Instructor of Record:

- “Engaging class activities and clear expectations, very helpful supplemental materials for studying.”
- “Ahmet is a great teacher and I really enjoyed him. He is very positive and supports his students very well.”
- “I liked the activities we did, like forming the coalitions.”
- “I liked how the course was very chill. I was not scared to ask questions or comment on something.”
- “Lots of in-class activities and discussions really helped cement the course material.”
- “Ahmet is obviously very passionate about this subject and knows a lot. He creates some really nice conversations around these hard-to-grasp concepts.”

---

### <span><strong style="color:darkblue">Teaching Assistant</strong></span>

---

Graduate Teaching Assistant, Department of Political Science, University of Wisconsin–Milwaukee, 2022–present.

- Chinese Politics and Foreign Policy
- Nationalism and Ethnic Conflict
- The Politics of International Economic Relations
- Comparative Political Systems
- Introduction to Global Studies I: People and Politics
- Latin American Politics
- Morality, Conflict and War
- History of International Political Thought
- Politics of World's Nations
- Introduction to American Government and Politics
- Introduction to Political Science

---

Teaching Assistant, Bilkent University, Turkey.

- Diplomatic History (Prof. Hakan Kırımlı)
- Russian History (Prof. Hakan Kırımlı)

---

### <span><strong style="color:darkred">Research Assistant</strong></span>

---

Research Assistant, Bilkent University, Turkey.

- Archival research on great-power decision-making in the nineteenth century for Prof. [Tudor Onea](https://ir.bilkent.edu.tr/?page_id=3090)
- Collection of archival documents concerning the Crimean dynasty for Prof. Hakan Kırımlı

---

### Invited Talks and Workshops

- **Guest lecture, “International Politics,” POL SCI 103: Introduction to Political Science**, University of Wisconsin–Milwaukee
- **Introduction to R for Data Analysis**, two-day workshop, Middle East Foundation, Turkey

---

### Courses Prepared to Teach

Introduction to International Relations; International Security; Foreign Policy; Comparative Politics; Authoritarian Politics; Technology and World Politics.

### Methodological Training

- Emerging Methodologists Workshop, Syracuse University, 2026
- ICPSR Summer Program in Quantitative Methods, University of Michigan, 2024 and 2026
- Summer Institute in Computational Social Science, 2023
- Hertie School Data Science Lab, Data Science Summer School, 2021
- IPSA–ABU Social Science Research Methods Summer School, 2021
