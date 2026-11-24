export const GOALS = [
  { id: "muscle", name: "Build muscle", detail: "Add size and strength", heading: "Get stronger every week.", sub: "Heavy racks, progressive programs and coaches who track your lifts.", planTitle: "Your first 4 weeks of lifting", planSub: "A push, pull, legs split with simple progression.", tier: 1, plan: [["Week 1","Learn the big lifts with a coach"],["Week 2","Push / pull / legs, 3 days"],["Week 3","Add weight, track every set"],["Week 4","Re-test strength and adjust"]] },
  { id: "fat", name: "Lose fat", detail: "Burn more, feel lighter", heading: "Lose fat. Keep your energy.", sub: "Conditioning work, strength training and a plan you can actually stick to.", planTitle: "Your first 4 weeks of fat loss", planSub: "Strength 2 days, conditioning 2 days, daily steps.", tier: 1, plan: [["Week 1","Body scan and baseline workouts"],["Week 2","2 strength + 2 conditioning days"],["Week 3","Add a coached session, hit step goal"],["Week 4","Check-in and next block"]] },
  { id: "fit", name: "Get fit", detail: "Move better, feel better", heading: "Feel good in your body.", sub: "Friendly coaching and open floor time, whatever your starting point.", planTitle: "Your first 4 weeks of getting fit", planSub: "Three easy sessions a week, building the habit first.", tier: 0, plan: [["Week 1","Tour, intro session and goals chat"],["Week 2","3 short full-body sessions"],["Week 3","Try a coached session"],["Week 4","Pick what you enjoy most"]] },
  { id: "perf", name: "Perform", detail: "Sport, speed and power", heading: "Train for the thing you play.", sub: "Speed, power and mobility work built around your sport.", planTitle: "Your first 4 weeks of performance", planSub: "Power, speed and mobility with sport-specific drills.", tier: 3, plan: [["Week 1","Movement screen and sport goals"],["Week 2","Power and speed blocks"],["Week 3","Add sport-specific drills"],["Week 4","Test jumps, sprints and lifts"]] },
] as const;

export type Goal = (typeof GOALS)[number];
export type GoalId = Goal["id"];

export const LEVELS = ["Brand new", "Some experience", "I train regularly"] as const;

export const TRAINING = [
  { name: "Strength", panel: "p1", title: "Strength training", text: "Squat racks, platforms and a full dumbbell wall. Coaches check your form and plan your progression.", tags: ["Powerlifting","Hypertrophy","Beginner basics"] },
  { name: "Yoga", panel: "p2", title: "Yoga & mobility", text: "Slow down, stretch out and fix stiff hips and shoulders. Good for every level, and great on rest days.", tags: ["Stretching","Mobility","Breathwork"] },
  { name: "HYROX", panel: "p3", title: "HYROX training", text: "Race-style training: running, sleds, rowing, ski erg and wall balls. Train in a team or go solo.", tags: ["Race simulation","Sled work","Pacing"] },
  { name: "Conditioning", panel: "p4", title: "Conditioning", text: "Fast, sweaty circuits that build stamina and burn fat. A coach sets the pace and you just show up.", tags: ["Circuits","Intervals","Boxing fitness"] },
] as const;

export const PROGRAMS = [
  ["Open gym access","Full floor, racks and cardio, on your own schedule","fit"],
  ["Personal training","One-to-one coaching with a program built for you","muscle"],
  ["Strength program","A progressive lifting plan with coach feedback","muscle"],
  ["Fat-loss program","8 weeks of training, habits and weekly check-ins","fat"],
  ["HYROX & athlete prep","Race-style blocks, speed and power testing","perf"],
  ["Free fitness assessment","Body scan, movement check and a goal plan","fit"],
] as const;

export const TIERS = [
  { name: "1 month", months: 1, price: 2000 },
  { name: "3 months", months: 3, price: 5500 },
  { name: "6 months", months: 6, price: 9000 },
  { name: "12 months", months: 12, price: 15000 },
] as const;

export const EVENTS = [
  ["Oct 2026","HYROX Race Day","Teams and solo athletes ran our in-house course: sleds, rowing, wall balls and a loud crowd.","120 athletes","e0"],
  ["Aug 2026","30-Day Challenge Finale","Thirty days of coached training and weekly check-ins, ending with a finale night and prizes.","85 members","e1"],
  ["Jun 2026","Charity Lift-a-thon","Members lifted for a cause. Every rep counted toward a local charity drive.","60 lifters","e2"],
  ["Mar 2026","Open Day","Tours, body scans and plenty of questions answered for everyone in the neighbourhood.","300 visitors","e3"],
] as const;

export const GALLERY = [
  ["Main floor", "s1"],
  ["Squat racks in action", "s2"],
  ["Cardio deck", "s3"],
  ["Sled lane", "s2"],
  ["Saturday morning crowd", "s1"],
  ["Mobility zone", "s3"],
  ["Free weights", "s2"],
  ["Coaching a lift", "s3"],
  ["Event night", "s1"],
] as const;

export const GALLERY_END_GAP = 96;

export const REVIEWS = [
  ["Arjun M.","2 weeks ago","Came in not knowing how to squat. Three months later I’m lifting with confidence. The coaches actually watch your form."],
  ["Priya S.","a month ago","Clean, never overcrowded, and the staff remember your name. Best gym I’ve joined."],
  ["Rohan K.","a month ago","Did my HYROX prep here. The sled and rowing area is exactly what I needed."],
  ["Sneha D.","2 months ago","The weekly check-ins kept me consistent and helped me feel stronger."],
  ["Imran A.","2 months ago","24/7 access is a lifesaver with my shift timings. Always a rack free."],
  ["Meera T.","3 months ago","The mobility corner fixed my back stiffness. Calm, friendly vibe."],
  ["Vikram P.","3 months ago","Equipment is well maintained and the place is spotless."],
  ["Anita R.","4 months ago","The tour sold me. No pushy sales, just straight answers."],
] as const;
