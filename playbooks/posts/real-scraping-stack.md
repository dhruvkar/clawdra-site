---
layout: playbook.njk
title: "Your Monitoring Agent Is Reading Login Walls and Calling It Research"
description: "Every watch-my-competitors play is a scraping play. When a site blocks you it does not return an error, it returns a page, and your agent summarizes that page as if it were the answer."
date: 2026-08-05
difficulty: Intermediate
cost: "Nothing for the first two rungs. $10-50/mo if you need the top of the ladder."
timeToSetup: "An afternoon, and you climb the ladder only when a site forces you to"
originalAuthor: "Dhruv Kar"
issueNumber: 25
permalink: /playbooks/real-scraping-stack/
tags:
  - scraping
  - monitoring
  - competitor-research
  - lead-generation
  - reliability
  - small-business
  - smb
---

## Tools

- [**OpenClaw**](#aff-openclaw): the agent that runs the fetching and decides what to do with what comes back
- [**Claude Code**](#aff-claude-code): the same job from a terminal
- [**Hermes**](#aff-hermes): another runtime for the same work
- [**Python**](#aff-python): where the fetch layer lives, because this is one of the few places worth writing real code
- [**Playwright**](#aff-playwright): the real browser you escalate to, only when a page genuinely needs JavaScript
- [**Scrapfly**](#aff-scrapfly): rendering as a service when you do not want to run browsers yourself
- [**Apify**](#aff-apify): prebuilt scrapers for the big sites, worth it when someone has already solved your target
- [**DigitalOcean**](#aff-digitalocean): a cheap second machine, which turns out to matter more than any tool here
- [**Tailscale**](#aff-tailscale): how you reach that machine without opening anything to the internet
- [**SQLite**](#aff-sqlite): where you keep what you fetched, so you stop re-fetching it

## What You'll Build

A fetching layer with four rungs, a rule for when to climb, and the one habit that makes the whole thing honest.

Most agent plays that owners actually want are fetching plays in disguise. Watch competitor pricing. Pull leads out of a directory. Track reviews. Monitor tenders. Check whether your listings changed. All of that is an agent going and getting a page, and all of it works beautifully in a demo against an open website.

Then you point it at a site that does not want to be read, and the thing that breaks is not what you expect.

## The Story

We run a scrape every week for this newsletter, across 22 subreddits at the time, plus GitHub, Hacker News and YouTube. It is not exotic. Reddit publishes an open feed, no login, no key.

The first surprise was that the agent's own built-in web fetch cannot read reddit.com at all. Blocked outright. So we wrote a small fetcher instead, and hit the second surprise: a plain Python request gets an HTML wall rather than the feed. Send the exact same request with a browser user-agent and the feed arrives. Nothing about the request changed except how it introduced itself.

The third surprise is the one worth the playbook. On this month's run, every Reddit endpoint we tried returned 429 instantly. The search feeds, the plain feeds, the old subdomain, all of them, in under a third of a second. That is not per-request throttling. That is an address being told to go away.

We ran the identical request from two other machines. Both returned 200 on the first try.

So the scan moved to a different machine and finished, 1,275 posts. Even there it paid a tax. Every single subreddit lost roughly one of its three queries to a rate limit and recovered on a retry. An earlier run had been worse, losing 19 of 21 subreddits, and the only reason we knew is that somebody read the log.

None of that is a scraping problem. It is a plumbing problem underneath every monitoring play we publish.

## What Blocking Actually Looks Like

Here is the part that makes this dangerous rather than merely annoying.

A defended site rarely hands you an error. It hands you a page. A login wall. A Cloudflare interstitial. A shell that says enable JavaScript. Your fetch returns HTTP 200, your agent reads what came back, and it summarizes that content faithfully, because summarizing what it received is exactly its job.

What lands in your inbox is a competitor report built from a page that never loaded. Nothing in the chain says blocked. The agent did not lie to you. It read a door and described the door.

That is why the fix is not a better tool. It is knowing which rung you are on and checking that what came back is the thing you asked for.

## The Ladder

**Rung one, the built-in fetch.** Correct default. Free, instant, fine for open pages and most small sites. Use it until it stops working, and learn its failure signature, because it fails by succeeding.

**Rung two, an HTTP client that looks like a browser on the wire.** This is where most people lose an afternoon, and it is the wrong afternoon. They cycle user-agent strings and headers and get 403s anyway, because the block is happening below the headers. Sites fingerprint the TLS handshake and the HTTP/2 settings, and a normal Python client is unmistakable there no matter what it claims to be in a header.

The fix is a client that impersonates Chrome down at that layer. Ours matches Chrome's JA4 fingerprint exactly, verified identical, which quietly clears a large share of what looks like hard blocking. It costs nothing per request.

Our own notes on that layer include the sentence that keeps us honest about it: a perfect fingerprint is necessary but not sufficient. It defeats fingerprint blocks. It does not execute JavaScript, and it does not launder IP reputation.

**Rung three, a different exit.** Which brings us to reputation, and to the thing most owners never think about until it bites.

Your home or office IP address is a finite asset shared with your actual life. Point an agent at the open internet from it, at volume, and you can spend that reputation on a scrape. When it goes, it goes for everything from that address, including you personally, and you do not get a notification.

The direction of the problem is also not what people assume. Datacenter addresses are frequently treated worse than home ones. We run a nightly job against a vendor system from a laptop on a residential connection precisely because the same job from a cloud server gets hard-challenged, and the clearance cookie it earns is bound to the address that earned it, so you cannot move it. YouTube blocks its own website and transcript endpoints from cloud addresses while its official data API answers happily from the same machine.

So the rung is: move bulk fetching off the address you care about, and match the exit to the target rather than assuming one is better.

**Rung four, run a real browser.** Only for pages that genuinely require it. Google is the clean example. It serves a JavaScript shell to any HTTP client regardless of fingerprint or address, so no amount of rung two solves it and you need something that actually renders.

This rung is slow and metered. Rendering as a service runs 30 to 60 seconds a page for us and caps how many you can run at once. Which produces the rule we now follow everywhere: sweep the whole list on plain HTTP first, collect the failures, and render only those. On a few hundred pages that is the difference between twenty minutes and most of a day.

## The Habits That Matter More Than the Tools

**Slow down automatically.** Our fetcher halves its request rate the moment it sees a 429 and ramps back up on sustained success. Fixed delays are either too slow all day or too fast at the wrong moment.

**Back off and retry properly.** Five seconds, then ten, then twenty, then forty. That single change recovered most of what an earlier run had simply lost.

**Rotate on failure, not on schedule.** Both the exit address and the fingerprint, and only when something returns 429.

**Treat a suspicious 200 as a failure.** If the response contains a login form, a challenge page, or an enable-JavaScript notice, it is a block wearing a success code. Catch it at the fetch layer, before an agent gets a chance to summarize it.

**Log what you did not get.** This is the one. A run that quietly drops 19 of 21 sources and reports nothing is worse than a run that crashes, because you will act on the output.

**Discover paths, never guess them.** Read the site's own navigation and follow the links it gives you. Guessed URLs produce 404s that look like empty results.

**Keep what you fetched.** Re-fetching the same page tomorrow is how you spend your reputation on nothing.

## The Business Angle

**What people pay instead.** Managed data feeds and scraping services run $50 to $500 a month per source. Sometimes that is the right buy, particularly for a big target somebody else has already solved.

**What the ladder costs.** Rungs one and two are free. Rung three is a few dollars a month for a second machine, or a proxy subscription if you need many exits. Rung four is the only genuinely metered one, and the sweep-then-render rule keeps it small.

**The real saving is not the subscription.** It is that you cannot evaluate a vendor until you know which rung your problem actually sits on. Half the people paying for a scraping service have a rung-two problem and are buying rung-four capability to solve it.

**And the cost of getting it wrong is asymmetric.** A monitoring agent that returns nothing looks identical to a market where nothing happened. You do not notice the difference until a competitor's price change was sitting there for six weeks and your report said all quiet.

## Who Should Steal This Idea

**Anyone already running a monitoring agent.** Competitor prices, reviews, listings, job postings, tenders. Go and check what your fetch layer actually returned last week.

**Agencies running these for clients.** You are reporting on data you have not verified arrived. That is a bad position to be in when the client finds the thing you missed.

**Lead generation of any kind.** Directory scraping is the most commonly blocked activity on the internet and the one most likely to be running from an address you care about.

**Anyone about to buy a data feed.** Work out your rung first. It changes what you should be paying.

**Anyone whose agent has ever confidently reported that nothing changed.** Especially then.

## How Hard Is It

An afternoon to set up, and after that you climb only when a site forces you.

Write the fetch as one small module every agent job calls, rather than letting each job fetch its own way. That single choice is what lets you fix blocking in one place instead of nine. Give it the browser fingerprint, the adaptive rate limiting, the retry with backoff, and the block detection from the start, because retrofitting those is worse than building them.

Then point it at your actual targets and read the log. You will find out quickly which rung each one needs, and most of them will need rung one.

**Cost:** free to start. A few dollars a month for a second machine when you need a different exit, and metered rendering only for the pages that truly need a browser.

## Gotchas and Tips

**Your agent's built-in fetch is blocked from more places than you think.** Test the specific site before you build a workflow on top of it.

**A browser user-agent alone fixes some sites and none of the hard ones.** It cost us nothing on Reddit's feed and would not have touched the address-level block.

**Do not scrape from the address you rely on.** Not your office, not the connection your team works over.

**Datacenter is not automatically better.** For some targets a residential connection is the only thing that works, and clearance cookies are bound to the address that earned them.

**Check whether there is an official API first.** YouTube blocks its own site from cloud addresses and answers its data API from the same machine without complaint. We wasted real time before noticing that.

**Sweep first, render second.** Rendering everything because a few pages needed it is the most common way to turn a twenty-minute job into an all-day one.

**Read the log after the first real run.** Not the output. The log. The output looks fine either way, which is the entire point of this playbook.

---

## Keep Reading

- **[Turn Any Windows PC Into a Web Automation Machine](/playbooks/browser-automation-machine/)**: The logged-in browser version, for work that has to happen as you rather than as an anonymous visitor.
- **[Eight of the 27 Most-Copied Automations Are the Same Build.](/playbooks/automation-pattern-survival/)**: The same failure mode one layer up, where the agent reports done and nothing happened.

**Want the full deep dive?** Read our [OpenClaw Browser Automation](/learn/openclaw-browser-automation/) guide for the foundational patterns this playbook is built on.
