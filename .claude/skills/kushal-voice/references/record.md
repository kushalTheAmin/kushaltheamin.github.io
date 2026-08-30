# The record

Facts to write from. If something is not here, ask rather than infer. The
whole point of this file is that a plausible-sounding invention is worse than
a gap.

Three tiers are marked throughout:

- **(verified)** stated by Kushal or visible on a public page
- **(approved)** he read it and let it stand, but did not supply it himself
- **(unconfirmed)** best available reading; say so if it matters

## Contents

1. Basics
2. Career
3. Products
4. Awards
5. Applied AI
6. Side projects
7. Known soft spots

## 1. Basics

| | |
|---|---|
| Location | Jersey City, NJ (verified) |
| Email | kushalamin0@gmail.com (verified) |
| Portfolio | https://kushaltheamin.github.io |
| LinkedIn | https://www.linkedin.com/in/kushalamin39/ |
| GitHub | https://github.com/kushalTheAmin |
| Shipping since | September 2018 (verified) |
| Framing | Eight years, three industries: healthcare, finance, automotive |
| Self-description | "Product engineer", his own choice, kept after review |

Education (verified, from LinkedIn):

- MS Computer Science, New York Institute of Technology, 2016–18
- BE Computer Science, Sardar Vallabhbhai Patel Institute of Technology, 2012–16

## 2. Career

**Express Scripts**: Software Engineer, contract. From September 2018
(verified) to January 2020 (unconfirmed; he moved to Bank of America the same
month he left). Cigna acquired the company about three months after he
started. Front end, JavaScript, D3.

**Bank of America**: Application Developer. January 2020 to August 2021
(unconfirmed on the start, August pinned by the record). Angular, RxJS, Java,
TypeScript. First exposure to all three of a new framework, language and
industry at once; RxJS is the one he says changed how he thinks.

**automotiveMastermind**, part of **S&P Global Mobility**: from August 2021.
Software Engineer II, then Senior Software Engineer, promoted October 2025,
one of six across the whole technology organisation that cycle (verified).
C# / .NET, React, SQL, REST APIs, Google Cloud, Terraform, Apigee.

Write the employer as **S&P Global Mobility**, not S&P Global. He asked for
this specifically.

## 3. Products

**Health Connect 360**: Express Scripts / Cigna, 2018–19. A platform pulling
prescriptions, medical records, lab work and wearable data into one view of a
patient. He was on the front end and built the D3 visualisation of how the
four parties connect. Still running at Evernorth. Public page exists.

**Trader forecasting tool**: Bank of America, 2020. Used daily by the bank's
traders. Angular and Java. No public page.

**Conquest dashboard and navigation**: 2021, React. Won his first award.

**Project Horizon**: 2022. The service layer moved off Azure onto Google
Cloud: 73 APIs and the databases behind them onto Cloud SQL, zero production
defects (approved: he asked for a migration story to be constructed from
"we migrated something to Cloud SQL" and then accepted this framing, so treat
the numbers as his to confirm rather than as independently sourced).

**The Deal Sheet**: 2023–24. The page a salesperson has open all day.
Redesign, .NET microservices. First time leading pieces of work rather than
only doing them.

**Turn**: launched December 2023. Inverts the CRM: open the car rather than
the customer, and it shows which of the dealer's own customers are ready to
trade into it. **He was one of the engineers on it, working alongside product
and design**: he corrected an earlier draft that implied more. Whether he led
it is unconfirmed; he did not answer when asked.

**Fritz**: 2025–26. An LLM assistant on the deal sheet, drafting the call
script, email or text a salesperson would otherwise write from scratch. .NET
service, streaming inference against Gemini on Vertex AI, response caching,
conversation archiving, per-manufacturer compliance rules, and a step that
strips the customer's vehicle number before anything reaches the model.

Its history matters and he corrected me on it: it began as **an idea he
pitched at the April 2025 company hackathon, where it finished in the top
three**: it did not win, and he productionised it over the rest of that
year. It went live to every customer in **January 2026, in over a hundred
languages**. Most of the work was 2025; do not compress that into "the last
two years".

**Command Center**: live to every dealership March 2026. A home screen
answering "what should I do today". He was on it from the early prototypes and
built the multi-agent LLM pipeline that writes the daily suggestions and
scores them before they appear.

**FeeSync**: S&P Global Mobility, opened to the whole industry May 2026.
Dealer fees consolidated from a dozen systems into one. He was part of the
database design, built the external API partners pull from, and shipped the
app dealers register through.

**React 19 migration**: 2026. He put together the plan and the tooling for
moving 2,455 files. Around eleven thousand lines of AST codemods, deliberately
not a model, because the problem has exactly one right answer.

## 4. Awards

Seven from the CTO since 2021 (verified count):

| Year | Award | For |
|---|---|---|
| Q4 2021 | Engineering Excellence | Conquest dashboard and navigation, React |
| Q1 2022 | Delivery Excellence | Project Horizon |
| Q2 2022 | Technology Excellence | |
| 2024 | Technology Excellence | |
| Q1 2025 | Delivery Excellence | The first there for Gen AI |
| 2026 | Innovation Excellence | Fritz open chat |
| 2026 | Delivery Excellence | Command Center |

Also **first place at the 2026 company hackathon, out of a field of more than
a hundred engineers, leading the team**. He corrected an earlier draft that
framed this as beating twelve teams: the denominator is engineers, not teams.

Separately, recognition at Express Scripts for getting a large piece of the
platform over the line in a short window, weekends included.

## 5. Applied AI

Five areas, in his framing after he rejected a vaguer version:

1. **Production LLM applications**: Fritz, live to every customer.
2. **Evaluation, and knowing when output is good enough**: generated messages
   scored out of ten by a separate model with its own adversarial prompt,
   against a typed contract. Under seven does not ship. QA write their own
   criteria through a hook, so the bar moves without a code change.
3. **Agents and tool use**: three agents chained for the daily suggestions
   (situation, writing, scoring); a text-to-SQL agent with five declared tools
   in auto mode where what gets validated is the query the model wrote, not the
   sentence the person typed. On his own time, a multi-agent research system
   arranged so the scorer cannot flatter the writer.
4. **Automating the repetitive parts**: Claude Code skills, spec-driven
   development, AST codemods.
5. **Learning it in public**: most of it built badly somewhere public first.

He wants AI emphasised **where it is genuinely involved** and nowhere else.
Both halves of that matter.

## 6. Side projects

Retrieval from scratch over Gujarati books printed before Unicode existed. A
job search automated onto Cloud Functions. Transcription and summarising with
Whisper and Gemini, with tests. Multimodal agents with LangGraph, MongoDB and
Gemini. A TypeScript rebuild of things he had used but not understood. A
running log in Markdown. Around twenty more repositories going back to 2016.

He wanted these given real names and working links rather than descriptions.

## 7. Known soft spots

Things to handle carefully or ask about:

- **Turn**: leadership unconfirmed. Current copy says "one of the engineers".
- **Project Horizon numbers**: approved, not independently sourced.
- **Express Scripts and Bank of America date boundaries**: only September
  2018 and August 2021 are pinned.
- **Health Connect 360 lessons**: the portfolio deliberately carries two
  where other projects carry three, because two more were inferred from the
  domain rather than from his record and were cut.
