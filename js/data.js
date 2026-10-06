(function () {
  'use strict';

  window.PORTFOLIO = {
    email: 'mriganayninavale@gmail.com',

    dims: {"faucet-render":[785,469],"faucet-streamlines":[919,785],"faucet-contours":[688,504],"faucet-sketch":[792,1056],"faucet-illusion":[781,587],"faucet-crisscross":[634,405],"strap-render":[494,515],"strap-layout":[1100,569],"strap-triangle":[818,422],"strap-curved":[537,602],"strap-hex":[475,437],"heatsink-side":[382,358],"heatsink-top":[482,430],"impeller":[262,241],"impeller-sections":[537,428],"geist-copper":[547,597],"geist-batch":[720,593],"geist-render":[314,367],"jw-voronoi":[368,307],"jw-leafskeleton":[258,462],"ring-signet":[558,576],"speaker-final":[813,424],"speaker-c1":[451,326],"speaker-exploded":[791,744],"speaker-alt":[253,182],"speaker-mesh":[429,310],"h2h-persona":[1600,934],"h2h-app":[657,1100],"h2h-crazy8s":[618,1100],"h2h-value-ease":[1600,937],"h2h-journey":[1600,1037],"h2h-hmw":[1196,1600],"h2h-vpc":[1600,1207],"h2h-assumptions":[1600,1331],"h2h-pitch-canvas":[1600,1080],"yt-moodboard":[850,1050],"yt-comm-canvas":[1400,787],"yt-mindmap":[1400,787],"yt-pestel":[1400,787],"yt-trend-map":[1400,787]},

    highlights: [
      ['−20%', 'Manufacturing cost on luxury faucets for HSIL, India’s largest sanitaryware maker'],
      ['−40%', 'Prototype time to market with a one-piece, pre-assembled printed watch strap'],
      ['100+', 'Design iterations on the Geist pendant, leading to a repeat order from the client'],
      ['5 weeks', 'Research to live pitch for the H2H mentorship app, in a team of seven'],
      ['4', 'Expert interviews in three countries behind an ethical-AI framework for retail brands']
    ],

    chapters: [
      {
        id: 'product',
        n: '01',
        count: '6 projects',
        title: 'Product Design & Engineering',
        lede: 'Before strategy, I learned how to build.',
        intro: 'My Automation & Robotics degree and product design work in metal additive manufacturing taught me to move between concept, geometry, material and production constraints. These projects show how I developed forms, prepared models, compared alternatives and worked with physical prototypes.',
        roles: 'Relevant to product design, design engineering, CAD and product development roles',
        cases: ['faucets', 'strap', 'heatsink', 'impeller', 'geist', 'speaker']
      },
      {
        id: 'strategy',
        n: '02',
        count: '4 projects',
        title: 'Strategy, Innovation & Brand',
        lede: 'Turning research into a clear direction.',
        intro: 'MA work from the University for the Creative Arts, London (2023–2024): a human-centred design sprint, an ethical-AI dissertation, trend forecasting for a global platform and a published business podcast. Team and individual contributions are marked on each project.',
        roles: 'Relevant to design innovation, brand management and brand strategy roles',
        cases: ['h2h', 'ai', 'youtube', 'podcast']
      }
    ],

    cases: [
      {
        id: 'faucets',
        n: '1.1',
        type: 'Client project · Intech Additive Solutions',
        title: 'Additively manufactured faucets',
        tagline: 'Luxury product development through metal 3D printing.',
        cardTitle: 'Faucets for HSIL',
        cardSub: 'Rhino · ANSYS CFD · water test',
        cover: { img: 'faucet-render', alt: 'Rendered gold-finish faucets on a marble basin' },
        meta: [['Client', 'Hindustan Sanitaryware (HSIL)'], ['Date', 'Nov 2021 – Apr 2022'], ['Process', 'Stainless-steel LPBF'], ['Tools', 'Rhino, ANSYS']],
        body: [
          { h: 'Problem', p: 'Develop a range of luxury faucets for India’s largest sanitaryware maker that shows what metal additive manufacturing can do and casting cannot.' },
          { h: 'My role', p: 'Sketching · CAD modelling · Flow analysis · Assembly · Water testing' },
          { h: 'Engineering considerations', tags: ['Thin, strong walls', 'Consolidated parts', 'Water flow', 'Assembly', 'Patina finish'] },
          { quote: 'Three sculptural concepts, Illusion, Criss Cross and Circular, each checked with flow simulation and tested in assembly.' },
          { stats: [['3', 'faucet concepts developed'], ['6', 'months, concept to water test'], ['−20%', 'manufacturing cost*'], ['−25%', 'part volume*']], note: '*Reported results from my work at Intech, through iterative CAD and modular, batch-printed components.' }
        ],
        gallery: [
          ['faucet-render', 'Rendered gold-finish faucets on a marble basin'],
          ['faucet-streamlines', 'Velocity streamlines'],
          ['faucet-contours', 'Velocity contours'],
          ['faucet-sketch', 'Concept sketching'],
          ['faucet-illusion', 'Illusion'],
          ['faucet-crisscross', 'Criss Cross']
        ]
      },
      {
        id: 'strap',
        n: '1.2',
        type: 'Product prototype · Intech Additive Solutions',
        title: 'Apple Watch strap',
        tagline: 'Parametric product design and physical testing.',
        cardTitle: 'Watch strap',
        cardSub: 'Parametric links, printed assembled',
        cover: { img: 'strap-render', alt: 'Strap render' },
        meta: [['Product', 'Apple Watch Series 7 strap'], ['Date', '2021–22'], ['Material', 'Stainless steel'], ['Process', 'SLM 280, one-piece print']],
        body: [
          { h: 'Problem', p: 'Explore a flexible stainless-steel chain-mail strap that prints in one piece, with links that move like fabric and no visible joints.' },
          { h: 'My role', p: 'Modelled the strap and alternative link geometries, then tested printed samples to compare the patterns.' },
          { h: 'Considerations', tags: ['Clearance', 'Movement', 'Weight', 'Comfort', 'Interlocking geometry'] },
          { quote: 'Printing the links already assembled removed conventional manufacturing steps entirely.' },
          { stats: [['3', 'link patterns printed and tested'], ['1', 'piece: printed pre-assembled'], ['−40%', 'time to market for prototypes*']], note: '*Reported result from my work at Intech.' }
        ],
        gallery: [
          ['strap-render', 'Strap render'],
          ['strap-layout', 'Flat layouts of two strap patterns'],
          ['strap-triangle', 'Triangular links'],
          ['strap-curved', 'Interlocking curved links'],
          ['strap-hex', 'Hexagonal links']
        ]
      },
      {
        id: 'heatsink',
        n: '1.3',
        type: 'Design exploration · Intech Additive Solutions',
        title: 'Gyroid heat sink',
        tagline: 'Lattice geometry for thermal applications.',
        cardTitle: 'Gyroid heat sink',
        cardSub: 'Lattice form study',
        cover: { img: 'heatsink-top', alt: 'Top view: the open lattice lets air flow through' },
        meta: [['Date', '2021–22'], ['Geometry', 'Gyroid, Schwarz primitive'], ['Process', 'Metal additive manufacturing']],
        body: [
          { h: 'Problem', p: 'Explore lattice geometry for a heat sink with a large exposed surface area and open airflow paths: a shape only possible with 3D printing.' },
          { h: 'My role', p: 'Modelled gyroid lattices and compared them with alternative structures, including Schwarz primitive geometry.' },
          { h: 'Considerations', tags: ['Surface area', 'Airflow', 'Printability', 'Geometry'] },
          { quote: 'Curved, continuous fins give far more surface than straight fins and leave open channels for air to move through.' },
          {
            h: 'Structures compared',
            table: {
              head: ['Structure', 'Form', 'Made by'],
              rows: [['Standard fins', 'Straight, parallel plates', 'Machining / extrusion'], ['Schwarz primitive', 'Repeating cubic cells', '3D printing only'], ['Gyroid (selected)', 'Continuous curved surfaces', '3D printing only']],
              mark: 2
            },
            note: 'A printed form study: no quantified thermal-performance result is claimed here.'
          }
        ],
        gallery: [
          ['heatsink-side', 'Printed gyroid heat sink, side view'],
          ['heatsink-top', 'Top view: the open lattice lets air flow through']
        ]
      },
      {
        id: 'impeller',
        n: '1.4',
        type: 'Engineering redesign · Intech Additive Solutions',
        title: 'Centrifugal pump impeller',
        tagline: 'Lightweight engineering through metal additive manufacturing.',
        cardTitle: 'Titanium impeller',
        cardSub: 'CAD redesign for DMLS',
        cover: { img: 'impeller-sections', alt: 'Sectioned impeller: curved blades' },
        meta: [['Material', 'Titanium Ti6Al4V'], ['Machine', 'EOS M290'], ['Process', 'DMLS / SLM']],
        body: [
          { h: 'Problem', p: 'Refine an impeller to balance low weight, high strength, toughness and corrosion resistance, and make sure it could be printed and post-processed reliably.' },
          { h: 'My role', p: 'Redesigned the CAD model and prepared it for printing and post-processing.' },
          { h: 'Material / process', flow: ['CAD redesign', 'Build preparation', 'DMLS print', 'Post-processing', 'Sectioning'] },
          { quote: 'Manufactured titanium impeller, with sectioned parts that show the curved blade geometry inside.' },
          { stats: [['4.43', 'g/cm³: Ti6Al4V density ~45% lighter than stainless steel at the same volume'], ['1', 'single printed part, then sectioned for inspection']], note: 'Density comparison uses standard published material values (stainless steel ≈ 8.0 g/cm³).' }
        ],
        gallery: [
          ['impeller', 'Finished impeller, printed in titanium'],
          ['impeller-sections', 'Sectioned impeller: curved blades']
        ]
      },
      {
        id: 'geist',
        n: '1.5',
        type: 'Client project · Intech Additive Solutions',
        title: 'Geist pendant & parametric jewellery',
        tagline: 'Brand identity, printed in five metals.',
        cardTitle: 'Geist pendant',
        cardSub: 'Client piece in five metals',
        cover: { img: 'geist-copper', alt: 'Printed in copper' },
        meta: [['Client', 'Geist Brewing Co., Bangalore'], ['Date', '2021–22'], ['Tools', 'RhinoGold, Grasshopper'], ['Prep', 'Materialise Magics']],
        body: [
          { h: 'Problem', p: 'Turn a brewery’s name into an abstract heart pendant that prints perfectly at low cost: support-free, feather-light and with very little waste.' },
          { h: 'My role', p: 'Designed the pendant, iterated it and quality-tested prints across metals. Parametric bracelets, pendants and rings followed, built from Voronoi, gyroid and leaf-vein patterns.' },
          { quote: 'After 100+ iterations the pendant printed cleanly in every metal, and the client ordered more heart designs.' },
          { stats: [['100+', 'design iterations'], ['5', 'metals: gold, copper, Inconel, titanium, steel'], ['0.4mm', 'cell size in the leaf-skeleton bracelet']] }
        ],
        gallery: [
          ['geist-copper', 'Printed in copper'],
          ['geist-batch', 'Copper batch, straight off the build plate'],
          ['geist-render', 'Pendant render'],
          ['jw-voronoi', 'Voronoi bracelet'],
          ['jw-leafskeleton', 'Leaf skeleton'],
          ['ring-signet', 'Voronoi signet']
        ]
      },
      {
        id: 'speaker',
        n: '1.6',
        type: 'University project · B.E. Automation & Robotics',
        title: 'D-REV portable speaker',
        tagline: 'Product form, assembly and simulation.',
        cardTitle: 'D-REV speaker',
        cardSub: 'Concept, CAD and mesh analysis',
        cover: { img: 'speaker-final', alt: 'Final speaker design', fit: 'contain' },
        meta: [['Institution', 'KLE Technological University'], ['Type', 'Concept to simulation'], ['Methods', 'CAD, mesh analysis']],
        body: [
          { h: 'Problem', p: 'Develop a portable speaker casing around its internal components, shaped to be strong and to improve sound pressure and amplitude.' },
          { h: 'My role', p: 'Concept design · CAD modelling · Assembly layout · Mesh analysis · Simulation' },
          { h: 'Considerations', tags: ['Sound pressure', 'Amplitude', 'Casing structure', 'Component layout'] },
          { quote: 'Four hand-sketched directions narrowed to a capsule form, then validated with automatic meshing and local mesh control.' },
          { stats: [['4', 'concept directions sketched'], ['2', 'casing forms modelled'], ['1', 'driver stress analysis']] }
        ],
        gallery: [
          ['speaker-final', 'Final speaker design'],
          ['speaker-c1', 'Concept 1'],
          ['speaker-exploded', 'Exploded view'],
          ['speaker-alt', 'Alternative casing'],
          ['speaker-mesh', 'Mesh & stress analysis']
        ]
      },
      {
        id: 'h2h',
        n: '2.1',
        type: 'Human-centred design sprint · Team of 7',
        title: 'H2H: into the creative industries',
        tagline: 'Helping international students gain the skills, experience and contacts to get hired.',
        cardTitle: 'H2H: a mentorship app for international students',
        cardLabel: 'Human-centred design',
        cover: { img: 'h2h-app', alt: 'Outcome: mentorship app', pos: '50% 46%' },
        meta: [['Unit', 'EBSC7230 Human-Centred Innovation'], ['Date', 'Feb–Mar 2024'], ['Team', '7 members'], ['Output', 'App concept + live pitch']],
        body: [
          { h: 'The brief', p: 'Explore work-life pressures for international students in creative agencies, juggling coursework, part-time jobs, visa limits on hours, fees and rent, and reframe the challenge.' },
          { h: 'My role', p: 'Contributed to every team canvas, developed ideas through brainwriting and Crazy 8s (LinkedIn profile building, in-app internships, networking events, writing support) and wrote a critical reflection each week.' },
          { h: 'Process', flow: ['Persona', 'Journey map', 'Problem sizing', 'HMW', 'Ideation', 'Value / effort', 'Value proposition', 'Lean Canvas', 'Assumptions', 'Pitch'] },
          { quote: 'Students needed more than time management. They needed a bridge between academic projects and industry experience.' },
          { stats: [['5', 'weeks, research to pitch'], ['7', 'team members'], ['15+', 'design-thinking tools'], ['5', 'barriers identified']] },
          {
            h: 'From student needs to a business concept.',
            p: 'The concept: a mentorship app that matches students with creative professionals by shared interests, and brings jobs, internships, networking and portfolio support into one place. Planned launch: a 3-month free trial for UCA students, funded by subscriptions, sponsorship, advertising and university partnerships.',
            defs: [
              ['Explore', 'Customer journey map across six phases, applying to graduating.'],
              ['Define', '“How Might We” statements, with eight variations to widen ideas.'],
              ['Develop', 'Value Proposition Canvas: “Creative Industry Speed-Dating for Networking”.'],
              ['Test', 'Assumption mapper: what students would pay, and what to test first.'],
              ['Communicate', 'Pitching canvas, deck and peer-scored pitch to the class jury.']
            ]
          },
          { h: 'What I learned', p: 'An idea, however good it looks, carries little weight until it has been tested with real users.' }
        ],
        gallery: [
          ['h2h-persona', 'Persona “Junkook”: pains, gains, jobs-to-be-done'],
          ['h2h-app', 'Outcome: mentorship app'],
          ['h2h-crazy8s', 'My Crazy 8s sketches', true],
          ['h2h-value-ease', 'Ideas by value and ease'],
          ['h2h-journey', 'Explore: customer journey map'],
          ['h2h-hmw', 'Define: “How Might We” statements'],
          ['h2h-vpc', 'Develop: Value Proposition Canvas'],
          ['h2h-assumptions', 'Test: assumption mapper'],
          ['h2h-pitch-canvas', 'Communicate: pitching canvas']
        ]
      },
      {
        id: 'ai',
        n: '2.2',
        type: 'Master’s dissertation · Solo',
        title: 'Humanizing AI in brand management',
        tagline: 'Ethical AI strategy for retail brands.',
        cardTitle: 'An ethical-AI framework for retail brands',
        cardLabel: 'Brand & AI strategy',
        cover: { svg: 'framework', alt: 'Ethical AI framework for retail: five application areas built on eight ethical principles' },
        framework: {
          areasLabel: '5 application areas, each with its tools and the checks a brand should run',
          areas: ['Inventory', 'Supply chain', 'Staffing', 'Personalisation', 'Customer service'],
          baseLabel: 'Built on 8 ethical principles',
          principles: ['Transparency', 'Data security & privacy', 'Avoiding human bias', 'Accountability', 'Ethical standards', 'Human rights law', 'Impact of automation on jobs', 'Accessibility'],
          core: 'Trust'
        },
        meta: [['Unit', 'EBSC7540 Masters Project'], ['Submitted', '22 July 2024'], ['Role', 'Sole researcher & author'], ['Length', '8,500 words']],
        body: [
          { h: 'The brief', p: 'Investigate how retail brands can personalise and automate with AI while protecting customer trust.' },
          { h: 'My role', p: 'Framed the questions, reviewed literature (TAM, Explainable AI, FAT, UNESCO guidance), recruited four experts in Stuttgart, Berlin and Bangalore, ran semi-structured interviews and analysed the transcripts.' },
          { quote: 'Trust depends on more than effective technology. Brands need to explain data use, give customers control and check for bias.' },
          { stats: [['4', 'expert interviews, 3 countries'], ['5', 'companies compared'], ['5', 'application areas'], ['8', 'ethical principles']], note: 'A research framework: implementation results were not measured.' },
          { h: 'Approach', flow: ['Literature + frameworks', 'Company comparison', 'Expert interviews', 'Thematic analysis', 'Python NLTK', 'Ethical AI framework'], note: 'Companies compared: H&M (demand forecasting), ASOS (visual search, virtual try-on), Stitch Fix (recommendations), Netflix and eBay.' },
          { h: 'Output · Ethical AI framework for retail', framework: true, mine: true },
          { h: 'What I found', defs: [['Real gains', 'Better demand forecasts, fewer stock-outs, faster service and more relevant recommendations.'], ['Real risks', 'Filter bubbles, dynamic pricing that feels unfair, and bias from training data.'], ['Trust is earned', 'Customers accept AI when brands explain data use, give control and audit for bias.']] },
          { stats: [['72%', 'of consumers worry how companies use their data'], ['+7%', 'revenue linked to AI staff scheduling'], ['+14%', 'potential boost to global GDP from AI by 2030 (PwC)']], note: 'Context statistics from secondary sources cited in the dissertation.', small: true }
        ],
        gallery: []
      },
      {
        id: 'youtube',
        n: '2.3',
        type: 'Trend forecasting · Team of 4 + individual',
        title: 'YouTube & shoppable video',
        tagline: 'Trend forecasting and consumer behaviour.',
        cardTitle: 'YouTube and the rise of shoppable video',
        cardLabel: 'Trend forecasting',
        cover: { img: 'yt-moodboard', alt: 'Mood board: “Transforming YouTube”', pos: '50% 40%' },
        meta: [['Unit', 'EBSC7420 Trends & Forecasting'], ['Date', 'Jun–Jul 2024'], ['Sector', 'Music & Entertainment'], ['Tools', 'Miro, Canva']],
        body: [
          { h: 'The brief', p: 'Identify the trend most likely to shape YouTube under the macro theme “Decentralised Digital Culture”.' },
          { h: 'My role', p: 'Contributed to the team mind map, UK PESTEL, trend canvas and trend map. Independently created the Trend Communication Canvas and the mood board.' },
          { h: 'Approach', flow: ['Brand analysis', 'UK PESTEL', 'Trend mapping', 'Trend selection', 'Communication strategy'] },
          { quote: 'Creator relationships can make shopping part of the viewing experience, as in YouTube × Merchbar, where artists sell merch beside their videos.' },
          { stats: [['2.5bn', 'monthly active users'], ['1bn', 'hours watched daily'], ['88%', 'of UK young people use YouTube'], ['>50%', 'of Gen Z would try a YouTuber’s pick']] }
        ],
        gallery: [
          ['yt-moodboard', 'Mood board: “Transforming YouTube”', true],
          ['yt-comm-canvas', 'Trend Communication Canvas', true],
          ['yt-mindmap', 'Mind map'],
          ['yt-pestel', 'PESTEL'],
          ['yt-trend-map', 'Trend map']
        ]
      },
      {
        id: 'podcast',
        n: '2.4',
        type: 'Podcast · Host & scriptwriter',
        title: 'Brand Builders: AI for startups',
        tagline: 'Making AI accessible to students and first-time founders.',
        cardTitle: 'Brand Builders: a business podcast on Spotify',
        cardLabel: 'Brand communication',
        cover: { svg: 'wave', alt: 'Brand Builders podcast, episodes 1 and 2', label: 'Brand Builders' },
        meta: [['Format', '2 episodes, ~30 min each'], ['Date', 'Dec 2023'], ['Role', 'Researcher, writer, host'], ['Published', 'Spotify']],
        episodes: [
          { n: 'Episode 1', t: 'Empowering startups with AI and technology', s: [[2, 'Intro'], [8, 'How AI changed startups'], [10, 'Startup challenges & tech fixes'], [5, 'AI jargon explained'], [5, 'Recap']] },
          { n: 'Episode 2', t: 'Tech-powered strategies for startup growth', s: [[3, 'Recap'], [10, 'Data-led decisions'], [8, 'Customer connection (Club Pret)'], [7, 'Future tech: AR/VR fitting rooms'], [2, 'Close']] }
        ],
        body: [
          { h: 'The brief', p: 'Create a business podcast for students and first-time founders who know they need technology but feel lost in the “tech maze”.' },
          { h: 'My role', p: 'Researched, scripted and hosted the technology and AI episodes: planned and timed every segment and wrote short dialogue scenes, like two students discovering Club Pret’s subscription.' },
          { h: 'Approach', flow: ['13 brand case studies', 'Script', 'Timed segments', 'Storytelling', 'Recording', 'Published'] },
          { quote: 'Familiar situations make abstract technology easier to understand, starting with a puffer-jacket search in a London cold snap.' },
          { stats: [['13', 'brand case studies, Amazon to Pret'], ['2', 'published episodes'], ['~60', 'minutes of scripted content']] },
          { h: 'Episodes', episodes: true },
          { stats: [['35%', 'of Amazon’s sales from recommendations'], ['80%', 'of Netflix viewing driven by its algorithm'], ['60m', 'people use Spotify’s Discover Weekly']], small: true },
          { link: ['Podcast · Spotify', 'Brand Builders', 'https://open.spotify.com/show/1duSPGxxKba5UARS1vVhQr'] }
        ],
        gallery: []
      }
    ]
  };

  var P = window.PORTFOLIO, byId = {};
  P.cases.forEach(function (c) { byId[c.id] = c; });
  P.work = [];
  P.chapters.forEach(function (ch) {
    ch.cases.forEach(function (id) { byId[id].ch = ch.id; P.work.push(byId[id]); });
  });
})();
