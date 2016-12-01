logan = User.new(name: "Logan", email: "logan@huntzberger.com", password: "richdude")
rory = User.new(name: "Rory", email: "lorelai2@gmail.com", password: "snickers")
jess = User.new(name: "Jess", email: "jmariano@broodingheroes.com", password: "swole1")
emily = User.new(name: "Emily", email: "mrsemilygilmore@aol.com", password: "superior")
logan.save
rory.save
jess.save
emily.save

logan.pair_requests.create(project: "TicTacToe with AI", info: "I should be getting started on this by the end of this week. Want to pair up? Catch me on Slack @huntz")
rory.pair_requests.create(project: "Fwitter", info: "Who's ready for Fwitter?? I'd like to get started tomorrow. If you're interested you can DM me @roryg.")
jess.pair_requests.create(project: "Fwitter", info: "I guess I should look for a partner... I'd like to get started ASAP. Anyone in? @jess on Slack and Learn.")
emily.pair_requests.create(project: "tictactoe w/ ai", info: "I suppose I should look for a partner...")

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
