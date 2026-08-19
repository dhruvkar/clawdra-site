---
layout: playbook.njk
title: "Your Cold Email Infrastructure Is Why Nobody Replies (Not Your Copy)"
description: "The domains, mailboxes, DNS, and warmup rules that keep your sender reputation alive. The infrastructure piece nobody writes about but everyone needs."
date: 2026-04-15
difficulty: Intermediate
cost: "$100-300/month (Maildoso or InboxKit + domains)"
timeToSetup: "An afternoon to set up, 14+ days to warm up before sending"
originalAuthor: "Clawdrop"
issueNumber: 9
permalink: /playbooks/cold-email-infrastructure/
tags:
  - cold-email
  - outbound
  - infrastructure
  - deliverability
  - domains
  - solopreneur
  - b2b-sales
---

## Tools

- [**InboxKit**](#aff-inboxkit): auto-configures domains, mailboxes, DNS, and warmup
- [**Maildoso**](#aff-maildoso): alternative platform handling the same infrastructure layer
- [**Manyreach**](#aff-manyreach): sequencer that receives the warmed mailboxes
- [**SmartLead**](#aff-smartlead): alternative campaign sequencer
- [**Instantly**](#aff-instantly): alternative sequencer plus its own infra add-on
- [**Glockapps**](#aff-glockapps): standalone inbox placement testing
- [**Gmail**](#aff-gmail): primary inbox provider whose deliverability you're optimizing for
- [**Outlook**](#aff-outlook): secondary inbox provider on the placement-test target list

## What You'll Build

A cold email sending stack that actually reaches inboxes. Secondary domains that aren't your main business domain, 3-4 mailboxes per domain with real-sounding names, auto-configured DNS records, a 14-day warmup period, and a rotation strategy that keeps every mailbox under 20 sends a day.

The output is an infrastructure layer that sits between your list and your sequencer, quietly doing the work nobody talks about, so that when you hit send on 500 emails nothing lands in spam.

This is the exact stack we run at Clawdrop for our own outbound and what the Navreo methodology teaches. We'll walk through it using Maildoso and [InboxKit](/go/inboxkit) as the reference tools because they handle the painful parts (DNS configuration, warmup pool management, CSV export to sequencers) automatically. You can swap them for Instantly, SmartLead's infra add-on, or a hand-rolled setup. The pipeline is the playbook, not the tools.

By the end of this guide you'll know how to go from "I want to send 500 cold emails a day" to "here are 25 mailboxes across 8 domains, warmed up, ready, and wired into my sequencer," without burning your primary domain.

## Why Your Cold Email Copy Doesn't Matter Yet

Most founders spend their entire cold email budget on the wrong thing. They hire a copywriter. They A/B test subject lines. They iterate on offers. And they wonder why nothing converts.

The answer is almost always infrastructure. If your emails don't land in the primary inbox, nothing after that matters. Your subject line doesn't get read. Your opener doesn't get seen. Your offer doesn't get considered. The recipient never knows you sent anything.

In April 2024, Google and Microsoft rolled out major deliverability updates that quietly destroyed cold outreach campaigns industry-wide. What used to work stopped working overnight. The people who survived were the ones who had infrastructure right. The people who got burned were the ones sending from their main domain with 8 mailboxes and no warmup.

Here's the core rule, and it's the one nobody wants to hear: **never send cold emails from your primary domain.** If your primary domain gets flagged, every single email from your organization starts landing in spam. Your sales outreach, your customer support replies, your automated receipts, your team's personal inboxes. All of it. You won't notice for a week. Then you'll wonder why nobody's responding to anything you send, including the emails that had nothing to do with cold outreach.

We've seen this happen to otherwise-smart founders at least half a dozen times. Every single time it takes 6 to 12 weeks to fully recover. Every single time they say the same thing: "I wish I'd taken the infrastructure piece seriously from the start."

The other mistake is skipping warmup. A fresh mailbox has zero reputation. If you send 50 cold emails on day 1, Gmail and Outlook assume you're a spammer and route you to spam permanently. You can fix a cold list in a week. You can't fix a burned domain in a week.

The math is brutal but simple. Pay $100-300 a month for proper infrastructure, or save that money and lose every cold email campaign you ever run. Pick one.

## The Pattern

The whole thing is 6 layers stacked on top of each other.

```
PRIMARY BUSINESS DOMAIN (never used for cold)
        |
        v
SECONDARY SENDING DOMAINS (8-10)
        |
        v
MAILBOXES (3-4 per domain, real names)
        |
        v
DNS RECORDS (SPF, DKIM, DMARC, auto-configured)
        |
        v
WARMUP POOL (14+ days)
        |
        v
SEQUENCER (receives the mailboxes via CSV or API)
```

Top of the stack is sacred (your main domain). Middle of the stack is working infrastructure (secondary domains and mailboxes). Bottom of the stack is where campaigns actually run (sequencer). Everything above the sequencer has to be built and warmed up before the sequencer is allowed to touch any of it.

## Step-by-Step Setup

### Step 1: Accept That Your Primary Domain Is Off-Limits

This is the first and most important decision. Your main domain (the one you use for everything else) is out of the picture. Forever.

If you're currently sending cold emails from `yourcompany.com`, stop today. Every future cold email send needs to come from a domain that is not your primary domain. If your primary gets flagged, your entire business email infrastructure dies, and that takes weeks to recover from.

Write this down: **cold outbound uses dedicated sending domains, and nothing else.**

### Step 2: Buy Secondary Sending Domains

You need domains that look like your brand but aren't your brand. The usual pattern is variations on your main name.

If your primary domain is `acme.com`, good sending domains look like:

- `acme-team.com`
- `tryacme.com`
- `acme-agency.com`
- `acme.us`
- `acme-hq.com`
- `getacme.com`
- `acmeai.com`
- `hello-acme.com`

The rules for picking them:
- Keep them recognizable to your brand so the recipient recognizes you
- Vary the TLD (mix `.com`, `.io`, `.us`, `.co`)
- Set each domain to **redirect to your primary site** so anyone who clicks through still lands on your real homepage
- Avoid domains that are obviously spammy (no numbers, no weird hyphens, no 4-character random strings)

How many you need depends on your volume target. The Navreo starter setup is 10 domains with 40 mailboxes, which supports about 8,000 unique contacts per month with a 2-step sequence. Smaller volumes need fewer. Larger volumes scale the same ratio: 4 mailboxes per domain, 20 sends per day per mailbox.

Tools like Maildoso and InboxKit will register domains for you in-app. The alternative is buying them manually from a registrar and configuring DNS by hand, which used to take an entire day and was riddled with errors. Let a tool handle it.

### Step 3: Create Mailboxes (Real Names, Not Info@)

Each sending domain gets 3-4 mailboxes. No more. More than 4 mailboxes on one domain starts looking suspicious to inbox providers.

The mailboxes need to have **real-sounding names**, not generic ones. `john@acme-team.com` is fine. `alex.smith@acme-team.com` is fine. `a.smith@acme-team.com` is fine. `info@acme-team.com` is dead on arrival. Generic role addresses get filtered to spam by corporate mail servers automatically. Use first names, last names, combinations of initials. Make it look like a real human's work email.

Spread the same name variations across all your domains so your sender identities look consistent. If you use Alex Smith as a sender on `acme-team.com`, also run Alex Smith on `tryacme.com` and `acme.us`. That way you can rotate sends across domains without inventing new personas.

Example layout for 3 domains, 4 mailboxes each:

```
acme-team.com     → alex@, a.smith@, alex.smith@, asmith@
tryacme.com       → alex@, a.smith@, alex.smith@, asmith@
acme.us           → alex@, a.smith@, alex.smith@, asmith@
```

That's 12 mailboxes, all representing the same human, spread across 3 domains. Your sequencer will rotate sends through them automatically.

### Step 4: Let the Tool Handle DNS (SPF, DKIM, DMARC)

Three DNS records have to exist on every sending domain, or your mail goes to spam immediately.

**SPF** tells receiving servers which mail servers are allowed to send email on your domain's behalf.

**DKIM** adds a digital signature to every email you send, proving the message wasn't tampered with in transit.

**DMARC** tells receiving servers what to do when SPF or DKIM fails. Usually some variation of "quarantine it" or "reject it outright."

These sound simple. They are. The problem is that a single typo in the TXT record, a missing selector, or an incorrect `v=spf1` syntax will silently break your deliverability with no visible error. People lose days to this. We lost days to this back before we used a tool.

Maildoso and [InboxKit](/go/inboxkit) auto-configure all three records when you register a domain in their platform. This is the single biggest reason we use them. The 4 minutes you spend clicking through the setup flow saves 4 hours of debugging TXT records later. If you insist on doing this manually, expect to redo it twice before it works, and test each domain with a tool like `mail-tester.com` before trusting it.

### Step 5: Warm Up for at Least 14 Days

This is the step most first-timers skip. Do not skip it.

A fresh mailbox has zero reputation with Gmail, Outlook, and every major inbox provider. If you send 50 cold emails on day 1 from a cold mailbox, they all go to spam. The mailbox gets flagged. The domain starts to smell. Within a week you've burned the whole setup.

Warmup fixes this. Your mailboxes join a **warmup pool**, which is a network of other mailboxes owned by other users doing the same thing. The warmup tool sends emails between pool members automatically. Those emails get opened, replied to, marked as important, and occasionally moved out of spam if they land there. All of this generates the kind of positive signals that make inbox providers decide your mailbox is run by a real human with real correspondence.

The minimum warmup period is **14 days**. We run 21 days when we're not in a rush. Going live before day 14 is the fastest way to burn brand new infrastructure.

During warmup, **do not send any real campaigns**. Not even "just a few." The entire point is that inbox providers are watching your mailbox's behavior and using the first 2 weeks to decide if you're legitimate. If you mix in cold sends during warmup, you poison the signal and the warmup process fails.

Maildoso and InboxKit handle warmup automatically. You enable it once per mailbox and the platform runs it in the background. You check the deliverability score dashboard after day 14 and decide whether each mailbox is ready.

### Step 6: Inbox Placement Testing

Before you trust a warmed-up mailbox, run an inbox placement test. This is a tool that sends a real email from your mailbox to a pool of test inboxes across Gmail, Outlook, Yahoo, and smaller providers, then reports where the email landed: primary inbox, promotions tab, spam folder, or bounced entirely.

If your mailbox is landing in the primary Gmail inbox at 90%+ and the primary Outlook inbox at 80%+, you're ready. If Gmail is showing you at 40% primary, something is off. Maybe your SPF record has a typo. Maybe your domain age is too young. Maybe your warmup was cut short. Figure it out before you send real campaigns.

InboxKit has inbox placement testing built into its dashboard. Maildoso has similar. If you're using a different stack, tools like Glockapps and EmailDelivery.guru do the same thing as a standalone service.

Test every mailbox once after warmup, then re-test every 2-3 weeks during active sending. If a mailbox starts drifting from 90% primary down to 50% primary, pause it and investigate before the problem compounds.

### Step 7: Export to Your Sequencer

Once your mailboxes are warmed and their placement scores look good, export them to your campaign sequencer. Manyreach and SmartLead are the two we trust. Instantly works too. Pick one and commit.

The export is usually a CSV with columns for SMTP server, port, username, password, IMAP server, and first/last name for personalization. Maildoso and InboxKit both generate this CSV on demand. Some of them have direct API integrations with the major sequencers.

Once the mailboxes are in the sequencer, they become **senders** in sequencer language. When you launch a campaign, the sequencer rotates sends across all attached senders automatically. You don't have to manually assign recipients to specific mailboxes. The sequencer does it.

### Step 8: Set Volume Limits Per Mailbox

**The single most important number in this entire pipeline: 20 emails per mailbox per day.** Ever.

Not 25. Not 30 on a slow week. Not 50 on the one day you want to test a bigger push. 20. No exceptions.

Going above 20 per mailbox is the fastest way we've ever seen to burn a domain. Inbox providers treat per-mailbox volume as a signal of automation. Real humans don't send 60 cold emails a day from their personal work email. If you do, you look like a bot, and you get filtered.

Stay under 20 per mailbox and scale by adding more mailboxes instead. If you need 800 sends a day, that's 40 mailboxes, which is roughly 10 domains with 4 mailboxes each. If you need 1,600 sends a day, double it. The ratio holds.

Most sequencers let you set a hard daily cap per sender. Set it to 20. Verify it's set. Check it again next week. This is the guardrail that keeps your entire setup alive.

## Lanes That Work

This stack fits anyone running cold outbound at small to medium scale.

**Solopreneurs and consultants** sending 100-500 cold emails a day. Starter package is overkill for this volume, but the discipline is the same. Use 3-5 domains, 12-20 mailboxes, and run rotation.

**Agencies** sending on behalf of clients. Each client gets their own infrastructure workspace so sending domains and mailboxes don't cross-contaminate. If one client's campaign tanks deliverability, it shouldn't take down the other clients' sending.

**B2B founders** doing founder-led outbound. The Navreo starter pack (10 domains, 40 mailboxes, 800 sends per day) is the most common starting point. Enough volume to matter, small enough to actually manage.

**Anyone scaling past 1,000 sends per day.** At this scale you need 50+ mailboxes across 12+ domains, with active rotation and weekly deliverability monitoring. [InboxKit's API](/go/inboxkit) becomes important here because you'll be provisioning and retiring mailboxes programmatically.

What doesn't work: trying to send massive volume from a single domain with 30 mailboxes. That's what gets you burned. The whole point of this architecture is to distribute risk across domains so one bad week doesn't kill everything.

## What Changes After Setup

Before you have infrastructure dialed in, cold email feels like gambling. You send 500 emails, you get 4 replies, you tell yourself the copy was the problem, you rewrite the copy, you send 500 more, you get 2 replies, you blame the list, you buy a new list, you send 500 more, you get 0 replies. Something is broken but you can't point to it.

After you have infrastructure dialed in, the feedback loop becomes clean. Your bounce rate is under 2%. Your delivery rate is above 97%. Your reply rate is 3-5% on a reasonable list. When reply rates drop, you know it's the copy or the list, because the infrastructure hasn't changed. When reply rates climb, you know what caused it, because you can trace the change back to a specific adjustment. The variable that used to dominate every outcome is now held constant in the background.

Your weekly cadence looks like this:

**Monday.** Check deliverability scores in Maildoso or InboxKit for every active mailbox. Flag any that drifted below 85%. Pause them until you figure out why.

**Tuesday.** Launch new campaigns from the sequencer against your fresh list.

**Wednesday/Thursday.** Monitor per-mailbox bounce rate and reply rate live. If any mailbox is bouncing above 3%, pause it.

**Friday.** Review placement test results from any mailboxes you retested that week. Retire mailboxes that drifted. Provision replacements if needed.

The total time investment is about 2 hours a week once the stack is built. The first build takes an afternoon to configure and 14 days to warm up. After that, you're maintaining, not building.

## Gotchas and Tips

**The "it worked for me" temptation.** People post on Twitter that they sent 10,000 cold emails from their primary domain and booked 40 meetings. Ignore them. Survivorship bias. The 200 people who tried the same thing and burned their primary domain aren't posting about it.

**Domain age matters.** A domain you registered this morning is less trustworthy than a domain that's 6 months old. Some tools let you buy "aged" domains specifically for cold outreach. If you're in a hurry, consider this. If you're not, buy domains now and let them sit for 30 days before you even start warmup.

**Redirect every sending domain to your real site.** If a recipient types your sending domain into a browser, they should land somewhere that looks real. A dead domain with a parked-page placeholder screams "spammer." A redirect to your main site screams "real company with a marketing team."

**Match sender names to mailbox aliases.** If the mailbox is `alex.smith@acme-team.com`, the sender name in your sequencer should say "Alex Smith." Mismatches (mailbox says Alex, sender display says John) get flagged.

**Never mix warmup and campaigns on the same mailbox simultaneously.** Some tools let you run warmup in the background while you send real campaigns. Don't. Warmup generates a specific kind of signal. Campaign traffic generates a different kind. Mixing them confuses the reputation algorithm and costs you deliverability.

**Retire mailboxes after 6 months, even if they're still performing.** This is insurance. Old mailboxes accumulate small reputation hits even when they're healthy, and the cost of rotating them is much lower than the cost of recovering from a slow reputation death.

**Keep one "safe" mailbox you never push to the limit.** If all your mailboxes are running at 20 sends per day, you have zero slack. Keep one per domain set to 5-10 sends per day as a reserve. If a mailbox bounces unexpectedly, you can scale the safe one up while you investigate.

**Run a monthly inbox placement test on every active mailbox.** This catches drift before it becomes a crisis. A mailbox drifting from 90% to 70% primary placement is an early warning. Catching it at 70% is recoverable. Catching it at 40% usually isn't.

**Don't skip warmup because you're impatient.** This is the step everyone knows about and everyone tries to cheat on. The cost of cheating is burned infrastructure and 6 weeks of rebuilding. The cost of waiting is 14 days. Wait.

---

## Keep Reading

- **[Stop Buying Cold Email Lists. Build One That Actually Books Meetings.](/playbooks/cold-email-list-pipeline/)**: The list side of the stack. Pair it with this infrastructure guide for the full outbound setup.
- **[The One-Person Agency: Charge Agency Rates as a Solo Operator](/playbooks/one-person-agency/)**: Once your outbound machine is live, this is the delivery engine that handles the inbound meetings it generates.
- **[Post on X and LinkedIn Every Day Without Being a 'Content Person'](/playbooks/daily-content-machine/)**: The inbound-side complement. Warm your audience with content so the cold email isn't quite so cold.
