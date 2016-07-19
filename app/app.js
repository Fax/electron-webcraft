// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import { greet } from './hello_world/hello_world'; // code authored by you in this project
import env from './env';

console.log('Loaded environment variables:', env);

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
console.log('The author of this app is:', appDir.read('package.json', 'json').author);

document.addEventListener('DOMContentLoaded', function () {
    
	        window.world = new World( 16, 16, 16 );
			world.createFlatWorld( 6 );
			
			// Set up renderer
			window.render = new Renderer( "renderSurface" );
			render.setWorld( world, 8 );
			render.setPerspective( 60, 0.01, 200 );
			
			// Create physics simulator
			window.physics = new Physics();
			physics.setWorld( world );
			
			// Create new local player
			window.player = new Player();
			player.setWorld( world );
			player.setInputCanvas( "renderSurface" );
            player.setMaterialSelector("materialSelector");
    

            var loop = function () {
                var time = new Date().getTime() / 1000.0;
				
				// Simulate physics
				physics.simulate();
				
				// Update local player
				player.update();
				
				// Build a chunk
				render.buildChunks( 1 );
				
				// Draw world
				render.setCamera( player.getEyePos().toArray(), player.angles );
				render.draw();
				
				while ( new Date().getTime() / 1000 - time < 0.016 );
            }
			
			// Render loop			
			setInterval( loop, 1 );
});