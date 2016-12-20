logan = User.new(name: "Logan", email: "logan@huntzberger.com", password: "richdude")
rory = User.new(name: "Rory", email: "lorelai2@gmail.com", password: "snickers")
jess = User.new(name: "Jess", email: "jmariano@broodingheroes.com", password: "swole1")
emily = User.new(name: "Emily", email: "mrsemilygilmore@aol.com", password: "superior")
logan.save
rory.save
jess.save
emily.save

logan.pair_requests.create(project: "Example Project", info: "I should be getting started on this by the end of this week if I'm not too busy being incredibly rich and angsty. @huntz on Slack.")
rory.pair_requests.create(project: "Another Example Project", info: "I'm not a very good journalist, so I've decided to find another career even though I'm a Gilmore. @roryg")
jess.pair_requests.create(project: "Example Project 3", info: "I should be starting next week unless my mom joins another cult. I'd rather email than Slack - it's old school, like my leather jacket.")
emily.pair_requests.create(project: "Example Project 4", info: "I'm an 80-year-old widow. Let's do this.")

fwitter = rory.teams.build(name: 'Fwitter')
jess.teams << fwitter
fwitter.save

ttt = emily.teams.build(name: "TTT w AI")
logan.teams << ttt
ttt.save

fwitter.tasks.create(name: "assign the tasks", notes: "task stuff goes here")
fwitter.tasks.create(name: "do the tasks", notes: "more info goes here")
fwitter.tasks.create(name: "do the other tasks", notes: "guess what? info!")
fwitter.tasks.create(name: "finish the tasks", notes: "some notes")

ttt.tasks.create(name: "do the thing", notes: "I am really running low on examples")
ttt.tasks.create(name: "turn on computer", notes: "essential first step")
ttt.tasks.create(name: "open text editor", notes: "essential second step")
ttt.tasks.create(name: "spend > 30 minutes adjust color scheme of text editor", notes: "essential third step")
