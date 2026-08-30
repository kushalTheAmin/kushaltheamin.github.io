---
name: kushal-voice
description: Kushal Amin's voice and factual record for anything written about his work, including portfolio copy, LinkedIn summaries and headlines, resume bullets, cover letters, job applications, project write-ups, conference bios, README intros, or a reply explaining what he built. Use this whenever you are drafting or editing prose in which Kushal is the subject, even when he hasn't named a format, and even when the request looks like a small edit. His corrections are consistent and specific enough that a draft written without them will need rewriting. It will hedge, it will claim credit that belongs to a team, and it will lead with the newest project instead of the eight years.
---

# Writing about Kushal's work

Everything here came from Kushal rejecting a draft and saying why. Each rule
below has a rejection behind it. That matters, because these are not general
writing tips. They are the specific ways prose about his work goes wrong.

Two files sit beside this one:

- `references/record.md` holds the career, products, dates and numbers, each
  marked verified, approved or unconfirmed. Read it before writing anything
  factual, and never invent around a gap in it.
- `references/examples.md` holds the actual rejected and accepted drafts. Read it
  when a draft feels fine but you are not sure it is; the difference between
  the two columns is usually the thing you cannot see in your own writing.

## The one test that catches most of it

**Could this sentence sit unchanged on somebody else's portfolio?**

If yes, it is not saying anything. "I build software people use at work every
day" is true of every enterprise developer alive. He called that childish, and
he was right: the sentence has no facts in it.

The fix is always the same: replace the atmosphere with something specific and
checkable. A product name, a number, a date, a constraint.

## Rules

### Never claim credit that belongs to a team

This is the one he reacted to most strongly. An early draft said he owned
features "from database to pixel" and he said it made him "feel like I did
everything… so offensive and feel arrogant."

Team work reads as team work: *"I was one of the engineers on it, working
alongside product and design."* Where he genuinely led, say so once, plainly,
and move on: *"I led our team."* Do not decorate it.

If you cannot tell from the record whether he led something or contributed to
it, take the smaller reading and say you did. He would rather correct an
understatement than discover an overstatement went out.

### No hedges

"Lately a lot of that is AI." "I've spent enough time either side of that to be
useful there too." Hedging reads as junior, and it makes the reader do the work
of deciding whether to believe you. Say the thing.

### Don't lead with the newest project

He said early on: "this should be a neutral profile… not cheese on applied AI."
Then later, when three drafts all opened with Fritz, he asked flatly: "Why you
focus on Fritz so much?"

The eight years are the subject. AI is the current chapter and usually earns a
closing clause, not the first sentence. The pull toward the newest work is
strong because it is the easiest thing to make sound impressive, notice that
pull and resist it. Putting one year in the opening makes the other seven read
as preamble.

### Say what was hard, not what the work was

Seniority comes through in problems, not job descriptions. "Each time, the
domain took longer to learn than the stack did" says more than any list of
technologies. Two of his own year notes already said this before I noticed it
and used it.

### Lessons must be transferable and top-level

When a project write-up asks what he learned, the bar is: **anyone could
understand this, and it would still be true somewhere else.** Not
implementation trivia, and not aphorism.

He rejected drafts in both directions. Too poetic got "are you writing poem or
what?" Too specific got "too much compliance, should be top level points."

What passed:

> Wiring the model is the easy part. Agents and tools took days. Proving the
> output was good enough to send took the rest of the year.

> AI has to check AI. A second model scores every message against a written
> contract, and QA can change that contract without an engineer.

Both are a claim plus the concrete thing that earned it. That shape works.

### Everything traceable to the record

If a point comes from what is generally true of a domain rather than from what
he actually did, cut it. On one project this meant shipping two lessons where
the others had three, and telling him why rather than filling the gap with
something plausible.

### Get the scale right

He corrected a hackathon claim that compared his team of two to a field of
twelve teams: "It's like 100+ developers participated where team lead by me
won." Numbers have to be framed the way a reader would naturally understand
them. Check the denominator.

### Human prose, not assistant prose

- No em-dashes. He noticed them.
- Contractions are fine and preferred.
- Uneven sentence length. Assistant prose is rhythmically flat.
- Opinions are allowed. "Losing a competition isn't the same as being wrong."
- No "open to X roles" badge. The work is meant to make that obvious.

### Prefer the plain word

"S&P Global Mobility", not "the Mobility division of S&P Global". "It came
third", not "achieved a top-three placement". Where a fact and a flourish
compete, keep the fact.

## When there is a design or layout decision

- **Show, don't describe.** He answered "Not sure" to three options written as
  prose and decided immediately from the same three rendered as screenshots.
  If the work has a visual result, render it before asking.
- **Recommend.** He is happy to be given a menu, but he wants to know which one
  you would take and why.
- **He pushes back bluntly.** "very bad", "worst design", "Not so good". Treat
  it as information, not as a verdict on the whole approach, ask what
  specifically, or diagnose it yourself and say what you found.

## Portfolio-specific structure

If the work is the portfolio at kushaltheamin.github.io:

- Eight years across three industries is the frame. Awards belong in the
  timeline, not only in a stats bar.
- Section labels should be concrete. "What I actually do with AI" was too
  vague; it became named areas: production LLM applications, evaluation,
  agents and tool use, automation, learning in public.
- Project cards carry technical lessons and beyond-the-code lessons separately.
- Side projects get real names and working links, not descriptions.
- Contact email is `kushalamin0@gmail.com`.

The design sources live on the `design` branch of that repo, with a README
covering the build, the palette system and the reasoning behind both.

## Before you hand anything over

Read the draft back and check:

1. Is there a sentence that could belong to anyone else? Replace it.
2. Does anything claim solo credit for team work?
3. Does the newest project appear earlier than it has earned?
4. Any hedge words doing nothing? Cut them.
5. Is every number and date in `references/record.md`, or did you infer it?
6. Any em-dashes?

If something in the record is missing or ambiguous, say so plainly rather than
filling the gap. He answers direct questions and dislikes discovering an
invention later.
