export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  /** Short subject label shown above the title. */
  topic: string;
  art: string;
  /** Slug of the capability the article relates to, if one fits. */
  capability?: string;
  date: string;
  minutes: number;
  body: Block[];
};

const p = (text: string): Block => ({ type: "p", text });
const h2 = (text: string): Block => ({ type: "h2", text });
const ul = (...items: string[]): Block => ({ type: "ul", items });

export const articles: Article[] = [
  {
    slug: "where-to-start-with-ai",
    title: "Where to start with AI when you are not a tech company",
    excerpt:
      "Most businesses do not need a moonshot. They need one boring, repeated decision made faster and more consistently. Here is how we find it.",
    topic: "AI",
    art: "/art/ai-solutions.webp",
    capability: "ai-solutions",
    date: "2026-10-12",
    minutes: 4,
    body: [
      p("When a business owner tells us they want to \"do something with AI\", the first thing we do is ask them to walk us through an ordinary Tuesday. Not the strategy deck. The actual day. Who opens which spreadsheet, who checks what by eye, where the phone calls pile up."),
      p("We do this because the useful AI projects are almost never the ones people arrive with. They arrive wanting a chatbot. They leave with a model that flags which of tomorrow's deliveries are likely to run late, because that turned out to be the thing costing them sleep."),
      h2("Look for a decision, not a technology"),
      p("A good first project has a recognisable shape. Someone in your company makes the same kind of judgement many times a week, they make it from information you already collect, and when they get it wrong it costs you something you can name."),
      ul(
        "A supervisor deciding which items on the line need a second look.",
        "A planner guessing how much stock to order before a holiday.",
        "A support lead deciding which of forty open tickets is the urgent one.",
      ),
      p("Each of those is a decision a model can help with. Notice that none of them replaces the person. The supervisor still decides. They just stop having to look at every item to find the three that matter."),
      h2("Be honest about your data"),
      p("This is the part nobody enjoys. A model learns from examples, so if your history lives in three systems, two inboxes and one colleague's memory, the first few weeks of the project are about getting it into one place. That work is unglamorous and it is most of the job."),
      p("The good news is that you find out early. We would rather tell you in week two that the data is not there yet than build something impressive that falls over the first time it meets a real order."),
      h2("Start small enough to finish"),
      p("Pick one decision, one team and one way of measuring whether it got better. Run the model alongside the people doing the work and compare. If it helps, widen it. If it does not, you have spent weeks, not a year, and you have learned something specific about your own operation."),
      p("That is the whole method. It is less exciting than the headlines, and it is the version that tends to still be running a year later."),
    ],
  },
  {
    slug: "what-to-automate-first",
    title: "What to automate first, and what to leave alone",
    excerpt:
      "Automation pays off fastest on the tasks people quietly hate. A short guide to picking the right ones and avoiding the expensive mistakes.",
    topic: "Automation",
    art: "/art/automation.webp",
    capability: "tailored-software-development",
    date: "2026-10-12",
    minutes: 4,
    body: [
      p("Every company has a task that everybody knows is silly. Someone copies numbers from an email into a spreadsheet, then from the spreadsheet into another system, every single morning. It has been done that way for years because there was never a good week to fix it."),
      p("That task is where automation starts. Not with robots, not with a grand redesign. With the copy and paste."),
      h2("The three signs of a good candidate"),
      ul(
        "It happens often. Daily is ideal, weekly is fine, twice a year is not worth it.",
        "It follows rules. If you can write the steps on one page, software can follow them.",
        "Mistakes in it are costly or embarrassing. Wrong stock counts, missed compliance reports, invoices sent to the wrong customer.",
      ),
      p("Inventory tracking, report generation and moving data between systems that do not talk to each other fit this description in most businesses we meet. They are dull, frequent and unforgiving, which is exactly what software is good at."),
      h2("What to leave alone"),
      p("Do not automate a process you do not understand yet. If three people do the same task three different ways, automating it just makes one of those ways permanent, and it is rarely the best one. Sort out the process first. Sometimes that alone fixes half the problem."),
      p("Be careful with anything that depends on judgement or on a relationship. A machine can prepare the renewal reminder. A person should still make the call to the customer who has been with you for ten years."),
      h2("Keep a human in the loop at first"),
      p("We like to run a new automation in a mode where it does the work and a person approves it. For the first few weeks that feels slower. Then the person notices they have approved two hundred items without changing one, and you can let it run."),
      p("The point of all this is not fewer people. It is the same people spending their attention on work that actually needs them. The colleague who used to copy numbers every morning usually turns out to be very good at something else."),
    ],
  },
  {
    slug: "dashboards-people-actually-open",
    title: "Building dashboards people actually open",
    excerpt:
      "Plenty of companies have data and reports. Fewer have numbers that change what someone does on Monday. The difference is mostly in the questions.",
    topic: "Data and analytics",
    art: "/art/data-driven-solutions.webp",
    capability: "tailored-software-development",
    date: "2026-10-12",
    minutes: 4,
    body: [
      p("There is a particular kind of dashboard we get asked to replace. It has twelve charts, four colours of gauge and a filter panel down the left. It took months to build. Nobody has opened it since the launch meeting."),
      p("It failed for a simple reason. It was built to show the data the company had, not to answer a question anybody was asking."),
      h2("Begin with the decision"),
      p("Before we draw a single chart we ask each person who will use it the same thing: what do you decide, and how often? A sales lead decides who to call this week. An operations manager decides where to send people tomorrow. A founder decides whether to hire."),
      p("Each of those needs perhaps three numbers. Not thirty. When a screen shows exactly the three numbers behind a decision someone makes every week, they open it every week. It really is that plain."),
      h2("Trust is the whole product"),
      p("The first time a manager spots a figure on the dashboard that does not match the one in their head, they will go and check. If the dashboard was wrong, they will not come back. So most of our effort goes into things you never see: agreeing what \"active customer\" means, making two systems count orders the same way, deciding what happens to refunds."),
      p("It is slow, slightly tedious work and it is what makes the difference between a number people argue about and a number people act on."),
      h2("From looking back to looking ahead"),
      p("Once the basics are trusted, the more interesting uses open up. The same history that tells you who left last quarter can point to who is likely to leave next quarter. The same transaction records that feed a monthly report can flag an unusual pattern the day it happens."),
      ul(
        "Spotting customers who are drifting before they cancel.",
        "Catching transactions that do not look like the others.",
        "Scoring risk with more than a gut feeling.",
      ),
      p("None of that works without the unglamorous foundation. Get three honest numbers in front of the right person first. The clever part can follow."),
    ],
  },
  {
    slug: "custom-software-or-off-the-shelf",
    title: "Custom software or off the shelf? An honest way to decide",
    excerpt:
      "We build custom software for a living, and we still tell some clients to buy a product instead. Here is the test we use.",
    topic: "Tailored software",
    art: "/art/tailored-software-development.webp",
    capability: "tailored-software-development",
    date: "2026-10-12",
    minutes: 4,
    body: [
      p("It might seem odd for a company that builds custom software to say this, but a lot of businesses should not commission any. If a well-known product does what you need, buy it. It will be cheaper, it will be there tomorrow, and somebody else will maintain it."),
      p("The interesting question is how to tell when that stops being true."),
      h2("The spreadsheet on the side"),
      p("Here is the clearest signal we know. You bought a CRM or an ERP, and next to it there is a spreadsheet. Then a second one. Your team enters everything twice, once in the system because they must and once in the spreadsheet because that is where the work actually happens."),
      p("That spreadsheet is a description of the software you need. It exists because your process has a shape the product does not. When the workaround has become the real system, you are already paying for custom software. You are just paying in hours instead of invoices."),
      h2("Is this the part that makes you different?"),
      p("Nobody wins customers with their payroll. For the parts of your business that work the same as everyone else's, standard tools are fine. Custom software earns its cost in the part that is specifically yours: the way you quote, the way you route deliveries, the way you approve a loan."),
      ul(
        "If the process is ordinary, buy.",
        "If the process is your advantage, build.",
        "If you are unsure, try the product for three months and count the workarounds.",
      ),
      h2("What building actually involves"),
      p("A custom system is not a single big delivery. We gather what you need, design it, build it in pieces you can look at, test it, launch it and then keep looking after it. The looking after matters most. Your business will change, and the software has to change with it."),
      p("Done well, the result feels strangely unremarkable. People open it, do their job and close it. Nobody needs training because the screens match how they already think. That quiet fit is what you are paying for, and it is something a general-purpose product cannot give you."),
    ],
  },
  {
    slug: "making-a-dedicated-team-work",
    title: "How to make a dedicated technical team work for you",
    excerpt:
      "Adding outside developers can save a project or stall it. The difference usually comes down to a handful of habits in the first month.",
    topic: "Embedded teams",
    art: "/art/technical-team-hiring.webp",
    date: "2026-10-12",
    minutes: 4,
    body: [
      p("Bringing in a dedicated team is a little like having builders in your house. It goes well when you are clear about what you want, available when they have questions, and honest when something is not right. It goes badly when you hand over the keys and hope."),
      p("We provide developers and IT professionals who work as part of our clients' teams, so we have seen both versions. These are the habits that separate them."),
      h2("Say what you need in roles, not headcount"),
      p("\"We need three developers\" tells us very little. \"We need someone who can own the mobile app, and two people to clear the backlog on the admin panel\" tells us who to bring. The more specific you are about skills and responsibility, the better the match, and the sooner people are useful."),
      h2("Treat them as your team"),
      p("The teams that deliver are the ones that sit in the same stand-up, use the same tools and hear the same bad news as everyone else. If the outside developers only learn about a change of plan a week later, you have built a delay into every decision."),
      ul(
        "One shared channel, not a separate one for \"the vendor\".",
        "One backlog that everybody works from.",
        "A named person on your side who can answer questions the same day.",
      ),
      p("That last point matters more than any process. A developer who waits two days for an answer has lost two days, and so have you."),
      h2("Start with something small and real"),
      p("Give a new team a task that matters but will not sink you if it slips. A contained feature, a neglected bug list. You learn how they communicate, they learn how your code is put together, and both sides find the rough edges while the stakes are low."),
      h2("Keep it flexible"),
      p("Needs change. A launch needs more hands, a quiet quarter needs fewer. The reason to use a dedicated team instead of hiring is that you can adjust without the cost of recruiting or the pain of letting people go. Agree at the start how you will scale up and down, and review it every few months."),
      p("None of this is complicated. It is mostly the ordinary courtesy of working with people. But it is the part most often skipped, and it decides whether the extra hands feel like help or like one more thing to manage."),
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
