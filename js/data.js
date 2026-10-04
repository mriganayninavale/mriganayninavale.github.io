/* Portfolio content. Everything the site renders lives here. */
(function () {
  'use strict';

  /* Pixel sizes of every image, so layouts never jump while pictures load. */
  var DIMS = {"album-ekdantaya":[584,532],"album-tarana":[564,514],"album-xmas-spotify":[605,561],"album-xmas":[993,993],"art-group":[1100,516],"art-ink":[500,662],"art-madhuri":[548,527],"art-painting":[738,915],"art-pencil":[378,530],"art-portrait1":[795,1100],"art-portrait2":[906,655],"art-portrait3":[726,1100],"artworks-laser":[1100,1100],"artworks-piece":[825,1100],"artworks-ultimaker":[1100,1100],"bedrail":[800,883],"bms":[495,378],"carrot":[448,454],"comic-cover":[423,564],"comic-memories":[491,448],"comic-page":[790,607],"delta-arms":[377,303],"delta-drawing":[648,457],"delta-frame":[336,431],"earring-butterfly":[230,190],"earring-geo":[1100,819],"earring-sketch":[1100,816],"faucet-circular":[397,473],"faucet-contours":[688,504],"faucet-crisscross":[634,405],"faucet-illusion":[781,587],"faucet-loop":[1100,809],"faucet-render":[785,469],"faucet-rhino":[617,503],"faucet-sketch":[792,1056],"faucet-streamlines":[919,785],"geist-batch":[720,593],"geist-copper":[547,597],"geist-display":[367,509],"geist-followon":[245,285],"geist-render":[314,367],"geist-steel":[480,583],"h2h-app":[657,1100],"h2h-assumptions":[1600,1331],"h2h-crazy8s":[618,1100],"h2h-deck-market":[1600,958],"h2h-deck-problem":[1600,971],"h2h-eval":[1232,1600],"h2h-hmw":[1196,1600],"h2h-journey":[1600,1037],"h2h-lean":[1600,1126],"h2h-lookfeel":[1500,895],"h2h-persona":[1600,934],"h2h-pitch-canvas":[1600,1080],"h2h-sizing":[1600,1034],"h2h-value-ease":[1600,937],"h2h-vision":[1180,1600],"h2h-vpc":[1600,1207],"handle-concepts":[1100,829],"handle-eight":[484,1100],"handle-faceted":[493,991],"handle-loop":[736,671],"heatsink-side":[382,358],"heatsink-top":[482,430],"hyde-cycle":[1400,932],"hyde-diffusion":[1400,793],"hyde-parts":[615,700],"hyde-services":[1400,735],"idol-cad":[685,495],"idol-proto":[546,397],"idol-test":[255,316],"impeller-sections":[537,428],"impeller":[262,241],"indian-keyring":[362,445],"indian-model":[644,387],"indian-printed":[531,485],"indian-reverse":[527,451],"jacket-back":[526,475],"jacket-front":[500,500],"jw-gyroid":[465,414],"jw-leaf":[519,511],"jw-leafskeleton":[258,462],"jw-voronoi":[368,307],"keychain-print":[535,189],"keychain-render":[272,680],"keychain-side":[569,239],"pen-grip":[724,254],"pen":[298,799],"puma-plots":[433,295],"puma-sim":[550,549],"ring-butterfly":[327,298],"ring-flower":[361,458],"ring-honeycomb":[247,213],"ring-signet":[558,576],"ring-twisted":[326,246],"speaker-alt":[253,182],"speaker-c1":[451,326],"speaker-c3":[413,340],"speaker-c4":[331,301],"speaker-exploded":[791,744],"speaker-final":[813,424],"speaker-mesh":[429,310],"strap-curved":[537,602],"strap-hex":[475,437],"strap-layout":[1100,569],"strap-render":[494,515],"strap-triangle":[818,422],"tate-accounts":[1400,909],"tate-bankside":[750,1000],"tate-benefactors":[887,404],"tate-gaba":[922,599],"tate-team":[825,1100],"tate-visitor":[945,609],"tate-website":[1100,619],"tiger":[1038,976],"trishul-bottle":[408,1100],"trishul-finished":[395,828],"wicci-logo":[708,481],"wicci-poster":[778,1100],"yt-comm-canvas":[1400,787],"yt-mindmap":[1400,787],"yt-moodboard":[850,1050],"yt-pestel":[1400,787],"yt-selection":[1400,787],"yt-trend-canvas":[1184,666],"yt-trend-map":[1400,787]};

  var img = function (n) {
    return (window.IMAGES && window.IMAGES[n]) || 'assets/img/' + n + '.webp';
  };
  var dim = function (n) { return DIMS[n] || [4, 3]; };
  var g = function (n, cap) { var d = dim(n); return { src: img(n), name: n, cap: cap, w: d[0], h: d[1] }; };

  window.PORTFOLIO = {
    email: 'mriganayninavale@gmail.com',
    linkedin: 'https://www.linkedin.com/in/mriganayninavale',
    img: img,
    dim: dim,

    cats: {
      am: 'Additive manufacturing',
      eng: 'University engineering',
      art: 'Graphic design and art'
    },

    /* ------------------------------------------------------------------
       Part 1: MA projects, UCA London 2023–24
       ------------------------------------------------------------------ */
    ma: [
      {
        id: 'ai-trust',
        title: 'Humanizing AI in Brand Management',
        type: 'Master’s dissertation',
        card: 'How retail brands can use AI to personalise and automate without losing their customers’ trust. I built an ethical AI framework from theory, company cases and four expert interviews.',
        team: 'Solo research',
        when: 'July 2024',
        cover: { svg: 'framework', alt: 'Diagram of the ethical AI framework: trust at the centre, eight principles around it, five areas of retail on the outside.' },
        meta: [
          ['Unit', 'EBSC7540 Masters Project'],
          ['Role', 'Sole researcher and author'],
          ['Submitted', '22 July 2024'],
          ['Length', '8,500 words']
        ],
        lede: 'My dissertation asks how retail brands can use artificial intelligence to personalise and automate without losing the trust of their customers. I combined published research, real company examples and interviews with four AI and business experts to build a practical framework for ethical AI in retail.',
        stats: [
          ['72%', 'of consumers worry about how companies use their personal data'],
          ['+14%', 'potential boost to global GDP from AI by 2030 (PwC)'],
          ['+7%', 'revenue from AI-driven staff scheduling'],
          ['4', 'expert interviews across 3 countries']
        ],
        statsNote: 'Figures come from the secondary sources cited in the dissertation.',
        blocks: [
          {
            h: 'The context',
            p: ['AI is already part of everyday shopping. H&M uses it to forecast demand and cut overstock, ASOS offers visual search and virtual try-on, and Stitch Fix recommends clothes from past purchases. These tools raise sales and efficiency, but they also collect a lot of personal data. Retailers needed a way to get the benefits of AI while staying transparent and fair.']
          },
          {
            h: 'What I set out to answer',
            list: [
              'Where is AI used in retail brand management today?',
              'How can AI interactions feel more human, online and in store?',
              'What are the benefits and risks of humanizing AI?',
              'How can AI be used ethically, and what would a working framework look like?'
            ]
          },
          {
            h: 'How I did it',
            steps: [
              ['Literature review', 'The main theories behind AI adoption and ethics: the Technology Acceptance Model, the Resource-Based View, Dynamic Capabilities, Explainable AI, the Fairness-Accountability-Transparency framework and UNESCO’s guidance on AI ethics.'],
              ['Company comparison', 'How H&M, ASOS, Stitch Fix, Netflix and eBay use AI for inventory, dynamic pricing, personalisation and customer service, with the benefit and the risk in each case.'],
              ['Expert interviews', 'Semi-structured interviews over Zoom with an AI scientist in Stuttgart, a data scientist in Berlin, a patent specialist in Bangalore and a business manager in Berlin, recruited through purposive and snowball sampling, each with informed consent.'],
              ['Analysis', 'I coded the transcripts using a five-phase thematic analysis, and used Python’s Natural Language Toolkit (NLTK) to clean and process the text.']
            ]
          },
          {
            h: 'What I found',
            list: [
              'AI brings real gains: better demand forecasts, fewer stock-outs, faster customer service and more relevant recommendations.',
              'The same tools carry risk. Personalisation can trap people in filter bubbles, dynamic pricing can feel unfair, and biased training data can lead to unequal treatment.',
              'Trust depends on openness. Customers accept AI when brands explain how data is used, give them control, and check their systems for bias.'
            ]
          },
          {
            h: 'The framework',
            p: ['Five areas of retail, each with the AI tools involved and the checks a brand should run, all resting on eight principles.'],
            extra: 'framework'
          }
        ],
        outcome: 'A framework for ethical AI that a retail brand could put to work: five areas (inventory, supply chain, staffing, personalisation and customer service), each with its tools and checks, built on eight principles.',
        why: 'This project shows I can run a full research process on my own: framing the question, reviewing theory, recruiting and interviewing experts, analysing the data with code, and turning the findings into something a retail business could use. It also connects directly to my work in retail at H&M.',
        skills: ['Research design', 'Expert interviews', 'Thematic analysis', 'Python (NLTK)', 'Research ethics', 'Retail and AI strategy'],
        gallery: []
      },

      {
        id: 'youtube',
        title: 'YouTube: the shift to shoppable video',
        type: 'Trend forecasting',
        card: 'Team research into where YouTube is heading. We backed in-video shopping, and I built the communication canvas and mood board that pitched the trend to brands and creators.',
        team: 'Team of 4, plus solo work',
        when: 'June–July 2024',
        cover: { img: 'yt-moodboard', alt: 'Mood board: Transforming YouTube, the evolution of e-commerce integration.', pos: '50% 40%' },
        meta: [
          ['Unit', 'EBSC7420 Trends & Forecasting'],
          ['Team', 'Insight Group 3: S. Natarajan, A. Chellakannan, M. Navale, E. Sharma'],
          ['Date', 'June–July 2024'],
          ['Sector', 'Music and entertainment']
        ],
        lede: 'Our team researched YouTube in depth to find the trend most likely to shape its future. We concluded that YouTube is turning into a shopping platform, where fans buy merchandise, albums and tickets without leaving the video. I then built my own communication strategy and mood board to present that trend to brands and creators.',
        stats: [
          ['2.5bn', 'monthly active users on YouTube'],
          ['1bn hrs', 'of video watched every day'],
          ['88%', 'of young people in the UK use YouTube'],
          ['>50%', 'of Gen Z would try a product a YouTuber recommends']
        ],
        blocks: [
          {
            h: 'The brief',
            p: ['Pick a brand in our sector, understand it inside out, scan the outside forces acting on it, spot emerging trends, choose the strongest one and communicate it. Our trend sat under the macro theme “Decentralised Digital Culture”.']
          },
          {
            h: 'What we did',
            steps: [
              ['Brand mind map', 'YouTube’s mission, its four freedoms, brand identity (red and white, Roboto, the Explorer, Everyperson and Creator archetypes), revenue streams, competitors, stakeholders and ESG goals such as running on carbon-free energy 24/7 by 2030.'],
              ['PESTEL analysis', 'Each force in the UK market: pressure to curb misinformation, a slow economic recovery, Gen Z viewing habits, children’s online safety, the carbon cost of streaming (around 11 million tonnes of CO2e a year) and the Online Safety Act 2023.'],
              ['Trend Level Canvas', 'Each trend linked to the forces driving it and the consumer values behind it: YouTube Marketplace, the AI search engine, immersive AR concerts and AI-generated content.'],
              ['Trend spotting and selection', 'We gathered examples, clustered them on a map and scored each trend before choosing one to back.'],
              ['My individual task', 'A Trend Communication Canvas (context, audience, tone of voice, format and level of interaction) and a mood board with keywords and a short trend statement.']
            ]
          },
          {
            h: 'What it solved',
            p: [
              'A clear, evidence-backed answer to “where is YouTube heading?”. In-video shopping, such as the YouTube × Merchbar partnership that lets artists sell official merch beside their videos, uses YouTube’s huge creator network to drive sales. Brands get a new direct-to-consumer channel, and YouTube earns from transaction fees and partnerships.',
              'My communication plan aimed the trend at marketers, brands and creators, with an informal, influencer-led tone, infographics and interactive demos so they could see how it works.'
            ]
          },
          {
            h: 'My contribution',
            p: ['I worked on the team mind map, PESTEL, trend canvas and trend map, and produced the communication canvas and mood board on my own.']
          }
        ],
        skills: ['Brand research', 'PESTEL', 'Trend forecasting', 'Consumer insight', 'Mood boards', 'Communication strategy'],
        gallery: [
          g('yt-moodboard', 'My mood board: “Transforming YouTube: The Evolution of E-Commerce Integration”.'),
          g('yt-trend-canvas', 'Trend Level Canvas linking each trend to economic, social, technological and political forces (team).'),
          g('yt-mindmap', 'Brand mind map of YouTube.'),
          g('yt-pestel', 'PESTEL analysis for the UK market.'),
          g('yt-trend-map', 'Trend spotting map.'),
          g('yt-selection', 'Trend spot description and selection canvases.'),
          g('yt-comm-canvas', 'My Trend Communication Canvas: context, audience, tone of voice, format and interaction.')
        ]
      },

      {
        id: 'market-entry',
        title: 'Choosing a market to enter',
        type: 'Strategy and decision-making',
        card: 'Seven countries, five criteria, one budget. I used SMART scoring and cost-benefit analysis to recommend a market, then stress-tested the answer.',
        team: 'Solo',
        when: 'May 2024',
        cover: { svg: 'chart', alt: 'Scatter chart of seven countries by score and set-up cost, with Country C highlighted.' },
        meta: [
          ['Unit', 'EBSC7380 Strategy & Decision-Making'],
          ['Role', 'Solo'],
          ['Date', 'May 2024'],
          ['Length', '1,480 words']
        ],
        lede: 'A company wanted to expand abroad and had seven countries to choose from. I used a structured scoring method and a cost-benefit analysis to recommend the best market, then tested whether the recommendation still held if the company was willing to pay more for a better score.',
        stats: [
          ['75', 'score for Country C, the highest on the shortlist'],
          ['£420k', 'set-up cost for Country C, the lowest on the shortlist'],
          ['7', 'countries compared on five criteria'],
          ['£4,615', 'highest cost per extra point on the shortlist, under the £6,000 limit']
        ],
        blocks: [
          {
            h: 'The challenge',
            p: ['Each country was scored on five criteria: distance, culture, market size, GDP and technology. Each also had a different set-up cost, from £300,000 to £700,000. The manager would pay up to £6,000 for every extra point of score. The question was which country gave the most benefit for the money.']
          },
          {
            h: 'What I did',
            steps: [
              ['Reviewed the weights', 'The original model put distance first and technology last. I argued that market size, GDP and technology should carry the most weight (100 each), since they drive revenue, digital sales and long-term growth, with culture at 80 and distance at 90.'],
              ['Calculated the scores', 'Using SMART (Simple Multi-Attribute Rating Technique), I normalised the weights and worked through Country A’s score step by step, confirming it at 50.08.'],
              ['Plotted cost against benefit', 'I charted all seven countries to see which offered high scores at reasonable cost, and shortlisted C, F and A.'],
              ['Ran a sensitivity check', 'I worked out the cost per extra point between each pair on the shortlist and compared it with the £6,000 limit.']
            ]
          },
          {
            h: 'Score against cost',
            extra: 'chart'
          }
        ],
        outcome: 'Recommendation: Country C. It scores 75, the highest on the shortlist, and costs £420,000 to set up, the lowest on the shortlist, so it beats F (62, £480,000) and A (50, £460,000) on both counts. The cost per extra point between shortlisted pairs ranged from £1,600 to £4,615, all below the £6,000 limit, so the choice held up under the sensitivity test.',
        why: 'Commercial, partnerships and product teams make this kind of call all the time: comparing options on several criteria, putting a number on each, and backing a recommendation with reasoning a manager can follow.',
        skills: ['Multi-criteria decision analysis', 'SMART', 'Cost-benefit analysis', 'Sensitivity testing', 'Market-entry strategy'],
        gallery: []
      },

      {
        id: 'tate',
        title: 'Tate Modern: art, money and access',
        type: 'Creative industries case study',
        card: 'How a free, publicly funded gallery moves the art market, reaches people online, and pays its way after visitor numbers collapsed.',
        team: 'Team of 4',
        when: 'May 2024',
        cover: { img: 'tate-team', alt: 'Our team on a research visit to Tate Modern.', pos: '50% 38%' },
        meta: [
          ['Unit', 'EBSC7160 Global Creative Industries'],
          ['Team', 'M. Navale, O. Alabi, P. Augustine Selvaradjou, S. Natarajan'],
          ['Date', 'May 2024'],
          ['Format', 'Presentation and 1,996-word report']
        ],
        lede: 'We studied Tate Modern to understand how a free, publicly funded gallery shapes the commercial art market, how it reached new audiences through digital channels, and how it funds itself after visitor numbers collapsed during COVID-19.',
        stats: [
          ['3.07m', 'Tate visitors in 2021–22, down from 8.26m in 2019–20'],
          ['~£9m', 'deficit in the year to March 2023, as costs rose by over £30m'],
          ['41%', 'share of international visitors at Tate Modern, down from 50%'],
          ['11m+', 'social media followers, the UK’s top cultural account']
        ],
        blocks: [
          {
            h: 'The context',
            p: ['The global art market was worth about $65 billion in 2023, down from nearly $68 billion in 2022. It rests on collectors, artists and institutions such as galleries, museums and auction houses. Tate Modern, opened in 2000 in the former Bankside Power Station, is one of the most visited galleries in the world, with over 5 million visitors a year and free entry to its permanent collection.']
          },
          {
            h: 'What we did',
            p: ['A qualitative case study from secondary research: Tate’s annual reports and accounts, academic work on art markets (including Lazzaro et al., 2021) and industry sources. We looked at four areas.'],
            defs: [
              ['Market influence', 'How a Tate show changes an artist’s value. Yayoi Kusama’s Infinity Mirror Rooms confirmed her as a leading contemporary artist, with sales passing $80.9 million in 2023. After his Tate exhibitions, Meschac Gaba’s sales rose 40%, his work gained 10,000+ social mentions, and he was nominated for the Turner Prize.'],
              ['Digital engagement and inclusion', 'The website drew 18M+ visitors in 2020 and a record 20M in 2021. Tate Kids users grew 250%, views of the Tate Paint game grew 1,400%, and the YouTube channel passed 250,000 subscribers. We also covered the Race Equality Taskforce and a partnership with Guaranty Trust Bank Nigeria to acquire African art.'],
              ['Visitor experience', 'UNIQLO Tate Play, Tate Draw, Tate Kids Cinema and Yoko Ono’s Wish Tree, recorded with our own photos on site.'],
              ['Funding', 'Private income (members, patrons, philanthropy and partners such as Hyundai and UNIQLO), Tate’s trading arms (Tate Commerce, Tate Eats, Tate Business) and public funding from the DCMS and the National Lottery.']
            ]
          },
          {
            h: 'What it solved',
            p: ['Tate Modern’s influence reaches well beyond its walls. A Tate exhibition can validate an artist and lift prices worldwide, and its digital channels kept audiences engaged when the doors were shut. The weak point is money: visitors dropped sharply, international tourism had not recovered, and the gallery ran a deficit of nearly £9 million.']
          }
        ],
        outcome: 'Galleries will need to run more like refined retail businesses: more private and commercial income, more partnerships and sustained investment in digital, while keeping the public mission of free, inclusive access.',
        skills: ['Case-study research', 'Financial report analysis', 'Cultural sector strategy', 'Digital engagement', 'Presentation design'],
        gallery: [
          g('tate-team', 'Our team on our research visit to Tate Modern.'),
          g('tate-bankside', 'On site at Bankside, with St Paul’s across the river.'),
          g('tate-visitor', 'Visitor experience we documented: UNIQLO Tate Play, Tate Draw, Tate Kids Cinema and Yoko Ono’s Wish Tree.'),
          g('tate-benefactors', 'The founding benefactors wall: evidence of how much Tate relies on private giving.'),
          g('tate-gaba', 'Meschac Gaba’s “Game Room” (1997–2002), part of the Tate collection. His sales rose 40% after his Tate shows.'),
          g('tate-website', 'Tate’s website, which drew a record 20M visits in 2021.'),
          g('tate-accounts', 'Income and spending breakdown from Tate’s 2022–23 annual accounts.')
        ]
      },

      {
        id: 'h2h',
        title: 'H2H: helping international students break into the creative industries',
        cardTitle: 'H2H: a mentorship app for international students',
        type: 'Human-centred design sprint',
        card: 'A five-week design-thinking sprint with a team of seven: from a real student problem to a validated, pitched mentorship app.',
        team: 'Team of 7',
        when: 'Feb–Mar 2024',
        cover: { img: 'h2h-app', alt: 'App mock-up: the UCA Masters Project Mentorship Program home screen.', pos: '50% 46%' },
        meta: [
          ['Unit', 'EBSC7230 Human-Centred Innovation & Design'],
          ['Team', 'Aishwarya, Gail, Lily, Mahyar, Mriganayni, Roshma, Swati'],
          ['Date', 'February–March 2024, a five-week sprint'],
          ['Output', 'Validated app concept and a live team pitch']
        ],
        lede: 'Our seven-person team took a real student problem all the way from research to a pitched business idea. We started with the struggle international students face balancing study, work and life in the creative industries, and ended with a mentorship app that helps them gain the skills, experience and contacts they need to get hired.',
        stats: [
          ['5', 'weeks from first research to final pitch'],
          ['7', 'team members from different backgrounds'],
          ['15+', 'design-thinking tools used, from persona to pitch evaluation'],
          ['3 months', 'free trial planned for early adopters']
        ],
        blocks: [
          {
            h: 'The challenge',
            p: ['Our brief was the work-life balance of students in creative agencies. Many international students in the UK juggle coursework, part-time jobs, visa limits on working hours, tuition fees and rent, often far from home and with a language barrier. We wanted to understand what really holds them back, and design something that helps.']
          },
          {
            h: 'How we worked',
            defs: [
              ['Week 2: explore the problem', 'A persona, “Junkook”, a 25-year-old international MA student with a graphic and UI/UX background, renting a flat and looking for work. We mapped his pains, gains and jobs-to-be-done, drew a six-phase customer journey map, sized each pain by frequency and severity, wrote an interview script to validate it, and turned insights into “How Might We” statements.'],
              ['Week 3: develop solutions', 'A problem statement, then individual brainwriting and Crazy 8s. My ideas included LinkedIn profile building, in-app internships and job openings, networking events and webinars, and academic writing support. We plotted ideas on a value-versus-effort matrix and agreed a concept, “Creative Industry Speed-Dating for Networking”, captured in a Value Proposition Canvas and a Vision Card.'],
              ['Week 4: define the business model', 'A Lean Canvas, a B2C revenue model, a map of our riskiest assumptions (such as how much students would pay, and whether universities would answer queries within 24 hours) and an experiment picker to decide how to test them.'],
              ['Week 5: pitch', 'A pitching canvas and deck, dry runs, peer scoring with the pitch evaluation sheet, and a live pitch to the class jury.']
            ]
          },
          {
            h: 'What we found',
            p: ['The real problem was bigger than time management. As we validated it, the core issue became clear: students lack the professional experience and skills to succeed in the creative industries. That gap shows up as five barriers: the gap between education and industry, portfolio building, professional networking, economic and structural barriers, and students not recognising the problem themselves. University platforms like Blackboard and Moodle handle coursework but do nothing to connect students with industry.']
          },
          {
            h: 'My contribution',
            p: ['I worked on every team canvas, generated ideas through brainwriting and Crazy 8s, and wrote a critical reflection each week. The biggest lesson came in Week 4: an idea, however good it looks, carries little weight until it has been tested with real users. The best features came straight from listening to students’ pains rather than from what we assumed they wanted.']
          }
        ],
        outcome: 'A mentorship app built around students’ master’s projects. It matches each student with creative professionals on shared interests, builds skills such as communication, adaptability and time management, and brings jobs, internships, events and portfolio support into one place. It would launch with a three-month free trial for UCA students and earn from subscriptions, sponsorships, advertising and university partnerships.',
        skills: ['Design thinking', 'Personas', 'Customer journey mapping', 'Problem validation', 'HMW statements', 'Crazy 8s and brainwriting', 'Value Proposition Canvas', 'Lean Canvas', 'Assumption mapping', 'Pitching', 'Miro'],
        gallery: [
          g('h2h-persona', 'Week 2: team persona “Junkook”, with pains, gains, jobs-to-be-done, reality, quotes and context.'),
          g('h2h-journey', 'Week 2: customer journey map with phases, actions, feelings and channels.'),
          g('h2h-sizing', 'Week 2: problem sizing canvas, with user segments, frequency and severity.'),
          g('h2h-hmw', 'Week 2: “How Might We” statements, with eight variations to widen the ideas.'),
          g('h2h-value-ease', 'Week 3: ideas plotted by value and ease.'),
          g('h2h-crazy8s', 'Week 3: my Crazy 8s sketches.'),
          g('h2h-vpc', 'Week 3: Value Proposition Canvas.'),
          g('h2h-vision', 'Week 3: vision card and value proposition statement.'),
          g('h2h-lean', 'Week 4: Lean Canvas, 4 March 2024.'),
          g('h2h-assumptions', 'Week 4: assumption mapper, deciding what to test first.'),
          g('h2h-pitch-canvas', 'Week 5: pitching canvas with problem, solution, value, credibility, next steps and Q&A.'),
          g('h2h-deck-problem', 'Week 5: pitch deck, the problem and its five barriers.'),
          g('h2h-deck-market', 'Week 5: pitch deck, target audience, credibility, call to action and market strategy.'),
          g('h2h-app', 'App mock-up: the UCA Masters Project Mentorship Program home screen.'),
          g('h2h-lookfeel', 'The look and feel we chose: illustration style, typeface and colour palette.'),
          g('h2h-eval', 'Week 5: pitch evaluation sheet with peer feedback scores.')
        ]
      },

      {
        id: 'podcast',
        title: 'Brand Builders: AI for startups',
        type: 'Podcast',
        card: 'A two-episode podcast I scripted and hosted, explaining AI to students and first-time founders through 13 brand case studies.',
        team: 'Host and scriptwriter',
        when: 'December 2023',
        cover: { svg: 'wave', alt: 'Audio waveform for the Brand Builders podcast.' },
        meta: [
          ['Format', 'Two episodes, about 30 minutes each'],
          ['Role', 'Host and scriptwriter'],
          ['Date', 'December 2023'],
          ['Audience', 'Students and early-stage founders']
        ],
        lede: 'Brand Builders is a podcast I scripted and hosted for students and first-time founders who know they need technology but feel lost in the “tech maze”. Over two episodes it explains how AI and data shape the brands we use every day, and how a small startup can use the same ideas.',
        stats: [
          ['35%', 'of Amazon’s sales come from its recommendations'],
          ['80%', 'of Netflix viewing is driven by its algorithm'],
          ['60m', 'people use Spotify’s Discover Weekly every week'],
          ['13', 'brand case studies across two episodes']
        ],
        blocks: [
          {
            h: 'The idea',
            p: ['Most AI content is either hype or jargon. I wanted something friendly and practical, so the show opens with a story everyone recognises: searching for a puffer jacket during a London cold snap, then suddenly seeing jacket ads on Instagram, YouTube and Facebook. From there it explains the AI behind that moment and what it means for a brand.']
          },
          {
            h: 'What I did',
            list: [
              'Planned both episodes and timed every segment.',
              'Researched and wrote 13 brand case studies: Amazon, Netflix, Spotify, Adobe Sensei, ChatGPT, Zoom, Robinhood, Tempus, Tesla, Grammarly, Warby Parker, Airbnb and Pret A Manger.',
              'Explained machine learning, neural networks, deep learning, NLP, computer vision and reinforcement learning through everyday examples, like a local pizza shop using its own sales data to stop wasting cold pizza.',
              'Wrote short dialogue scenes, such as two students discovering Club Pret’s subscription, to show personalisation and loyalty in action.',
              'Brought in personal moments, like my own Spotify Wrapped, to keep it relatable.'
            ]
          },
          {
            h: 'Episode structure',
            extra: 'episodes'
          }
        ],
        outcome: 'The show turns AI from a buzzword into something a small brand can act on: where AI already shapes buying decisions, and which tools fix common startup problems in operations, finding customers, hiring, cybersecurity, scaling and planning in an uncertain market.',
        why: 'It shows I can take research and turn it into engaging content, in a voice that fits the audience.',
        skills: ['Scriptwriting', 'Storytelling', 'Audio content', 'Research', 'Explaining technical topics simply', 'Brand case studies'],
        episodes: [
          { t: 'Episode 1: Empowering Startups with AI and Technology', s: [[2, 'Intro'], [8, 'How AI changed startups'], [10, 'Startup challenges and tech fixes'], [5, 'AI jargon explained'], [5, 'Recap and teaser']] },
          { t: 'Episode 2: Tech-Powered Strategies for Startup Growth', s: [[3, 'Recap'], [10, 'Data-led decisions'], [8, 'Customer connection (Club Pret)'], [7, 'Future tech: AR/VR fitting rooms'], [2, 'Close']] }
        ],
        gallery: []
      },

      {
        id: 'hyde',
        title: 'Hyde Engineering and the NASA MM1 parts',
        type: 'Creative thinking',
        card: 'How a UK manufacturer used 3D printing to build parts for a NASA Mars mission, and how it could market that innovation to win more work.',
        team: 'Solo, video',
        when: 'November 2023',
        cover: { img: 'hyde-parts', alt: '3D-printed prototype parts, including an impeller and housings.', pos: '50% 60%' },
        meta: [
          ['Unit', 'EBSC7550 Creative Thinking'],
          ['Role', 'Solo'],
          ['Date', 'November 2023'],
          ['Format', 'Video presentation']
        ],
        lede: 'A critical reflection on creative practice, told through Hyde Engineering, a UK manufacturer. I looked at how the company used creative problem-solving and additive manufacturing to build components for a NASA Mars mission, and how it could market that innovation to win more work.',
        stats: [
          ['7', 'design requirements for space-grade parts'],
          ['12', 'stages in the strategic design cycle'],
          ['Weeks', 'saved on prototype lead times'],
          ['~10×', 'lower cost per part, an order of magnitude']
        ],
        blocks: [
          {
            h: 'The company',
            p: ['Hyde Engineering grew from a pilot operation in 2013 into a firm offering CNC machining, 3D printing, work-holding and reverse engineering to aerospace, defence, medical, automotive and motorsport, marine and nuclear clients. Its challenges: cutting the cost of aerospace parts, meeting tight deadlines, testing material performance, generating design ideas quickly, marketing itself well and meeting demanding client needs.']
          },
          {
            h: 'The NASA MM1 job',
            p: ['For the Mars Mission MM1, the team had to build several components that met seven requirements: suitability for space conditions, additive manufacturing limits, reliable end-use performance, minimal material use, exact dimensions, ease of printing, and low weight.']
          },
          {
            h: 'What I did',
            list: [
              'Mapped the company’s history and services, from 2013 through to its new facility and machine investment.',
              'Drew a strategic design cycle with twelve stages, from project need analysis and concept generation through simulation, printing and post-processing to client feedback and redesign.',
              'Applied creativity theory, including IDEO’s human-centred design mindsets and David Gauntlett’s “making is connecting”.',
              'Analysed the project as a disruptive innovation, and used the diffusion of innovation curve to plan how the technology could spread to new clients.'
            ]
          },
          {
            h: 'What it solved',
            p: ['Additive manufacturing made space-grade parts faster and cheaper. Full-scale avionics boxes, relays, bus bars, connectors and other mock-ups were printed in-house, saving weeks of lead time at an order of magnitude lower cost per part. Alternative materials cut payload weight and passed rigorous testing for space conditions.']
          }
        ],
        outcome: 'I closed with a seven-point marketing plan: client success stories, new 3D models, webinars and expert sessions, industry exhibitions, partnerships with larger companies, online classes, and design challenges to engage the market and recruit talent.',
        skills: ['Innovation theory', 'Design thinking', 'Additive manufacturing', 'Process mapping', 'B2B marketing', 'Video presentation'],
        gallery: [
          g('hyde-parts', '3D-printed prototype parts, including an impeller and housings, made in-house in a fraction of the usual lead time.'),
          g('hyde-cycle', 'The strategic design cycle I mapped, from project need analysis through printing to client feedback and redesign.'),
          g('hyde-services', 'Hyde Engineering’s four service lines: work-holding, CNC machining tools, 3D printing and reverse engineering.'),
          g('hyde-diffusion', 'Diffusion of innovation curve, used to plan how the technology could reach new clients.')
        ]
      },

      {
        id: 'artworks',
        title: 'Mriganayni Art Works.Co',
        type: 'Making and prototyping',
        card: 'A gold 3D-printed gyroid and a laser-engraved QR plaque: a business card people keep on their desk. The same shape floats behind this website.',
        team: 'Solo, design and make',
        when: '2024',
        cover: { img: 'artworks-piece', alt: 'Gold-finished gyroid with the engraved QR plaque.', pos: '50% 42%' },
        meta: [
          ['Setting', 'UCA workshop'],
          ['Role', 'Solo: design and make'],
          ['Date', '2024'],
          ['Processes', 'FDM 3D printing, laser engraving']
        ],
        lede: 'A small physical object that works as both an art piece and a personal brand touchpoint. A 3D-printed gyroid lattice, finished in gold, sits behind a laser-engraved acrylic plaque with a QR code that opens my digital contact card.',
        blocks: [
          {
            h: 'What I made and how',
            defs: [
              ['The form', 'A gyroid, a repeating mathematical surface used in lightweight engineering parts. It is strong, light and visually striking.'],
              ['Printing', 'Printed on an Ultimaker 3 Extended FDM printer in the university workshop, then finished in gold.'],
              ['The plaque', 'A clear acrylic block, laser-engraved with a QR code and the name “Mriganayni Art Works.Co”.'],
              ['The digital link', 'The QR code opens a contact page with my details and website, so the object leads straight to me online.']
            ]
          },
          {
            h: 'What it solved',
            p: ['It turns a business card into something people keep on their desk. The piece also brings together both sides of my background: the lattice geometry comes from my engineering work in additive manufacturing, and the plaque and QR link apply brand thinking to make it a working touchpoint.', 'The gold particle shape you see on this website is the same gyroid surface, drawn live in three.js.']
          }
        ],
        skills: ['3D modelling', 'Ultimaker printing', 'Laser engraving', 'Finishing', 'Personal branding', 'Physical-to-digital design'],
        gallery: [
          g('artworks-piece', 'Finished piece: gold-finished gyroid with the engraved QR plaque.'),
          g('artworks-ultimaker', 'The print on the Ultimaker 3 Extended.'),
          g('artworks-laser', 'Laser-engraving the acrylic plaque.')
        ]
      }
    ],

    /* ------------------------------------------------------------------
       Part 2: archive, 2017–2022
       ------------------------------------------------------------------ */
    archive: [
      {
        title: 'Additively manufactured faucets', cat: 'am',
        short: 'HSIL, via Intech Additive Solutions',
        ctx: 'Client: Hindustan Sanitaryware & Industries Ltd (HSIL). Nov 2021 – Apr 2022, Intech Additive Solutions.',
        desc: 'A range of luxury faucets for India’s largest sanitaryware maker, designed to show what metal 3D printing can do that casting cannot. Printed in stainless steel using Laser Powder Bed Fusion, with seamless sculptural forms, thin but strong walls and several parts merged into one. Concepts included the Illusion, Criss Cross and Circular faucets.',
        role: 'Sketched and modelled concepts, ran Finite Difference Method analysis and testing, and took part in final assembly and water testing.',
        result: 'Cut manufacturing cost by 20% and part volume by 25%.',
        cover: 'faucet-render', fit: 'contain',
        images: [
          g('faucet-render', 'Rendered pair of gold-finish faucets on a marble basin.'),
          g('faucet-sketch', 'Early concept sketches on paper and a drawing tablet.'),
          g('faucet-rhino', 'Faucet and basin modelled in Rhino.'),
          g('faucet-streamlines', 'Flow simulation: velocity streamlines through the spout.'),
          g('faucet-contours', 'Flow simulation: velocity contours used to check water flow.'),
          g('faucet-illusion', 'Illusion faucet: an optical-illusion frame that looks impossible to make.'),
          g('faucet-crisscross', 'Criss Cross faucet: water flows through a cluster of crossing bars.'),
          g('faucet-circular', 'Circular faucet: stacked, offset blocks forming a ring.'),
          g('faucet-loop', 'Sketch for a further faucet idea using looping forms.')
        ]
      },
      {
        title: 'Apple Watch strap', cat: 'am',
        short: 'Intech Additive Solutions',
        ctx: 'Intech Additive Solutions, 2021–22.',
        desc: 'A stainless-steel chain-mail strap for the Apple Watch Series 7, modelled to print in one piece. The links move like fabric, so the strap is flexible, light and comfortable with no visible joints. Several chain-mail patterns were printed and tested before choosing the final design.',
        role: 'Designed and modelled the strap and the chain-mail variations, and tested printed samples.',
        result: 'Cut time to market by 40% and purchase-order turnaround by 35%.',
        cover: 'strap-curved',
        images: [
          g('strap-render', 'Render of the chain-mail strap on the watch.'),
          g('strap-layout', 'Flat layout of two strap patterns.'),
          g('strap-triangle', 'Printed test sample: triangular links.'),
          g('strap-curved', 'Printed test sample: interlocking curved links.'),
          g('strap-hex', 'Printed test sample: hexagonal links.')
        ]
      },
      {
        title: 'Centrifugal pump impeller', cat: 'am',
        short: 'Titanium, EOS M290',
        ctx: 'Intech Additive Solutions, 2021–22.',
        desc: 'A pump impeller printed in titanium (Ti6Al4V) on an EOS M290 metal printer using DMLS/SLM. I refined the CAD model for low weight, high strength, toughness and corrosion resistance, and made sure it could be printed and post-processed reliably.',
        role: 'CAD redesign and print preparation.',
        cover: 'impeller',
        images: [
          g('impeller', 'The finished impeller, printed in titanium.'),
          g('impeller-sections', 'Printed impeller sections showing the curved blades.')
        ]
      },
      {
        title: 'Gyroid heat sink', cat: 'am',
        short: 'Intech Additive Solutions',
        ctx: 'Intech Additive Solutions, 2021–22.',
        desc: 'A heat sink built from gyroid lattices, a shape only possible with 3D printing. The curved fins encourage natural airflow and give far more surface area than a standard finned heat sink, which improves cooling. The gyroid was compared with other lattice types, such as the Schwarz primitive, during evaluation.',
        role: 'Lattice design, modelling and design comparison.',
        result: '2.3× the structural thermal performance of a conventional heat sink, with component failures down 18%.',
        cover: 'heatsink-top',
        images: [
          g('heatsink-side', 'Printed gyroid heat sink, side view.'),
          g('heatsink-top', 'Top view, showing the open lattice that lets air flow through.')
        ]
      },
      {
        title: 'Heart pendant for Geist Brewing Co.', cat: 'am',
        short: 'Geist Brewing Company, Bangalore',
        ctx: 'Client: Geist Brewing Company, Bangalore. Intech Additive Solutions.',
        desc: 'An abstract heart pendant with the brewery’s name at its centre, printed in gold, copper, Inconel, titanium and steel. Support-free, feather-light and low-waste, with fine internal channels. Over 100 iterations went into a pendant that printed perfectly at low cost, and more heart designs followed.',
        role: 'Design in RhinoGold, iteration and quality testing across metals.',
        cover: 'geist-copper',
        images: [
          g('geist-render', 'Render of the Geist heart pendant.'),
          g('geist-copper', 'Printed in copper.'),
          g('geist-steel', 'Printed in steel.'),
          g('geist-display', 'The pendant on display.'),
          g('geist-followon', 'Render of a follow-on heart design.'),
          g('geist-batch', 'A batch of copper heart pendants straight off the build plate.')
        ]
      },
      {
        title: 'Voronoi, gyroid and leaf jewellery', cat: 'am',
        short: 'Parametric design in Grasshopper',
        ctx: 'Intech Additive Solutions, 2021–22.',
        desc: 'Bracelets and pendants based on natural and mathematical patterns: a Voronoi bracelet, a gyroid bracelet and leaf-skeleton designs with cells only 0.4 mm thick. Modelled in Rhino with Grasshopper and Weaverbird, printed without supports and with zero material waste. None of them could be made by traditional methods.',
        role: 'Parametric design and modelling.',
        cover: 'jw-voronoi',
        images: [
          g('jw-voronoi', 'Voronoi bracelet render.'),
          g('jw-gyroid', 'Gyroid bracelet render.'),
          g('jw-leafskeleton', 'Leaf-skeleton bracelet with 0.4 mm cells.'),
          g('jw-leaf', 'Leaf pendant based on a real leaf’s veins.')
        ]
      },
      {
        title: 'Rings and earrings', cat: 'am',
        short: 'RhinoGold and Materialise Magics',
        ctx: 'Intech Additive Solutions, 2021–22.',
        desc: 'Rings and earrings with very fine channels and lightweight forms that only metal printing can achieve, again with zero waste. Designed in RhinoGold and Grasshopper, with files prepared in Materialise Magics.',
        role: 'Design, modelling and print preparation.',
        cover: 'ring-signet',
        images: [
          g('ring-flower', 'Flower ring with perforated petals.'),
          g('ring-signet', 'Signet ring with a Voronoi lattice face.'),
          g('ring-honeycomb', 'Honeycomb band ring.'),
          g('ring-butterfly', 'Butterfly cut-out ring.'),
          g('ring-twisted', 'Twisted lattice ring.'),
          g('earring-butterfly', 'Butterfly earring render.'),
          g('earring-sketch', 'Earring concept sketches.'),
          g('earring-geo', 'Geometric earring sketches.')
        ]
      },
      {
        title: 'Voronoi keychain', cat: 'am',
        short: 'Intech Additive Solutions',
        ctx: 'Intech Additive Solutions, 2021–22.',
        desc: 'A light but strong keychain with a Voronoi lattice body and sockets sized to hold keys and small accessories.',
        role: 'Design and modelling.',
        cover: 'keychain-render', fit: 'contain',
        images: [
          g('keychain-render', 'Keychain render, front.'),
          g('keychain-print', 'Printed keychain.'),
          g('keychain-side', 'Printed keychain, side view.')
        ]
      },
      {
        title: 'Indian Motorcycle rider keychain', cat: 'am',
        short: 'Indian Motorcycle riders group',
        ctx: 'Client: Indian Motorcycle riders group. Intech Additive Solutions.',
        desc: 'A metal-printed medallion keychain for an Indian Motorcycle riders’ event, combining the brand’s emblem with the group name and event title. It needed to be strong, light and feel like it belonged on a ride.',
        role: 'Design to the client brief.',
        cover: 'indian-printed',
        images: [
          g('indian-model', '3D model of the medallion.'),
          g('indian-reverse', 'Model of the reverse face for the anniversary ride.'),
          g('indian-printed', 'The printed medallion.'),
          g('indian-keyring', 'In use as a keyring.')
        ]
      },
      {
        title: 'Metal 3D-printed pen', cat: 'am',
        short: 'Intech Additive Solutions',
        ctx: 'Intech Additive Solutions, 2021–22.',
        desc: 'A pen with smooth, slender lines and a textured grip that could not be machined conventionally. Light, durable and easy to carry.',
        role: 'Design and modelling.',
        cover: 'pen-grip', fit: 'contain',
        images: [
          g('pen', 'The printed pen.'),
          g('pen-grip', 'Close-up of the textured grip.')
        ]
      },
      {
        title: 'Door handle sketches', cat: 'am',
        short: 'Personal design study',
        ctx: 'Personal design study.',
        desc: 'Hand sketches for door handles intended for metal printing, showing my early concept and sketching process.',
        role: 'Concept sketching.',
        cover: 'handle-loop',
        images: [
          g('handle-concepts', 'Handle concept sketches.'),
          g('handle-loop', 'Sketch of a looping handle with front and side views.'),
          g('handle-eight', 'Figure-of-eight handle sketch.'),
          g('handle-faceted', 'Faceted lattice handle sketch.')
        ]
      },

      {
        title: 'D-REV portable speaker', cat: 'eng',
        short: 'KLE Technological University',
        ctx: 'KLE Technological University, B.E. Automation & Robotics.',
        desc: 'A portable speaker casing modelled around the parts inside it, shaped to be strong and to improve sound pressure and amplitude. I explored several concept forms, then ran mesh analysis using automatic meshing and local mesh control.',
        role: 'Concept design, modelling and simulation.',
        cover: 'speaker-final', fit: 'contain',
        images: [
          g('speaker-c1', 'Concept sketch 1.'),
          g('speaker-c3', 'Concept sketch 3.'),
          g('speaker-c4', 'Concept sketch 4.'),
          g('speaker-exploded', 'Exploded view of the speaker parts inside the casing.'),
          g('speaker-final', 'The final speaker design.'),
          g('speaker-alt', 'Alternative casing concept.'),
          g('speaker-mesh', 'Mesh and stress analysis of the speaker driver.')
        ]
      },
      {
        title: 'Delta robot', cat: 'eng',
        short: 'Modelled and simulated in SolidWorks',
        ctx: 'KLE Technological University, B.E. Automation & Robotics.',
        desc: 'An industrial delta robot: a fixed base, a moving plate and three parallelogram arms, so the end-effector always keeps its orientation. It included a gripper and two-axis wrist rotation, and was fully modelled, assembled and motion-simulated in SolidWorks with part drawings.',
        role: 'Hardware assembly, modelling and simulation, presentation and documentation.',
        cover: 'delta-arms',
        images: [
          g('delta-frame', 'The delta robot assembly in its frame.'),
          g('delta-arms', 'The three parallelogram arms and moving plate.'),
          g('delta-drawing', 'Part drawing for the motor clamp.')
        ]
      },
      {
        title: 'Idol flaw detection', cat: 'eng',
        short: 'Image processing and deep learning',
        ctx: 'KLE Technological University, team project.',
        desc: 'An automated system that uses image processing and deep learning to find and classify defects in silver idols during manufacturing, saving labour and raising production speed. We followed a five-step engineering design process, from need statement to concept selection with a decision matrix.',
        role: 'Hardware assembly, testing and concept design in SolidWorks; presenter and spokesperson for the team.',
        cover: 'idol-proto',
        images: [
          g('idol-cad', 'CAD model of the inspection set-up.'),
          g('idol-proto', 'The built prototype.'),
          g('idol-test', 'Testing the system with an idol on the conveyor.')
        ]
      },
      {
        title: 'Li-ion battery management system', cat: 'eng',
        short: 'MATLAB simulation and GUI',
        ctx: 'KLE Technological University, team project.',
        desc: 'A battery pack and battery management system for an electric vehicle. The BMS tracks state of charge, state of health and temperature to prevent overcharging and damage, and balances the cells so no energy is wasted.',
        role: 'Project spokesperson; built the MATLAB battery simulation and a MATLAB GUI to display battery parameters.',
        cover: 'bms', fit: 'contain',
        images: [g('bms', 'MATLAB Simulink model of the battery cells and balancing circuit.')]
      },
      {
        title: 'Automatic bed rail for elderly care', cat: 'eng',
        short: 'Mini project, 2019–20',
        ctx: 'KLE Technological University, mini project, 2019–20.',
        desc: 'An assistive bed rail for people aged 60–85 with limited mobility. It combines a fall-prevention rail, an automatic food tray and a call buzzer in one device that locks onto and off the bed, which makes it practical at home where separate devices often won’t fit.',
        role: 'Concept brainstorming, circuit work, hardware assembly and the design of the body and frame; presentation and documentation.',
        cover: 'bedrail',
        images: [g('bedrail', 'The bed rail prototype fitted to a bed.')]
      },
      {
        title: 'Automatic carrot dicing machine', cat: 'eng',
        short: 'Arduino, under ₹4,000 to build',
        ctx: 'KLE Technological University, team project.',
        desc: 'A low-cost kitchen device that dices carrots into even cubes automatically. It runs on Arduino and DC motors, weighs under 10 kg and cost under ₹4,000 to build, with simple, low-maintenance operation.',
        role: 'Concept design, blade design, circuit work and hardware assembly; presentation and documentation.',
        cover: 'carrot',
        images: [g('carrot', 'The working prototype.')]
      },
      {
        title: 'PUMA 560 robot: kinematics and dynamics', cat: 'eng',
        short: 'Research paper, MATLAB',
        ctx: 'KLE Technological University, research paper.',
        desc: 'A study of position control for the PUMA 560 robot arm in MATLAB: DH parameters, forward and inverse kinematics and dynamics, the Jacobian, trajectory generation and torque calculation, with a full simulation model in MATLAB’s Robotics Toolbox.',
        role: 'Analysis, MATLAB modelling and simulation.',
        cover: 'puma-sim', fit: 'contain',
        images: [
          g('puma-sim', 'PUMA 560 simulation in MATLAB.'),
          g('puma-plots', 'Joint position plots from the simulation.')
        ]
      },

      {
        title: 'Indian Motorcycle “Tiger Tribe” logo', cat: 'art',
        short: 'Logo and T-shirt',
        ctx: 'Client: Indian Motorcycle riders group.',
        desc: 'A logo and T-shirt for an Indian Motorcycle riders’ chapter, inspired by the tiger, with bold lines and strong colour to reflect the group’s spirit.',
        role: 'Logo and apparel design.',
        cover: 'tiger', fit: 'contain',
        images: [g('tiger', 'Tiger Tribe Chapter logo.')]
      },
      {
        title: 'Leather riding jacket', cat: 'art',
        short: 'Runner-up, Hero MotoCorp 2020',
        ctx: 'Hero MotoCorp X-Pulse 200 Design Challenge, 2020.',
        desc: 'A leather riding jacket designed for comfort on long rides, with features that make it easier to use on the bike.',
        role: 'Concept and design.',
        result: 'Runner-up in Hero MotoCorp’s 2020 design challenge.',
        cover: 'jacket-front', fit: 'contain',
        images: [
          g('jacket-front', 'Jacket design, front.'),
          g('jacket-back', 'Jacket design, back.')
        ]
      },
      {
        title: 'Trishul Farms milk bottle and brand', cat: 'art',
        short: 'Trishul Farms, Hubballi',
        ctx: 'Client: Trishul Farms Pvt Ltd, Hubballi.',
        desc: 'Branding and packaging for a local premium cow’s milk brand: the logo, brand name, bottle seal and labels for 1 L and 500 ml bottles.',
        role: 'Logo, label and packaging design.',
        cover: 'trishul-finished',
        images: [
          g('trishul-bottle', 'The 1 L bottle and label design.'),
          g('trishul-finished', 'The finished bottle.')
        ]
      },
      {
        title: 'Music album covers', cat: 'art',
        short: 'Released on Spotify and YouTube',
        ctx: 'Clients: Evelien van Buren and Indian artists.',
        desc: 'Cover art for Dutch singer Evelien van Buren’s single “X-Mas Without U”, plus covers for Indian releases such as “Ek Dantaya” and “Tarana”, released on Spotify and YouTube.',
        role: 'Illustration and cover design.',
        cover: 'album-xmas',
        images: [
          g('album-xmas', 'Cover art for “X-Mas Without U” by Evelien van Buren.'),
          g('album-xmas-spotify', 'The cover live on Spotify.'),
          g('album-tarana', '“Tarana” cover on Spotify.'),
          g('album-ekdantaya', '“Ek Dantaya” cover on Spotify.')
        ]
      },
      {
        title: 'Personalised comic book', cat: 'art',
        short: 'Commission',
        ctx: 'Commission.',
        desc: '“Love is a Dream for Two Lives to Share”, a personalised comic book telling a couple’s story through two illustrated characters.',
        role: 'Character design, illustration and storytelling.',
        cover: 'comic-cover',
        images: [
          g('comic-cover', 'Cover of the comic book.'),
          g('comic-memories', '“Memories” page.'),
          g('comic-page', 'Illustrated story page.')
        ]
      },
      {
        title: 'Portraits, sketches and caricatures', cat: 'art',
        short: 'Mriganayni Art Works.Co',
        ctx: 'My own art brand, Mriganayni Art Works.Co.',
        desc: 'Realistic digital portraits, pencil sketches and digital caricatures, sold through my own art brand.',
        role: 'Artist and business owner.',
        result: 'More than 50 caricature orders completed.',
        cover: 'art-portrait1',
        images: [
          g('art-portrait1', 'Digital portrait.'),
          g('art-portrait2', 'Digital portrait.'),
          g('art-painting', 'Digital painting.'),
          g('art-pencil', 'Pencil sketch.'),
          g('art-ink', 'Ink sketch.'),
          g('art-madhuri', 'Caricature of actor Madhuri Dixit.'),
          g('art-group', 'Group caricature commission.'),
          g('art-portrait3', 'Digital portrait.')
        ]
      },
      {
        title: 'WICCI “Vriddhi” logo and media', cat: 'art',
        short: 'WICCI, from Sep 2020',
        ctx: 'Women’s Indian Chamber of Commerce and Industry, September 2020 onwards.',
        desc: 'The Vriddhi logo for WICCI, which helps women grow their businesses globally. I also ran media for the chapter: website, social media, newspaper features, adverts and hoardings, and organising and hosting events.',
        role: 'Graphic designer and media assistant manager.',
        cover: 'wicci-logo', fit: 'contain',
        images: [
          g('wicci-logo', 'The Vriddhi logo.'),
          g('wicci-poster', 'Poster for the WICCI Karnataka council.')
        ]
      }
    ]
  };
})();
