A couple hours experimenting with Socket.io on Node.js. I am also using express.js, twitter bootstrap, and jQuery. Jade is installed (and I started using it) but then went back to HTML because I might as well use HTML if I know it.

So far, this is what it does:
	server emits default connection event
	client catches and responds to this event by emitting its own event
	server confirms client connection by catching this event.
	
	when button 1 is clicked, event is emitted and broadcast, closing "hero" units for all clients
	when button 2 is clicked, event is emitted and broadcast, opening "hero" units for all clients
	
	
TODO:
User authentication in express.js- I did some reading about the onion layer approach of Connect (the library express is prototyped from) and this shouldn't be too bad.
Other functionality- TBD.