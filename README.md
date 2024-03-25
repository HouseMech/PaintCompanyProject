# README

This is a quick project that I put together in 3 days for a coding challenge.

This is a fullstack project involving a Ruby on Rails backend with a VueJS frontend. It is a simple stock application that allows a user to view realtime changes in a Paint company's paint stock. It uses the Pusher websocket service to facilitate this.

## Examples
```https://paintinventory.liamharbec.com/```

You can see the project in action here. You can use the following account to gain access:
```
email: john@example.com
password: 123456789
```

## Decision-making
Here are some of my thoughts behind the decisions I made on this project:

### Backend
I chose RoR due to my familiarity with the stack. Given the time constraints, I felt I needed something I had experience with given how I would undoubtedly encounter several pitfalls in this project, The first of which was the authentication. I used the devise gem's jwt tokens functionality to quickly get something together. In addition, the project is deployed to a Hetzner server via the capistrano gem.

Another pitfall I realized early on was the lack of certain rails features given that we had a Vue ui. I had anticipated using Turbo to implement the realtime data that this app would benefit from, though thankfully Pusher came to the rescue.

### Frontend
VueJS is a recent tool in my arsenal, and one that I'm happy to be using. I hadn't made a project in the past that had bridged RoR and Vue together so this was an enjoyable first. I chose Vue for much of the same reasons I chose Rails, my prior experience. I ended up also selecting the Vuetify styling framework to speed up my development and give the app a somewhat cleaner finish.
