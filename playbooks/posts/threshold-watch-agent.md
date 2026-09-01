---
layout: playbook.njk
title: "He Crossed a $100,000 Line He Had Never Heard Of. The Penalty Cost More Than an Accountant."
description: "His sales tax software filed everything correctly and never mentioned that his sales into another state had triggered a whole new obligation. Here is the agent that watches the lines you are about to cross."
date: 2026-09-01
difficulty: Beginner
cost: "Under $20/mo if you already pay for Claude. The nexus tools are $50-200/mo and worth it if you sell across state lines."
timeToSetup: "An afternoon to list your numbers and your dates. Then it runs weekly."
originalSource: "https://www.reddit.com/r/smallbusiness/comments/1vzvce0/"
originalAuthor: "u/IndEPenDenTtom (r/smallbusiness)"
issueNumber: 28
permalink: /playbooks/threshold-watch-agent/
tags:
  - compliance
  - finance
  - monitoring
  - ecommerce
  - operations
  - small-business
  - smb
---

## Tools

- [**Claude**](#aff-claude): reads your numbers every week and tells you what is coming
- [**OpenClaw**](#aff-openclaw): runs it on a schedule so you do not have to remember
- [**Google Sheets**](#aff-google-sheets): where the thresholds and your dates live
- [**Stripe**](#aff-stripe): revenue by state, if you sell online
- [**QuickBooks**](#aff-quickbooks): the books it reads to work out where you are
- [**Telegram**](#aff-telegram): where the weekly note lands

## What You'll Build

A weekly note that usually says nothing happened.

It looks at your revenue by state, your headcount, where your people work, where your stock sits, and every renewal date you own. It compares that against a list of the lines that start new obligations.

Then it tells you which one you are approaching, how far off you are, and what switches on when you get there.

Most weeks it says you are fine. The week it does not say that is worth the whole build.

## The Story

An ecommerce owner. Him and one part time person doing fulfillment.

He was already paying for one of the automated sales tax tools, and it did its job. It filed everything, on time, in every state he was registered in.

It never told him his sales into a state he was not registered in had quietly crossed about $100,000 for the year.

That is called economic nexus. He had never heard of it. He found out when the notice arrived, after the deadline.

His words:

> Penalty and back taxes together wiped out more than a year of what an accountant would've cost me.

Then he wrote the line that is really the point of this playbook:

> Wondering what else I'm confidently handling myself that I don't actually understand well enough, the kind of thing where by the time you find out you're wrong it's already an expensive problem instead of just a small one.

## The Lines Nobody Tells You About

Sales tax is one. Here is the shape of it as of August 2026: 41 states use a $100,000 threshold. Thirty states have no transaction count at all, fifteen use 200, one uses 100. New York wants $500,000 and 100 transactions. Illinois dropped its transaction test on January 1st this year.

The employee ones are worse, because they arrive on a hiring decision you made for other reasons.

- **15 employees.** Title VII and ADA obligations begin.
- **20 employees.** COBRA. This one counts every person as one person. Twelve full timers plus eight part timers is twenty, and you are covered, while still sitting under the 50 mark for health insurance.
- **50 full time equivalents.** The ACA employer mandate, the 1095 filings, and FMLA.
- **100 employees.** EEO-1 reporting.
- **One person working in a new state.** In 22 states a single day of work creates a filing obligation, and one remote employee can create income tax nexus on its own.

And the rules move in both directions, which is why a checklist you wrote once is already wrong. The 1099-K threshold was headed to $600 and went back up to $20,000. The 1099-NEC threshold rises from $600 to $2,000 this year. Beneficial ownership reporting, the thing every small business was told was mandatory, was permanently scrapped for US companies on August 14th 2026. Plenty of owners are still paying somebody to file it.

One more from the comments on his post, and almost nobody knows this one. If you have ever issued a refund or a store credit that went unclaimed, most states require you to report and hand that money over after a holding period. It is called escheatment and it has penalties.

## The Business Angle

An accountant on retainer runs $300 to $800 a month for a small business, and the good ones catch this. Most owners do not have one on retainer. They have a guy who does the return in March.

The gap is the eleven months in between.

His penalty was more than a year of that retainer. So the honest math is that this build pays for one mistake, once, and then keeps paying.

Be straight about one thing. For sales tax specifically, this problem is already solved commercially. TaxCloud, Numeral and Zamp all watch your sales against every state's rules and alert you at around 75 to 80 percent of the threshold. If you sell across state lines, buy one of those tomorrow.

Everything else on the list above has nothing watching it. That is what you build.

## Who Should Steal This Idea

Anyone selling into more than one state. Anyone whose headcount moved this year. Anyone who hired their first remote person.

And anyone who has ever said "I think we're fine on that" about a rule they could not name.

## How Hard Is It

Set it up in an afternoon.

It is three lists and a schedule. Your numbers, your dates, and the rules. Then one prompt a week.

Cost: under $20 a month if you already pay for Claude.

## Gotchas and Tips

**Do not let the model be the authority on tax law.** It will state a threshold with total confidence and be wrong, and these rules changed three times in eighteen months. Its job is to watch your numbers and tell you that you are close to something. A human decides what to do about it.

**Re-check the rules from the source on a schedule.** Keep the thresholds in a file the agent reads. Refresh that file quarterly against the actual state and IRS pages. Never let it work from memory.

**Alert at 75 percent, not at 100.** By the time you cross a line, your options have shrunk to paying the penalty. With a quarter of the runway left you can register, restructure, or file a voluntary disclosure.

**Put your renewal dates in the same file.** Licenses, permits, certificates of insurance, registered agent, annual reports. Same agent, same weekly note, and it is the half you actually control.

**Watch for rules turning off.** The beneficial ownership one is the example. Owners are still paying filing services for a requirement that no longer exists. Have it flag removals as well as additions.

**Keep the boring weeks.** A note that says nothing changed is the product working. Do not tune it until it only speaks when there is drama, because then you stop trusting the silence.

## Keep Reading

- [Fire the Bookkeeper, Keep the Books](/playbooks/fire-the-bookkeeper/)
- [The 5-Day Automation Sprint: $22K Found in Tax Deductions](/playbooks/five-day-automation-sprint/)
- [He Spent $1,263 on AI in One Month. Then He Capped It.](/playbooks/ai-budget-cap/)
